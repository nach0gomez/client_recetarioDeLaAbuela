import { Navigate } from "react-router-dom"
import {jwtDecode } from "jwt-decode"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useEffect, useState } from "react"
import { tokenApi } from "../api/token.api"

export function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false))
    },[])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const res= await tokenApi.post("token/refresh/", {
                refresh: refreshToken,
            })
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
                
            }else {
                setIsAuthorized(false)
            }
            
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decode = jwtDecode(token)
        const tokenExpiration = decode.exp
        const now = Date.now()/1000

        if(tokenExpiration < now){
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }

        

    }

    if (isAuthorized === null) {
        return <div>Cargando...</div>
    }

    return isAuthorized ? children: <Navigate to="/login/"/>

        
    
        
    
}