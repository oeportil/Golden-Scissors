

export const formatDate = fecha =>{
    const nuevaFecha = new Date(fecha)
    const nueva = nuevaFecha.toLocaleDateString('es-Es', {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).toString()
    console.log(nueva)
    return nueva
}