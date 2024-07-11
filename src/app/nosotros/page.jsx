import Image from "next/image";
import Nosotros from "../../img/Nosotros.webp";
import Nosotros2 from "../../img/Nosotros2.png";
import { GoogleMapsEmbed } from "@next/third-parties/google";

export const metadata = {
  title: "GoldenScissors - Nosotros",
};

const Page = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="nosotros my-8 font-bold text-3xl uppercase">
        Golden Scissors
      </h2>
      <div className="w-11/12 md:grid md:w-10/12 md:gap-8  grid-cols-2 items-center justify-center">
        <Image src={Nosotros} width={500} height={500} alt="Nosotros Imagen" />
        <div className="text-justify">
          <h3 className="text-center text-3xl font-bold mb-7 mt-2 brown">
            Nuestra Mision
          </h3>
          <p>
            Nuestra misión en Golden Scissors es elevar la experiencia de cada
            cliente a través de servicios de barbería excepcionales, atención
            personalizada y un ambiente acogedor. Nos esforzamos por ofrecer
            cortes de cabello y cuidado de la barba de alta calidad,
            manteniéndonos al tanto de las últimas tendencias y técnicas de la
            industria. Valoramos la individualidad de cada cliente y nos
            comprometemos a proporcionar servicios que resalten su estilo único.
            Además, buscamos crear un espacio donde la comunidad pueda
            conectarse y sentirse bienvenido. En Golden Scissors, nuestro
            objetivo es más que simplemente cortar el cabello; se trata de crear
            una experiencia memorable y satisfactoria para cada persona que
            cruza nuestras puertas.
          </p>
        </div>
        <div className="text-justify mt-6 md:mt-0">
          <h3 className="text-center text-3xl font-bold mb-7 mt-2 brown">
            Nuestra Historia
          </h3>
          <p>
            En los vibrantes callejones del centro histórico, nació Golden
            Scissors. una pequeña barbería que se convertiría en una de las mas
            confiables de San salvador.
          </p>
          <br />
          <p>
            Fundada por Carlos Solis, un apasionado barbero con décadas de
            experiencia, y su hijo José Solis, un estilista innovador, la
            barbería abrió sus puertas con un objetivo claro: fusionar la
            tradición con la modernidad.
          </p>
          <br />
          <p>
            Inspirados por el deseo de ofrecer a la comunidad algo más que un
            simple corte de cabello, Carlos y José crearon un espacio acogedor
            donde cada silla contaba una historia y cada cliente se convertía en
            parte de la familia.{" "}
          </p>
        </div>
        <Image src={Nosotros2} width={700} height={700} alt="Nosotros Imagen" />
      </div>
      <div>
        <h3 className="text-center text-3xl font-bold mb-7 mt-2 brown">
          Ubícanos
        </h3>
        <div>
          <iframe
            className="max-lg:w-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3871.6010935214026!2d-89.55025832576118!3d13.982333691916077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f62e62036825a69%3A0xec68b49f92513893!2sUniversidad%20Cat%C3%B3lica%20de%20El%20Salvador!5e0!3m2!1ses!2ssv!4v1711033647103!5m2!1ses!2ssv"
            width="1000"
            height="300"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Page;
