import prisma from "@/utils/prismaClient";
import fs from "fs";
import { writeFile } from "fs/promises";
import { readdirSync, statSync, unlinkSync } from "fs";
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
            archivo.toLowerCase() == identity + ".jpg" ||
            archivo.toLowerCase() == identity + ".png" ||
            archivo.toLowerCase() == identity + ".gif" ||
            archivo.toLowerCase() == identity + ".jpeg" ||
            archivo.toLowerCase() == identity + ".svg"
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
  } else if (req.method === "POST") {
    let { tipo, identity } = req.body;
    console.log(req.body);
    tipo = tipo.toString();
    identity = identity.toString();

    let tipoarchivo;
    let validador = 0;
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
    let ruta = path.join(process.cwd(), "public", tipoarchivo);
    const archivos = readdirSync(ruta);
    console.log(ruta);
    for (const archivo of archivos) {
      const rutaArchivo = path.join(ruta, archivo);

      if (statSync(rutaArchivo).isFile()) {
        //const probarextent = path.name(rutaArchivo);
        if (
          archivo.toLowerCase() == identity + ".jpg" ||
          archivo.toLowerCase() == identity + ".png" ||
          archivo.toLowerCase() == identity + ".gif" ||
          archivo.toLowerCase() == identity + ".jpeg" ||
          archivo.toLowerCase() == identity + ".svg"
        ) {
          unlinkSync(rutaArchivo);
        }
      }
    }
    for (const archivo of archivos) {
      const rutaArchivo = path.join(ruta, archivo);
      if (statSync(rutaArchivo).isFile()) {
        if (
          archivo.toLowerCase() == identity + ".jpg" ||
          archivo.toLowerCase() == identity + ".png" ||
          archivo.toLowerCase() == identity + ".gif" ||
          archivo.toLowerCase() == identity + ".jpeg" ||
          archivo.toLowerCase() == identity + ".svg"
        ) {
          validador++;
        }
      }
    }
    if (validador == 0) {
      res.json("Se ha eliminado el archivo correctamente");
    } else {
      res.json("Hubo un error al eliminar el archivo");
    }
  }
}
