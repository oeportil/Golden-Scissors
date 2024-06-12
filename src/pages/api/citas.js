import prisma from "@/utils/prismaClient";
import { addMinutes, addHours, getDay, isSameDay } from "date-fns";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const citas = await prisma.citas.findMany();
    if (citas.length === 0) {
      return res.send("No hay citas que mostrar");
    }
    res.json(citas);
  } else if (req.method === "POST") {
    //Aqui comienza la locura, el lado misterioso de la isla
    let { orden, fecha, id_usu } = req.body;
    if (!orden || !Array.isArray(orden) || orden.length === 0) {
      return res
        .status(400)
        .json({ error: "La lista de servicios no debe ir vacía" });
    }
    if (!fecha || !id_usu) {
      return res
        .status(400)
        .json({ error: "Fecha e ID de usuario son requeridos" });
    }
    try {
      const givenDate = new Date(fecha);
      const fixeddate = addHours(givenDate, 6);

      // Obtener el día de la semana de fechadato (0 es domingo, 6 es sábado)
      const dayOfWeek = getDay(fixeddate);

      // Consultar la base de datos para obtener los horarios según el día de la semana
      let horario;

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        // Día laboral
        horario = await prisma.horarioEmpleado.findFirst({
          where: { laboral: true },
        });
      } else if (dayOfWeek === 6) {
        // Sábado
        horario = await prisma.horarioEmpleado.findFirst({
          where: { sabatino: true },
        });
      } else if (dayOfWeek === 0) {
        // Domingo
        horario = await prisma.horarioEmpleado.findFirst({
          where: { dominguero: true },
        });
      }

      if (!horario) {
        console.log("Sin horarios disponibles");
        return res.status(401).json({ error: "Sin horarios disponibles" });
      }
      if (orden.length == 0) {
        res
          .status(400)
          .json({ error: "La lista de servicios no debe ir vacía" });
      }
      const cita = await prisma.citas.create({
        data: {
          fecha,
          id_usuario: id_usu,
        },
      });
      let fechaini = new Date(fecha);
      let fechafin = new Date(fechaini);
      let comprobante;
      let randnum;

      for (let i = 0; i < orden.length; i++) {
        fechafin = addMinutes(fechaini, orden[i].duracion);
        comprobante = await obtenerDisponibles(
          fechaini,
          fechafin,
          horario.id_horarioEmpleado,
          orden[i].id_categoria
        );
        if (comprobante.length == 0) {
          await borrarCitas(cita.id_cita);
          return res.status(400).json({
            error:
              "No se pudo crear la reserva, hubo conflictos con fechas de reserva",
          });
        }
        randnum = getRandomInt(0, comprobante.length - 1);
        const detacita = await prisma.detalleCita.create({
          data: {
            id_cita: cita.id_cita,
            id_servicio: orden[i].id_servicio,
            id_empleado: comprobante[randnum].id_empleado,
            precio: orden[i].precio,
            fecha_inicio: fechaini,
            fecha_fin: fechafin,
          },
        });
        fechaini = addMinutes(fechaini, orden[i].duracion);
      }
      return res.json(cita);
    } catch (error) {
      console.log(error.message);
      return res.status(500).json(error);
    }
  }
}
async function borrarCitas(idcit) {
  try {
    const borrarcit = await prisma.citas.delete({
      where: {
        id_cita: idcit,
      },
    });
    const borrardet = await prisma.detalleCita.deleteMany({
      where: {
        id_cita: idcit,
      },
    });
  } catch (err) {
    console.log(err.message);
    return { error: err.message };
  }
}
async function obtenerDisponibles(
  fechaInicio,
  fechaFin,
  idHorario,
  idCategoria
) {
  const today = new Date();
  const isToday = isSameDay(new Date(fechaInicio), today);

  try {
    const employees = await prisma.empleados.findMany({
      where: {
        AND: [
          { id_horarioEmpleado: idHorario }, // Filtro por Horario
          { contratado: true },
          { cateCapacitadas: { some: { id_categ: idCategoria } } }, // Filtro por categoría
          {
            detalleCita: {
              //Main mastodonte
              none: {
                OR: [
                  {
                    AND: [
                      { fecha_inicio: { lte: new Date(fechaInicio) } },
                      { fecha_fin: { gte: new Date(fechaFin) } },
                    ],
                  },
                  {
                    AND: [
                      { fecha_inicio: { lte: new Date(fechaInicio) } },
                      { fecha_fin: { gt: new Date(fechaInicio) } },
                    ],
                  },
                  {
                    AND: [
                      { fecha_inicio: { lt: new Date(fechaFin) } },
                      { fecha_fin: { gte: new Date(fechaFin) } },
                    ],
                  },
                  {
                    AND: [
                      { fecha_inicio: { gte: new Date(fechaInicio) } },
                      { fecha_fin: { lte: new Date(fechaFin) } },
                    ],
                  },
                ],
              },
            },
          },
          ...(isToday ? [{ OR: [{ estado: 1 }, { estado: 2 }] }] : []), // Filtro por estado si la fecha es hoy
        ],
      },
    });

    return employees;
  } catch (error) {
    console.error("Error al obtener empleados disponibles:", error);
    throw error;
  }
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
