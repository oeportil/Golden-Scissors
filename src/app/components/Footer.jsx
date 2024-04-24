import Image from "next/image";
import Logo from "../../logos/GS_logo_blanco.png";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" dark:bg-gray-900 footer">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 items-center w-100">
          <div className="mb-6 md:mb-0 me-12 ms-12">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                width={180}
                className="w-30"
                alt="Logo"
                priority
              />
            </Link>
          </div>
          <div className=" ms-16 md:ms-0 justify-center my-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Ubicación
              </h2>
              <ul className="text-gray-500  font-medium">
                <li className="mb-4">
                  <p className="w-48">
                    Santa Elena, 5ta Calle Oriente, Plaza "Por Defecto", Local
                    Nº 12
                  </p>
                </li>
                <li>
                  <p className="w-48">
                    goldenscissorsbarbershop@gmail.com (+503) 2230-1234
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className=" ms-16  justify-center">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
                Horarios de Apertura
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <p>Lunes a Viernes:</p>
                  <p className="ms-6">9:30a.m. - 8:00p.m.</p>
                </li>
                <li>
                  <p>Sábados:</p>
                  <p className="ms-6">9:30a.m. - 5:00p.m.</p>
                </li>

                <li>
                  <p>Domingos:</p>
                  <p className="ms-6">10:30a.m. - 3:00p.m.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©{new Date().getFullYear().toString()} Golden Scissors™. Todos los
            derechos Reservados.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
