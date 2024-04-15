import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const categoria = await prisma.cateCapacitadas.findUnique({
      where: {
        id_categorias: Number(id),
      },
    });
    if (!categoria) {
      return res.json({ mensaje: "No se ha encontrado la categoria" });
    }
    res.json(categoria);
  } else if (req.method === "PUT") {
    try {
      const categoria = await prisma.cateCapacitadas.update({
        where: { id_categorias: Number(id) },
        data: req.body,
      });
      res.json({
        data: categoria,
        mensaje: "categoria actualizada correctamente",
      });
    } catch (error) {
      res.json({ mensaje: "categoria no encontrada" });
    }
  } else if (req.method === "DELETE") {
    try {
      const categoria = await prisma.cateCapacitadas.delete({
        where: {
          id_categorias: Number(id),
        },
      });
      res.json({
        data: categoria,
        mensaje: "categoria eliminada correctamente",
      });
    } catch (error) {
      res.json({ mensaje: "categoria no encontrada" });
    }
  }
}
