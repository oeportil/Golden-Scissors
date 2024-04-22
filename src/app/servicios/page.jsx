import serv1 from "../../../public/servicios/1.jpg";
import serv2 from "../../../public/servicios/2.jpg";
import Image from "next/image";

export const metadata = {
  title: "Barberia - Servicios",
};

const Page = () => {
  return (
    <div>
      <section className="titulo flex justify-center items-center">
        <div className="text-center p-10">
          <h1 className="md:text-4xl font-bold" style={{ color: '#3E1814' }}>
            Nuestros Servicios
          </h1>
        </div>
      </section>
      <section className="CA p-10">
        <div className="part1 flex">
          <div className="izq">
            <div className="encabezado">
              <h3>
                Cortes de pelo Tradicionales
              </h3>
            </div>
            <div className="carrusel">
              <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <Image className="rounded-t-lg" src={serv1} alt="" width={200} height={150} />
                </a>
                <div className="p-3">
                  <a href="#">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">BUZZ</h5>
                  </a>
                  <p className="mb-2 text-sm font-normal text-gray-700 dark:text-gray-400">Tiempo: 45 Min. <br />Precio: $5</p>
                </div>
              </div>
              <div className="C2">
              </div>
            </div>
          </div>
          <div className="der">
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
