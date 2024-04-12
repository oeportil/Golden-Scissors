import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req, res){
    const {id}= req.query
    if(req.method === 'GET'){
        const detallecita = await prisma.detalleCita.findUnique({
            where: {
                id_detalleCita: Number(id)
            }
        })
        if(!detallecita){
            return res.json({mensaje: "No se ha encontrado detallecita"})
        }
        res.json(detallecita)

    } else if (req.method === 'PUT') {
        try {
            const detallecita = await prisma.detalleCita.update({
                where: {id_detalleCita: Number(id)},
                data: req.body
            })
            res.json({data: detallecita, mensaje: "detallecita actualizado correctamente"})
        } catch (error) {
            res.json({mensaje: "detallecita no encontrado"})
        }
    } else if (req.method === 'DELETE'){
        try {
            const detallecita = await prisma.detalleCita.delete({
                where: {
                    id_detalleCita: Number(id)
                }
            })
            res.json({data: detallecita, mensaje: "detallecita eliminado correctamente"})
        } catch (error) {
            res.json({mensaje: "detallecita no encontrado"})
        }
    }
}