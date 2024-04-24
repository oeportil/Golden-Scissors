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
    console.log(datosUser.nombre);
    const imagedata = {
      imagen: newUser.imagen,
      nombrid: "0",
    };

    const result1 = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/usuarios`,
      datosUser
    );
    const result2 = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/images/1`,
      imagedata
    );
    console.log(result1.data);
    console.log(result2.data);
    return result1.data;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
}
