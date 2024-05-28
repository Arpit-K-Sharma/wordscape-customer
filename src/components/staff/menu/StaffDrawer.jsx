import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo/LogoOnly.png";

function StaffDrawer() {
  return (
    <div className="drawer-side font-archivo z-10">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-zinc-700 text-white">
        <li className="mt-[40px]">
          <NavLink to="/">
            <img
              width="120"
              height="120"
              src={logo}
              alt="Logo"
              className="mx-auto my-1 mb-5"
            />
          </NavLink>
        </li>
        <li className="bg-zinc-700">
          <NavLink to="/staff/dashboard">
            <p className="text-2xl font-light text-center ml-[35px]">Home</p>
          </NavLink>
        </li>
        <br />
        <details className="dropdown dropdown-bottom font-archivo ">
          <summary className="m-1 btn text-xl font-archivo font-light bg-zinc-700 border-none text-white ml-[14px]">
            Catalogues
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px] ml-[6px]">
            <li>
              <NavLink to="/staff/paper">
                <p className="text-xl mb-3 font-light">Paper</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/papersize">
                <p className="text-xl mb-3 font-light">Paper Size</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/paperthickness">
                <p className="text-xl mb-3 font-light">Paper Thickness</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/binding">
                <p className="text-xl mb-3 font-light">Binding</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/lamination">
                <p className="text-xl mb-3 font-light">Lamination</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/covertreatment">
                <p className="text-xl mb-3 font-light">Cover Treatment</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/plate">
                <p className="text-xl mb-3 font-light">Plate</p>
              </NavLink>
            </li>
          </ul>
        </details>

        <details className="dropdown dropdown-bottom font-archivo">
          <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white">
            User Setup
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px]">
            <li>
              <NavLink to="/staff/customer">
                <p className="text-xl mb-3 font-light">Customers</p>
              </NavLink>
            </li>
          </ul>
        </details>

        <details className="dropdown dropdown-bottom font-archivo">
          <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white">
            Statements
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px]">
            <li>
              <NavLink to="/staff/orders">
                <p className="text-xl font-light">Order</p>
              </NavLink>
            </li>
          </ul>
        </details>
        <div className="mb-[130px]"></div>

        <li className="bg-gray-900 text-white rounded-lg">
          <NavLink to="/">
            <p className="text-xl mb-3 font-light top-[50px] ml-[34px]">
              Logout
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default StaffDrawer;