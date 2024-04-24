"use client";

import Image from "next/image";
import "../styles/principal.css";
import Link from "next/link";
import bar1 from "../img/barberia1.jpg";
import bar2 from "../img/barberia2.webp";
import InicioCards from "./components/InicioCards";
import service1 from "@/img/service1.png";
import service2 from "@/img/service2.png";
import service3 from "@/img/service3.png";
import service4 from "@/img/service4.png";
import service5 from "@/img/service5.png";

import { getBlog } from "@/controllers/BlogController";
import { useEffect, useState } from "react";
import EntradasBlog from "./components/EntradasBlog";

export default function Home() {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlog();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    if (blog.length === 0) {
      fetchData();
    }
  }, [blog]);

  return (
    <>
      <div className=" bg-blend-multiply bg-no-repeat bg-cover bg-center bg-[url(../img/Banner.jpg)] md:py-60 py-32 bg-gray-600">
        <div className=" flex items-center flex-col">
          <h1 className="md:w-2/4 text-center md:text-5xl text-3xl font-extrabold ">
            Marca tu estilo Nosotros lo haremos brillar
          </h1>
          <p className="md:w-2/4 text-center md:text-2xl text-xl font-bold goldest mt-2">
            Ingresa para poder reservar tu corte
          </p>
        </div>
      </div>
      <section className="py-4 introduccion flex flex-col items-center">
        <div className="md:w-8/12 w-11/12">
          <h2 className="brown text-center text-3xl font-bold mb-7 mt-2">
            El corte de tus sueños siempre a tu alcance
          </h2>
          <div className="grid gap-8 lg:grid-cols-2 text-justify items-center">
            <div className="flex flex-col items-center">
              <p>
                En Golden Scissors, no solo obtienes un corte de cabello,
                ¡obtienes una experiencia! Nuestro equipo de talentosos barberos
                no solo está comprometido con la excelencia en cada corte y
                arreglo de barba, sino que también se esfuerza por crear un
                ambiente acogedor y amigable para cada cliente. En nuestra
                barbería, la atención personalizada es nuestra prioridad número
                uno. Nos tomamos el tiempo para entender tus necesidades y
                deseos individuales, para que puedas salir luciendo y
                sintiéndote como la mejor versión de ti mismo. Además, nos
                enorgullecemos de mantenernos al tanto de las últimas tendencias
                y técnicas de la industria, garantizando que siempre recibas un
                servicio de vanguardia. Ven y únete a la familia Golden
                Scissors, donde cada corte de cabello es una obra maestra y cada
                cliente es tratado con el respeto y la atención que se merece.
              </p>
              <Link
                className="my-5 p-3 iniciar_sesion font-semibold"
                href="/login"
              >
                Inicia Sesión
              </Link>
            </div>
            <div className="grid gap-1 grid-cols-2 h-full">
              <Image
                className=""
                src={bar1}
                alt={"Introduccion de imagen"}
                priority
              />
              <div>
                <Image
                  className=" mb-3 "
                  src={bar2}
                  alt={"Introduccion de imagen 2"}
                  priority
                />
                <Image
                  className=" mt-3 "
                  src={bar2}
                  alt={"Introduccion de imagen 2"}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="servicios flex flex-col items-center pb-6">
        <div className="mt-4 md:w-11/12 w-9/12">
          <h2 className="text-center text-3xl font-bold mb-7 mt-2">
            Nuestros servicios
          </h2>
          <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-4">
            <InicioCards
              titulo={"Cortes de Pelo"}
              contenido={
                "Con una combinación de habilidad, pasión y atención al detalle, transformamos tu cabello en una declaración de estilo personalizada para ti. "
              }
              imagen={service1}
            />
            <InicioCards
              titulo={"Cortes de Barba"}
              contenido={
                "Con productos de calidad y técnicas expertas, te garantizamos un resultado que resalte tu masculinidad y estilo único que posees."
              }
              imagen={service2}
            />
            <InicioCards
              titulo={"Ajuste Capilar"}
              contenido={
                "Ya sea que necesites un simple recorte de puntas o un ajuste completo de tu estilo actual, te brindaremos un servicio personalizado y de calidad."
              }
              imagen={service3}
            />
            <InicioCards
              titulo={"Ajustes de Pelo"}
              contenido={
                "Ya sea que busques refrescar tu look actual, suavizar los contornos o agregar textura y volumen, estamos aquí para ayudarte a lograr el resultado perfecto e ideal para ti."
              }
              imagen={service4}
            />
            <InicioCards
              titulo={"Cejas y Cabello Facial"}
              contenido={
                "Ya sea que necesites un simple recorte de puntas o un ajuste completo de tu estilo actual, te brindaremos un servicio personalizado y de calidad."
              }
              imagen={service5}
            />
          </div>
        </div>
      </section>
      <section className="blog flex flex-col items-center pb-6">
        <div className="mt-4 md:w-11/12 w-9/12">
          <h2 className="brown text-center text-3xl font-bold mb-7 mt-2">
            Blog
          </h2>
          <div className="md:flex gap-8 justify-center">
            {blog.length !== 0 ? (
              blog
                .slice(0, 3)
                .map((entrada) => (
                  <EntradasBlog key={entrada.id_blog} entrada={entrada} />
                ))
            ) : (
              <div className="my-5">
                {" "}
                <p className="text-2xl font-bold text-slate-400">
                  No hay nada que mostrar aqui
                </p>
              </div>
            )}
          </div>
          <div className="flex mt-4 justify-end">
            <Link
              href={"/blog"}
              className="bg-brown p-2 gold w-full text-center md:w-auto"
            >
              Ver Mas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
