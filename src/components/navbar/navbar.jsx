import React from "react";
import config from "../../../config.json";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo/LogoOnly.png";
import { GoArrowUpRight } from "react-icons/go";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLoggedIn, isAdmin } from "../../utility/util";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

  return (
    <div className="navbar lg:h-[5vh] bg-zinc-900 max-lg:hidden text-white font-archivo">
      <div className="navbar-start ml-5">
        <NavLink to="/">
          <img
            width="32"
            height="32"
            src={logo}
            alt="Small Logo"
            className="ml-2"
          />
        </NavLink>
        <NavLink to="/">
          <a className="btn btn-ghost text-xl">{config.config.firmname}</a>
        </NavLink>
      </div>
      <div className="navbar-end">
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-[40px] text-[16px]">
            {isLoggedIn() && (
              <li>
                <NavLink to="/user/orders">
                  <a>Dashboard</a>
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

            {isLoggedIn() && (
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
            className="mr-[25px] text-white flex items-center cursor-pointer"
            onClick={handleLogout}
          >
            Logout{" "}
            <GoArrowUpRight color="white" size="25px" className="flex ml-1" />
          </a>
        ) : (
          <NavLink to="/login">
            <a className="mr-[25px] text-white flex items-center ">
              Login{" "}
              <GoArrowUpRight color="white" size="25px" className="flex ml-1" />
            </a>
          </NavLink>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Navbar;
