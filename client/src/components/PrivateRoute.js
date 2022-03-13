import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "../services/auth"
const PrivateRoute = () => {
    const { accessToken } = useAuthContext()
    console.log({ accessToken })
    return accessToken !== null ? (
        <Outlet />
    ) : (
        <Navigate to={{ pathname: "/login" }} />
    )
}

export default PrivateRoute
