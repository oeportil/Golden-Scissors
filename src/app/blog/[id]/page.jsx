"use client";
import { getBlogById } from "@/controllers/BlogController";
import { useState, useEffect } from "react";
import { formatDate } from "@/utils/helpers";
import Image from "next/image";

const page = ({ params }) => {
  const [entrada, setEntrada] = useState({});
  const [ruta, setRuta] = useState("");
  useEffect(() => {
    const datos = async () => {
      try {
        const datos = await getBlogById(params.id);
        setEntrada(datos);
        //Colocando la imagen del update
        const tipo = "2";
        const identity = params.id;
        const respuesta = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tipo: tipo,
              identity: identity,
            }),
          }
        );

        if (!respuesta.ok) {
          throw new Error("Error al obtener la ruta");
        }

        const rutaRelativa = await respuesta.text(); // Obtener la ruta absoluta como texto
        const rutacam = rutaRelativa.replace(/['"]+/g, "");
        // Transformar la ruta absoluta en una ruta relativa dentro del contexto de la aplicación Next.js

        setRuta(require("@/../public/blog/" + rutacam));
      } catch (error) {
        console.log(error);
      }
    };
    if (entrada) {
      datos();
    }
  }, [params.id]);

  const { titulo, contenido, fechaMod } = entrada;
  if (titulo === undefined) {
    return (
      <div className="flex justify-center my-8">
        <div className="loader "></div>
      </div>
    );
  }
  return (
    <div>
      <h2 className="brown text-center text-3xl font-bold mb-7 mt-4">
        {titulo}
      </h2>
      <div className="flex justify-center">
        {ruta && <Image width={400} height={400} src={ruta} />}
      </div>

      <div className="flex flex-col items-center my-4">
        <div className="md:w-9/12 w-9/12">
          <p className="text-slate-500">{formatDate(fechaMod)}</p>
          <div className="separacion">
            <p className="text-justify mt-2">{contenido}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
