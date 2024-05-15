import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const categcapacita = await prisma.cateCapacitadas.findMany();
    if (categcapacita.isEmpty) {
      return res.send("No hay categorias capacitadas que mostrar");
    }
    res.json(categcapacita);
  } else if (req.method === "POST") {
    const selecto = req.body;
    try {
      let idusu = await prisma.empleados.findFirst({
        orderBy: {
          id_empleado: "desc",
        },
      });
      idusu = idusu.id_empleado;
      let id_categ;
      for (let i = 0; i < selecto.length; i++) {
        id_categ = selecto[i].id_categoria;
        const createCateg = await prisma.cateCapacitadas.create({
          data: {
            id_categ,
            id_empleado: idusu,
          },
        });
      }
      res.json("Categorias creadas con éxito");
    } catch (error) {
      console.log(error);
      console.log(selecto);
    }
  }
}
