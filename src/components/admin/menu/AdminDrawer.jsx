import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo/LogoOnly.png";

function AdminDrawer() {
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
          <NavLink to="/admin/dashboard">
            <p className="text-xl font-light">Admin Home</p>
          </NavLink>
        </li>
        <div className="dropdown dropdown-bottom font-archivo">
          <div tabIndex={0} role="button" className="btn m-1">
            Edit Product Details
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[180px]"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </div>

        <br></br>
        <li>
          <NavLink to="/admin/paper">
            <p className="text-xl mb-3 font-light">Paper</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/binding">
            <p className="text-xl mb-3 font-light">Binding</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/lamination">
            <p className="text-xl mb-3 font-light">Lamination</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/plate">
            <p className="text-xl mb-3 font-light">Plate</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users">
            <p className="text-xl mb-3 font-light">User</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/customer">
            <p className="text-xl mb-3 font-light">Customer</p>
          </NavLink>
        </li>
        <li>
          <p className="text-xl mb-[170px] font-light">Order</p>
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

export default AdminDrawer;
