import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res){
     
      if(req.method === 'GET'){
            const usuarios = await prisma.usuarios.findMany();
            if(usuarios.isEmpty){
                return res.send('No hay Usuarios registrados')      
            }
            res.json(usuarios);    
        } else if (req.method === 'POST'){
            const usuarios = await prisma.usuarios.create({data: req.body})
            res.send(`usuario creado`)
        }
}