import React from 'react'

const PeluquerosActualesCard = ({empleado}) => {
    let services = "";
    empleado.cateCapacitadas.map(categ => {
        services += " "+categ.categoria.nombre+","
    })
    console.log(services)
  return (
    <div className="p-1 boton1 mb-7">
    <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg" style={{ height: '19vh' }}>
      <div>
        <h3 className="font-bold text-start">{empleado.nombre+" "+empleado.apellido}</h3>
       <p>{services}</p>
        <button
          data-modal-target="popup-modal3"
          data-modal-toggle="popup-modal3"
          className="block text-white reser font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Disponible
        </button>
        {/* Modal que se abre */}
        <div
          id="popup-modal3"
          tabIndex="-1"
          className="bg-gray-800 bg-opacity-75 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-modal3"
              >
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Walter white
                </h3>
                <button
                  data-modal-hide="popup-modal3"
                  type="button"
                  className="text-white boton1 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  Atender Visitante
                </button>
                <button
                  data-modal-hide="popup-modal3"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium boton2"
                >
                  Retirar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  )
}

export default PeluquerosActualesCard