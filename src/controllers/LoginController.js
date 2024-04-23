import axios from "axios";


export const iniciarSesion = async (datos) => {
    console.log("Datos de inicio de sesión:", datos);
    const { email, password } = datos;

    if (email.length === 0 && password.length === 0) {
        return "Malo ting ling";
    } else {
        try {
            const usuarios = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/usuarios`);

            if (usuarios.data.length === 0) {
                return "No hay usuarios registrados";
            }
            const usuarioEncontrado = usuarios.data.find(usuario => usuario.email === email);

            if (!usuarioEncontrado) {
                return "Usuario no encontrado";
            }

            if (usuarioEncontrado.password === password) {
                localStorage.setItem("token", JSON.stringify(usuarioEncontrado))
                return usuarioEncontrado;
            } else {
                return "Contraseña incorrecta";
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
            return "Error al iniciar sesión";
        }
    }
};