import prisma from "@/utils/prismaClient";
import {
  startOfDay,
  endOfDay,
  addHours,
  addWeeks,
  addMonths,
  addYears,
} from "date-fns";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { tipofiltro } = req.query;

    const hoy = addHours(new Date(), -6);
    let filtroini = new Date(-864000000);

    if (!isNaN(tipofiltro)) {
      console.log(tipofiltro);
      if (tipofiltro == 1) {
        //ultima semana
        filtroini = addWeeks(hoy, -1);
      } else if (tipofiltro == 2) {
        //ultimo mes
        filtroini = addMonths(hoy, -1);
      } else if (tipofiltro == 3) {
        //ultimo año
        filtroini = addYears(hoy, -1);
      }
    }
    console.log(hoy);
    console.log(filtroini);
    const empleados = await prisma.empleados.findMany({
      include: {
        detalleCita: {
          where: {
            fecha_inicio: { lte: hoy },
            fecha_inicio: { gte: filtroini },
          },
          include: {
            servicio: true,
          },
        },
      },
    });
    const response = empleados.map((empleado) => {
      const detalleCitaCount = empleado.detalleCita.length; // Conteo de detalles de cita
      const duracionTotalServicios = empleado.detalleCita.reduce(
        (total, detalle) => total + detalle.servicio.duracion,
        0
      ); // Reducción de la duración de los servicios
      const duracionEnMinutos = duracionTotalServicios;
      const duracionEnHoras = Math.floor(duracionEnMinutos / 60);
      const duracionEnMinutosRestantes = duracionEnMinutos % 60;

      const duracionTotal = `${duracionEnHoras} horas, ${duracionEnMinutosRestantes} minutos`;
      return {
        id_empleado: empleado.id_empleado,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        email: empleado.email,
        telefono: empleado.telefono,
        genero: empleado.telefono,
        fechaContra: empleado.fechaContra,
        direccion: empleado.direccion,
        estado: empleado.estado,
        contratado: empleado.contratado,
        salario: empleado.salario,
        id_horarioEmpleado: empleado.id_horarioEmpleado,
        trabajos_hechos: detalleCitaCount,
        tiempo_trabajo: duracionTotal,
      };
    });
    res.json(response);
  } else {
    res.status(404).json({ error: "Método incorrecto" });
  }
}
