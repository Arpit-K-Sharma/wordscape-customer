import React from "react";
import logo from "../images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../../utility/util";

function MobileMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/");
  };

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
            src="https://img.icons8.com/?size=100&id=3096&format=png&color=1A1A1A"
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
            <NavLink to="/">
              <img
                width="140"
                height="140"
                src={logo}
                alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
                className="mx-auto my-1 mb-5"
              />
            </NavLink>
            <p className="text-2xl mb-[30px] font-semibold">WordScape</p>
          </li>

          {isLoggedIn() && (
            <li>
              <NavLink to="/user/orders">
                <p className="text-xl mb-3 font-light">Dashboard</p>
              </NavLink>
            </li>
          )}

          {isAdmin() && (
            <li>
              <NavLink to="/admin/dashboard">
                <p className="text-xl mb-3 font-light">Admin Dashboard</p>
              </NavLink>
            </li>
          )}

          {isLoggedIn()}

          {isLoggedIn() && (
            <li>
              <NavLink to="/order/1">
                <p className="text-xl mb-3 font-light">Place an order</p>
              </NavLink>
            </li>
          )}
          <li>
            {/* <NavLink to="/cost">
              <p className="text-xl mb-3 font-light">Cost Calculation</p>
            </NavLink> */}
          </li>
          {/* <li>
            <p className="text-xl mb-3 font-light">Statement</p>
          </li> */}
          {!isLoggedIn() && (
            <li>
              <NavLink to="/login">
                <p className="text-xl mb-3 font-light">Login</p>
              </NavLink>
            </li>
          )}
          {isLoggedIn() && (
            <li>
              <p className="text-xl mb-3 font-light" onClick={handleLogout}>
                Logout
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
