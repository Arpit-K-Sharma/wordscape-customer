import React from 'react'
import { Outlet, Navigate } from 'react-router'

function ProtectedRoutes() {
    let user = document.cookie;
    return user ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoutes;