import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const detallecitas = await prisma.detalleCita.findMany();
    if (detallecitas.isEmpty) {
      return res.send("No hay detallecitas aun");
    }
    res.json(detallecitas);
  } else if (req.method === "POST") {
    try {
      const detallecitas = await prisma.detalleCita.create({ data: req.body });
      res.json({ detallecitas });
    } catch (error) {
      console.log(error);
    }
  }
}
