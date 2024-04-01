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

export default function Home() {
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Numquam, harum, laborum et illo repellat sapiente cum enim nulla
                impedit neque dignissimos odio ut deserunt nam. Iure magnam
                accusantium debitis cum. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Natus eius ducimus maxime, exercitationem
                corporis aut. Id assumenda eveniet tempore velit amet
                necessitatibus ad provident ipsa, soluta, sapiente blanditiis
                pariatur accusantium.
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
              <Image
                className="lg:row-start-1 lg:col-start-2"
                src={bar2}
                alt={"Introduccion de imagen 2"}
                priority
              />
              <Image
                className="lg:row-start-2 lg:col-start-2"
                src={bar2}
                alt={"Introduccion de imagen 2"}
                priority
              />
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
                "Barber is a person whose occupation is mainly to cut dress style."
              }
              imagen={service1}
            />
            <InicioCards
              titulo={"Cortes de Barba"}
              contenido={
                "Barber is a person whose occupation is mainly to cut dress style."
              }
              imagen={service2}
            />
            <InicioCards
              titulo={"Ajuste Capilar"}
              contenido={
                "Barber is a person whose occupation is mainly to cut dress style."
              }
              imagen={service3}
            />
            <InicioCards
              titulo={"Cortes de Pelo"}
              contenido={
                "Barber is a person whose occupation is mainly to cut dress style."
              }
              imagen={service4}
            />
            <InicioCards
              titulo={"Cejas y Cabello Facial"}
              contenido={"occupation is mainly to cut dress style."}
              imagen={service5}
            />
          </div>
        </div>
      </section>
      <section className="blog">
        <h2 className="brown text-center text-3xl font-bold mb-7 mt-2">Blog</h2>
        <div>{/* Blog here */}</div>
      </section>
    </>
  );
}
