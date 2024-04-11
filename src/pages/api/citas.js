import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function handler(req, res){
    if(req.method === 'GET'){
        const citas = await prisma.citas.findMany();        
        if(citas.isEmpty){
            return res.send('No hay citas que mostrar')      
        }
        res.json(citas);
    } else if(req.method === 'POST'){
        try {
            const  cita = await prisma.citas.create({data: req.body});
             res.json(cita)
        } catch (error) {
            console.log(error.message)
        }
    }
}