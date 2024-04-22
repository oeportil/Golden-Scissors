import Link from "next/link";
import Image from "next/image";
import Logo from "../logos/GS_logo.png";

export default function NotFound() {
  return (
    <div className="my-5 flex flex-col items-center">
      <h2 className="text-5xl text-center font-bold error404">
        Golden Scissors
      </h2>
      <Image src={Logo} alt="Logo" className="w-44 my-4 "></Image>
      <p className="mb-4 font-bold">Error 404 </p>
      <p className="bg-black p-2 uppercase text-white rounded-lg font-semibold">
        <Link href="/">Redireccionar a Pagina principal</Link>
      </p>
    </div>
  );
}
