import React from 'react';
import Image from "next/image";
import foto from "@/img/peril.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';





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
              <Image src={foto} alt="Foto de perfil" className='rounded-full' />
            </div>

            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Editar
            </button>
          </div>
        </div>
      </section>
      <section className='tabla'>


      <div className="p-10 relative overflow-x-auto">
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
                    Agenda
                </th>
                <th scope="col" className="px-6 py-3">
                    Atendido por
                </th>
                <th scope="col" className="px-6 py-3">
                    Total
                </th>
                <th scope="col" className="px-6 py-3">
                    
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                12343
                </th>
                <td className="px-6 py-4">
                20/05/2024 1:50 p.m
                </td>
                <td className="px-6 py-4">
                Corte de pelo, Corte de barba
                Estilo de cejas
                </td>
                <td className="px-6 py-4">
                Sin atender
                </td>
                <td className="px-6 py-4">
                $30.00
                </td>
                <td className="px-6 py-4">
                <FontAwesomeIcon icon={['fas', 'print']} />
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    --
                </th>
                <td className="px-6 py-4">
                    --/--/--
                </td>
                <td className="px-6 py-4">
                    --
                </td>
                <td className="px-6 py-4">
                    --
                </td>
                <td className="px-6 py-4">
                    --
                </td>
                <td className="px-6 py-4">
                <FontAwesomeIcon icon={['fas', 'print']} />
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    --
                </th>
                <td className="px-6 py-4">
                    --/--/--
                </td>
                <td className="px-6 py-4">
                    --
                </td>
                <td className="px-6 py-4">
                    --
                </td>
                <td className="px-6 py-4">
                    --
                </td>
                <td className="px-6 py-4">
                <FontAwesomeIcon icon={['fas', 'print']} />
                </td>
            </tr>
        </tbody>
    </table>
</div>

      </section>
    </div>
  );
};

export default Page;
