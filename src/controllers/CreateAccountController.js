import axios from "axios";

export async function createUser(newUser) {
  try {
    const datosUser = {
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      admin: newUser.admin,
      email: newUser.email,
      telefono: newUser.telefono,
      genero: newUser.genero,
      fechaNac: newUser.fechaNac,
      password: newUser.password,
    };

    // Crear un objeto FormData para enviar la imagen
    const formData = new FormData();
    formData.append("imagen", newUser.imagen); // Agregar la imagen al FormData
    formData.append("nombrid", "0"); // También puedes agregar otros campos si es necesario

    // Realizar la solicitud POST para crear el usuario
    const result1 = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/usuarios`,
      datosUser
    );

    // Realizar la solicitud POST para enviar la imagen
    const result2 = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/images/1`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", // Indicar que es un formulario multipart
        },
      }
    );

    console.log(result1.data);
    console.log(result2.data);

    return result1.data;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
}
