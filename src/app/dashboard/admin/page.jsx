"use client"
import React, { useEffect, useState } from "react";
import "@/styles/admin.css";
import { getEmpContraConServ } from "@/controllers/EmpleadosController";
import PeluquerosActualesCard from "@/app/components/PeluquerosActualesCard";
import ReservaActualesCard from "@/app/components/ReservaActualesCard";
import { getCitasAdmin } from "@/controllers/ReservaController";

const page = () => {
  const[empleados, setEmpleados] = useState([])
  const[reservaciones, setReservaciones] = useState([])

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
        data-modal-target="popup-modal2"
        data-modal-toggle="popup-modal2"
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
    </div>
  );
};

export default page;
