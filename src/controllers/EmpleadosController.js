import axios from "axios";

export async function getEmpleados() {
  const empleados = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/datosempleo`
  );
  return empleados.data;
}
export async function getEmpContraConServ() {
  const empleados = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/obtenerempdash`
  );
  return empleados.data;
}

export async function cambiarEstado(estado, id) {
  const estate = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/empleaestado/${id}`,
    { estado: parseInt(estado) }
  );
  return estate.data;
}

export async function getEmpleadoById(id) {
  const empleados = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/empleados/${id}`
  );
  return empleados.data;
}
export async function getCategsById(id) {
  const empleados = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categcapacita/${id}`
  );
  return empleados.data;
}
export async function getHorarios() {
  const horarios = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/horario`
  );

  return horarios.data;
}
export async function getCategorias() {
  const categorias = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categorias`
  );
  return categorias.data;
}
export async function updateEmpleado(id, update, selecto) {
  update.id_horarioEmpleado = Number(update.id_horarioEmpleado);
  update.salario = Number.parseFloat(update.salario);
  if (update.salario <= 0) {
    return "Salario Debe de ser mayor a cero";
  }
  delete update.id_empleado;
  let i = 0;
  Object.keys(update).map((emp) => {
    if (Object.values(update)[i] == "" || Object.values(update)[i] == 0) {
      return "Ocurrio un error";
    }
    i++;
  });
  const empeAct = axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/empleados/${id}`,
    update
  );
  const cateAct = axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/categcapacita/${id}`,
    selecto
  );
  return empeAct.data;
}
export async function despedirEmpleado(id) {
  console.log(id);
  const despedir = { contratado: false };
  const desp = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_URL}/empleados/${id}`,
    despedir
  );
  console.log(desp.data);
  return desp.data;
}
export async function createEmpleado(empleado, selecto) {
  const {
    nombre,
    apellido,
    contratado,
    direccion,
    email,
    estado,
    fechaContra,
    genero,
    id_horarioEmpleado,
    salario,
    telefono,
  } = empleado;
  const nuevoEmpleado = {
    nombre,
    apellido,
    contratado,
    direccion,
    email,
    estado,
    fechaContra,
    genero,
    id_horarioEmpleado,
    salario,
    contratado: true,
    telefono,
  };

  let i = 0;
  Object.keys(nuevoEmpleado).map((emp) => {
    if (
      Object.values(nuevoEmpleado)[i] == "" ||
      Object.values(nuevoEmpleado)[i] == 0
    ) {
      return "Ocurrio un error";
    }
    i++;
  });
  nuevoEmpleado.id_horarioEmpleado = Number(nuevoEmpleado.id_horarioEmpleado);
  nuevoEmpleado.genero = nuevoEmpleado.genero === "true";
  nuevoEmpleado.salario = Number.parseFloat(nuevoEmpleado.salario);
  if (nuevoEmpleado.salario <= 0) {
    return "Salario Debe de ser mayor a cero";
  }
  console.log(nuevoEmpleado);
  const emplea = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/empleados`,
    nuevoEmpleado
  );
  const categca = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/categcapacita`,
    selecto
  );
  return emplea.data;
}

export async function AtendVisit(id) {
  try {
    const atnv = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/empleadash/${id}`,
      { estado: 2 }
    );
    return atnv;
  } catch (error) {
    return error;
  }
}
