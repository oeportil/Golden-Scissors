import axios from "axios";

export async function getBlog() {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`)
    return result.data
}