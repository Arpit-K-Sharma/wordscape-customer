import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getRoleFromToken = () => {
  const token = Cookies.get("accessToken");
  if (token) {
    const decoded = jwtDecode(token);
    console.log("DECODED " + decoded);
    return decoded.roles[0];
  } else {
    return false;
  }
};

export const isAdmin = () => {
  return getRoleFromToken() === "ROLE_ADMIN";
};

export const isLoggedIn = () => {
  return getRoleFromToken() === "ROLE_CUSTOMER";
};
