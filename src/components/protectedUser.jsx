import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn } from "../utility/util";

function ProtectedUser() {
  if (isLoggedIn()) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedUser;
