"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
import { formatDate } from "@/utils/helpers";
import Link from "next/link";

import styled from "styled-components";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "@/./logos/GS_logo.png";
import fondo from "@/./logos/fondo_opaco.png";

import ReactToPrint from "react-to-print";

import edit from "@/img/editImage.png"
import axios from "axios";

const InvoiceModal = Modal.styled`
  width: 400px;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #3490dc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #2779bd;
  }
`;
const SpecialModalBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
  backdrop-filter: blur(2px); // This applies the blur effect
  background-color: rgba(
    0,
    0,
    0,
    0.1
  ); // This adds a semi-transparent black background
`;

const Page = () => {
  const [cook, setCook] = useState({});
  const [route, setRoute] = useState("");
  const [selectedCita, setSelectedCita] = useState("");
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const invoiceRef = useRef();
  const refs = useRef([]);
  const handleInvoiceOpen = (cita) => {
    setSelectedCita(cita);
    setIsInvoiceOpen(true);
  };

  const handleInvoiceClose = () => {
    setIsInvoiceOpen(false);
  };

  //este es el state que tiene las reservaciones
  const [citas, setCitas] = useState([]);

  const user = getCookie("token");
  useEffect(() => {
    const cokie = () => {
      if (user !== undefined) {
        setCook(JSON.parse(user));
      }
    };
    cokie();
  }, [user]);

  //acá se obtienen las citas del usuario
  useEffect(() => {
    const LLamadoCitas = async () => {
      const id = cook.id_usuario?.toString();
      try {
        const url = `http://localhost:3000/api/obtenercitasporid/${id}`;
        const respuesta = await fetch(url);
        const citasData = await respuesta.json();
        setCitas(citasData);
      } catch (error) {
        console.error("Ocurrio un error:" + error);
      }
    };

    if (Object.keys(cook).length !== 0) {
      LLamadoCitas();
    }
  }, [cook]);

  //esto borra las citas
  const deleteCita = (idCita) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/citas/${idCita}`;
      console.log(url);
      const EliminarCita = async () => {
        const response = await fetch(url, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        window.location.reload();
      };
      EliminarCita();
    } catch (error) {
      console.error("Ocurrio el siguiente error: " + error);
    }
  };

  useEffect(() => {
    async function obtenerRuta() {
      const tipo = "1";
      const identity = cook.id_usuario.toString();
      console.log(identity);
      try {
        const respuesta = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/images`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tipo: tipo,
              identity: identity,
            }),
          }
        );

        if (!respuesta.ok) {
          throw new Error("Error al obtener la ruta");
        }

        const rutaRelativa = await respuesta.text(); // Obtener la ruta absoluta como texto
        const rutacam = rutaRelativa.replace(/['"]+/g, "");
        // Transformar la ruta absoluta en una ruta relativa dentro del contexto de la aplicación Next.js
        console.log(rutacam);

        setRoute(require("@/../../public/usuarios/" + rutacam));
      } catch (error) {
        console.error("Error al obtener la ruta:", error);
      }
    }
    if (Object.keys(cook).length !== 0) {
      obtenerRuta();
    }
  }, [cook]);

  //esta función formatea la fecha de la tabla a un formato bonito :v
  function fechaBonitaVisualmente(date) {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const formattedDateUTC =
      date.getUTCFullYear() +
      "-" +
      ("0" + (date.getUTCMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getUTCDate()).slice(-2) +
      " " +
      ("0" + date.getUTCHours()).slice(-2) +
      ":" +
      ("0" + date.getUTCMinutes()).slice(-2);
    return formattedDateUTC;
  }
  const[mEvent, setMEvent] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null);
  
  const changeImage = async () => {
    if (!selectedFile) {
      toast.error("Debe de elegir una imagen diferente para actualizar foto", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    const formData = new FormData();
    formData.append('imagen', selectedFile);
    formData.append('nombrid', cook.id_usuario);
    try {
      const response = await axios.post(`/api/images/1`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      toast.success(response.data.mensaje);
      setTimeout(() => {
        window.location.reload()
      }, 1500);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <section className="parte1 container grid justify-center w-full">
        <div className="p1 md:flex p-10 grid gap-4">
          <div className="md:w-7/12 row-start-2">
            <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-10">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {cook.nombre + " " + cook.apellido}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {formatDate(cook.fechaNac)}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {cook.genero ? "Masculino" : "Femenino"}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {cook.telefono}
              </p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {cook.email}
              </p>
            </div>
          </div>
          <ToastContainer/>
          <div className=" flex flex-col gap-2 justify-center items-center">
            <div onMouseEnter={() => setMEvent(true)} onMouseLeave={() => setMEvent(false)} className="rounded-full">
             {!mEvent ?  <Image
                src={route}
                width={200}
                height={200}
                alt="Foto de perfil"
                className="rounded-full w-full h-full"
              /> :  <div>
                <Image
                src={edit}
                width={200}
                height={200}
                alt="Foto de perfil"
                className="rounded-full w-full h-full cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              />
              <button onClick={changeImage}>Cambiar Imagen</button>
              </div> }
            </div>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <Link
              href={"user/editar"}
              className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Editar
            </Link>
          </div>
        </div>
      </section>
      <section className="tabla container">
        <div className="p-10 relative overflow-x-auto overflow-y-scroll h-96">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  N° Res.
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha
                </th>
                <th scope="col" className="px-6 py-3">
                  primer servicio
                </th>
                <th scope="col" className="px-6 py-3">
                  posible barbero
                </th>
                <th scope="col" className="px-6 py-3">
                  Total
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <React.Fragment key={cita.idCita}>
                  <tr
                    
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      onClick={() => handleInvoiceOpen(cita)}
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {cita.idCita}
                    </td>
                    <td
                      className="px-6 py-4"
                      onClick={() => handleInvoiceOpen(cita)}
                    >
                      {fechaBonitaVisualmente(cita.fechaCorte)}
                    </td>
                    <td
                      onClick={() => handleInvoiceOpen(cita)}
                      className="px-6 py-4"
                    >
                      {cita.servicios[0]}
                    </td>
                    <td
                      onClick={() => handleInvoiceOpen(cita)}
                      className="px-6 py-4"
                    >
                      {cita.peluqueros[0]}
                    </td>
                    <td
                      onClick={() => handleInvoiceOpen(cita)}
                      className="px-6 py-4"
                    >
                      ${cita.totalCorte}
                    </td>
                    <td
                      onClick={() => handleInvoiceOpen(cita)}
                      className="px-6 py-4 flex"
                    >
                      <button>
                        <FontAwesomeIcon
                          style={{ color: "green" }}
                          icon={faPrint}
                        />
                        <strong>Imprimir</strong>
                      </button>
                    </td>
                    <td className="px-6 py-4 flex">
                      {" "}
                      {cita.citaRealizada == false && (
                        <button
                          className=" disabled:text-"
                          onClick={() => deleteCita(cita.idCita)}
                        >
                          <FontAwesomeIcon
                            style={{ color: "red" }}
                            icon={faTrash}
                          />
                          <strong>Eliminar</strong>
                        </button>
                      )}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <ModalProvider backgroundComponent={SpecialModalBackground}>
            <InvoiceModal
              isOpen={isInvoiceOpen}
              onBackgroundClick={handleInvoiceClose}
              onEscapeKeydown={handleInvoiceClose}
            >
              <div
                ref={invoiceRef}
                className="fondo w-full p-4 border-2 border-gray-300 rounded-lg"
                style={{
                  position: "relative",
                  backgroundImage: `url(${fondo.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <style jsx>{`
                  @media print {
                    .fondo {
                      background-image: url(${fondo.src}) !important;
                      -webkit-print-color-adjust: exact;
                    }
                  }
                `}</style>
                <div className="content invoice-content">
                  <div className="flex justify-center mb-4">
                    <Image src={logo} alt="Logo" className="w-16 h-16" />
                  </div>
                  {selectedCita && (
                    <div className="text-center mb-4">
                      <div className="invoice-row">
                        <p className="font-semibold">
                          Cliente:{" "}
                          <span className="font-normal">
                            {cook.nombre + " " + cook.apellido}
                          </span>
                        </p>
                      </div>
                      <div className="invoice-row">
                        <p className="font-semibold">
                          Barbero:{" "}
                          <span className="font-normal">
                            {selectedCita.peluqueros[0]}
                          </span>
                        </p>
                      </div>
                      <div className="invoice-row">
                        <p className="font-semibold">
                          Fecha:{" "}
                          <span className="font-normal">
                            {fechaBonitaVisualmente(selectedCita.fechaCorte)}
                          </span>
                        </p>
                      </div>
                      <div className="invoice-row">
                        <p className="font-semibold">
                          Servicios: <br />
                          {selectedCita.servicios.map((servicio, index) => (
                            <span key={index} className="font-normal">
                              {" "}
                              {servicio}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="text-center font-semibold">
                    <p>
                      Total:{" "}
                      <span className="font-normal">
                        ${selectedCita ? selectedCita.totalCorte : ""}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <ReactToPrint
                trigger={() => (
                  <Button>
                    Imprimir{" "}
                    <FontAwesomeIcon
                      style={{ color: "white" }}
                      icon={faPrint}
                    />
                  </Button>
                )}
                content={() => invoiceRef.current}
                pageStyle="@page { size: auto; margin: 20mm; }"
              />
            </InvoiceModal>
          </ModalProvider>
        </div>
      </section>
      <Link
        className="bg-ligthbrown gold py-2 px-8 font-semibold rounded-full hover:bg-yellow-500 hover:text-amber-950"
        href={"user/reservar"}
      >
        Reservar
      </Link>
    </div>
  );
};

export default Page;
