import prisma from "@/utils/prismaClient";

export default async function handler(req, res){
    const { id } = req.query;
    if(req.method === "PATCH"){
        console.log(req.body)
        res.send(req.body)
         try {
             const empleado = await prisma.empleados.update({
               where:{
                 id_empleado: Number(id)
                
               },
               data: req.body
             })
             res.json(req.body)
           } catch (error) {
             res.json({mensaje: "error"})
             console.log(error)
           }
    }
}