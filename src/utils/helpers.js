

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