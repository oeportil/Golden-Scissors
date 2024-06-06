import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const cita = await prisma.citas.findUnique({
      where: {
        id_cita: Number(id),
      },
    });
    if (!cita) {
      return res.json({ mensaje: "No se ha encontrado la cita" });
    }
    res.json(cita);
  } else if (req.method === "PUT") {
    try {
      const cita = await prisma.citas.update({
        where: { id_cita: Number(id) },
        data: req.body,
      });
      res.json({ data: cita, mensaje: "cita actualizada correctamente" });
    } catch (error) {
      res.json({ mensaje: "cita no encontrada" });
    }
  } else if (req.method === "DELETE") {
    try {
      const detacitas = await prisma.detalleCita.deleteMany({
        where: {
          id_cita: Number(id),
        },
      });
      const cita = await prisma.citas.delete({
        where: {
          id_cita: Number(id),
        },
      });
      res.json({
        data: cita,
        datadeta: detacitas,
        mensaje: "cita eliminada correctamente",
      });
    } catch (error) {
      res.json({ mensaje: "cita no encontrada" });
    }
  }
}
