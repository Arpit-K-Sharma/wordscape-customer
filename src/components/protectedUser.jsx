import React from "react";
import { Navigate, Outlet } from "react-router";
import Cookies from "js-cookie";

function ProtectedUser() {
  const userToken = Cookies.get("userToken");

  if (userToken) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default ProtectedUser;
