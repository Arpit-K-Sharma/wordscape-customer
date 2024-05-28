import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo/LogoOnly.png";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState } from "react";

function AdminDrawer() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogout = async () => {
    try {
      Cookies.remove("adminToken");
      localStorage.removeItem("id");
      setLoggedIn(false);
      setIsAdmin(false);
      toast.success("Logged Out Successfully", {
        position: "top-right",
        autoClose: 2000, // Show for 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Logout Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
          <NavLink to="/admin/dashboard">
            <p className="text-2xl font-light text-center ml-[35px]">Home</p>
          </NavLink>
        </li>
        <br />

        <details className="dropdown dropdown-bottom font-archivo ">
          <summary className="m-1 btn text-xl font-archivo font-light bg-zinc-700 border-none text-white ml-[14px]">
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
          </ul>
        </details>

        <details className="dropdown dropdown-bottom font-archivo ">
          <summary className="m-1 btn text-xl font-archivo font-light bg-zinc-700 border-none text-white ml-[14px]">
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
            <li>
              <NavLink to="/admin/covertreatment">
                <p className="text-xl mb-3 font-light">Cover Treatment</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/plate">
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

        <details className="dropdown dropdown-bottom font-archivo">
          <summary className="m-1 btn text-xl font-archivo font-light w-[150px] ml-[6px] bg-zinc-700 border-none text-white">
            Tasks
          </summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-zinc-800 rounded-box w-[160px]">
            <li>
              <NavLink to="/jobcard">
                <p className="text-xl mb-3 font-light">Job Card</p>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cost">
                <p className="text-xl mb-3 font-light">Cost Calculation</p>
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
              <NavLink to="/admin/orders">
                <p className="text-xl font-light">Order</p>
              </NavLink>
            </li>
          </ul>
        </details>
        <div className="mb-[130px]"></div>

        <li className="bg-gray-900 text-white rounded-lg">
          <NavLink to="/" onClick={handleLogout}>
            <p className="text-xl mb-3 font-light top-[50px] ml-[34px]">
              Logout
            </p>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminDrawer;
