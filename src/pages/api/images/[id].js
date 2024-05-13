import axios from "axios";
import prisma from "@/utils/prismaClient";
import fs from "fs";
import formidable from "formidable";
import { writeFile } from "fs/promises";
import { readdirSync, statSync } from "fs";
import path from "path";
//Si el id es 1, es de usuario
//Si el id es 2, es de blog
//Si el id es 3, es de servicios
//Si el id es 4, es de empleado
export const config = {
  api: {
    bodyParser: false, // Deshabilita el análisis automático del cuerpo de la solicitud
  },
};
//En el body se tiene que enviar una imagen y un int, si el int es 0, tomará el ultimo valor, sino, tomará ese int
export default async function handler(req, res) {
  if (req.method === "POST") {
    //Subir archivos
    const { id } = req.query; // Id para seleccionar el archivo

    const form = formidable();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        res.status(500).json({ mensaje: "Error al analizar el formulario" });
        return;
      }
      const { imagen } = files;
      const { nombrid } = fields;
      const nomID = nombrid[0];
      let filetype;
      let idusu = 0; //Generado para poder nombrar el archivo segun el id
      const form = formidable({});

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
        if (nomID !== "0") {
          idusu = nomID;
          //Intentamos eliminar archivos que nos puedan molestar
          try {
            const enviodelete = {
              tipo: id,
              identity: nomID,
            };
            const result = await axios.delete(
              `${process.env.NEXT_PUBLIC_API_URL}/images`,
              enviodelete
            );
            return result.data.mensaje;
          } catch (error) {
            console.log(error);
          }
        }
        //Obtencion de la img
        const pimagen = imagen[0];
        console.log(nomID);
        const fileName = pimagen.originalFilename.toLowerCase();

        //Gen de la extension
        if (fileName.endsWith(".jpg")) {
          extension = ".jpg";
        } else if (fileName.endsWith(".jpeg")) {
          extension = ".jpeg";
        } else if (fileName.endsWith(".png")) {
          extension = ".png";
        } else if (fileName.endsWith(".gif")) {
          extension = ".gif";
        } else if (fileName.endsWith(".svg")) {
          extension = ".svg";
        }
        //Separacion de errores
        if (extension == null) {
          res.json({ mensaje: "Formato inadecuado" });
        } else {
          //subida de data
          const bytes = await fs.promises.readFile(pimagen.filepath);
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
        res.json({
          mensaje: "Ocurrió un error entre la generación de imgs",
          error: req.body,
        });
      }
    });
  }
}
