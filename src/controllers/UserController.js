import axios from "axios";


export async function updateUserByID(id, body){
    const user = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/usuarios/${id}`, body)
    return user.data.mensaje
}

