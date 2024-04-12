"use client"
import { getBlogById } from "@/controllers/BlogController"
import { useState, useEffect } from "react"
import { formatDate } from "@/utils/helpers"

const page = ({ params }) => {
  const [entrada, setEntrada] = useState({});

  useEffect(() => {
    const datos = async () => {
      try {
        const datos = await getBlogById(params.id)
        setEntrada(datos)
      } catch (error) {
        console.log(error)
      }
    };
    if (entrada) {
      datos()
    }
  }, [params.id])
  
  const { titulo, contenido, fechaMod } = entrada
  if(titulo === undefined){
    return (
      <div className="flex justify-center my-8">
          <div className="loader "></div>
      </div>
    )
  }
  return (
   
    <div>
      <h2 className="brown text-center text-3xl font-bold mb-7 mt-4">{titulo}</h2>

      <div className="flex flex-col items-center my-4">
        <div className="md:w-9/12 w-9/12">
          <p className="text-slate-500">{formatDate(fechaMod)}</p>
          <div className="separacion">
              <p className="text-justify mt-2">{contenido}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default page
