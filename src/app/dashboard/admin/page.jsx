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
        class="block text-white boton1  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        type="button"
      >
        Search
      </button>

      <div className="md:flex justify-between">
        <div className="md:w-1/2 mr-4">
          <div className="justify-center text-center">

            <div
              id="popup-modal2"
              tabindex="-1"
              class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
              <div class="relative p-4 w-full max-w-md max-h-full">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal"
                  >
                    <svg
                      class="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Close modal</span>
                  </button>
                  <div class="p-4 md:p-5 text-center">
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Product Details
                    </h3>

                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" class="px-6 py-3">
                            ID
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td class="px-6 py-4">1</td>
                          <td class="px-6 py-4">Product A</td>
                          <td class="px-6 py-4">$20.00</td>
                        </tr>
                        <tr class="bg-gray-50 dark:bg-gray-800">
                          <td class="px-6 py-4">2</td>
                          <td class="px-6 py-4">Product B</td>
                          <td class="px-6 py-4">$35.00</td>
                        </tr>
                        <tr class="bg-white dark:bg-gray-800">
                          <td class="px-6 py-4">3</td>
                          <td class="px-6 py-4">Product C</td>
                          <td class="px-6 py-4">$45.00</td>
                        </tr>
                      </tbody>
                    </table>
                    <div class="mt-4">
                      <button
                        data-modal-hide="popup-modal2"
                        type="button"
                        class="text-white boton1 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="texto  font-bold text-lg mb-4">Reservaciones</h2>
          </div>

          <div className="reser p-4 rounded-lg mb-8">
            <div className="flex justify-between items-center">
              <div className="w-3/4">
                <p>#5624561 - José Padilla</p>
                <p>7234-2357</p>
                <p>Corte tradicional, Barba</p>
                <p>4:30 p.m.</p>
                <button className="boton1 texto font-bold py-2 px-4 rounded">
                  Detalles
                </button>
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
                <button className="boton1 texto font-bold py-2 px-4 rounded">
                  Detalles
                </button>
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
                <button className="boton1 texto font-bold py-2 px-4 rounded">
                  Detalles
                </button>
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
            <h2 className="texto  font-bold text-lg mb-4">
              Peluqueros actuales
            </h2>
          </div>
          <div className="p-1 boton1 mb-4">
            <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg ">
              <div>
                <h3 className="font-bold">Carlos Guerra</h3>
                <p>Corte tradicional, Barba, Delineado, Tintado, Ajuste.</p>
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  class="block text-white reser  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Disponible
                </button>
                <div
                  id="popup-modal"
                  tabindex="-1"
                  class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        type="button"
                        class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                      >
                        <span class="sr-only">Close modal</span>
                      </button>
                      <div class="p-4 md:p-5 text-center">
                        <svg
                          class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Carlos white
                        </h3>
                        <button
                          data-modal-hide="popup-modal"
                          type="button"
                          class="text-white boton1 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Atender Visitante
                        </button>
                        <button
                          data-modal-hide="popup-modal"
                          type="button"
                          class="py-2.5 px-5 ms-3 text-sm font-medium boton2"
                        >
                          Retirar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
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
          <div className="p-1 boton1 mb-4">
            <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg ">
              <div>
                <h3 className="font-bold">Carlos Guerra</h3>
                <p>Corte tradicional, Barba, Delineado, Tintado, Ajuste.</p>
                <button
                  data-modal-target="popup-modal"
                  data-modal-toggle="popup-modal"
                  class="block text-white reser  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                >
                  Disponible
                </button>
                <div
                  id="popup-modal"
                  tabindex="-1"
                  class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                  <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <button
                        type="button"
                        class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        data-modal-hide="popup-modal"
                      >
                        <span class="sr-only">Close modal</span>
                      </button>
                      <div class="p-4 md:p-5 text-center">
                        <svg
                          class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Jovani Vasquez
                        </h3>
                        <button
                          data-modal-hide="popup-modal"
                          type="button"
                          class="text-white boton1 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                        >
                          Atender Visitante
                        </button>
                        <button
                          data-modal-hide="popup-modal"
                          type="button"
                          class="py-2.5 px-5 ms-3 text-sm font-medium boton2"
                        >
                          Retirar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
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

          <div className="p-1 mt-6 ">
            <div className="reser text-white p-4 py-4 flex items-center justify-between rounded-lg ">
              <div>
                <h3 className="font-bold">Carlos Guerra</h3>
                <p>Corte tradicional, Barba, Delineado, Tintado, Ajuste.</p>
                <p className="text-white">Atendiendo - #5624561</p>
              </div>
              <div className="flex items-center">
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
      </div>
    </div>
  );
};

export default page;
