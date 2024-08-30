import React from "react";
import config from "../../../config.json";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo/LogoBG.png";
import { GoArrowUpRight } from "react-icons/go";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  isLoggedIn,
  isAdmin,
  isCustomer,
  isEmployee,
} from "../../utility/util";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  return (
    <div className="navbar lg:h-[12vh] relative bg-white max-lg:hidden text-black font-archivo flex justify-between items-center">
      <div className="navbar-start w-1/3" />
      <div className="navbar-center w-1/3 flex justify-center items-center">
        <NavLink to="/" className="flex items-center">
          <img
            width="200"
            height="200"
            src={logo}
            alt="Small Logo"
            className="mr-2"
          />
        </NavLink>
      </div>
      <div className="navbar-end w-1/3 flex justify-end">
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-[40px] text-[16px]">
            {isCustomer() && (
              <li>
                <NavLink to="/user/orders">
                  <a>Dashboard</a>
                </NavLink>
              </li>
            )}

            {isEmployee() && (
              <li>
                <NavLink to="/admin/dashboard">
                  <a>Staff Dashboard</a>
                </NavLink>
              </li>
            )}

            {isAdmin() && (
              <li>
                <NavLink to="/admin/dashboard">
                  <a>Admin Dashboard</a>
                </NavLink>
              </li>
            )}

            {isCustomer() && (
              <li>
                <NavLink to="/order/1">
                  <a>Place an order</a>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
        {isLoggedIn() || isAdmin() ? (
          <a
            className="mr-[25px] text-black flex items-center border md:hidden lg:hidden"
            onClick={handleLogout}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid black",
              textDecoration: "none",
              fontWeight: "bold",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            Logout{" "}
            <GoArrowUpRight color="black" size="25px" className="flex ml-1" />
          </a>
        ) : (
          <NavLink to="/login">
            <a
              className="mr-[25px] text-black flex items-center border md:hidden lg:hidden"
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid black",
                textDecoration: "none",
                fontWeight: "bold",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              Login{" "}
              <GoArrowUpRight color="black" size="25px" className="flex ml-1" />
            </a>
          </NavLink>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
