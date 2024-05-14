export const formatDate = (fecha) => {
  const nuevaFecha = new Date(fecha);
  const nueva = nuevaFecha
    .toLocaleDateString("es-Es", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    .toString();
  return nueva;
};

export const prismaFecha = (fecha) => {
  const nuevaFecha = new Date(fecha);
  const nueva = nuevaFecha.toISOString();
  return nueva.toString();
};

export const Hora = (hora) => {
  const horaInicio = new Date(hora.hora_inicio);
  const horaFin = new Date(hora.hora_fin);

  // Convertir las horas a formato local
  const horaInicioLocal = new Date(
    horaInicio.toLocaleString("es-MX", { timeZone: "UTC" })
  );
  const horaFinLocal = new Date(
    horaFin.toLocaleString("es-MX", { timeZone: "UTC" })
  );

  // Obtener las horas y minutos
  const horaInicioString = `${String(horaInicioLocal.getHours()).padStart(
    2,
    "0"
  )}:${String(horaInicioLocal.getMinutes()).padStart(2, "0")}`;
  const horaFinString = `${String(horaFinLocal.getHours()).padStart(
    2,
    "0"
  )}:${String(horaFinLocal.getMinutes()).padStart(2, "0")}`;

  let status = "";
  if (hora.laboral) {
    status = "laboral";
  } else if (hora.sabatino) {
    status = "sabatino";
  } else if (hora.dominguero) {
    status = "dominguero";
  }

  return `${horaInicioString} - ${horaFinString} (${status})`;
};
