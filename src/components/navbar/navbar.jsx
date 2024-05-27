import React from "react";
import config from "../../../config.json";
import { NavLink } from "react-router-dom";
import logo from "../images/logo/LogoOnly.png";
import { GoArrowUpRight } from "react-icons/go";

function Navbar() {
  return (
    <div className="navbar bg-zinc-900 max-lg:hidden text-white font-archivo">
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
            <li>
              <NavLink to="/user/orders">
                <a>Dashboard</a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/1">
                <a>Place an order</a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cost">
                <a>Cost calculation</a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/jobcard">
                <a>JC</a>
              </NavLink>
            </li>
            <li>
              <a>Settings</a>
            </li>
          </ul>
        </div>
        <NavLink to="/login">
          <a className="mr-[25px]  text-white flex items-center ">
            Login{" "}
            <GoArrowUpRight color="white" size="25px" className="flex ml-1" />
          </a>
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
