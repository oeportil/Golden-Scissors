import axios from "axios";

export async function getServices() {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/servicios`
  );
  return result.data;
}

export async function getServicesById(id) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/servicios/${id}`
  );
  return result.data;
}

export async function getServicesByCat(cat) {
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/servcat/${cat}`
  );
  return result.data;
}

export async function getCategoServicios(){
  const result = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categoria`
  )
  return result.data
}