import axios from "axios"


export async function getFechas(obj) {
    try {
        const fechas = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getdates`, obj);
        return fechas
    } catch (error) {
        return error.response
    }
}

export async function createReservacion(cita) {
    try {
        const fechas = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/citas`, cita);
        return fechas
    } catch (error) {
        return error.response
    }
}
