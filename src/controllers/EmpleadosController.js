import axios from "axios"

export async function getEmpleados(){
    const empleados = await axios.get( `${process.env.NEXT_PUBLIC_API_URL}/empleados`);
    return empleados.data
}
export async function getEmpleadoById(id) {
    const empleados = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/empleados/${id}`)
    return empleados.data
}
export async function getHorarios() {
    const horarios = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/horario`)
    return horarios.data
}
export async function createEmpleado(empleado) {
    const {nombre, apellido, contratado, direccion, email, estado, fechaContra, genero, id_horarioEmpleado, salario, telefono} = empleado
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
        telefono
    }
    
   let i = 0;
   Object.keys(nuevoEmpleado).map( emp => {    
        if(Object.values(nuevoEmpleado)[i] == "" || Object.values(nuevoEmpleado)==0){
            return "Ocurrio un error"
        }        
        i++
    })
    nuevoEmpleado.id_horarioEmpleado = Number(nuevoEmpleado.id_horarioEmpleado)
    nuevoEmpleado.genero = (nuevoEmpleado.genero === 'true')
    nuevoEmpleado.salario = Number.parseFloat(nuevoEmpleado.salario)
    console.log(nuevoEmpleado)
    const emplea = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/empleados`, nuevoEmpleado)
    return emplea.data
}