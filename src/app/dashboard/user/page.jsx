import React from 'react';
import Image from "next/image";
import foto from "@/img/peril.jpg";

const Page = () => {
  return (
    <div>
      <section className="parte1">
        <div className="p1 flex p-10">

          <div className="w-7/12">
            <div className="bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 p-10">

              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Nombre</h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">Edad</p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">Género</p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">Contacto</p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <p className="font-normal text-gray-700 dark:text-gray-400">Correo</p>
            </div>
          </div>


          <div className="w-5/12 flex flex-col justify-center items-center">
            <div className='w-1/2 h-auto rounded-full'>
              <Image src={foto} alt="Foto de perfil" className='rounded-full'/>
            </div>

            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Editar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
