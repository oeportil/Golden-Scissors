import prisma from "@/utils/prismaClient";
import { startOfDay, endOfDay } from "date-fns";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const hoy = new Date();
    const inicioDelDia = startOfDay(hoy);
    const finDelDia = endOfDay(hoy);

    // Obtener empleados con su horario del día actual y filtrar según contratación
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
          {
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
            servicio: {
              include: {
                categoria: true,
              },
            },
          },
          orderBy: {
            fecha_inicio: "asc",
          },
        },
      },
    });

    const response = empleados.map((empleado) => {
      const categorias = empleado.cateCapacitadas.map(
        (cap) => cap.categoria.nombre
      );
      const detallesHoy = empleado.detalleCita.map((detalle) => ({
        idCita: detalle.cita.id_cita,
        fechaInicio: detalle.fecha_inicio,
        fechaFin: detalle.fecha_fin,
        nombreServicio: detalle.servicio.nombre,
        nombreCategoria: detalle.servicio.categoria.nombre,
      }));

      let estado = "Retirado";
      if (empleado.estado === 1) {
        estado =
          detallesHoy.length === 0
            ? "Disponible"
            : `Atendiendo ${detallesHoy[0].idCita}`;
      } else if (empleado.estado === 2) {
        estado =
          detallesHoy.length === 0
            ? "Atendiendo visitante"
            : `Atendiendo ${detallesHoy[0].idCita}`;
        if (detallesHoy.length > 0) {
          // Cambiar el estado a 1 si está atendiendo un detalle de cita
          prisma.empleados.update({
            where: { id_empleado: empleado.id_empleado },
            data: { estado: 1 },
          });
        }
      }

      return {
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        telefono: empleado.telefono,
        categorias: categorias,
        estado: estado,
        detalles: detallesHoy,
      };
    });

    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
