import React from "react";
import { NavLink } from "react-router-dom";
import logo from ".././images/logo/LogoOnly.png";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function UserDrawer() {
  const [logout, isLogout] = React.useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    isLogout(true);
  };

  if (logout) {
    return <Navigate to="/" />;
  }

  return (
    <div className="drawer-side font-archivo z-10">
      <label
        htmlFor="my-drawer"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu p-4 w-80 min-h-full bg-zinc-800 text-white">
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
        </li>
        <li>
          <NavLink to="/">
            <p className="text-xl mb-3 top-[50px]">Home page</p>
          </NavLink>
        </li>

        <br></br>
        <li>
          <NavLink to="/user/orders">
            <p className="text-xl font-light">Order Summary</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/user/edit">
            <p className="text-xl mb-3 font-light">Profile</p>
          </NavLink>
        </li>

        <br></br>
        <li>
          <NavLink to="/" onClick={handleLogout}>
            <p className="text-xl mb-3 font-bold top-[50px]">Logout</p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserDrawer;
