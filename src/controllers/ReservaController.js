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

export async function getCitasAdmin(){
    try {
        const reserva = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obtenercitasdash`)
        return reserva.data
    } catch (error) {
        return error
    }
}

export async function getSearchReserv(busque = ''){
    try {
        const reserva = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/obtenercitas?busqueda=${busque}`)
        return reserva.data
    } catch (error) {
        return error
    }
}

export async function deleteCita(id){
    try {
        const delCita = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/citas/${id}`)
        return delCita
    } catch (error) {
        return error
    }
}