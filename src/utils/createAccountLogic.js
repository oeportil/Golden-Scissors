import { useState } from "react";
import { createUser } from "@/controllers/CreateAccountController";

export const useCrearCuentaLogic = () => {
  //state de los datos de nuevo usuario
  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    admin: false,
    email: "",
    telefono: "",
    genero: "masculino",
    fechaNac: "",
    password: "",
  });

  //state para cuando se repita la contraseña
  const [passwordRepeated, setPasswordRepeated] = useState("");
  //state para alertas
  const [alert, setAlert] = useState("");

  //tomando el cambio de los datos
  const handleChange = (e) => {
    if (e.target.name === "genero") {
      let gender = e.target.value === "masculino" ? true : false;
      setNewUser({ ...newUser, genero: gender });
    }
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
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

    setAlert("");
    try {
      const response = await createUser(newUser);
      console.log("Usuario creado:", response);
      setAlert("Usuario creado con exito");
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
