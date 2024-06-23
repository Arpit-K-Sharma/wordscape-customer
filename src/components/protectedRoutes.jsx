import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { isAdmin, isEmployee } from "../utility/util";

function ProtectedRoutes() {
  if (
    isAdmin() || isEmployee()
  ) {
    // Render the admin routes if the adminToken cookie exists
    return <Outlet />;
  } else {
    // Redirect to the login page if no adminToken cookie exists
    return <Navigate to="/" replace />;
  }
}

export default ProtectedRoutes;
