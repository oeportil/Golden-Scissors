import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function handler(req, res){
    if(req.method === 'GET'){
        const categcapacita = await prisma.cateCapacitadas.findMany();        
        if(categcapacita.isEmpty){
            return res.send('No hay categorias capacitadas que mostrar')      
        }
        res.json(categcapacita);
    } else if(req.method === 'POST'){
        const  createCateg = await prisma.cateCapacitadas.create({data: req.body});
        res.json(createCateg)
    }
}