"use client";
import usePeluqueria from "@/hooks/usePeluqueria";
import Servicio from "../components/Servicio";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Page = () => {
  const { services } = usePeluqueria();
  const filtrarPorCategoria = (categoria) => {
    return services.filter((servicio) => servicio.id_categoria === categoria);
  };

  const categorias = [
    {
      id: 1,
      titulo: "Cortes de pelo tradicionales",
      servicios: filtrarPorCategoria(1),
    },
    {
      id: 2,
      titulo: "Cortes de pelo Especiales",
      servicios: filtrarPorCategoria(2),
    },
    { id: 3, titulo: "Cortes de barba", servicios: filtrarPorCategoria(3) },
    { id: 4, titulo: "Delineados", servicios: filtrarPorCategoria(4) },
    { id: 5, titulo: "Tintado", servicios: filtrarPorCategoria(5) },
    { id: 6, titulo: "Ajustes", servicios: filtrarPorCategoria(6) },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  return (
    <div className="container ">
      <h1
        className="text-4xl font-bold text-center"
        style={{ color: "#3E1814" }}
      >
        Nuestros Servicios
      </h1>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden">
        {categorias.map((categoria) => (
          <section key={categoria.id}>
            <h2 className="uppercase font-bold text-2xl text-center m-5">
              {categoria.titulo}
            </h2>
            <Slider {...settings} className="m-7 w-full">
              {categoria.servicios.map((servicio) => (
                <Servicio key={servicio.id_servicio} corte={servicio} />
              ))}
            </Slider>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Page;
