import prisma from "@/utils/prismaClient";
import { writeFile } from "fs/promises";
import path from "path";
//Si el id es 1, es de usuario
//Si el id es 2, es de blog
//Si el id es 3, es de servicios
//Si el id es 4, es de empleado

//En el body se tiene que enviar una imagen y un int, si el int es 0, tomará el ultimo valor, sino, tomará ese int
export default async function handler(req, res) {
  const { id } = req.query; //Usado para seleccion de archivo
  let filetype;
  let idusu = 0; //Generado para poder nombrar el archivo segun el id
  const { imagen, nombrid } = req.body;
  let extension = null;
  try {
    //Obtención de folder y id ultima, si se eligio 0 en nombrid
    switch (id) {
      case "1":
        idusu = await prisma.usuarios.findFirst({
          orderBy: {
            id_usuario: "desc",
          },
        });
        idusu = idusu.id_usuario;
        filetype = "usuarios";
        break;
      case "2":
        idusu = await prisma.blog.findFirst({
          orderBy: {
            id_blog: "desc",
          },
        });
        idusu = idusu.id_blog;
        filetype = "blog";
        break;
      case "3":
        idusu = await prisma.servicios.findFirst({
          orderBy: {
            id_servicio: "desc",
          },
        });
        idusu = idusu.id_servicio;
        filetype = "servicios";
        break;
      case "4":
        idusu = await prisma.empleados.findFirst({
          orderBy: {
            id_empleado: "desc",
          },
        });
        idusu = idusu.id_empleado;
        filetype = "empleados";
        break;
      default:
        filetype = "def";
        break;
    }
    //Override de nombrid
    if (nombrid !== "0") {
      idusu = nombrid;
    }
    //Obtencion de la img
    const fileName = imagen.name;

    //Gen de la extension
    if (fileName.endsWith(".jpg")) {
      extension = ".jpg";
    } else if (fileName.endsWith(".png")) {
      extension = ".png";
    } else if (fileName.endsWith(".gif")) {
      extension = ".gif";
    }
    //Separacion de errores
    if (fileName == null) {
      res.json({ mensaje: "Formato inadecuado" });
    } else {
      //subida de data
      const bytes = await imagen.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = path.join(
        process.cwd(),
        "public",
        filetype,
        idusu + extension
      );

      writeFile(filePath, buffer);
      res.json({ mensaje: "El archivo se creo correctamente" });
    }
  } catch (e) {
    console.log(e);
    res.json({ mensaje: "Ocurrió un error entre la generación de imgs" });
  }
}
