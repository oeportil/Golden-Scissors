"use client"
import{ useState } from 'react'

const Page = () => {

    const [activeTab, setActiveTab] = useState("servicios");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
        <h2 className='brown text-center text-2xl font-semibold'>Sistema de Reservacion</h2>

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
                            <div className='grid md:grid-cols-3'>
                                
                            </div>  
                        </div>


                        <div className={`p-4 ${activeTab === "fecha" ? "" : "hidden"} `} id="fecha" role="tabpanel" aria-labelledby="fecha-tab">
                        <p className="text-sm ">This is some placeholder content the <strong className="font-medium ">Dashboard tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                        </div>

                        <div className={`p-4  ${activeTab === "resumen" ? "" : "hidden"} `} id="resumen" role="tabpanel" aria-labelledby="resumen-tab">
                        <p className="text-sm">This is some placeholder content the <strong className="font-medium ">Settings tab's associated content</strong>. Clicking another tab will toggle the visibility of this one for the next. The tab JavaScript swaps classes to control the content visibility and styling.</p>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Page