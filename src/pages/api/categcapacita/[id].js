import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const categoria = await prisma.cateCapacitadas.findMany({
      where: {
        id_empleado: Number(id),
      },
    });
    if (!categoria) {
      return res.json({ mensaje: "No se ha encontrado la categoria" });
    }
    res.json(categoria);
  } else if (req.method === "PATCH") {
    try {
      //primero borramos todas las actuales
      const categoriaborrar = await prisma.cateCapacitadas.deleteMany({
        where: {
          id_empleado: Number(id),
        },
      });
      const selecto = req.body;
      let id_categ;
      for (let i = 0; i < selecto.length; i++) {
        id_categ = selecto[i].id_categoria;
        const createCateg = await prisma.cateCapacitadas.create({
          data: {
            id_categ,
            id_empleado: +id,
          },
        });
      }
      res.json({
        mensaje: "categorias actualizadas correctamente",
      });
    } catch (error) {
      res.json({ mensaje: "categoria no encontrada" });
      console.log(error);
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
