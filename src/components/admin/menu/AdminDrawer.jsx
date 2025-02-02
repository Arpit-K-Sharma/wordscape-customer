import React from "react";
import { NavLink, Navigate } from "react-router-dom";
import logo from "../../images/logo/LogoOnly.png";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useRef, useEffect } from "react";
import { isAdmin } from "../../../utility/util";

function AdminDrawer() {
  const [logout, isLogout] = React.useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    isLogout(true);
    Navigate("/");
  };

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null); // Close the dropdown if it's already open
    } else {
      setOpenDropdown(dropdownName); // Open the clicked dropdown
    }
  };

  const paperFeaturesRef = useRef(null);
  const outerFeaturesRef = useRef(null);
  const userSetupRef = useRef(null);
  const tasksRef = useRef(null);
  const statementsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        paperFeaturesRef.current &&
        !paperFeaturesRef.current.contains(event.target)
      ) {
        paperFeaturesRef.current.removeAttribute("open");
      }
      if (
        outerFeaturesRef.current &&
        !outerFeaturesRef.current.contains(event.target)
      ) {
        outerFeaturesRef.current.removeAttribute("open");
      }
      if (
        userSetupRef.current &&
        !userSetupRef.current.contains(event.target)
      ) {
        userSetupRef.current.removeAttribute("open");
      }
      if (tasksRef.current && !tasksRef.current.contains(event.target)) {
        tasksRef.current.removeAttribute("open");
      }
      if (
        statementsRef.current &&
        !statementsRef.current.contains(event.target)
      ) {
        statementsRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="drawer-side font-archivo">
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
          <NavLink to="/">
            <p className="text-2xl font-light text-center ml-[35px]">Home</p>
          </NavLink>
        </li>
        <br />

        <details
          ref={paperFeaturesRef}
          className="dropdown dropdown-bottom font-archivo "
        >
          <summary className="m-1 btn text-xl font-archivo font-light bg-zinc-700 border-none text-white ml-[14px] hover:bg-zinc-900">
            Paper Feature
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px] ml-[6px]">
            <li>
              <NavLink to="/admin/paper">
                <p className="text-xl mb-3 font-light">Paper Types</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/papersize">
                <p className="text-xl mb-3 font-light">Paper Size</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/paperthickness">
                <p className="text-xl mb-3 font-light">Paper Thickness</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/sheets">
                <p className="text-xl mb-3 font-light">Sheets</p>
              </NavLink>
            </li>
          </ul>
        </details>

        <details
          ref={outerFeaturesRef}
          className="dropdown dropdown-bottom font-archivo "
        >
          <summary className="m-1 btn text-xl font-archivo font-light bg-zinc-700 border-none text-white ml-[14px] hover:bg-zinc-900">
            Outer Feature
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px] ml-[6px]">
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
            {/* <li>
              <NavLink to="/admin/covertreatment">
                <p className="text-xl mb-3 font-light">Cover Treatment</p>
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/admin/plate">
                <p className="text-xl mb-3 font-light">Plate</p>
              </NavLink>
            </li>
          </ul>
        </details>

        {isAdmin() && (
          <details
            ref={userSetupRef}
            className="dropdown dropdown-bottom font-archivo "
          >
            <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white hover:bg-zinc-900">
              User Setup
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px]">
              <li>
                <NavLink to="/admin/users">
                  <p className="text-xl mb-3 font-light">Staffs</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/customer">
                  <p className="text-xl mb-3 font-light">Customers</p>
                </NavLink>
              </li>
            </ul>
          </details>
        )}

        <details
          ref={tasksRef}
          className="dropdown dropdown-bottom font-archivo "
        >
          <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white hover:bg-zinc-900">
            Tasks
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px]">
            <li>
              <NavLink to="/cost">
                <p className="text-xl mb-3 font-light">Cost Calculation</p>
              </NavLink>
            </li>
          </ul>
        </details>

        <NavLink to="/inventory">
          <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white hover:bg-zinc-900">
            Inventory
          </summary>
        </NavLink>

        <NavLink to="/hr">
          <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white hover:bg-zinc-900">
            HR
          </summary>
        </NavLink>

        <details
          ref={statementsRef}
          className="dropdown dropdown-bottom font-archivo "
        >
          <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white hover:bg-zinc-900">
            Statements
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px]">
            <li>
              <NavLink to="/admin/orders">
                <p className="text-xl font-light">Order</p>
              </NavLink>
            </li>
          </ul>
        </details>
        <div className="mt-[25px]"></div>

        <li className="bg-gray-900 text-white rounded-lg">
          <NavLink to="/" onClick={handleLogout}>
            <p className="text-xl mb-3 font-light top-[50px] ml-[34px] hover:bg-red-700">
              Logout
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminDrawer;
