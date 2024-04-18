import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const usuarios = await prisma.usuarios.findMany();
    if (usuarios.length === 0) {
      return res.send("No hay Usuarios registrados");
    }
    res.json(usuarios);
  } else if (req.method === "POST") {
    const {
      nombre,
      apellido,
      admin,
      email,
      telefono,
      genero,
      fechaNac,
      password,
    } = req.body;
    try {
      // Verificar si el correo electrónico ya está registrado
      // const existingUser = await prisma.usuarios.findUnique({
      //   where: {
      //     email: email,
      //   },
      // });

      // if (existingUser) {
      //   return res.status(400).send("El correo electrónico ya está registrado");
      // }

      // Crear el nuevo usuario si el correo no está registrado previamente
      const newUser = await prisma.usuarios.create({
        data: {
          nombre,
          apellido,
          admin,
          email,
          telefono,
          genero,
          fechaNac,
          password,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
      res
        .status(500)
        .send("Error interno del servidor al crear el usuario" + error.message);
    }
  }
}
