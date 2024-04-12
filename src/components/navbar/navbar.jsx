import React from 'react'
import config from "../../../config.json"
import { NavLink } from 'react-router-dom'
import logo from "../images/logo/LogoOnly.png";


function Navbar() {
  return (
    <div className="navbar bg-zinc-900 max-lg:hidden text-white">
        <div className="navbar-start ml-5">
        <img
                width="32"
                height="32"
                src={logo}
                alt="Small Logo"
                className="ml-2"
              />
          <a className="btn btn-ghost text-xl">{config.config.firmname}</a>
        </div>
        <div className="navbar-end">
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-[40px] text-[16px]">
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Place an order</a>
              </li>
              <li>
                <a>Cost calculation</a>
              </li>
              <li>
                <a>Statement</a>
              </li>
              <li>
                <a>Setting</a>
              </li>
            </ul>
          </div>
          <NavLink to="/login">
          <a className="btn">Login</a>
          </NavLink>
        </div>
      </div>
  )
}

export default Navbar