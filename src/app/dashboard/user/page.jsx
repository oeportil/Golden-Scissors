"use client"
import React from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { formatDate } from "@/utils/helpers";
import Link from "next/link";

const Page = () => {
  const [cook, setCook] = useState({});
  const [route, setRoute] = useState("");

  const user = getCookie("token");
  useEffect(() => {
    const cokie = () => {
      if (user !== undefined) {
        setCook(JSON.parse(user));
      }
    };
    cokie();
  }, [user]);

  useEffect(() => {
    async function obtenerRuta() {
      const tipo = "1";
      const identity = cook.id_usuario.toString();
      console.log(identity);
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
        // Transformar la ruta absoluta en una ruta relativa dentro del contexto de la aplicación Next.js
        console.log(rutacam);

        setRoute(require("@/../../public/usuarios/" + rutacam));
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
      }
    }
    if (Object.keys(cook).length !== 0) {
      obtenerRuta();
    }
  }, [cook]);


  return (
    <div className="flex flex-col items-center mb-4">
      <section className="parte1 container grid justify-center w-full">
        <div className="p1 md:flex p-10 grid gap-4">
          <div className="md:w-7/12 row-start-2">
            <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-10">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {cook.nombre + " " + cook.apellido}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {formatDate(cook.fechaNac)}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {cook.genero ? "Masculino" : "Femenino"}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {cook.telefono}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {cook.email}
              </p>
            </div>
          </div>

          <div className=" flex flex-col gap-2 justify-center items-center">
            <div className="rounded-full">
              <Image src={route} width={200} height={200} alt="Foto de perfil" className="rounded-full w-full h-full" />
            </div>

            <Link href={"user/editar"} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Editar
            </Link>
          </div>
        </div>
      </section>
      <section className="tabla container">
        <div className="p-10 relative overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  N° Res.
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  Agenda
                </th>
                <th scope="col" className="px-6 py-3">
                  Atendido por
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  12343
                </th>
                <td className="px-6 py-4">20/05/2024 1:50 p.m</td>
                <td className="px-6 py-4">
                  Corte de pelo, Corte de barba Estilo de cejas
                </td>
                <td className="px-6 py-4">Sin atender</td>
                <td className="px-6 py-4">$30.00</td>
                <td className="px-6 py-4">
                  <FontAwesomeIcon icon={["fas", "print"]} />
                </td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  --
                </th>
                <td className="px-6 py-4">--/--/--</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">
                  <FontAwesomeIcon icon={["fas", "print"]} />
                </td>
              </tr>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  --
                </th>
                <td className="px-6 py-4">--/--/--</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">--</td>
                <td className="px-6 py-4">
                  <FontAwesomeIcon icon={["fas", "print"]} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <Link className="bg-ligthbrown gold py-2 px-8 font-semibold rounded-full hover:bg-yellow-500 hover:text-amber-950"  href={"user/reservar"}>
          Reservar
      </Link>
    </div>
  )
}

export default Page
