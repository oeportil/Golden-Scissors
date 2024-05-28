import prisma from "@/utils/prismaClient";

export default async function handler(req, res){
    if (req.method === "GET"){
        const empleados = await prisma.empleados.findMany({
            where: {
                contratado: true
            },
            include: {
                cateCapacitadas: {
                    include: {
                        categoria: true
                    }
                }
            },
            
        })
        if (empleados.isEmpty) {
          return res.send("No hay detallecitas aun");
        }
        res.json(empleados);
    }
}