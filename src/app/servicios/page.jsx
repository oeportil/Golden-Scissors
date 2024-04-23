"use client";
import usePeluqueria from "@/hooks/usePeluqueria";
import Servicio from "../components/Servicio";
import { useState } from "react";

const Page = () => {
  const { services } = usePeluqueria();
  const filtrarPorCategoria = (categoria) => {
    return services.filter((servicio) => servicio.id_categoria === categoria);
  };

  const tradicional = filtrarPorCategoria(1);
  const especial = filtrarPorCategoria(2);
  const barba = filtrarPorCategoria(3);
  const delineado = filtrarPorCategoria(4);
  const tintado = filtrarPorCategoria(5);
  const ajustes = filtrarPorCategoria(6);

  return (
    <>
      <h1
        className="text-4xl font-bold text-center"
        style={{ color: "#3E1814" }}
      >
        Nuestros Servicios
      </h1>
      <main className="grid md:grid-cols-2">
        <section>
          <div className="mb-5">
            <h2 className="uppercase font-bold text-2xl text-center">
              Cortes de pelo tradicionales
            </h2>
            <div className="flex gap-2 justify-center">
              {tradicional.map((corte) => (
                <Servicio key={corte.id_servicio} corte={corte} />
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h2 className="uppercase font-bold text-2xl text-center">
              Cortes de barba
            </h2>
            <div className="flex gap-2 justify-center">
              {barba.map((corte) => (
                <Servicio key={corte.id_servicio} corte={corte} />
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h2 className="uppercase font-bold text-2xl text-center">
              Tintado
            </h2>
            <div className="flex gap-2 justify-center">
              {tintado.map((corte) => (
                <Servicio key={corte.id_servicio} corte={corte} />
              ))}
            </div>
          </div>
        </section>
        <section className="">
          <div className="mb-5">
            <h2 className="uppercase font-bold text-2xl text-center">
              Cortes de pelo Especiales
            </h2>
            <div className="flex gap-2 justify-center">
              {especial.map((corte) => (
                <Servicio key={corte.id_servicio} corte={corte} />
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h2 className="uppercase font-bold text-2xl text-center">
              Delineados
            </h2>
            <div className="flex gap-2 justify-center">
              {delineado.map((corte) => (
                <Servicio key={corte.id_servicio} corte={corte} />
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h2 className="uppercase font-bold text-2xl text-center">
              ajustes
            </h2>
            <div className="flex gap-2 justify-center">
              {ajustes.map((corte) => (
                <Servicio key={corte.id_servicio} corte={corte} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
