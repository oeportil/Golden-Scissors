import prisma from "@/utils/prismaClient";
import { addHours } from "date-fns";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "ID de usuario es requerido" });
    }

    try {
      const citas = await prisma.citas.findMany({
        orderBy: {
          fecha: "desc",
        },
        where: { id_usuario: parseInt(id, 10) },
        include: {
          usuario: {
            select: {
              nombre: true,
              apellido: true,
              telefono: true,
            },
          },
          detalleCita: {
            include: {
              servicio: {
                include: {
                  categoria: true,
                },
              },
              empleadoCit: {
                select: {
                  nombre: true,
                  apellido: true,
                },
              },
            },
          },
        },
      });

      const response = citas.map((cita) => {
        const peluqueros = [];
        const detalles = cita.detalleCita.map((detalle) => {
          const peluquero = `${detalle.empleadoCit.nombre} ${detalle.empleadoCit.apellido}`;
          if (!peluqueros.includes(peluquero)) {
            peluqueros.push(peluquero);
          }
          return {
            nombreCategoria: detalle.servicio.categoria.nombre,
            nombreServicio: detalle.servicio.nombre,
            precioIndividual: detalle.precio,
            fechaInicio: detalle.fecha_inicio,
            fechaFin: detalle.fecha_fin,
            nombrePeluquero: peluquero,
          };
        });

        const total = cita.detalleCita.reduce(
          (acc, detalle) => acc + detalle.precio,
          0
        );
        const duracionTotal = cita.detalleCita.reduce(
          (acc, detalle) =>
            acc +
            (new Date(detalle.fecha_fin) - new Date(detalle.fecha_inicio)),
          0
        );

        return {
          idCita: cita.id_cita,
          nombreUsuario: `${cita.usuario.nombre} ${cita.usuario.apellido}`,
          telefonoUsuario: cita.usuario.telefono,
          fechaCorte: cita.fecha,
          servicios: detalles.map((detalle) => detalle.nombreServicio),
          peluqueros: peluqueros,
          totalCorte: total,
          duracionTotal: duracionTotal / 60000, // Convertir milisegundos a minutos
          detalles: detalles,
          citaRealizada: addHours(new Date(), -6) > new Date(cita.fecha),
        };
      });

      res.json(response);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(415).json({ error: "Método inválido, solo se permite GET" });
  }
}
