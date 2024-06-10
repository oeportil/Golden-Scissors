import prisma from "@/utils/prismaClient";
import { startOfDay, endOfDay, differenceInMinutes, addHours } from "date-fns";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "ID de empleado es requerido" });
  }

  const empleadoId = parseInt(id, 10);
  const hoy = addHours(new Date(), -6);
  if (req.method === "GET") {
    try {
      const inicioDelDia = startOfDay(hoy);
      const finDelDia = endOfDay(hoy);

      const detalles = await prisma.detalleCita.findFirst({
        where: {
          id_empleado: empleadoId,
          cita: {
            fecha: {
              gte: hoy,
              lte: finDelDia,
            },
          },
        },
        include: {
          cita: true,
        },
        orderBy: {
          fecha_inicio: "asc",
        },
      });

      if (!detalles) {
        return res.json({ minutosParaProximoDetalle: null });
      }

      const minutosParaProximoDetalle = differenceInMinutes(
        new Date(detalles.fecha_inicio),
        hoy
      );
      res.json({ minutosParaProximoDetalle });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else if (req.method === "POST") {
    const { estado } = req.body;

    if (![1, 2, 3].includes(estado)) {
      return res
        .status(400)
        .json({ error: "Estado inválido, debe ser 1, 2 o 3" });
    }

    try {
      const empleado = await prisma.empleados.findUnique({
        where: { id_empleado: empleadoId },
        include: {
          detalleCita: {
            where: {
              cita: {
                fecha: {
                  gte: startOfDay(hoy),
                  lte: endOfDay(hoy),
                },
              },
            },
            include: {
              cita: true,
            },
          },
        },
      });

      if (!empleado) {
        return res.status(404).json({ error: "Empleado no encontrado" });
      }

      const detalleActual = empleado.detalleCita.find((detalle) => {
        const fechaInicio = new Date(detalle.fecha_inicio);
        const fechaFin = new Date(detalle.fecha_fin);
        const ahora = hoy;
        return ahora >= fechaInicio && ahora <= fechaFin;
      });

      const tieneDetallePendienteHoy = empleado.detalleCita.some((detalle) => {
        const fechaInicio = new Date(detalle.fecha_inicio);
        return hoy < fechaInicio;
      });

      if (detalleActual && estado !== 1) {
        return res.status(400).json({
          error:
            "No se puede cambiar a estado 2 o 3 mientras se atiende un detalle de cita",
        });
      }

      if (estado === 3 && tieneDetallePendienteHoy) {
        return res.status(400).json({
          error:
            "No se puede cambiar a estado 3 con detalles de cita pendientes hoy",
        });
      }

      let nuevoEstado = estado;
      if (
        (estado === 2 && empleado.estado === 2) ||
        (estado === 3 && empleado.estado === 3)
      ) {
        nuevoEstado = 1;
      }
      await prisma.empleados.update({
        where: { id_empleado: empleadoId },
        data: { estado: nuevoEstado },
      });

      res.json({
        mensaje: "Estado actualizado correctamente",
        estado: nuevoEstado,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
}
