import Image from "next/image";
import { useEffect, useState } from "react";

const Servicio = ({ corte }) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    async function obtenerRuta() {
      const tipo = "3";
      const identity = corte.id_servicio;

      try {
        const respuesta = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images/1`,
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
        console.log(rutacam);

        setRoute(require("@/../public/servicios/" + rutacam));
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
      }
    }

    obtenerRuta();
  }, []);

  return (
    <div className="bg-black w-1/3 rounded-md">
      <Image
        width={500}
        height={100}
        src={route}
        alt={`imagen del corte ${corte.nombre}`}
        className="w-full h-72"
      />
      <h3 className="text-white text-center text-xl">{corte.nombre}</h3>
      <div className="flex justify-between">
        <h3 className="text-white text-center text-xl p-2">
          Duración: {corte.duracion} min.
        </h3>
        <h3 className="text-white text-center text-xl p-2">${corte.precio}</h3>
      </div>
    </div>
  );
};

export default Servicio;
