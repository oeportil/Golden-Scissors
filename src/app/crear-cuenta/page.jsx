"use client";
import Link from "next/link";
import { useCrearCuentaLogic } from "../../utils/createAccountLogic";
const CrearCuenta = () => {
  //toda la logica de este componente se encuentra en utils y solo se manda a llamar acá
  const {
    newUser,
    passwordRepeated,
    alert,
    handleChange,
    handleSubmit,
    setPasswordRepeated,
  } = useCrearCuentaLogic();

  return (
    <div className="md:grid lg:grid-cols-2">
      <div className="bg-blend-multiply bg-no-repeat bg-cover bg-center bg-[url(../img/CrearCuenta.png)] md:block hidden"></div>
      <div className="py-14">
        <h2 className="brown text-center text-3xl font-bold mb-7 mt-2">
          Crear Cuenta
        </h2>
        {alert ? (
          <p
            className={`${
              alert === "Error al crear el usuario"
                ? "bg-red-600"
                : "bg-yellow-400"
            }  text-white font-bold flex m-5 gap-2
            justify-center rounded-sm`}
          >
            {alert}{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </p>
        ) : (
          ""
        )}
        <form
          onSubmit={handleSubmit}
          className="max-w-md w-11/12  mx-auto flex flex-col items-center"
        >
          <div className="grid md:grid-cols-2 md:gap-6 w-full">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="nombre"
                id="nombre"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                placeholder=" "
                value={newUser.nombre}
                onChange={handleChange}
                required
              />
              <label
                htmlFor="nombre"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nombre
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group ">
              <input
                type="text"
                name="apellido"
                id="apellido"
                value={newUser.apellido}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="apellido"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Apellido
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              value={newUser.email}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ingrese su correo electrónico
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6  w-full">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                name="telefono"
                id="telefono"
                value={newUser.telefono}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="telefono"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Telefono
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <select
                name="genero"
                onChange={handleChange}
                value={newUser.genero}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              >
                <option value={"masculino"}>Masculino</option>
                <option value={"femenino"}>Femenino</option>
              </select>
              <label
                htmlFor="genero"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Género
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="fechaNac"
              id="fechaNac"
              value={newUser.fechaNac}
              onChange={handleChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="fechaNac"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Fecha de Nacimiento
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
              value={newUser.password}
              onChange={handleChange}
              required
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contraseña
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="passwordRepeated"
              id="passwordRepeated"
              value={passwordRepeated}
              onChange={(e) => setPasswordRepeated(e.target.value)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-500 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="passwordRepeated"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-yellow-500 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Repetir Contraseña
            </label>
          </div>
          <input
            type="submit"
            value={"Crear una cuenta"}
            className="cursor-pointer bg-black gold py-1 px-8 rounded-full hover:bg-amber-950 transition-colors mt-10 mb-10"
          />
          <p>
            ¿Tienes una cuenta?{" "}
            <Link className="font-bold" href={"/login"}>
              Iniciar Sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;
