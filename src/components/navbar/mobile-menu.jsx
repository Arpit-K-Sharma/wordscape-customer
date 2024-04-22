import React from "react";
import logo from "../images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";

function MobileMenu() {
  return (
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn mx-1 my-1 drawer-button lg:hidden"
        >
          <img
            width="26"
            height="26"
            src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
            alt="menu--v1"
          />
        </label>
        <div className="p-7 text-slate-200"></div>
      </div>
      <div className="drawer-side font-archivo">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-zinc-800 text-white">
          {/* Sidebar content here */}
          <li className="mt-[40px]">
            <img
              width="120"
              height="120"
              src={logo}
              alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
              className="mx-auto my-1 mb-5"
            />
            <p className="text-2xl mb-[30px] font-semibold">WordScape</p>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Dashboard</p>
          </li>
          <li>
            <NavLink to="/order/1">
              <p className="text-xl mb-3 font-light">Place an order</p>
            </NavLink>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Cost Calculation</p>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Statement</p>
          </li>
          <li>
            <NavLink to="/">
              <p className="text-xl mb-3 font-light">Logout</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
