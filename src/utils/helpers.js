

export const formatDate = fecha =>{
    const nuevaFecha = new Date(fecha)
    const nueva = nuevaFecha.toLocaleDateString('es-Es', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).toString()
    return nueva
}

export const prismaFecha = fecha =>{
    const nuevaFecha = new Date(fecha)
    const nueva = nuevaFecha.toISOString()
    return nueva.toString();
}

export const Hora = (hora) => {
    const horaInicio = new Date(hora.hora_inicio);
    const horaFin = new Date(hora.hora_fin);
  
    const horaInicioString = `${String(horaInicio.getHours()).padStart(2, '0')}:${String(horaInicio.getMinutes()).padStart(2, '0')}`;
    const horaFinString = `${String(horaFin.getHours()).padStart(2, '0')}:${String(horaFin.getMinutes()).padStart(2, '0')}`;
  
    let status = '';
    if (hora.laboral) {
      status = 'laboral';
    } else if (hora.sabatino) {
      status = 'sabatino';
    } else if (hora.dominguero) {
      status = 'dominguero';
    }
  
    return `${horaInicioString} - ${horaFinString} (${status})`;
  };
  