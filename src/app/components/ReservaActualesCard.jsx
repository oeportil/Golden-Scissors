import Image from "next/image";
import foto from "../../../public/usuarios/def.jpg";

const ReservaActualesCard = () =>{
    return(
        <div className="reser p-4 rounded-lg mb-8">

        <div className="grid items-center lg:grid-cols-2 lg:place-items-end">
          <div className="my-auto">
            <div className="text-center md:text-start">
              <p>#5624561 - José Padilla 7234-2357</p>
              <p>Corte tradicional, Barba</p>
            </div>
            <div className="flex gap-4 lg:flex-row flex-col text-center lg:text-start ">
                <p>4:30 p.m.</p>
                <button className="bg-slate-500 texto font-bold py-1 px-4 rounded">
                Detalles
                </button>
                <button className="boton2 texto font-bold py-1 px-4 rounded">
                Cancelar
                </button>
            </div>
          </div>
          <div className="">
            <Image
              src={foto}
              alt="Foto del usuario"
              className="rounded-full my-3 mx-auto"
              width={100}
              height={100}
            />
          </div>
        </div>


        {/* <div id="default-modal" tabindex="-1" aria-hidden="true" class="bg-gray-800 bg-opacity-75 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
              <div class="relative p-4 w-full max-w-2xl max-h-full">

                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                  <div class=" flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      #5624561
                    </h3>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                      DETALLES
                    </h3>
                    <button type="button" class=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-12 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>

                  <div class="p-4 md:p-5 space-y-4 ml-10 mr-10">
                    <div class="text-gray-900 dark:text-white">
                      <div class="flex justify-between mb-4">
                        <div class="font-bold">José Padilla</div>
                        <div>7234-2357</div>
                        
                        
                      </div>
                      <div class="mb-4">
                        <div class="flex justify-between">
                          <span>Corte Tradicional</span>
                          
                        </div>
                        <div class="flex justify-between">
                          <span>Crew</span>
                          <span>$5</span>
                          
                        </div>
                        <div class="flex justify-between">
                        <span>4:30 p.m. - 5:15 p.m.</span>
                          
                        <button id="dropdownB-1" data-dropdown-toggle="dropdownD-1"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Kruma Lui <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                          </svg>
                          </button>

                          
                          <div id="dropdownD-1" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-1">
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kruma Lui</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Walter White</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Carlos Guerra</a>
                                </li>
                              </ul>
                          </div>

                        </div>
                      </div>
                      <div class="mb-4">
                        <div class="flex justify-between">
                          <span>Barba</span>
                          
                        </div>
                        <div class="flex justify-between">
                          <span>Candado</span>
                          <span>$4</span>
                          
                        </div>
                        <div class="flex justify-between">
                        <span>5:15 p.m. - 5:30 p.m.</span>
                        <button id="dropdowB-2" data-dropdown-toggle="dropdownD-2"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Kruma Lui <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                          </svg>
                          </button>

                          
                          <div id="dropdownD-2" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-2">
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kruma Lui</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Walter White</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Carlos Guerra</a>
                                </li>
                              </ul>
                          </div>
                        
                        </div>
                      </div>
                      <div class="mb-4">
                        <div class="flex justify-between">
                          <span>Delineado</span>
                          
                        </div>
                        <div class="flex justify-between">
                          <span>Cejas</span>
                          <span>$3</span>
                          
                        </div>
                        <div class="flex justify-between">
                        <span>5:30 p.m. - 5:45 p.m.</span>
                        <button id="dropdowB-3" data-dropdown-toggle="dropdownD-3"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  
                        font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                         type="button">Carlos Guerra <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                          </svg>
                          </button>

                          
                          <div id="dropdownD-3" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                              <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-3">
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Carlos Guerrai</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Walter White</a>
                                </li>
                                <li>
                                  <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kruma Lui</a>
                                </li>
                              </ul>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                      <div class="font-bold">25/05/2024</div>
                      <div className="font-bold">4:30 p.m. - 5:45 p.m.</div>
                      <div class="font-bold text-right">$12</div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button data-modal-hide="default-modal" type="button" class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cerrar</button>
                  </div>
                </div>
              </div>
        </div> */}
      </div>
    )
}

export default ReservaActualesCard