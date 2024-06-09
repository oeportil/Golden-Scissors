"use client"
import React, { useEffect, useState } from "react";
import "@/styles/admin.css";
import { getEmpContraConServ } from "@/controllers/EmpleadosController";
import PeluquerosActualesCard from "@/app/components/PeluquerosActualesCard";
import ReservaActualesCard from "@/app/components/ReservaActualesCard";
import { getCitasAdmin } from "@/controllers/ReservaController";
//impors para el modal
import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

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



const page = () => {
  const[empleados, setEmpleados] = useState([])
  const[reservaciones, setReservaciones] = useState([])

  //para los modales
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [serRes, setSerRes] = useState([]);

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
    const data = async() =>{
      const emplea = await getEmpContraConServ()
      await setEmpleados(emplea);
    }
    const data2 = async() => {
      const reserv = await getCitasAdmin()
      await setReservaciones(reserv)
    }
    data()
    data2()
  }, [])
  
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
          <h2 className="texto font-bold text-lg mb-4 text-center">Reservaciones</h2>
          {typeof reservaciones == "object" ? 
          <div>
            <h4 className="text-slate-500 text-3xl font-semibold text-center">{reservaciones.mensaje}</h4>
          </div> : 
          <>
            <ReservaActualesCard/>
            <ReservaActualesCard/>
            <ReservaActualesCard/>
          </>
          }
        </div>
        <div className="md:w-1/2  mx-auto">
          <div className="justify-center text-center">
            <h2 className="texto font-bold text-lg mb-4">Peluqueros actuales</h2>
            <div className="overflow-y-scroll h-screen">
              {empleados.map((empleado, i) => (
                <PeluquerosActualesCard key={i} empleado={empleado}/>
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
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-gray-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l2 2m-2-2H3m5 5h14M3 9h14"></path>
          </svg>
        </button>
        <input
          type="text"
          placeholder="Buscar..."
          className="ml-2 px-4 py-2 rounded-md bg-gray-800 text-gray-300 border border-gray-700 focus:outline-none focus:border-gray-500"
        />
      </div>
      <table className="min-w-full bg-gray-800 rounded-lg">
        <thead>
          <tr>
            {['Nº Res.', 'Usuario', 'Fecha', 'Agenda', 'Atendido por', 'Total'].map((header) => (
              <th key={header} className="py-2 px-4 border-b border-gray-700">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* {reservations.map((reservation) => (
            <tr key={reservation.id} className="border-b border-gray-700">
              <td className="py-2 px-4">{reservation.id}</td>
              <td className="py-2 px-4">{reservation.user}</td>
              <td className="py-2 px-4">{reservation.date}</td>
              <td className="py-2 px-4">{reservation.agenda}</td>
              <td className="py-2 px-4">{reservation.attendedBy}</td>
              <td className="py-2 px-4">{reservation.total}</td>
              <td className="py-2 px-4">
                <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-gray-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12m-9 0a9 9 0 0118 0 9 9 0 01-18 0zm0 0a9 9 0 0118 0 9 9 0 01-18 0z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
        </StyledModal>
      </ModalProvider>
    </div>
  );
  async function searchReserv(){
    const reserva = await getSearchReserv()
    await setSerRes(reserva)
    toggleModal()
  }
};

export default page;
