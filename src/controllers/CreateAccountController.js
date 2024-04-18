import axios from "axios";
export async function createUser(newUser) {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/usuarios`,
      newUser
    );
    return result.data;
  } catch (error) {
    throw new Error("Error al crear el usuario: " + error.message);
  }
}
