"use server"

import { NextResponse } from "next/server"


export function middleware(req) {
    const token = req.cookies.get("token")?.value

    if(req.nextUrl.pathname.startsWith('/dashboard') && !token){
        const response = NextResponse.redirect(new URL('/login', req.url))
        return response
    }

    if(token && req.nextUrl.pathname.startsWith('/login') ){
        const data = JSON.parse(token)   
        if(data.admin){
            const response = NextResponse.redirect(new URL('/dashboard/admin', req.url))
            return response
        } else {
            const response = NextResponse.redirect(new URL('/dashboard/user', req.url))
            return response
        }
    }

    if(token && req.nextUrl.pathname === '/dashboard/admin'){
        const data = JSON.parse(token)   
        if(!data.admin){
            const response = NextResponse.redirect(new URL('/dashboard/user', req.url))
            return response
        }
    }

    if(token && req.nextUrl.pathname === '/dashboard/user'){
        const data = JSON.parse(token)   
        if(data.admin){
            const response = NextResponse.redirect(new URL('/dashboard/admin', req.url))
            return response
        }
    }
}   