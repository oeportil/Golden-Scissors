import axios from "axios";

export async function getBlog() {
  const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  return result.data;
}

export async function getBlogById(id) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
  );
  return result.data;
}

export async function deleteBlogByID(id) {
  try {
    const result = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`
    );
    return result.data.mensaje;
  } catch (error) {
    console.log(error);
  }
}

export async function updateBlogByID(id, datos, imagen) {
  try {
    const result = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`,
      datos
    );
    //Agregamos la imagen
    const formData = new FormData();
    if (imagen) {
      formData.append("imagen", imagen); // Agregar la imagen al FormData
      formData.append("nombrid", id.toString());
      const result2 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/images/2`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicar que es un formulario multipart
          },
        }
      );
    }
  } catch (error) {}
}
export async function createBlog(datos, imagen) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/blog`,
      datos
    );
    //Agregamos la imagen
    if (imagen) {
      const formData = new FormData();
      formData.append("imagen", imagen); // Agregar la imagen al FormData
      formData.append("nombrid", "0");
      const result2 = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/images/2`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Indicar que es un formulario multipart
          },
        }
      );
    }
    return result.mensaje;
  } catch (error) {
    console.log(error);
  }
}
