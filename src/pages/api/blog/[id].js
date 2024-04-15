import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const blog = await prisma.blog.findUnique({
      where: {
        id_blog: Number(id),
      },
    });
    if (!blog) {
      return res.json({ mensaje: "Id Incorrecto" });
    }
    res.json(blog);
  } else if (req.method === "PATCH") {
    const fechaMod = new Date();
    const { titulo, contenido } = req.body;

    try {
      const blog = await prisma.blog.update({
        where: {
          id_blog: Number(id),
        },
        data: {
          titulo,
          contenido,
          fechaMod,
        },
      });
      res.json({ mensaje: "Blog Actualizado" });
    } catch (error) {
      console.log(error);
      res.json({ mensjae: "Id erroneo" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.blog.delete({
        where: {
          id_blog: Number(id),
        },
      });
      res.json({ mensaje: "Entrada de Blog eliminada con exito" });
    } catch (error) {
      res.json({ mensaje: "Id Erroneo" });
    }
  }
}
