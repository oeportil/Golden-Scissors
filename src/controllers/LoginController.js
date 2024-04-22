import axios from "axios";

export const iniciarSesion = async(datos) =>{
    console.log("Datos de inicio de sesión:", datos);
    const {email, password} = datos; 
    if(email.lenght == 0 && password.lenght == 0){
        return "Malo ting ling"
    } else {
        //Toda la logica
        const usuarios = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`)
        
    }
}