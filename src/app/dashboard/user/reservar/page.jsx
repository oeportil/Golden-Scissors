"use client"
import { useState, useEffect } from 'react'
import { getCategoServicios, getServicesByCat} from '@/controllers/ServiciosController';
import Modal, { ModalProvider, BaseModalBackground } from "styled-react-modal";
import styled from "styled-components";
import "@/styles/reservar.css";

//para el slider del modal
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SelectServCard from '@/app/components/selectServCard';


const StyledModal = Modal.styled`
  width: auto;
  height: auto;
  display: flex;
  padding: 3rem;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
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
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true,
            },
          },
        ],
      };

    //estados del modal
    const [isOpen, setIsOpen] = useState(false);
    const [opacity, setOpacity] = useState(0);

      //estados de la tab 
    const [activeTab, setActiveTab] = useState("servicios");

    //setear las categorias
    const [categs, setCategs] = useState([]);
    //setear los servicios de cada categoria
    const [categActv, setCategActv] = useState([])

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
        setCategActv([])
        return new Promise((resolve) => {
            setOpacity(0);
            setTimeout(resolve, 300);
        });       
    }

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const selected = active => {

        const datos = async () => {
            const servCatg = await getServicesByCat(active)
            await setCategActv(servCatg)
        }
        datos()
        console.log(categActv)
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const data = async () => {
            const categorias = await getCategoServicios();
            await setCategs(categorias);

        }
        data()
    }, [categs])

    return (
        <>
            <h2 className='brown mt-4 text-center text-2xl font-semibold'>Reservaciones</h2>

            <div className='flex justify-center'>
                <div className="my-4 border-b  dark:border-gray-700 w-11/12 md:w-9/12">
                    <ul className="grid md:grid-cols-3 -mb-px text-sm font-medium text-center " id="default-tab" role="tablist">
                        <li className="" role="presentation">
                            <button
                                className={` p-4 w-full  ${activeTab === "servicios" ? "bg-ligthbrown text-white" : "bg-brown text-white"}`}
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
                                className={` p-4 w-full  ${activeTab === "fecha" ? "bg-ligthbrown text-white" : "bg-brown text-white"}`}
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
                                className={` p-4 w-full  ${activeTab === "resumen" ? "bg-ligthbrown text-white" : "bg-brown text-white"}`}
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
                    <div id="default-tab-content" className='bg-slate-200'>
                        <div className={`p-4 ${activeTab === "servicios" ? "" : "hidden"} `} id="servicios" role="tabpanel" aria-labelledby="servicios-tab">
                            <h3 className='text-center brown mb-8 text-xl font-semibold'>Seleccionar Servicios</h3>
                            <div className='grid md:grid-cols-3'>
                                {categs.map(categoria => (
                                    <div
                                        key={categoria.id_categoria}
                                        className={`px-2 p-5 m-4 bg-ligthbrown cursor-pointer ${categoria.id_categoria === categActv ? "border-yellow-400 border-4" : " "}`}
                                        onClick={() => selected(categoria.id_categoria)}>
                                        <p className='text-center text-white font-semibold'>{categoria.nombre}</p>
                                    </div>
                                ))}
                            </div>

                        </div>


                        <div className={`p-5 ${activeTab === "fecha" ? "" : "hidden"}`} id="fecha" role="tabpanel" aria-labelledby="fecha-tab">
                            <h3 className='text-center brown mb-8 text-xl font-semibold'>Seleccionar Fecha y Hora</h3>
                            <div className='md:w-9/12 mx-auto'>
                                <div className='grid mb-2'>
                                    <label htmlFor="fecha" className='brown text-lg font-semibold'>Fecha</label>
                                    <input type="date" id="fecha" className='input-field border-none mt-5' />
                                </div>
                                <div className='grid'>
                                    <label htmlFor="horaInicio" className='brown text-lg font-semibold'>Seleccionar Hora de Inicio</label>
                                    <input type="time" id="horaInicio" className='input-field border-none mt-5' />
                                </div>
                                <p className='brown text-lg font-semibold mt-5'>
                                    Hora de Finalización: 4:15p.m.
                                </p>
                            </div>
                            <div className='flex justify-between mt-8 p-10'>
                                <button className='btn-back'>Regresar</button>
                                <button className='btn-continue'>Continuar</button>
                            </div>
                        </div>


                        <div className={`p-4 ${activeTab === "resumen" ? "" : "hidden"}`} id="resumen" role="tabpanel" aria-labelledby="resumen-tab">
                            <h3 className="text-center brown mb-8 text-xl font-semibold">Resumen</h3>
                            <div className="md:w-10/12 mx-auto flex justify-between">
                                <div className="w-1/2 pr-4 border-r border-gray-300">
                                    <div className="mb-4">
                                        <p className="font-semibold">Corte Tradicional</p>
                                        <p className="text-gray-500">Crew</p>
                                        <p className="font-semibold">$5</p>
                                        <p>3:00p.m. - 3:45p.m.</p>
                                        <hr className="my-2" />
                                    </div>
                                    <div className="mb-4">
                                        <p className="font-semibold">Barba</p>
                                        <p className="text-gray-500">Candado</p>
                                        <p className="font-semibold">$4</p>
                                        <p>3:45p.m. - 4:00p.m.</p>
                                        <hr className="my-2" />
                                    </div>
                                    <div className="mb-4">
                                        <p className="font-semibold">Delineado</p>
                                        <p className="text-gray-500">Cejas</p>
                                        <p className="font-semibold">$3</p>
                                        <p>4:00p.m. - 4:15p.m.</p>
                                        <hr className="my-2" />
                                    </div>
                                    <button className="btn-back mt-4">Regresar</button>
                                </div>
                                <div className="w-1/4 pl-4">
                                    <h4 className="font-semibold mb-2">Total a Pagar: <span className="font-normal">$12</span></h4>
                                    <p className="mb-1">Tiempo estimado: <span className="font-semibold">75 min</span></p>
                                    <p className="mb-1">Fecha: <span className="font-semibold">31/04/24</span></p>
                                    <p className="mb-1">Hora: <span className="font-semibold">3:00p.m. - 4:15p.m.</span></p>
                                    <p className="text-gray-500 mt-4">*Presentarse 15 minutos antes de su cita</p>
                                    <button className="btn-continue mt-4">Finalizar Reservación</button>
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
                <div className='py-6'>
                    <h3 className='text-black text-3xl '>Seleccione el servicio que desea</h3>
                    <Slider {...settings} className="m-7 w-auto">
                        {categActv.map(categ => (
                            <SelectServCard key={categ.id_servicio} corte={categ} />
                        ))} 
                    </Slider>                            
                </div>
            </StyledModal>
            </ModalProvider>
        </>
    )
}

export default Page