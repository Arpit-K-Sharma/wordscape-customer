import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getRoleFromToken } from "../utility/util";

function ProtectedStaff() {
  if (getRoleFromToken() === "ROLE_USER") {
    // Render the admin routes if the adminToken cookie exists
    return <Outlet />;
  } else {
    // Redirect to the login page if no adminToken cookie exists
    return <Navigate to="/" replace />;
  }
}

export default ProtectedStaff;
