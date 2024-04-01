import Image from "next/image";
import Logo from "../../logos/GS_logo.png";
import Link from "next/link";

const Page = () => {
  return (
    <div className="bg-blend-multiply bg-no-repeat bg-cover bg-center bg-[url(../img/bglogin.jpg)]  bg-gray-600">
      <div className=" flex flex-col justify-center items-center bg-transparente">
        <div className="flex flex-col items-center bg-black my-16 rounded-2xl w-11/12 md:w-2/5 py-8 opacity-80">
          <Image src={Logo} className="w-20" alt="Logo" priority />
          <h2 className="gold text-3xl">Login</h2>
          <form className="w-11/12 flex flex-col items-center">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="floating_email"
                id="floating_email"
                className="block py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer "
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Ingrese su correo electrónico
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="floating_password"
                id="floating_password"
                className="block  py-2.5 px-0 w-full text-sm text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500  dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-5000 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Ingrese su contraseña
              </label>
            </div>
            <p className="gold">¿Olvidaste tu contraseña?</p>
            <Link className="gold mb-5" href={"#"}>
              Recuperar contraseña
            </Link>
            <input
              type="submit"
              className="font-medium rounded-full bg-brown text-sm w-full transition-colors  px-5 py-2.5 text-center gold  hover:bg-yellow-500 hover:text-amber-950 cursor-pointer"
              value={"Iniciar Sesión"}
            />
            <p className="gold my-5">¿No tienes una cuenta?</p>
            <Link
              href="/crear-cuenta"
              className="font-medium rounded-full bg-brown text-sm w-full  px-5 py-2.5 text-center gold transition-colors hover:bg-yellow-500 hover:text-amber-950 cursor-pointer"
            >
              Crear una cuenta
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
