"use client";
import React, { useEffect, useState } from "react";
import "@/styles/admin.css";
import { getEmpContraConServ } from "@/controllers/EmpleadosController";
import PeluquerosActualesCard from "@/app/components/PeluquerosActualesCard";
import ReservaActualesCard from "@/app/components/ReservaActualesCard";
import {
  deleteCita,
  getCitasAdmin,
  getSearchReserv,
} from "@/controllers/ReservaController";
//impors para el modal
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { calcularHoras, formatDate } from "@/utils/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

//el toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledModal = Modal.styled`
  width: 95%;
  height: 70vh; 
  overflow-y: scroll;
  background-color: rgb(17 24 39);
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  `;
const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const page = () => {
  const [empleados, setEmpleados] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);

  //para los modales
  const [isOpen, setIsOpen] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [serRes, setSerRes] = useState([]);

  //detalle de reservacion
  const [details, setDetails] = useState({});

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

  useEffect(() => {
    const data = async () => {
      const emplea = await getEmpContraConServ();
      await setEmpleados(emplea);
    };
    const data2 = async () => {
      const reserv = await getCitasAdmin();
      await setReservaciones(reserv);
    };
    data();
    data2();
  }, []);

  return (
    <div className="p-8 fondo text-white min-h-screen">
      <button
        onClick={searchReserv}
        className="block text-white boton2 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Search
      </button>

      <div className="md:flex justify-between gap-4">
        <div className="md:w-1/2  mx-auto">
          <h2 className="texto font-bold text-lg mb-4 text-center">
            Reservaciones
          </h2>
          {reservaciones.length == 0 ? (
            <div>
              <h4 className="text-slate-500 text-3xl font-semibold text-center">
                No hay citas que mostrar
              </h4>
            </div>
          ) : (
            <div className="overflow-y-scroll h-screen hide-scrollbar">
              {reservaciones.map((reserv, i) => (
                <ReservaActualesCard
                  key={i}
                  reservacion={reserv}
                  closeSecondModal={closeSecondModal}
                />
              ))}
            </div>
          )}
        </div>
        <div className="md:w-1/2  mx-auto">
          <div className="justify-center text-center">
            <h2 className="texto font-bold text-lg mb-4">
              Peluqueros actuales
            </h2>
            <div className="overflow-y-scroll h-screen hide-scrollbar">
              {empleados.map((empleado, i) => (
                <PeluquerosActualesCard key={i} empleado={empleado} />
              ))}
            </div>
          </div>
        </div>
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
          <div className="p-4 bg-gray-900 text-white">
            <div className="flex items-center mb-4">
              <button className="text-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l2 2m-2-2H3m5 5h14M3 9h14"
                  ></path>
                </svg>
              </button>
              <input
                type="text"
                placeholder="Buscar..."
                className="ml-2 px-4 py-2 rounded-md bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none focus:border-gray-500"
                onChange={filterByresandUser}
              />
            </div>
            <table className="min-w-full bg-gray-800 rounded-lg">
              <thead>
                <tr>
                  {[
                    "Nº Res.",
                    "Usuario",
                    "Fecha",
                    "Agenda",
                    "Atendido por",
                    "Total",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-2 px-4 border-b border-gray-700"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {serRes?.map((reservation) => (
                  <tr
                    key={reservation.idCita}
                    className="border-b border-gray-700"
                  >
                    <td className="py-2 px-4">{reservation.idCita}</td>
                    <td className="py-2 px-4">{reservation.nombreUsuario}</td>
                    <td className="py-2 px-4">
                      {formatDate(reservation.fechaCorte)}
                    </td>
                    <td className="py-2 px-4">
                      {reservation.servicios.map((serv) => serv)}
                    </td>
                    <td className="py-2 px-4">
                      {reservation.peluqueros.map((pelu) => pelu)}
                    </td>
                    <td className="py-2 px-4">{reservation.totalCorte}</td>
                    <td className="py-2 px-4 flex gap-4">
                      <button onClick={() => showDetails(reservation)}>
                        <FontAwesomeIcon
                          style={{ color: "gray" }}
                          icon={faEye}
                          size="1x"
                        />
                      </button>
                      {!reservation.citaRealizada && (
                        <button
                          onClick={() => eliminarReserva(reservation.idCita)}
                          className=" disabled:text-"
                        >
                          <FontAwesomeIcon
                            style={{ color: "red" }}
                            icon={faTrash}
                            size="1x"
                          />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </StyledModal>

        <StyledModal
          isOpen={secondModal}
          onBackgroundClick={closeSecondModal}
          onEscapeKeydown={closeSecondModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <div className="p-4 bg-gray-900 text-white mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span>CITA N°{details?.idCita}</span>
              <div className="flex items-center">
                <h3>DETALLES</h3>
                <button onClick={closeSecondModal} className="ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <span>DATOS DEL CLIENTE</span>
                <span>{details?.nombreUsuario}</span>
                <span>{details?.telefonoUsuario}</span>
              </div>
            </div>
            {details?.detalles?.map((service, index) => (
              <div key={index} className="mb-4 p-2 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>Servicio: {service.nombreServicio}</span>
                  <span>${service.precioIndividual}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                  <span>{service.nombreCategoria}</span>
                  <span>
                    {calcularHoras(service?.fechaInicio, service?.duracion)}
                  </span>
                  <span>Peluquero: {service.nombrePeluquero}</span>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <span>
                <h2>Fecha del servicio:{formatDate(details?.fechaCorte)}</h2>
              </span>
              <span>
                <h2>
                  Horas de la cita:{" "}
                  {calcularHoras(details?.fechaCorte, details?.duracionTotal)}
                </h2>
              </span>
              <span>
                <h2>TOTAL: ${details?.totalCorte}</h2>
              </span>
            </div>
          </div>
        </StyledModal>
      </ModalProvider>
      <ToastContainer />
    </div>
  );
  //para cerrar el modal de detalle
  function closeSecondModal() {
    setDetails({});
    setSecondModal(false);
  }
  //para abrir el modal de detalle, es necesario siempre pasarle el objeto
  function showDetails(reservation) {
    setDetails(reservation);
    setSecondModal(true);
  }

  async function searchReserv() {
    const reserva = await getSearchReserv();
    await setSerRes(reserva);
    toggleModal();
  }

  async function filterByresandUser(e) {
    const reserva = await getSearchReserv(e.target.value);
    await setSerRes(reserva);
  }

  async function eliminarReserva(id) {
    const confirmCancel = window.confirm(
      "¿Está seguro de que desea cancelar esta reserva?"
    );
    if (!confirmCancel) {
      return;
    }
    const del = await deleteCita(id);
    if (del.status == 200) {
      toast.success(del.data.mensaje, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      const reserva = await getSearchReserv();
      await setSerRes(reserva);
    } else {
      toast.error("No se puede eliminar la reserva, intente mas tarde", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }
};

export default page;
