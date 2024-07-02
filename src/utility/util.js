import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const getRoleFromToken = () => {
  const token = Cookies.get("accessToken");
  if (token) {
    const decoded = jwtDecode(token);
    //console.log("DECODED " + decoded);
    return decoded.roles[0];
  } else {
    return Cookies.remove("accessToken");
  }
};

export const isAdmin = () => {
  return getRoleFromToken() === "ROLE_ADMIN"; // To do
  //|| getRoleFromToken() === "ROLE_USER"
  // Actually make employee login
};

export const isEmployee = () => {
  return getRoleFromToken() === "ROLE_USER";
};

export const isLoggedIn = () => {
  const token = Cookies.get("accessToken");
  return token ? true : false;
};

export const isCustomer = () => {
  return getRoleFromToken() === "ROLE_CUSTOMER";
};
