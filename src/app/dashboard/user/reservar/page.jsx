"use client"
import{ useState, useEffect } from 'react'
import { getCategoServicios, getServicesByCat, getServicesById } from '@/controllers/ServiciosController';

const Page = () => {

    const [activeTab, setActiveTab] = useState("servicios");
    const [categs, setCategs] = useState([]);
    const[categActv, setCategActv] = useState("")

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const selected = active =>{

    const datos = async() => {
        const servCatg = await getServicesByCat(active)
        await console.log(servCatg)
    }
    datos()

    setCategActv(active)
  }

    useEffect(() => {      
      const data = async() =>{
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
                                    className={`px-2 p-5 m-4 bg-ligthbrown cursor-pointer ${categoria.id_categoria === categActv ? "border-yellow-400 border-4": " "}`}                                     
                                    onClick={() => selected(categoria.id_categoria)}>
                                        <p className='text-center text-white font-semibold'>{categoria.nombre}</p>
                                    </div>
                                ))}
                            </div>
                            
                        </div>


                        <div className={`p-4 ${activeTab === "fecha" ? "" : "hidden"} `} id="fecha" role="tabpanel" aria-labelledby="fecha-tab">
                            <h3 className='text-center brown mb-8 text-xl font-semibold'>Seleccionar Fecha y Hora</h3>        
                           <div className='md:w-9/12 mx-auto'>
                                <div className='grid mb-2'>
                                    <label htmlFor="" className='brown text-lg font-semibold'>Fecha</label>
                                    <input type="date" className='border-none'/>
                                </div>
                                <div className='grid'>
                                    <label htmlFor="" className='brown text-lg font-semibold'>Seleccionar Hora de Inicio</label>
                                    <input type="time" className='border-none' />
                                </div>    
                                <p className='brown text-lg font-semibold mt-5'>
                                Hora de Finalización: 4:15p.m.
                                </p>       
                            </div>                                             
                        </div>

                        <div className={`p-4  ${activeTab === "resumen" ? "" : "hidden"} `} id="resumen" role="tabpanel" aria-labelledby="resumen-tab">
                            <h3 className='text-center brown mb-8 text-xl font-semibold'>Resumen</h3>
                            <div>
                                <div>

                                </div>
                                <div>
                                    
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    
                </div>
            </div>
    </>
  )
}

export default Page