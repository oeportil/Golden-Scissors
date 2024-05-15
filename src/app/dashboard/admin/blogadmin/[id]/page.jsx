"use client";
import {
  createBlog,
  getBlogById,
  updateBlogByID,
} from "@/controllers/BlogController";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const Page = ({ params }) => {
  const router = useRouter();
  const id = Number(params.id);
  const [blog, setBlog] = useState({
    titulo: "",
    contenido: "",
  });
  const [imagen, setImagen] = useState({
    img: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [ruta, setRuta] = useState("");
  const handleChangeBlog = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleChangeImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setImagen({ ...imagen, img: file });
    } else {
      setImagen({ ...imagen, img: "" });
      setImagePreview("");
    }
  };
  useEffect(() => {
    if (!isNaN(id)) {
      if (params.id != 0) {
        const update = async () => {
          const { titulo, contenido } = await getBlogById(id);
          setBlog({ titulo, contenido });
          //Colocando la imagen del update
          const tipo = "2";
          const identity = params.id;
          try {
            const respuesta = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/images`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  tipo: tipo,
                  identity: identity,
                }),
              }
            );

            if (!respuesta.ok) {
              throw new Error("Error al obtener la ruta");
            }

            const rutaRelativa = await respuesta.text(); // Obtener la ruta absoluta como texto
            const rutacam = rutaRelativa.replace(/['"]+/g, "");
            // Transformar la ruta absoluta en una ruta relativa dentro del contexto de la aplicación Next.js

            setRuta(require("@/../public/blog/" + rutacam));
          } catch (error) {
            console.error("Error al obtener la ruta:", error);
          }
        };
        update();
      }
    } else {
      router.push("/blog");
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blog.titulo != "" && blog.contenido != "") {
      if (id === 0) {
        console.log("Creacion de Blog");
        await createBlog(blog, imagen.img);
        window.location.assign("/blog");
      } else {
        await updateBlogByID(id, blog, imagen.img);
        window.location.assign("/blog");
      }
    } else {
      return;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="nosotros my-8 font-bold text-3xl text-center m-11/12 brown">
        {id == 0 ? "Agregar Entrada" : "Editar Entrada"}
      </h2>
      <div className="contenedor ">
        <form className="md:mx-4 my-4" onSubmit={handleSubmit}>
          <div className="md:flex flex-col items-center">
            <input
              className="md:mx-4 px-2 w-full md:w-2/5"
              name="titulo"
              type="text"
              value={blog.titulo}
              onChange={handleChangeBlog}
              required
            />
          </div>
          <br />
          <div className="grid lg:grid-cols-2">
            <div className="md:mx-4 my-3">
              <div>
                <label htmlFor="" className="brown font-bold">
                  Contenido
                </label>
                <textarea
                  className="pading-100 h-72 mt-2"
                  name="contenido"
                  id=""
                  value={blog.contenido}
                  onChange={handleChangeBlog}
                  required
                ></textarea>
              </div>
            </div>
            <div className="md:flex flex-col items-center">
              <input
                className="md:mx-4 px-2 w-full md:w-2/5"
                name="titulo"
                type="file"
                onChange={handleChangeImg}
              />
              {imagePreview ? (
                <Image
                  width={400}
                  height={400}
                  src={imagePreview}
                  alt={`Imagen del blog`}
                  className="w-full h-72"
                />
              ) : (
                ruta && (
                  <Image
                    width={400}
                    height={400}
                    src={ruta}
                    alt={`Imagen del blog`}
                    className="w-full h-72"
                  />
                )
              )}
            </div>
          </div>
          <br />
          <div className="md:flex flex-col items-end mx-4">
            <input
              type="submit"
              value={"Guardar"}
              className="bg-black text-white font-bold py-2 px-4 rounded-full cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
