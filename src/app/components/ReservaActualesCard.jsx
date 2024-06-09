"use client"
import Image from "next/image";
import foto from "../../../public/usuarios/def.jpg";
import { calcularHoras, formatDate, horaReserva } from "@/utils/helpers";
import { useState } from "react";

import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import { deleteCita } from "@/controllers/ReservaController";


//el toast 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const StyledModal = Modal.styled`
  width: 95%;
  height: 70vh; 
  overflow-y: scroll;
  background-color: rgb(17 24 39);
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const ReservaActualesCard = ({ reservacion }) => {
  const [secondModal, setSecondModal] = useState(false);
  const [details, setDetails] = useState({});
  const [opacity, setOpacity] = useState(0);

  const showDetails = (reservation) => {
    setDetails(reservation);
    setOpacity(1);
    setSecondModal(true);
  };

  const closeSecondModal = () => {
    setOpacity(0);
    setTimeout(() => {
      setSecondModal(false);
      setDetails({});
    }, 300);
  };
  return (
    <div className="reser p-4 rounded-lg mb-8 bg-gray-900 text-white">
      <div className="grid items-center lg:grid-cols-2 lg:place-items-end">
        <div className="my-auto">
          <div className="text-center md:text-start">
            <p>
              {reservacion.idCita} - {reservacion.nombreUsuario} {reservacion.telefonoUsuario}
            </p>
            <p>{reservacion.servicios.map((serv) => serv.nombre).join(', ')}</p>
          </div>
          <div className="flex gap-4 lg:flex-row flex-col text-center lg:text-start ">
            <p>{horaReserva(reservacion.fechaCorte)}</p>
            <button
              onClick={() => showDetails(reservacion)}
              className="bg-slate-500 texto font-bold py-1 px-4 rounded"
            >
              Detalles
            </button>
            <button onClick={()=> eliminarReserva(reservacion.idCita)}  className="boton2 texto font-bold py-1 px-4 rounded">Cancelar</button>
          </div>
        </div>
        <div>
          <Image
            src={foto}
            alt="Foto del usuario"
            className="rounded-full my-3 mx-auto"
            width={100}
            height={100}
          />
        </div>
      </div>
      <ModalProvider backgroundComponent={FadingBackground}>
        <StyledModal
          isOpen={secondModal}
          onBackgroundClick={closeSecondModal}
          onEscapeKeydown={closeSecondModal}
          opacity={opacity}
          backgroundProps={{ opacity }}
        >
          <div className="p-4 bg-gray-900 text-white mx-auto">
            <div className="flex justify-between items-center mb-4">
              <span>{details?.idCita}</span>
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <span>{details?.nombreUsuario}</span>
                <span>{details?.telefonoUsuario}</span>
                <button className="ml-2 mt-2 sm:mt-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-500"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
                  </svg>
                </button>
              </div>
            </div>
            {details?.detalles?.map((service, index) => (
              <div key={index} className="mb-4 p-2 bg-gray-800 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span>{service.nombreServicio}</span>
                  <span>{service.precioIndividual}</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                  <span>{service.nombreCategoria}</span>
                  <span>{calcularHoras(service?.fechaInicio, service?.duracion)}</span>
                  <span>{service.nombrePeluquero}</span>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
              <span>{formatDate(details?.fechaCorte)}</span>
              <span>{calcularHoras(details?.fechaCorte, details?.duracionTotal)}</span>
              <span>${details?.totalCorte}</span>
            </div>
          </div>
        </StyledModal>
      </ModalProvider>
    </div>
  );

  async function eliminarReserva(id){
    const confirmCancel = window.confirm("¿Está seguro de que desea cancelar esta reserva?");
    if (!confirmCancel) {
      return;
    }
    const del = await deleteCita(id)
    if(del.status == 200){
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
    setTimeout(() => {
      window.location.reload()
    }, 1500);
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

export default ReservaActualesCard;
