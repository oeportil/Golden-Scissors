import Link from "next/link";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { deleteBlogByID } from "@/controllers/BlogController";

import ReactConfirmPopup from "react-confirm-popup";

const EntradasBlog = ({ entrada, isadmin, refresh }) => {
  const { titulo, contenido, id_blog } = entrada;
  const [route, setRoute] = useState("");

  const deleteBlog = (id) => {
    if (deleteBlogByID(id)) {
      refresh(id);
    }
  };

  useEffect(() => {
    async function obtenerRuta() {
      const tipo = "2";
      const identity = id_blog;

      try {
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
        console.log(rutacam);

        setRoute(require("@/../public/blog/" + rutacam));
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
      }
    }

    obtenerRuta();
  }, []);
  return (
    <section className="bg-white mt-4 p-4">
      <div>
        <Image
          className="w-full h-72"
          src={route}
          alt={`Imagen de blog numero ${id_blog}`}
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold">{titulo}</h3>
        <div className="pb-4">
          <p className="text-slate-600 line-clamp text-justify">
            {contenido.substring(0, 100) + "..."}
          </p>
        </div>
        <hr className="mb-2" />
        {isadmin ? (
          <div className="grid grid-cols-2 gap-1">
            <Link
              className="bg-black text-white rounded-full py-2 font-semibold my-auto"
              href={`dashboard/admin/blogadmin/${id_blog}`}
            >
              Editar
            </Link>
            <ReactConfirmPopup
              trigger={
                <button className="bg-gold text-white rounded-full py-2 font-semibold ">
                  Eliminar
                </button>
              }
              title="¿Estas Seguro que deseas eliminar esta entrada?"
              text={<div className="">Se borrara permanentemente</div>}
              confirmText="Eliminar"
              cancelText="Mantener"
              onConfirmClicked={() => deleteBlog(id_blog)}
            />
          </div>
        ) : (
          <Link className="text-slate-600 p-2" href={`/blog/${id_blog}`}>
            Ir a la entrada
          </Link>
        )}
      </div>
    </section>
  );
};

export default EntradasBlog;
