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
405 - No existe XD, si te sale un 405, estas jodido
415 - Método inválido, esto es un POST
500 - Error de la función
*/
async function verificarfecha(horario, liserv, fechaini) {
  let liscas = [...liserv].reverse();
  let lisres = [];
  let fIni = fechaini;
  let fFin;
  let contador = liscas.length;
  let empleadosvalidar;
  let eleserv;
  //El while para verificar si todos los campos se tomaron
  while (liscas.length > 0) {
    //Recorreremos esto una cantidad no especificada de veces (Modelo tipo sort)
    fIni = fechaini;
    for (let i = liscas.length - 1; i >= 0; i--) {
      //Establecemos la fecha fin
      fFin = addMinutes(fIni, liscas[i].duracion);
      //La validación
      empleadosvalidar = await obtenerDisponibles(
        fIni,
        fFin,
        horario,
        liscas[i].id_categoria
      );
      //Si tiene elementos lo eliminamos del array y lo metemos en el de respuesta
      if (empleadosvalidar.length > 0) {
        //Si todo sale bien, hacemos cambios
        fIni = addMinutes(fIni, liscas[i].duracion);
        eleserv = liscas.splice(i, 1);
        lisres.push(eleserv[0]);
      }
      //Si no sale, pues seguimos con el flujo hasta lograrlo
    }
    //Despues, comprobamos si se eliminaron elementos
    if (contador == liscas.length) {
      //Si no se eliminaron, no se puede, y para evitar bucle infinito, hacemos un return
      return { validar: false };
    } else {
      //Si se encuentra, actualizamos contador
      contador = liscas.length;
    }
  }
  //Si llegamos a 0, todo salió bien
  return {
    validar: true,
    orden: lisres,
  };
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
function roundToNext5Minutes(date) {
  const ms = 1000 * 60 * 5; // 5 minutos en milisegundos
  return new Date(Math.ceil(date.getTime() / ms) * ms);
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
    console.log(givenDate)
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

      const horaFin = new Date(givenDate);
      horaFin.setHours(
        horario.hora_fin.getHours(),
        horario.hora_fin.getMinutes()
      );

      let horaMin = new Date(givenDate);
      horaMin.setHours(
        horario.hora_inicio.getHours(),
        horario.hora_inicio.getMinutes()
      );

      const horaMax = horaFin;
      horaMax.setMinutes(horaMax.getMinutes() - totalDuration);

      // Verificar si la fecha es la del día de hoy y ajustar la fecha mínima si es necesario
      if (startOfDay(givenDate).getTime() === startOfDay(zonedDate).getTime()) {
        const currentPlusOneHour = addHours(zonedDate, 1);
        const roundedDate = roundToNext5Minutes(currentPlusOneHour);

        if (roundedDate > horaMin) {
          horaMin = roundedDate;
        }
        // Verificar si la fecha mínima supera la máxima
        if (horaMin > horaMax) {
          console.log("La fecha minima supera la máxima");
          console.log(horaMin + " || " + horaMax);
          return res.status(402).json([]);
        }
      }

      //Declaracion del merequetengue
      let listafechas = [];
      let elemental = {};
      let contadorfecha = horaMin;
      let comprobante = {};

      //While del merequetengue
      while (contadorfecha < horaMax) {
        //Esto es para ver si sirve

        //Aqui invocare una función
        comprobante = await verificarfecha(
          horario.id_horarioEmpleado,
          liservicios,
          contadorfecha
        );

        //verificacion del comprobante
        if (comprobante.validar) {
          elemental = {
            fecha: contadorfecha,
            orden: JSON.parse(JSON.stringify(comprobante.orden)),
          };
          listafechas.push(elemental);
        }
        //Salto de fecha
        contadorfecha = addMinutes(contadorfecha, 5);
        //console.log(contadorfecha);
      }
      return res.json({
        zonedDate,
        horario,
        totalDuration,
        horaMin,
        horaMax,
        listafechas,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json([]);
    }
  } else {
    console.log("Método inválido");
    return res.status(415).json([]);
  }
}
