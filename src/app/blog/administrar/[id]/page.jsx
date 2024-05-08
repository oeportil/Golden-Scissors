"use client"
import { getBlogById } from '@/controllers/BlogController'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'


const Page = ({params}) => {
  const router = useRouter()
  const id = Number(params.id)
  const [datos, setDatos] = useState({});
  
  useEffect(() => {
    if(!isNaN(id)){
      if(params.id != 0){
        const update = async() =>{
            const data = await getBlogById(id)
            await setDatos(data);
        }
        update();
      }      
    } else {
      router.push("/blog");      
    }
  }, [id])
  console.log(datos)
  return (
    <>
      <h2 className="nosotros my-8 font-bold text-3xl text-center m-11/12 brown">{id == 0 ? "Agregar Entrada" : "Editar Entrada"}</h2>
      <div className='flex flex-col items-center flex-wrap '>
        <form className=''>
          <input className='' type="text" value={datos.titulo}/>
          <div className=''>
            <textarea className='' name="" id="" value={datos.contenido}></textarea>
          </div>
        </form>
      </div>
    </>
  )
}

export default Page