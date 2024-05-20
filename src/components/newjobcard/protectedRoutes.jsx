import React from 'react';
import { Outlet, Navigate } from 'react-router';
import Cookies from 'js-cookie';

function ProtectedRoutes() {
    const token = Cookies.get('token');
    return token ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;