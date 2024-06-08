export const formatDate = (fecha = "") => {
  let nueva = ""
  if(fecha.length != 0 || fecha != undefined ){
    const nuevaFecha = new Date(fecha);
    nueva = nuevaFecha
      .toLocaleDateString("es-Es", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
      .toString();
  }
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

  // Formatear directamente sin reconversión
  const horaInicioString = horaInicio.toLocaleTimeString("es-MX", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const horaFinString = horaFin.toLocaleTimeString("es-MX", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

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

export const horaReserva = hora => {
  if(hora != undefined){
    const date = new Date(hora);
    date.setHours(date.getHours() + 6); 
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutesStr + ' ' + ampm;
  }
  return ""
}


//para reservacion calculo de fechas
export function calcularHoras(inicio, duracionMinutos) {
  const fechaInicio = new Date(inicio);
  const fechaFin = new Date(fechaInicio.getTime() + duracionMinutos * 60000); 


  fechaInicio.setHours(fechaInicio.getHours() + 6);
  fechaFin.setHours(fechaFin.getHours() + 6);

  const horaInicio = obtenerHora12Horas(fechaInicio);
  const horaFin = obtenerHora12Horas(fechaFin);

  return `${horaInicio} - ${horaFin}`;
}

function obtenerHora12Horas(fecha) {
  let horas = fecha.getHours();
  const minutos = fecha.getMinutes();
  const ampm = horas >= 12 ? 'PM' : 'AM';

  horas = horas % 12;
  horas = horas ? horas : 12; 

  return `${agregarCeros(horas)}:${agregarCeros(minutos)} ${ampm}`;
}

function agregarCeros(numero) {
  return (numero < 10 ? '0' : '') + numero;
}