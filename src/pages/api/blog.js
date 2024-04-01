import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if(req.method === 'GET'){
    const blogs = await prisma.blog.findMany();
    res.json(blogs);
  }  
}