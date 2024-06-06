import axios from "axios"


export async function getFechas(obj) {
    const fechas = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/getdates`, obj);
    return fechas
}