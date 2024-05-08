"use client"
import { createBlog, getBlogById, updateBlogByID } from '@/controllers/BlogController'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'



const Page = ({params}) => {
  const router = useRouter()
  const id = Number(params.id)
  const [blog, setBlog] = useState({
    titulo: "",
    contenido: ""
  });

  const handleChangeBlog = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    if(!isNaN(id)){
      if(params.id != 0){
        const update = async() =>{
            const {titulo, contenido} = await getBlogById(id)
            setBlog({titulo, contenido})
        }
        update();
      }      
    } else {
      router.push("/blog");      
    }
  }, [id])

  const handleSubmit = async(e) => {
      e.preventDefault();
      if(blog.titulo != "" && blog.contenido !=""){
        if(id === 0){
          console.log("Creacion de Blog")
          await createBlog(blog)
          window.location.assign("/blog")
        } else {
          await updateBlogByID(id, blog);
          window.location.assign("/blog")
       }
      } else{
        return 
      }      
  }

  return (
    <div className='flex flex-col items-center'>
      <h2 className="nosotros my-8 font-bold text-3xl text-center m-11/12 brown">{id == 0 ? "Agregar Entrada" : "Editar Entrada"}</h2>
      <div className='contenedor '>
        <form className='md:mx-4 my-4' onSubmit={handleSubmit}>
         <div className='md:flex flex-col items-center'>
          <input className='md:mx-4 px-2 w-full md:w-2/5' name="titulo" type="text" value={ blog.titulo} onChange={handleChangeBlog} required/>
         </div>
          <div className='md:mx-4 my-3'>
            <div>
              <label htmlFor="" className='brown font-bold' >Contenido</label>
              <textarea className='pading-100 h-72 mt-2' name="contenido" id="" value={blog.contenido} onChange={handleChangeBlog} required></textarea>
            </div>
          </div>
          <div className='md:flex flex-col items-end mx-4'>
            <input type="submit" value={"Guardar"} className='bg-black text-white font-bold py-2 px-4 rounded-full cursor-pointer'/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Page