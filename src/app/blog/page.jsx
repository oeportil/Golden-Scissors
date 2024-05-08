"use client";
import usePeluqueria from "@/hooks/usePeluqueria";
import EntradasBlog from "../components/EntradasBlog";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import Link from "next/link";


const Page = () => {
  const [isadmin, setisAdmin] = useState(false);
  const { blog } = usePeluqueria();
 

  const user = getCookie("token");
  useEffect(() => {
    const cokie = () => {
      if (user !== undefined) {
        const {admin} =  JSON.parse(user);
        setisAdmin(admin)
      }
    };
    cokie();
  }, [user]);

  const handleRefresh = (id) => {
    window.location.reload();
    console.log("ENTRANDOs")
  };


  return (
  
   <>
    <h2 className="nosotros my-8 font-bold text-3xl text-center m-11/12 brown">Blog</h2>
    {isadmin ? <Link className="px-3 py-1 text-4xl font-bold bg-slate-600 rounded-full text-white mx-4" href={`/blog/administrar/${0}`}>+</Link>: ""}
     <div className="flex flex-col items-center mb-8">   
      
      <div className="w-11/12 md:grid md:w-10/12 md:gap-8 md:grid-cols-2 lg:grid-cols-3 content-center">
        {blog.length !== 0 ? (
          blog.map((entrada) => (
            <EntradasBlog key={entrada.id_blog} entrada={entrada} isadmin={isadmin} refresh={handleRefresh}/>
          ))
        ) : (
          <div className="my-5 col-start-2 flex justify-center">
            {" "}
            <div className="loader"></div>
          </div>
        )}
      </div>
    </div>
   </>
  );
};

export default Page;
