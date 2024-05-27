"use server";
import axios from "axios";
import { cookies } from "next/headers";

export const iniciarSesion = async (datos) => {
  const { email, password } = datos;

  if (email.length === 0 && password.length === 0) {
    return "Llena todos los campos";
  } else {
    try {
      let usuarios = [];
      console.log(usuarios)
      usuarios = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/usuarios`
      );
      console.log(usuarios.data)

      if (typeof usuarios.data === "string") {
        return "No hay usuarios registrados";
      }
      const usuarioEncontrado = usuarios.data.find(
        (usuario) => usuario.email === email
      );

      if (!usuarioEncontrado) {
        return "Usuario no encontrado";
      }

      if (usuarioEncontrado.password === password) {
        cookies().set("token", JSON.stringify(usuarioEncontrado));
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
