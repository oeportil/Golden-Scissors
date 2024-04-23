import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  const { cat } = req.query;
  if (req.method === "GET") {
    const servicios = await prisma.servicios.findMany({
      where: {
        id_categoria: {
          equals: Number(cat),
        },
      },
    });
    if (!servicios) {
      return res.json({ mensaje: "Categoría incorrecta" });
    }
    res.json(servicios);
  }
}
