import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res){
    if(req.method === 'GET'){
        const servicios = await prisma.servicios.findMany()
        if(servicios.isEmpty){
            return res.send('No hay servicios aun')      
        }
        res.json(servicios);
    } else if (req.method === 'POST') {
        try {
            const servicios = await prisma.servicios.create() 
        } catch (error) {
            console.log("error inesperado")
        }
    }
}