import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler() {
    const {id}= req.query
    if(req.method === 'GET'){
        const servicios = await prisma.servicios.findUnique({
            where: {
                id_servicio: Number(id)
            }
        })
        if(!servicios){
            return res.json({mensaje: "No se ha encontrado el servicio"})
        }
        res.json(servicios)

    } else if (req.method === 'PUT') {
        try {
            const servicios = await prisma.servicios.update({
                where: {id_servicio: Number(id)},
                data: req.body
            })
            res.json({data: servicios, mensaje: "servicio actualizado correctamente"})
        } catch (error) {
            res.json({mensaje: "servicios no encontrada"})
        }
    } else if (req.method === 'DELETE'){
        try {
            const servicios = await prisma.servicios.delete({
                where: {
                    id_servicio: Number(id)
                }
            })
            res.json({data: servicios, mensaje: "servicio eliminado correctamente"})
        } catch (error) {
            res.json({mensaje: "servicio no encontrado"})
        }
    }
}