import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function handler(req, res){
    if(req.method === 'GET'){
        const horarios = await prisma.horarioEmpleado.findMany();        
        if(horarios.isEmpty){
            return res.send('No hay horarios que mostrar')      
        }
        res.json(horarios);
    } else if(req.method === 'POST'){
        const  horario = await prisma.horarioEmpleado.create({data: req.body});
        res.json(horario)
    }
}