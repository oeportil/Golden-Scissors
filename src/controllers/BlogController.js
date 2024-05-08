import axios from "axios";

export async function getBlog() {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog`)
    return result.data
}

export async function getBlogById(id) {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`)
    return result.data
}

export async function deleteBlogByID(id){
    try {
        const result = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`)
        return result.data.mensaje
    } catch (error) {
        console.log(error)
    }
}