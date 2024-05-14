"use client";
import {
  getEmpleadoById,
  getEmpleados,
} from "@/controllers/EmpleadosController";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/helpers";
import Link from "next/link";
import handle from "@/pages/api/empleados";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "@/styles/empleados.css";

const StyledModal = Modal.styled`
  width: 95%;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  `;

const Page = () => {
  const [empleado, setEmpleado] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employesFiltered, setEmployesFiltered] = useState([]);
  const [empleadoActual, setEmpleadoActual] = useState({
    id_empleado: 0,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    genero: false,
    fechaContra: "",
    direccion: "",
    estado: 1,
    contratado: false,
    salario: 0,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  function toggleModal(e) {
    setOpacity(0);
    setIsOpen(!isOpen);
  }

  function afterOpen() {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }

  function beforeClose() {
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }
  const FadingBackground = styled(BaseModalBackground)`
    opacity: ${(props) => props.opacity};
    transition: all 0.3s ease-in-out;
  `;

  useEffect(() => {
    const datos = async () => {
      const empleados = await getEmpleados();
      await setEmpleado(empleados);
      const empleadosContratados = empleados.filter(
        (emple) => emple.contratado
      );
      setEmployesFiltered(empleadosContratados);
    };
    datos();
  }, []);
  let empleados = [];
  empleado.map((emp) => {
    empleados.push({
      fechaContra: formatDate(emp.fechaContra),
      nombre: `${emp.nombre} ${emp.apellido}`,
      salario: emp.salario,
      id: emp.id_empleado,
    });
  });
  let records = [];
  let npage = 0;
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  if (empleados.length != 0) {
    records = employesFiltered.slice(firstIndex, lastIndex);
    npage = Math.ceil(empleados.length / recordsPerPage);
  }
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const chhangeCPage = (id) => {
    setCurrentPage(id);
  };
  const Despedir = (id) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(empleadoActual);
  };
  const handleEdit = (id) => {
    const empleact = async () => {
      const data = await getEmpleadoById(id);
      await setEmpleadoActual(data);
    };
    empleact();
    console.log(id);
    toggleModal();
    console.log(empleadoActual);
  };
  const handleChangeEmpleado = (e) => {
    setEmpleadoActual({ ...empleadoActual, [e.target.name]: e.target.value });
  };
  //esta función es la que filtra los empleados en base a su estado (contratado ,despedido)
  const handleEmployeState = (e) => {
    const estadoEmpleado = e.target.value === "true"; // Convertir el valor seleccionado a booleano
    const employesFilter = empleado.filter(
      (empleado) => empleado.contratado === estadoEmpleado
    );
    setEmployesFiltered(employesFilter);
  };
  return (
    <div className="container mx-auto my-4">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-5 ">
        <select
          name="estadoEmpleado"
          onChange={handleEmployeState}
          id=""
          className="brown font-bold text-xl text-center md:text-start "
        >
          <option className="text-base text-center" value="true">
            Contratados
          </option>
          <option className="text-base text-center" value="false">
            Despedidos
          </option>
        </select>

        <select name="filtro" id="" className="">
          <option value="">Ultima Semana</option>
        </select>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Fecha Contrato
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Salario
              </th>
            </tr>
          </thead>
          <tbody>
            {employesFiltered?.length !== 0
              ? records.map((emple) => (
                  <tr
                    key={emple.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {formatDate(emple.fechaContra)}
                    </th>
                    <td className="px-6 py-4">{emple.nombre}</td>
                    <td className="px-6 py-4">$ {emple.salario}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        className="bg-black text-white py-2 px-4 rounded-full hover:bg-slate-700"
                        onClick={() => handleEdit(emple.id_empleado)}
                      >
                        Editar
                      </button>
                      <button
                        className="bg-gold px-3 text-white rounded-full hover:bg-yellow-400"
                        onClick={() => Despedir(emple.id_empleado)}
                      >
                        Despedir
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                onClick={prePage}
              >
                Previous
              </a>
            </li>
            {numbers.map((n, i) => (
              <li key={i}>
                <a
                  href="#"
                  onClick={() => chhangeCPage(n)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  {n}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={nextPage}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex justify-center">
        <button
          onClick={toggleModal}
          className="bg-black text-white py-2 px-6 rounded-full hover:bg-slate-700"
        >
          Agregar Empleado
        </button>
      </div>
      <ModalProvider backgroundComponent={FadingBackground}>
        <StyledModal
          isOpen={isOpen}
          afterOpen={afterOpen}
          beforeClose={beforeClose}
          onBackgroundClick={toggleModal}
          onEscapeKeydown={toggleModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <h2 className="text-center text-xl brown font-semibold mt-2">
            {empleadoActual.id_empleado == 0
              ? "Crear Empleado"
              : "Editar Empleado"}
          </h2>
          <div className="p-2">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="nombre"
                      value={
                        empleadoActual.id_empleado != 0
                          ? empleadoActual.nombre
                          : ""
                      }
                      onChange={handleChangeEmpleado}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_nombre"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Nombre
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="apellido"
                      value={
                        empleadoActual.id_empleado != 0
                          ? empleadoActual.apellido
                          : ""
                      }
                      onChange={handleChangeEmpleado}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_apellido"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Apellido
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="email"
                    name="email"
                    value={
                      empleadoActual.id_empleado != 0
                        ? empleadoActual.email
                        : ""
                    }
                    onChange={handleChangeEmpleado}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Email
                  </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="tel"
                      name="telefono"
                      value={
                        empleadoActual.id_empleado != 0
                          ? empleadoActual.telefono
                          : ""
                      }
                      onChange={handleChangeEmpleado}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_tel"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Telefono
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      name="genero"
                      id="genero"
                      onChange={handleChangeEmpleado}
                      value={
                        empleadoActual.id_empleado != 0
                          ? empleadoActual.genero
                          : ""
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    >
                      <option value={true}>Masculino</option>
                      <option value={false}>Femenino</option>
                    </select>
                    <label
                      htmlFor="genero"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Genero
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <select
                      name="horarios"
                      id=""
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    ></select>
                    <label
                      htmlFor="floating_last_name"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Horarios
                    </label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="number"
                      name="salario"
                      onChange={handleChangeEmpleado}
                      value={
                        empleadoActual.id_empleado != 0
                          ? empleadoActual.salario
                          : ""
                      }
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_salario"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Salario
                    </label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <textarea
                    name="direccion"
                    id=""
                    onChange={handleChangeEmpleado}
                    value={
                      empleadoActual.id_empleado != 0
                        ? empleadoActual.direccion
                        : ""
                    }
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  ></textarea>
                  <label
                    htmlFor="floating_direccion"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Direccion
                  </label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <select
                    name="servicios"
                    id="servicios"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  >
                    <option> </option>
                  </select>
                  <label
                    htmlFor="servicios"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Servicios
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-4 bg-gold py-2 my-1 rounded-full text-white"
              >
                Guardar
              </button>
            </form>
            <button
              className="w-full md:w-auto md:px-4 bg-black py-2 my-1 rounded-full text-white"
              onClick={cerrarModal}
            >
              Cerrar
            </button>
          </div>
        </StyledModal>
      </ModalProvider>
    </div>
  );
  function cerrarModal() {
    toggleModal();
    setEmpleadoActual({
      id_empleado: 0,
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      genero: false,
      fechaContra: "",
      direccion: "",
      estado: 1,
      contratado: false,
      salario: 0,
    });
    console.log(empleadoActual);
  }
};

export default Page;
