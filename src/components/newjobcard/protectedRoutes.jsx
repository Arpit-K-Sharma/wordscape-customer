import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

function ProtectedRoutes() {
  const adminToken = Cookies.get("adminToken");

  if (adminToken) {
    // Render the admin routes if the adminToken cookie exists
    return <Outlet />;
  } else {
    // Redirect to the login page if no adminToken cookie exists
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoutes;
