import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    const empleado = await prisma.empleados.findUnique({
      where: {
        id_empleado: Number(id),
      }
    });

    if (!empleado) {
      return res.json({ mensaje: "No se ha encontrado el empleado" });
    }
    res.json(empleado);
  } else if (req.method === "PUT") {
    try {
      const empleado = await prisma.empleados.update({
        where: { id_empleado: Number(id) },
        data: req.body,
      });
      res.json({
        data: empleado,
        mensaje: "empleado actualizado correctamente",
      });
    } catch (error) {
      res.json({ mensaje: "empleado no encontrado" });
      console.log(error)
    }
  } else if (req.method === "DELETE") {
    try {
      const empleado = await prisma.empleados.delete({
        where: {
          id_empleado: Number(id),
        },
      });
      res.json({ data: empleado, mensaje: "empleado eliminado correctamente" });
    } catch (error) {
      res.json({ mensaje: "empleado no encontrado" });
    }
  } else if(req.method === "PATCH"){
    const {contratado} = req.body;
    try {
      const empleado = await prisma.empleados.update({
        where:{
          id_empleado: Number(id)
          
        },
        data: {
          contratado
        }
      })
      res.json({empleado})
    } catch (error) {
      res.json({mensaje: "error"})
      console.log(error)
    }
  }
}
