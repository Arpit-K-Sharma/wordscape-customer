import React from "react";
import { NavLink } from "react-router-dom";
import logo from ".././images/logo/LogoOnly.png";

function UserDrawer() {
  return (
    <div className="drawer-side font-archivo z-10">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-zinc-700 text-white">
        <li className="mt-[40px]">
          <img
            width="120"
            height="120"
            src={logo}
            alt="Logo"
            className="mx-auto my-1 mb-5"
          />
        </li>
        <li>
          <NavLink to="/user/dashboard">
            <p className="text-xl font-light">User Dashboard</p>
          </NavLink>
        </li>
        <br></br>
        <li>
          <NavLink to="/user/edit">
            <p className="text-xl mb-3 font-light">Profile</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/orders">
            <p className="text-xl mb-3 font-light">Recent Orders</p>
          </NavLink>
        </li>
        <br></br>
        <li>
          <NavLink to="/">
            <p className="text-xl mb-3 font-bold top-[50px]">Logout</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserDrawer;
