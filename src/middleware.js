"use server"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/login', '/crear-cuenta', '/', '/nosotros', '/servicios', '/blog']

export default async function protectR(req) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)
    const token = cookies().get('token')?.value

}   