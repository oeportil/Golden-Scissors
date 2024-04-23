import service1 from "@/img/service1.png";
import Image from "next/image";
const Servicio = ({ corte }) => {
  return (
    <div className="bg-black w-1/3 rounded-md">
      <Image src={service1} alt={`imagen del corte ${corte.nombre}`} />
      <h3 className="text-white text-center text-xl">{corte.nombre}</h3>
      <div className="flex justify-between">
        <h3 className="text-white text-center text-xl p-2">
          Duración{corte.duracion}
        </h3>
        <h3 className="text-white text-center text-xl p-2">${corte.precio}</h3>
      </div>
    </div>
  );
};

export default Servicio;
