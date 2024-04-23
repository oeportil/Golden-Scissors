import prisma from "@/utils/prismaClient";

export default async function handler(req, res) {
  const { cat } = req.query;
  if (req.method === "GET") {
    const blog = await prisma.blog.findUnique({
      where: {
        id_: Number(id),
      },
    });
    if (!blog) {
      return res.json({ mensaje: "Id Incorrecto" });
    }
    res.json(blog);
  }
}
