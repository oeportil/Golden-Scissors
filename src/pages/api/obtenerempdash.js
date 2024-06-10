import prisma from "@/utils/prismaClient";
import { startOfDay, endOfDay, addHours } from "date-fns";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const hoy = addHours(new Date(), -6);
    const inicioDelDia = startOfDay(hoy);
    const finDelDia = endOfDay(hoy);

    try {
      // Obtener empleados con su horario del día actual
      const empleados = await prisma.empleados.findMany({
        where: {
          AND: [
            {
              horarioEmpleado: {
                laboral: hoy.getDay() >= 1 && hoy.getDay() <= 5,
              },
            }, // Lunes a viernes
            { horarioEmpleado: { sabatino: hoy.getDay() === 6 } }, // Sábado
            { horarioEmpleado: { dominguero: hoy.getDay() === 0 } }, // Domingo
          ],
          OR: [
            { contratado: true },
            {
              contratado: false,
              detalleCita: {
                some: {
                  cita: {
                    fecha: {
                      gte: inicioDelDia,
                      lte: finDelDia,
                    },
                  },
                },
              },
            },
          ],
        },
        include: {
          cateCapacitadas: {
            include: {
              categoria: true,
            },
          },
          detalleCita: {
            where: {
              cita: {
                fecha: {
                  gte: inicioDelDia,
                  lte: finDelDia,
                },
              },
            },
            include: {
              cita: true,
            },
          },
        },
      });

      const response = empleados.map(async (empleado) => {
        const categorias = empleado.cateCapacitadas.map(
          (cap) => cap.categoria.nombre
        );
        const detallesHoy = empleado.detalleCita.filter((detalle) => {
          const fechaCita = new Date(detalle.cita.fecha);
          return fechaCita >= inicioDelDia && fechaCita <= finDelDia;
        });

        let estado = "Retirado";
        const now = addHours(new Date(), -6);
        const citaActual = detallesHoy.find(
          (detalle) =>
            new Date(detalle.fechaInicio) <= now &&
            new Date(detalle.fechaFin) >= now
        );

        if (empleado.estado === 1) {
          estado = citaActual
            ? `Atendiendo ${citaActual.idCita}`
            : "Disponible";
        } else if (empleado.estado === 2) {
          estado = citaActual
            ? `Atendiendo ${citaActual.idCita}`
            : "Atendiendo visitante";

          if (citaActual) {
            // Cambiar el estado a 1 si está atendiendo un detalle de cita
            prisma.empleados.update({
              where: { id_empleado: empleado.id_empleado },
              data: { estado: 1 },
            });
          }
        }
        return {
          id_empleado: empleado.id_empleado,
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          telefono: empleado.telefono,
          categorias: categorias,
          estado: estado,
          state: empleado.estado,
        };
      });

      // Ejecutar todas las promesas antes de enviar la respuesta
      const resolvedResponse = await Promise.all(response);

      res.json(resolvedResponse);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(415).json({ error: "Método inválido, solo se permite GET" });
  }
}
