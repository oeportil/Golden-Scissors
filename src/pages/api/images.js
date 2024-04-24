import prisma from "@/utils/prismaClient";
import fs from "fs";
import { writeFile } from "fs/promises";
import { readdirSync, statSync } from "fs";
import path from "path";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      //Obtener la ruta del archivo
      let { tipo, identity } = req.body;
      console.log(req.body);
      tipo = tipo.toString();
      identity = identity.toString();

      let tipoarchivo;
      let extent = null;
      switch (tipo) {
        case "1":
          tipoarchivo = "usuarios";
          break;
        case "2":
          tipoarchivo = "blog";
          break;
        case "3":
          tipoarchivo = "servicios";
          break;
        case "4":
          tipoarchivo = "empleados";
          break;
      }
      console.log(tipoarchivo);
      let ruta = path.join(process.cwd(), "public", tipoarchivo);
      const archivos = readdirSync(ruta);
      console.log(ruta);
      for (const archivo of archivos) {
        const rutaArchivo = path.join(ruta, archivo);

        if (statSync(rutaArchivo).isFile()) {
          //const probarextent = path.name(rutaArchivo);
          if (
            archivo == identity + ".jpg" ||
            archivo == identity + ".png" ||
            archivo == identity + ".gif" ||
            archivo == identity + ".jpeg" ||
            archivo == identity + ".svg"
          ) {
            extent = archivo;
          }
        }
      }
      if (extent != null) {
        ruta = extent;
        res.json(ruta);
      } else {
        res.json("def.jpg");
      }
    } catch {
      res.json(req.body);
    }
  }
}