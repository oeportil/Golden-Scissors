"use client"
import { getEmpleados } from "@/controllers/EmpleadosController";
import { useEffect, useState } from "react"
import { formatDate } from "@/utils/helpers";
import Link from "next/link";



const Page = () => {
    const [empleado, setEmpleado] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
   


    useEffect(() => {
      const datos = async()=> {
        const empleados = await getEmpleados();
        await setEmpleado(empleados);
      }
      datos()    
    }, [])
    let empleados = []
    empleado.map(emp => {
        empleados.push({
            fechaContra: formatDate(emp.fechaContra),            
            nombre: `${emp.nombre} ${emp.apellido}`,           
            salario: emp.salario,
            id: emp.id_empleado,
        })
    })
    let records = [];
    let npage = 0;
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
  if(empleados.length != 0){    
    records = empleados.slice(firstIndex, lastIndex);
    npage = Math.ceil(empleados.length / recordsPerPage)
  }
  const numbers = [...Array(npage + 1).keys()].slice(1)

    console.log(empleados)

    const nextPage = () =>{
        if(currentPage !== lastIndex){
            setCurrentPage(currentPage + 1)
        }
    }
    const prePage = () =>{
        if(currentPage !== firstIndex){
            setCurrentPage(currentPage - 1 )
        }
    }
    const chhangeCPage = id =>{
        setCurrentPage(id)
    }
    const Despedir = id =>{

    }

  return (
    <div className='container mx-auto my-4'>
       <div className='flex flex-col md:flex-row md:justify-between items-center'>
            <h2 className='brown font-bold text-2xl text-center md:text-start '>Contratados</h2>
            <select name="" id="" className=''>
                <option value="" >Ultima Semana</option>
            </select>
       </div>

        

       <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                Fecha Contrato
                </th>
                <th scope="col" className="px-6 py-3">
                Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                Salario
                </th>
            </tr>
            </thead>
            <tbody>
            {empleados?.length !== 0 ?
                records.map((emple) => (
                <tr key={emple.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {emple.fechaContra}
                    </th>
                    <td className="px-6 py-4">
                    {emple.nombre}
                    </td>
                    <td className="px-6 py-4">
                    $ {emple.salario}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                        <Link className="bg-black text-white py-2 px-4 rounded-full hover:bg-slate-700" href={`#`}>Editar</Link>
                        <button className="bg-gold px-3 text-white rounded-full hover:bg-yellow-400" onClick={() => Despedir(emple.id)}>Despedir</button>
                    </td>
                </tr>
                ))
                : ""
            }
            </tbody>
        </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" 
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick={prePage}>Previous</a>
                    </li>
                    {
                        numbers.map((n, i)=>(
                            <li key={i}>
                                <a href="#"
                                onClick={() => chhangeCPage(n)} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">{n}</a>
                            </li>
                        ))
                    }
                    <li>
                        <a
                         href="#" 
                         onClick={nextPage}
                         className="flex items-center justify-center px-3 h-8 leading-tight text-gray-700 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
        <div className="flex justify-center">
            <Link href={""} className="bg-black text-white py-2 px-6 rounded-full hover:bg-slate-700">Agregar Empleado</Link>

            
        </div>        
    </div>
  )
}

export default Page