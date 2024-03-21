import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if(req.method === 'GET'){
    const tasks = await prisma.usuarios.findMany();
    res.json(tasks);
  }  
}