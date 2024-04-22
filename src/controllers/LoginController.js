import axios from "axios";

export const iniciarSesion = async(datos) =>{
    console.log("Datos de inicio de sesión:", datos);
    const {email, password} = datos; 
    if(email.lenght == 0 && password.lenght == 0){
        return "Malo ting ling"
    } else {
        //Toda la logica
        const usuarios = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`)
       console.log(usuarios.data)
       if(typeof usuarios.data !== "string"){
            usuarios.data.map( usuario => {
                if(usuario.email === email){
                    if(usuario.password === password){
                        const {admin, nombre, apellido, email: userEmail} = usuarios.data
                        
                    } else return "Usuario encontrado pero contraseña incorrecta"                    
                } else return "usario no encontrado"                
            });
       } else return usuarios.data
       
    }
}