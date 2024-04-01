import Image from "next/image";
import "../../styles/principal.css";

const InicioCards = ({ titulo, contenido, imagen }) => {
  return (
    <div className="card_inicio flex flex-col justify-center">
      <div className="p-2 flex flex-col items-center">
        <Image className="" src={imagen} width={100} height={100} />
        <div className="">
          <h3 className="font-bold titulo_card text-center">{titulo}</h3>
          <p className="text-center">{contenido}</p>
        </div>
      </div>
    </div>
  );
};

export default InicioCards;
