import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export default async function handler(req, res){
    const {id}= req.query
    if(req.method === 'GET'){
        const usuario = await prisma.usuarios.findUnique({
            where: {
                id_usuario: Number(id)
            }
        })
        if(!usuario){
            return res.json({mensaje: "No se ha encontrado usuario"})
        }
        res.json(usuario)

    } else if (req.method === 'PUT') {
        try {
            const usuario = await prisma.usuarios.update({
                where: {id_usuario: Number(id)},
                data: req.body
            })
            res.json({data: usuario, mensaje: "usuario actualizado correctamente"})
        } catch (error) {
            res.json({mensaje: "usuario no encontrado"})
        }
    } else if (req.method === 'DELETE'){
        try {
            const usuario = await prisma.usuarios.delete({
                where: {
                    id_usuario: Number(id)
                }
            })
            res.json({data: usuario, mensaje: "usuario eliminado correctamente"})
        } catch (error) {
            res.json({mensaje: "usuario no encontrado"})
        }
    }
}