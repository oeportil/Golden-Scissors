import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

export default async function handler(req, res){
    if(req.method === 'GET'){
        const categorias = await prisma.categorias.findMany();        
        if(categorias.isEmpty){
            return res.send('No hay categorias que mostrar')      
        }
        res.json(categorias);
    } else if(req.method === 'POST'){
        const  createCateg = await prisma.categorias.create({data: req.body});
        res.json(createCateg)
    }
}