import React from "react";
import "@/styles/admin.css";
import Image from "next/image";
import foto from "../../../../public/usuarios/def.jpg";
import Script from "next/script";

const page = () => {
  return (
    <div className="p-8 fondo text-white min-h-screen">
      <button
        data-modal-target="popup-modal2"
        data-modal-toggle="popup-modal2"
        className="block text-white boton1 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        type="button"
      >
        Search
      </button>

      <div className="md:flex justify-between">
        <div className="md:w-1/2 mr-4">
          <div className="justify-center text-center">
            <div
              id="popup-modal2"
              tabIndex="-1"
              className="bg-gray-800 bg-opacity-75 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div className="relative p-4 w-full max-w-4xl max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal2"
                  >
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center w-full">

                    <form class="max-w-md mx-auto p-2">
                      <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                      <div class="relative">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                          </svg>
                        </div>
                        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white " placeholder="Buscar reservación" required />
                        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 boton1 font-medium rounded-lg text-sm px-4 py-2 ">Search</button>
                      </div>
                    </form>

                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-8 py-3">N° Res</th>
                          <th scope="col" className="px-8 py-3">Usuario</th>
                          <th scope="col" className="px-8 py-3">Fecha</th>
                          <th scope="col" className="px-8 py-3">Agenda</th>
                          <th scope="col" className="px-8 py-3">Atendido por</th>
                          <th scope="col" className="px-8 py-3">Total</th>
                          <th scope="col" className="px-8 py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td className="px-8 py-4">1</td>
                          <td className="px-8 py-4">José Padilla</td>
                          <td className="px-8 py-4">2024-05-14</td>
                          <td className="px-8 py-4">4:30 p.m.</td>
                          <td className="px-8 py-4">Carlos Guerra</td>
                          <td className="px-8 py-4">$20.00</td>
                          <td className="px-8 py-4"></td>
                        </tr>
                        <tr className="bg-gray-50 dark:bg-gray-800">
                          <td className="px-8 py-4">2</td>
                          <td className="px-8 py-4">María López</td>
                          <td className="px-8 py-4">2024-05-15</td>
                          <td className="px-8 py-4">5:00 p.m.</td>
                          <td className="px-8 py-4">Jovani Vasquez</td>
                          <td className="px-8 py-4">$35.00</td>
                          <td className="px-8 py-4"></td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800">
                          <td className="px-8 py-4">3</td>
                          <td className="px-8 py-4">Pedro Gómez</td>
                          <td className="px-8 py-4">2024-05-16</td>
                          <td className="px-8 py-4">5:30 p.m.</td>
                          <td className="px-8 py-4">Carlos Guerra</td>
                          <td className="px-8 py-4">$45.00</td>
                          <td className="px-8 py-4"></td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-4 w-full">
                      <button
                        data-modal-hide="popup-modal2"
                        type="button"
                        className="text-white boton1 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="texto font-bold text-lg mb-4">Reservaciones</h2>
          </div>

          <div className="reser p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div className="w-3/4">
                <p>#5624561 - José Padilla</p>
                <p>7234-2357</p>
                <p>Corte tradicional, Barba</p>
                <p>4:30 p.m.</p>

                <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="boton1 texto font-bold py-2 px-4 rounded" type="button">
                  Detalles
                </button>


                <div id="default-modal" tabindex="-1" aria-hidden="true" class="bg-gray-800 bg-opacity-75 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
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
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
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
                </div>

                <button className="boton2 texto font-bold py-2 px-4 rounded ml-2">
                  Cancelar
                </button>
              </div>
              <div>
                <Image
                  src={foto}
                  alt="Foto del usuario"
                  className="rounded-full"
                  width={150}
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="reser p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div className="w-3/4">
                <p>#5624561 - José Padilla</p>
                <p>7234-2357</p>
                <p>Corte tradicional, Barba</p>
                <p>4:30 p.m.</p>
                <button data-modal-target="default-modal2" data-modal-toggle="default-modal2" class="boton1 texto font-bold py-2 px-4 rounded" type="button">
                  Detalles
                </button>

                <div id="default-modal2" tabindex="-1" aria-hidden="true" class="bg-gray-800 bg-opacity-75 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative p-4 w-full max-w-2xl max-h-full">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          #5624561
                        </h3>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          DETALLES
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-12 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal2">
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
                            <button id="dropdownB-1.1" data-dropdown-toggle="dropdownD-1.1"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Kruma Lui <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                              </button>

                              
                              <div id="dropdownD-1.1" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-1.1">
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
                            <button id="dropdownB-1.2" data-dropdown-toggle="dropdownD-1.2"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Kruma Lui <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                              </button>

                              
                              <div id="dropdownD-1.2" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-1.2">
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
                            <button id="dropdownB-1.3" data-dropdown-toggle="dropdownD-1.3"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Carlos Guerra <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                              </button>

                              
                              <div id="dropdownD-1.3" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-1.3">
                                    <li>
                                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Carlos Guerra</a>
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
                        <button data-modal-hide="default-modal2" type="button" class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>



                <button className="boton2 texto font-bold py-2 px-4 rounded ml-2">
                  Cancelar
                </button>
              </div>
              <div>
                <Image
                  src={foto}
                  alt="Foto del usuario"
                  className="rounded-full"
                  width={150}
                  height={100}
                />
              </div>
            </div>
          </div>
          <div className="reser p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="w-3/4">
                <p>#5624561 - José Padilla</p>
                <p>7234-2357</p>
                <p>Corte tradicional, Barba</p>
                <p>4:30 p.m.</p>
                <button data-modal-target="default-modal3" data-modal-toggle="default-modal3" class="boton1 texto font-bold py-2 px-4 rounded" type="button">
                  Detalles
                </button>

                <div id="default-modal3" tabindex="-1" aria-hidden="true" class="bg-gray-800 bg-opacity-75 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative p-4 w-full max-w-2xl max-h-full">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                      <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          #5624561
                        </h3>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                          DETALLES
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-12 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal3">
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
                            <button id="dropdownB-2.1" data-dropdown-toggle="dropdownD-2.1"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Kruma Lui <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                              </button>

                              
                              <div id="dropdownD-2.1" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-2.1">
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
                            <button id="dropdownB-2.2" data-dropdown-toggle="dropdownD-2.2"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Kruma Lui <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                              </button>

                              
                              <div id="dropdownD-2.2" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-2.2">
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
                            <button id="dropdownB-2.3" data-dropdown-toggle="dropdownD-2.3"  class="justify-between w-40 text-white bg-gray-500 hover:bg-gray-600  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Carlos Guerra <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                              </svg>
                              </button>

                              
                              <div id="dropdownD-2.3" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownD-2.3">
                                    <li>
                                      <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Carlos Guerra</a>
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
                        <button data-modal-hide="default-modal3" type="button" class="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cerrar</button>
                      </div>
                    </div>
                  </div>
                </div>



                <button className="boton2 texto font-bold py-2 px-4 rounded ml-2">
                  Cancelar
                </button>
              </div>
              <div>
                <Image
                  src={foto}
                  alt="Foto del usuario"
                  className="rounded-full"
                  width={150}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 ml-4">
          <div className="justify-center text-center">
            <h2 className="texto font-bold text-lg mb-4">Peluqueros actuales</h2>
          </div>
          <div className="p-1 boton1 mb-7">
            <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg" style={{ height: '19vh' }}>
              <div>
                <h3 className="font-bold">Walter white</h3>
                <p>Corte tradicional, Barba, Delineado, Tintado, Ajuste.</p>
                <button
                  data-modal-target="popup-modal3"
                  data-modal-toggle="popup-modal3"
                  className="block text-white reser font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Disponible
                </button>
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
              <div className="flex items-center">

              </div>
            </div>
          </div>
          <div className="p-1 boton1 mb-4">
            <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg" style={{ height: '19vh' }}>
              <div>
                <h3 className="font-bold">Carlos Guerra</h3>
                <p>Corte tradicional, Barba, Delineado, Tintado, Ajuste.</p>
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  className="block text-white reser font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Disponible
                </button>
                <div
                  id="popup-modal"
                  tabIndex="-1"
                  className="bg-gray-800 bg-opacity-75 hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        type="button"
                        className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal"
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
                          Carlos Guerra
                        </h3>
                        <button
                          data-modal-hide="popup-modal"
                          type="button"
                          className="text-white boton1 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Atender Visitante
                        </button>
                        <button
                          data-modal-hide="popup-modal"
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
              <div className="flex items-center">

              </div>
            </div>
          </div>

          <div className="p-1 mt-6" >
            <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg" style={{ height: '19vh' }}>
              <div>
                <h3 className="font-bold">Carlos Guerra</h3>
                <p>Corte tradicional, Barba, Delineado, Tintado, Ajuste.</p>
                <p className="text-white">Atendiendo - #5624561</p>
              </div>
              <div className="flex items-center">

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
