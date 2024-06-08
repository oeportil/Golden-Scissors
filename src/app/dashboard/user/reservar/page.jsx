"use client";
import { useState, useEffect } from "react";
import {
  getCategoServicios,
  getServicesByCat,
} from "@/controllers/ServiciosController";
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import "@/styles/reservar.css";

//para el slider del modal
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SelectServCard from "@/app/components/selectServCard";

//Para el toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getFechas } from "@/controllers/ReservaController";
import { horaReserva } from "@/utils/helpers";

import { getCookie } from "cookies-next";
import { formatDate } from "date-fns";

const StyledModal = Modal.styled`
  width: auto;
  height: auto;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;`;

const FadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const Page = () => {
  //settings para el modal de reservas
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
        },
      },
    ],
  };

  const [servs, setServs] = useState([]);
  const [activados, setActivados] = useState([]);
  const [categActv, setCategActv] = useState([]);
  const [servActiv, setServActiv] = useState([]);

  const [cook, setCook] = useState({});

  const user = getCookie("token");
  useEffect(() => {
    const cokie = () => {
      if (user !== undefined) {
        setCook(JSON.parse(user));
      }
    };
    cokie();
  }, [user]);

  useEffect(() => {
    const actv = servs.map((service) => service.id_categoria);
    const servid = servs.map((service) => service.id_servicio);
    setActivados(actv);
    setServActiv(servid);
  }, [servs]);

  //estados del modal
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  //estados de la tab
  const [activeTab, setActiveTab] = useState("servicios");

  //setear las categorias
  const [categs, setCategs] = useState([]);

  //para manejar fechas que se envian para la reservacion
  const[fecha, setFecha] = useState("");

  //state para fecha Y orden de funcion getdates
  const[fecOrden, setFecOrden] = useState([]) 

  const[datosFinales, setDatosFinales] = useState({})

  //state XD para Reservacion Final
  const[reservacion, setReservacion] = useState({})

  //state para Info de Reservacion
  const[info, setInfo] = useState({})

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
    setCategActv([]);
    return new Promise((resolve) => {
      setOpacity(0);
      setTimeout(resolve, 300);
    });
  }

  const handleTabClick = (tabId) => {
    if(servs.length == 0 && tabId == "fecha"){
        toast.error("No se han elegido servicios", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return 
    } else if((servs.length == 0  || Object.keys(datosFinales).length == 0) && tabId == "resumen") {
        //incluir la validacion si la fecha y hora existe
        toast.error("Debe de Seleccionar la Fecha y La Hora", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          return
    }
    setActiveTab(tabId);
  };

  const selected = (active) => {
    if (activados.includes(1) && active == 2 ) {
      toast.error("No se pueden elegir Cortes de pelo especiales", {
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
    } else if (activados.includes(2) && active == 1) {
      toast.error("No se pueden elegir Cortes de pelo tradicionales", {
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

    const datos = async () => {
      const servCatg = await getServicesByCat(active);
      await setCategActv(servCatg);
    };
    datos();

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const data = async () => {
      const categorias = await getCategoServicios();
      await setCategs(categorias);
    };
    data();
  }, [categs]);

  useEffect(() =>{
    setReservacion({...datosFinales, id_usu: cook.id_usuario})
    let precios = reservacion.orden?.map(precio => precio.precio)
    let minutos = reservacion.orden?.map(mins => mins.duracion)

    const tiempo = minutos?.reduce((total, numero) => {
      return total + numero;
    }, 0);

    const total = precios?.reduce((total, numero) => {
      return total + numero;
    }, 0);
    
    setInfo({ total, tiempo})   
  }, [datosFinales])

  useEffect(() =>{
    setDatosFinales({})
    setFecOrden([])
  }, [servs])


  return (
    <>
      <h2 className="brown mt-4 text-center text-2xl font-semibold">
        Reservaciones
      </h2>

      <div className="flex justify-center">
        <div className="my-4 border-b  dark:border-gray-700 w-11/12 md:w-9/12">
          <ul
            className="grid md:grid-cols-3 -mb-px text-sm font-medium text-center "
            id="default-tab"
            role="tablist"
          >
            <li className="" role="presentation">
              <button
                className={` p-4 w-full  ${
                  activeTab === "servicios"
                    ? "bg-ligthbrown text-white"
                    : "bg-brown text-white"
                }`}
                id="servicios-tab"
                onClick={() => handleTabClick("servicios")}
                type="button"
                role="tab"
                aria-controls="servicios"
                aria-selected={activeTab === "servicios" ? "true" : "false"}
              >
                Servicios
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={` p-4 w-full  ${
                  activeTab === "fecha"
                    ? "bg-ligthbrown text-white"
                    : "bg-brown text-white"
                }`}
                id="fecha-tab"
                onClick={() => handleTabClick("fecha")}
                type="button"
                role="tab"
                aria-controls="fecha"
                aria-selected={activeTab === "fecha" ? "true" : "false"}
              >
                Fecha
              </button>
            </li>
            <li className="" role="presentation">
              <button
                className={` p-4 w-full  ${
                  activeTab === "resumen"
                    ? "bg-ligthbrown text-white"
                    : "bg-brown text-white"
                }`}
                id="resumen-tab"
                onClick={() => handleTabClick("resumen")}
                type="button"
                role="tab"
                aria-controls="resumen"
                aria-selected={activeTab === "resumen" ? "true" : "false"}
              >
                Resumen
              </button>
            </li>
          </ul>
          <div id="default-tab-content" className="bg-slate-200">
            <div
              className={`p-4 ${activeTab === "servicios" ? "" : "hidden"} `}
              id="servicios"
              role="tabpanel"
              aria-labelledby="servicios-tab"
            >
              <h3 className="text-center brown mb-8 text-xl font-semibold">
                Seleccionar Servicios
              </h3>
              <div className="grid md:grid-cols-3">
                {categs.map((categoria) => (
                  <div
                    key={categoria.id_categoria}
                    className={`px-2 p-5 m-4 bg-ligthbrown cursor-pointer  ${
                      activados.includes(categoria.id_categoria)
                        ? "border-yellow-400 border-4"
                        : " "
                    } `}
                    onClick={() => selected(categoria.id_categoria)}
                  >
                    <p className="text-center text-white font-semibold">
                      {categoria.nombre}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/**/}

            <div
              className={`p-5 ${activeTab === "fecha" ? "" : "hidden"}`}
              id="fecha"
              role="tabpanel"
              aria-labelledby="fecha-tab"
            >
              <h3 className="text-center brown mb-8 text-xl font-semibold">
                Seleccionar Fecha y Hora
              </h3>
              <div className="md:w-9/12 mx-auto">
                <label htmlFor="fecha" className="brown text-lg font-semibold">
                  Fecha
                </label>
                <div className=" mb-2 flex justify-between gap-6">
                  <input
                    type="date"
                    id="fecha"
                    className="input-field border-none mt-5"
                    value = {fecha}
                    onChange={(e) => setFecha(e.target.value)}
                  />
                  <button
                    onClick={buscarFechas}
                    className="bg-gold text-white rounded-lg  font-bold"
                  >
                    Buscar Fecha
                  </button>
                </div>

                <div className="grid">
                  <label
                    htmlFor="horaInicio"
                    className="brown text-lg font-semibold"
                  >
                    Seleccionar Hora de Inicio
                  </label>
                  <select onChange={e => setDatosFinales(JSON.parse(e.target.value))} className="input-field border-none mt-5">
                        {fecOrden.map((fecha, i) => (
                            <option key={i} value={JSON.stringify(fecha)}>{horaReserva(fecha.fecha)}</option>
                        ))}
                  </select>
                </div>                
              </div>
            </div>

            <div
              className={`p-4 ${activeTab === "resumen" ? "" : "hidden"}`}
              id="resumen"
              role="tabpanel"
              aria-labelledby="resumen-tab"
            >
              <h3 className="text-center brown mb-8 text-xl font-semibold">
                Resumen
              </h3>
              <div className="md:w-10/12 mx-auto flex justify-between">
                <div className="w-1/2 pr-4 border-r border-gray-300">
                  {reservacion?.orden?.map((reserv, i) => (
                    <div className="mb-4" key={i}>
                      <p className="font-semibold">{reserv.nombre}</p>
                      <p className="font-semibold">${reserv.precio}</p>
                      <p className="font-semibold text-slate-600">{reserv.duracion} mins</p>
                      <hr className="my-2" />
                    </div>
                  ))}
                 
                 
                </div>
                <div className="w-1/4 pl-4">
                  <h4 className="font-semibold mb-2">
                    Total a Pagar: <span className="font-normal">${info.total != undefined ? info.total : 0}</span>
                  </h4>
                  <p className="mb-1">
                    Tiempo estimado:{" "}
                    <span className="font-semibold">{info.tiempo != undefined ? info.tiempo : 0} min</span>
                  </p>
                  <p className="mb-1">
                    Fecha: <span className="font-semibold">31/04/24</span>
                  </p>
                  <p className="mb-1">
                    Hora:{" "}
                    <span className="font-semibold">3:00p.m. - 4:15p.m.</span>
                  </p>
                  <p className="text-gray-500 mt-4">
                    *Presentarse 15 minutos antes de su cita
                  </p>
                  <button
                    onClick={hacerReservacion}
                    className="btn-continue mt-4"
                  >
                    Finalizar Reservación
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal que se abre */}
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
          <h3 className="text-black text-3xl text-center">
            Seleccione el servicio que desea
          </h3>
          <div className="py-6 h-96 md:w-96 md:h-auto overflow-y-scroll md:overflow-y-visible">
            <div className="flex flex-col items-center md:flex-row  gap-2 overflow-x-scroll">
              {categActv.map((categ) => (
                <div
                  key={categ.id_servicio}
                  onClick={() => agregarLista(categ)}
                  className={`cursor-pointer ${
                    servActiv.includes(categ.id_servicio) &&
                    "border-yellow-400 border-b-4"
                  }`}
                >
                  <SelectServCard corte={categ} />
                </div>
              ))}
            </div>
          </div>
        </StyledModal>
      </ModalProvider>
      <ToastContainer />
    </>
  );

  function agregarLista(servicio) {
    let existe = servs.find(
      (service) => service.id_servicio === servicio.id_servicio
    );
    if (existe == undefined) {
      if (!activados.includes(servicio.id_categoria)) {
       
        setServs([...servs, servicio]);
      } else {
        toast.error("No se puede elegir un Servicio de la misma Categoria", {
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
    } else {
      const deleteServ = servs.filter(
        (service) => service.id_servicio !== servicio.id_servicio
      );
      setServs(deleteServ);
    }
    toggleModal();
  }

  function hacerReservacion() {
    console.log(reservacion);
  }


  async function buscarFechas() {
    if(fecha.length == 0 ){
        toast.error("Debe de Seleccionar una Fecha", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        return 
    }
    const fechaParse = new Date(fecha)
    const findF = {
        liservicios: servs,
        fechadato: fechaParse.toISOString()
    }
    const fechas = await getFechas(findF)

    if(fechas.status == 200){
      if(fechas.data.listafechas.length == 0 ){
        toast.error("No Hay Citas Disponibles para este dia", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setDatosFinales({})
        setFecOrden([])
        return 
      }
      setFecOrden(fechas.data.listafechas)
    } else if(fechas.status == 402){
      setDatosFinales({})
      setFecOrden([])
       toast.error("El local estara Cerrado, Debe de Seleccionar una Fecha Valida", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
     return 
    } else if(fechas.status == 404){
      setDatosFinales({})
      setFecOrden([])
       toast.error("No hay Horarios Disponibles para esta Fecha", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
     return 
    } else if(fechas.status == 400){
      setDatosFinales({})
      setFecOrden([])
       toast.error("Seleccione una fecha disponible", {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: true,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
     return 
    }

  }
};

export default Page;
