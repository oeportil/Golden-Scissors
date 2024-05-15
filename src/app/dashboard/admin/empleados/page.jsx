"use client";
import {
  createEmpleado,
  despedirEmpleado,
  getCategorias,
  getEmpleadoById,
  getEmpleados,
  getHorarios,
  updateEmpleado,
  getCategsById,
} from "@/controllers/EmpleadosController";
import { useEffect, useState } from "react";
import { formatDate, Hora, prismaFecha } from "@/utils/helpers";
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import "@/styles/empleados.css";

const StyledModal = Modal.styled`
  width: 95%;
  height: 70vh; 
  overflow-y: scroll;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  `;
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;
const Page = () => {
  const [empleado, setEmpleado] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [employesFiltered, setEmployesFiltered] = useState([]);
  const [empleadoActual, setEmpleadoActual] = useState({
    id_empleado: 0,
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    genero: true,
    fechaContra: "",
    direccion: "",
    estado: 1,
    contratado: true,
    salario: 0,
    id_horarioEmpleado: 1,
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
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const datos = async () => {
      const empleados = await getEmpleados();
      await setEmpleado(empleados);
      const empleadosContratados = empleados.filter(
        (emple) => emple.contratado
      );
      setEmployesFiltered(empleadosContratados);
    };
    const h = async () => {
      const hora = await getHorarios();
      await setHorarios(hora);
    };
    const categ = async () => {
      const c = await getCategorias();
      await setCategorias(c);
    };
    categ();
    h();
    datos();
    console.log("Viendo");
  }, []);

  let empleados = [];
  empleado.map((emp) => {
    empleados.push({
      fechaContra: formatDate(emp.fechaContra),
      nombre: `${emp.nombre} ${emp.apellido}`,
      salario: emp.salario,
      id: emp.id_empleado,
      contratado: emp.contratado,
    });
  });
  let records = [];
  let npage = 0;
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  if (employesFiltered.length != 0) {
    records = employesFiltered.slice(firstIndex, lastIndex);
    npage = Math.ceil(employesFiltered.length / recordsPerPage);
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
  //funcion para despedir empleados
  const Despedir = async (id) => {
    if (confirm("¿Seguro que desea despedirlo") == true) {
      const result = await despedirEmpleado(id);
      if (result.empleado.id_empleado) {
        window.location.reload();
      }
    } else {
      return;
    }
  };
  //funcion para enviar a editar o a crear
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selecto.length > 0) {
      if (empleadoActual.id_empleado == 0) {
        empleadoActual.fechaContra = prismaFecha(new Date());
        const e = await createEmpleado(empleadoActual, selecto);
        if (typeof e != "string") {
          window.location.reload();
        } else {
          alert(e);
        }
      } else {
        const e = await updateEmpleado(
          empleadoActual.id_empleado,
          empleadoActual,
          selecto
        );
        if (typeof e != "string") {
          window.location.reload();
        } else {
          alert(e);
        }
      }
    } // Pocho hace el alert
  };

  const handleEdit = (id) => {
    const empleact = async () => {
      const data = await getEmpleadoById(id);
      await setEmpleadoActual(data);
      const array = await getCategsById(id);
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        handleServ2(array[i].id_categ);
      }
    };
    empleact();

    toggleModal();
  };
  const handleChangeEmpleado = (e) => {
    //const { name, value } = e.target;
    console.log(selecto);
    setEmpleadoActual((prevEmpleado) => ({
      ...prevEmpleado,
      [e.target.name]: e.target.value,
    }));
  };

  //esta función es la que filtra los empleados en base a su estado (contratado ,despedido)
  const handleEmployeState = (e) => {
    const estadoEmpleado = e.target.value === "true"; // Convertir el valor seleccionado a booleano
    const employesFilter = empleado.filter(
      (empleado) => empleado.contratado === estadoEmpleado
    );
    setEmployesFiltered(employesFilter);
    setCurrentPage(1);
  };
  const [selecto, setSelecto] = useState([]);
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
                    <td className="px-6 py-4">
                      {emple.nombre} {emple.apellido}
                    </td>
                    <td className="px-6 py-4">$ {emple.salario}</td>
                    {emple.contratado ? (
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
                    ) : (
                      <td></td>
                    )}
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
            {numbers.map((n) => (
              <li key={n}>
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
          <div className="p-2 ">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <div className="">
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type="text"
                      name="nombre"
                      value={empleadoActual.nombre}
                      onChange={handleChangeEmpleado}
                      className={`${
                        empleadoActual.id_empleado == 0 ? "" : "bg-slate-100"
                      } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                      placeholder=" "
                      required
                      disabled={empleadoActual.id_empleado == 0 ? false : true}
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
                      value={empleadoActual.apellido}
                      onChange={handleChangeEmpleado}
                      className={`${
                        empleadoActual.id_empleado == 0 ? "" : "bg-slate-100"
                      } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                      disabled={empleadoActual.id_empleado == 0 ? false : true}
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
                    value={empleadoActual.email}
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
                      value={empleadoActual.telefono}
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
                      value={empleadoActual.genero}
                      className={`${
                        empleadoActual.id_empleado == 0 ? "" : "bg-slate-100"
                      } block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                      disabled={empleadoActual.id_empleado == 0 ? false : true}
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
                      name="id_horarioEmpleado"
                      id=""
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      onChange={handleChangeEmpleado}
                      value={empleadoActual.id_horarioEmpleado}
                    >
                      {horarios.length != 0
                        ? horarios.map((horario) => (
                            <option
                              key={horario.id_horarioEmpleado}
                              value={horario.id_horarioEmpleado}
                            >
                              {Hora(horario)}
                            </option>
                          ))
                        : ""}
                    </select>
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
                      value={empleadoActual.salario}
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
                    value={empleadoActual.direccion}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    required
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
                    onChange={handleServ}
                  >
                    <option selected>Selecciona un Servicio</option>
                    {categorias.map((categoria) => (
                      <option
                        key={categoria.id_categoria}
                        value={categoria.id_categoria}
                      >
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="servicios"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Servicios
                  </label>
                </div>
                <div className="overflow-y-scroll max-h-28">
                  {selecto.length != 0 &&
                    selecto.map((categoria) => (
                      <div className="flex items-center justify-between py-4 my- ">
                        {categoria.nombre}
                        <div
                          className="bg-black text-white py-2 px-2 rounded-lg hover:bg-slate-700 "
                          onClick={() => deleteServ(categoria.id_categoria)}
                        >
                          Eliminar
                        </div>
                      </div>
                    ))}
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
  function handleServ(e) {
    const result = categorias.filter(
      (categoria) => categoria.id_categoria == e.target.value
    );
    if (result[0]) {
      setSelecto((prevSelecto) => [result[0], ...prevSelecto]);

      let copy = categorias;
      for (let index = 0; index < copy.length; index++) {
        if (copy[index] == result[0]) {
          copy.splice(index, 1);
        }
      }
      console.log(categorias);
      console.log(selecto);
    }
  }
  function handleServ2(id) {
    const result = categorias.filter(
      (categoria) => categoria.id_categoria == id
    );
    if (result[0]) {
      setSelecto((prevSelecto) => [result[0], ...prevSelecto]);

      let copy = categorias;
      for (let index = 0; index < copy.length; index++) {
        if (copy[index] == result[0]) {
          copy.splice(index, 1);
        }
      }
      console.log(categorias);
      console.log(selecto);
    }
  }
  function deleteServ(id) {
    console.log(id);
    const result = selecto.filter((categoria) => categoria.id_categoria == id);
    if (result[0]) {
      setCategorias((prevCategorias) => [result[0], ...prevCategorias]);
      let copy = selecto;
      for (let index = 0; index < copy.length; index++) {
        if (copy[index] == result[0]) {
          copy.splice(index, 1);
        }
      }
    }
  }

  function cerrarModal() {
    toggleModal();
    setSelecto([]);
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
