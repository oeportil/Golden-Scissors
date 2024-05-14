import { useState } from "react";
import { createUser } from "@/controllers/CreateAccountController";
import { prismaFecha } from "./helpers";

// Dentro de tu componente o función

export const useCrearCuentaLogic = () => {
  //state de los datos de nuevo usuario
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    admin: false,
    email: "",
    telefono: "",
    genero: true,
    fechaNac: "",
    password: "",
    imagen: "",
    nombrid: "0",
  });
  const [imagePreview, setImagePreview] = useState("");
  //state para cuando se repita la contraseña
  const [passwordRepeated, setPasswordRepeated] = useState("");
  //state para alertas
  const [alert, setAlert] = useState("");

  //tomando el cambio de los datos
  const handleChange = (e) => {
    if (e.target.name == "genero") {
      let gender = e.target.value == "true";

      setNewUser({ ...newUser, [e.target.name]: gender });
    } else if (e.target.name === "imagen") {
      const file = e.target.files[0];
      if (file) {
        // Previsualizar la imagen
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        // Guardar el archivo en el estado
        setNewUser({ ...newUser, [e.target.name]: file });
      }
    } else {
      setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newUser);
    //aca se valida que las contraseñas sean iguales a la hora de ingresarlas nuevamente
    if (newUser.password !== passwordRepeated) {
      setAlert("Las contraseñas no coinciden, ingrésalas de nuevo");
      return;
    }
    //esto valida que ningun campo este vacio por si alguien se le ocurre quitar el required de un input XD
    for (const key in newUser) {
      if (newUser[key] === "") {
        setAlert("Todos los campos son obligatorios");
        return;
      }
    }
    //valida que la imagen no este vacia
    if (newUser.imagen === undefined) {
      setAlert("Suba una imagen de perfil!!!");
      return;
    }
    //validación de fecha
    let fechaNacimiento = new Date(newUser.fechaNac);
    let fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    if (edad < 13) {
      setAlert("Debes ser mayor a 13 años");
      return;
    }
    setAlert("");
    try {
      const fecha = prismaFecha(newUser.fechaNac);
      newUser.fechaNac = fecha;
      const response = await createUser(newUser);
      console.log("Usuario creado:", response);
      setAlert("Usuario creado con éxito");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (error) {
      console.error("Error al crear el usuario:", error.message);
      setAlert("Error al crear el usuario");
    }
  };

  return {
    newUser,
    passwordRepeated,
    alert,
    handleChange,
    handleSubmit,
    setPasswordRepeated,
  };
};
