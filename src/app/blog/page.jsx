"use client"
import { useState, useEffect } from "react"
import EntradasBlog from "../components/EntradasBlog";
import { getBlog } from "@/controllers/BlogController";

const Page = () => {
  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBlog();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };
    if (blog.length === 0) {
      fetchData();
    }
  }, [blog]); 
  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="nosotros my-8 font-bold text-3xl brown">
        Blog
      </h2>
      <div className="w-11/12 md:grid md:w-10/12 md:gap-8 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
      {blog.length !== 0 ? blog.map( entrada => (
                    <EntradasBlog key={entrada.id_blog} entrada={entrada}/>
                  )) : <div className="my-5"> <p className="text-2xl font-bold text-slate-400">No hay nada que mostrar aqui</p></div> }
      </div>
    </div>
  )
}

export default Page
