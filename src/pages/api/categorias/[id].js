import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler() {
    const {id}= req.query
    if(req.method === 'GET'){
        const categoria = await prisma.categorias.findUnique({
            where: {
                id_categoria: Number(id)
            }
        })
        if(!categoria){
            return res.json({mensaje: "No se ha encontrado la categoria"})
        }
        res.json(categoria)

    } else if (req.method === 'PUT') {
        try {
            const categoria = await prisma.categorias.update({
                where: {id_categoria: Number(id)},
                data: req.body
            })
            res.json({data: categoria, mensaje: "categoria actualizada correctamente"})
        } catch (error) {
            res.json({mensaje: "categoria no encontrada"})
        }
    } else if (req.method === 'DELETE'){
        try {
            const categoria = await prisma.categorias.delete({
                where: {
                    id_categoria: Number(id)
                }
            })
            res.json({data: categoria, mensaje: "categoria eliminada correctamente"})
        } catch (error) {
            res.json({mensaje: "categoria no encontrada"})
        }
    }
}