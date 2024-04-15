import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const blogs = await prisma.blog.findMany();
    if (blogs.isEmpty) {
      return res.send("No hay blogs que mostrar");
    }
    res.json(blogs);
  } else if (req.method === "POST") {
    const { titulo, contenido } = req.body;
    const fechaCrea = new Date();
    try {
      const blog = await prisma.blog.create({
        data: {
          titulo,
          contenido,
          fechaCrea,
          fechaMod: fechaCrea,
        },
      });
      res.json({ data: blog, message: "Entrada de Blog Creada con exito" });
    } catch (error) {
      console.log(error);
    }
  }
}
