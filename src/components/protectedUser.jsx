import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { isCustomer, isEmployee } from "../utility/util";

function ProtectedUser() {
  if (isCustomer()) {
    //
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedUser;
