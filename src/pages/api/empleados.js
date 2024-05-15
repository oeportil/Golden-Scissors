import prisma from "@/utils/prismaClient";

export default async function handle(req, res) {
  if (req.method === "GET") {
    const empleado = await prisma.empleados.findMany();
    if (empleado.isEmpty) {
      res.json({ mensaje: "No existen empleados aun" });
    }
    res.json(empleado);
  } else if (req.method === "POST") {
    try {
      const empleado = await prisma.empleados.create({
        data: req.body,
      });
      res.json(empleado);
    } catch (error) {
      res.json({ mensaje: "Ocurrio un Error" });
      console.log(error);
    }
  }
}
