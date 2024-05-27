"use client";
import React, { useEffect, useState } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { updateUserByID } from "@/controllers/UserController";
import { useRouter } from "next/navigation";


const Page = () => {
  const [cook, setCook] = useState({});
  const user = getCookie("token");
  const [elementos, setElementos] = useState("");
  const router = useRouter()
  useEffect(() => {
    const cokie = () => {
      if (user !== undefined) {
        setCook(JSON.parse(user));

      }
    };
    cokie();
  }, [user]);


  const handleChange = e =>{  
    setCook({...cook, [e.target.name]: e.target.value})
    console.log(cook)
  }
  const handleSubmit = async(e) => {
    e.preventDefault()   
    let usuarioMod = {}
    if(e.target[2].value == "" && e.target[3].value == ""){
        if(e.target[1].value != "" && e.target[0].value != ""){
            usuarioMod = {
                email: e.target[0].value,
                telefono: e.target[1].value
            }
        } else{
            setElementos("Faltan Campos que Llenar")
            return
        }
    } else {
       if(e.target[1].value != "" && e.target[0].value != ""){
           if(e.target[3].value == e.target[2].value){
            usuarioMod = {
                email: e.target[0].value,
                telefono: e.target[1].value,
                password: e.target[3].value
            }
           } else {
            setElementos("Las contraseñas deben de ser iguales")
            return
           }
       } else{
            setElementos("Faltan Campos que Llenar")
            return
       }
    }
    const mensaje = await updateUserByID(cook.id_usuario, usuarioMod)
    if(typeof mensaje == "string"){
        alert(mensaje)
        deleteCookie("token")
        router.push("/login")
    }
    
  }

  if(cook.id_usuario == undefined){
    return (
        <div className="flex justify-center my-8">
            <div className="loader "></div>
        </div>
    )
  }
  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg my-10">
  <h2 className="text-3xl font-bold text-center text-brown-500 mb-6">
    {cook.nombre + " " + cook.apellido}
  </h2>
  {elementos && 
    <div className="mb-6 text-center bg-red-600 py-2 text-white font-semibold uppercase">
      {elementos}
    </div>
  }
  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700">Email</label>
      <input 
        type="email" 
        name="email" 
        value={cook.email} 
        onChange={handleChange} 
        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="telefono" className="block text-gray-700">Teléfono</label>
      <input 
        type="tel" 
        name="telefono" 
        value={cook.telefono} 
        onChange={handleChange} 
        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-700">Contraseña</label>
      <input 
        type="password" 
        name="password" 
        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
      />
    </div>
    <div className="mb-6">
      <label htmlFor="passwordRep" className="block text-gray-700">Repetir Contraseña</label>
      <input 
        type="password" 
        name="passwordRep" 
        className="w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-950"
      />
    </div>
    <div className="text-center">
      <input 
        type="submit" 
        value="Cambiar datos de Usuario" 
        className="bg-brown gold font-bold py-2 px-4 rounded hover:bg-amber-800 transition duration-300 cursor-pointer"
      />
    </div>
  </form>
</div>

  );
};

export default Page;
