"use client"
import React, { useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { routes } from '@/lib/ProtectedRoutesList'
import { redirect, usePathname } from 'next/navigation'

const ProtectedRoute = ({children}) => {
    const {isAuth,user} = useSelector(store => store.userReducer);
    const pathname = usePathname();

    useLayoutEffect(() => {
        if(routes.includes(pathname) || pathname.includes('/stream/') || pathname.includes('/dashbaord')){
            if(isAuth === false){
                redirect('/login');
            }
        }    
    },[isAuth,pathname])

    useLayoutEffect(() => {
        if(isAuth === true && (pathname === '/login' || pathname === '/register')){
            if(user?.role == "streamer"){

                redirect('/dashboard')
            }else{

                redirect('/')
            }
        }
    },[isAuth,pathname])
  return (children)
}

export default ProtectedRoute