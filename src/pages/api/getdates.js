import prisma from "@/utils/prismaClient";
import {
  format,
  addHours,
  getDay,
  isBefore,
  startOfDay,
  addMinutes,
  isSameDay,
} from "date-fns";

const todayvar = -6;
//Lista de posibles errores
/*
400 - Fecha inválida
401 - Sin horarios disponibles
402 - Fecha minima supera a la máxima, probar con otro día
403 - ListServicio está vacio
404 - No encontrado
405 -
415 - Método inválido, esto es un POST
500 - Error de la función
*/
async function verificarfecha(horario, liserv, fechaini, fechafin) {}
async function obtenerDisponibles(
  fechaInicio,
  fechaFin,
  idHorario,
  idCategoria
) {
  async function getAvailableEmployees(
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
                        { fecha_fin: { gte: new Date(fechaInicio) } },
                      ],
                    },
                    {
                      AND: [
                        { fecha_inicio: { lte: new Date(fechaFin) } },
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
            ...(isToday ? [{ estado: 1 }] : []), // Filtro por estado si la fecha es hoy
          ],
        },
      });

      return employees;
    } catch (error) {
      console.error("Error al obtener empleados disponibles:", error);
      throw error;
    }
  }
}
export default async function handler(req, res) {
  if (req.method === "POST") {
    let { liservicios, fechadato } = req.body;

    // Verificar si liservicios es un array vacío o no se envió
    if (!Array.isArray(liservicios) || liservicios.length === 0) {
      return res.status(403).json([]);
    }

    // Verificar que fechadato no sea antes de hoy
    const today = new Date();
    const zonedDate = addHours(today, todayvar);
    const givenDate = new Date(fechadato);
    if (isBefore(startOfDay(givenDate), startOfDay(zonedDate))) {
      console.log("Fecha inválida");
      return res.status(400).json([]);
    }

    // Obtener el día de la semana de fechadato (0 es domingo, 6 es sábado)
    const dayOfWeek = getDay(givenDate);

    // Consultar la base de datos para obtener los horarios según el día de la semana
    let horario;
    try {
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
        return res.status(401).json([]);
      }

      // Calcular la duración total de los servicios y restar ese total de la hora máxima del horario
      let totalDuration = 0;
      if (liservicios) {
        totalDuration = liservicios.reduce(
          (acc, servicio) => acc + servicio.duracion,
          0
        );
      }

      const horaFin = new Date(horario.hora_fin);
      let horaMin = new Date(horario.hora_inicio);
      const horaMax = new Date(horario.hora_fin);
      horaMax.setMinutes(horaMax.getMinutes() - totalDuration);

      // Verificar si la fecha es la del día de hoy y ajustar la fecha mínima si es necesario
      if (startOfDay(givenDate).getTime() === startOfDay(zonedDate).getTime()) {
        const currentPlusOneHour = addHours(zonedDate, 1);
        if (currentPlusOneHour > horaMin) {
          horaMin = currentPlusOneHour;
        }

        // Verificar si la fecha mínima supera la máxima
        if (horaMin > horaMax) {
          console.log("La fecha minima supera la máxima");
          return res.status(402).json([]);
        }
      }

      //Declaracion del merequetengue
      let listafechas = [];
      let elemental = {};
      let contadorfecha = horaMin;

      //While del merequetengue
      while (contadorfecha < horaMax) {
        //Esto es para ver si sirve
        contadorfecha = addMinutes(contadorfecha, 5);
        console.log(contadorfecha);
        //Aqui invocare una función
      }
      res.json({
        zonedDate,
        horario,
        totalDuration,
        horaMin,
        horaMax,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json([]);
    }
  } else {
    console.log("Método inválido");
    res.status(415).json([]);
  }
}
