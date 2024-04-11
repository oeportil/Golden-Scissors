import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler() {
    const {id}= req.query
    if(req.method === 'GET'){
        const horario = await prisma.horarioEmpleado.findUnique({
            where: {
                id_horarioEmpleado: Number(id)
            }
        })
        if(!horario){
            return res.json({mensaje: "No se ha encontrado el horario"})
        }
        res.json(horario)

    } else if (req.method === 'PUT') {
        try {
            const horario = await prisma.horarioEmpleado.update({
                where: {id_horarioEmpleado: Number(id)},
                data: req.body
            })
            res.json({data: horario, mensaje: "horario actualizado correctamente"})
        } catch (error) {
            res.json({mensaje: "horario no encontrado"})
        }
    } else if (req.method === 'DELETE'){
        try {
            const horario = await prisma.horarioEmpleado.delete({
                where: {
                    id_horarioEmpleado: Number(id)
                }
            })
            res.json({data: horario, mensaje: "horario eliminado correctamente"})
        } catch (error) {
            res.json({mensaje: "horario no encontrado"})
        }
    }
}