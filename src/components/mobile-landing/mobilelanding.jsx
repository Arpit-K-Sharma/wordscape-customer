import React from "react";
import "./cssforicons.css";

function MobileLanding() {
  return (
    <div className="bg-zinc-900 h-[100vh]">
      <div className="navbar bg-base-100 max-sm:hidden">
        <div className="navbar-start">
          <div className="dropdown">
            
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">WordScape</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a></a>
            </li>
            
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn">Logout</a>
        </div>
      </div>

      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn mx-1 my-1 drawer-button lg:hidden ">
            <img
              width="26"
              height="26"
              src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
              alt="menu--v1"
            />
          </label>
          <div className="p-7">
            <h1 className="text-center text-3xl mt-5 font-archivo p-8 leading-10 my-5 font-semibold">
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/external-photo3ideastudio-solid-photo3ideastudio/64/FFFFFF/external-knot-china-photo3ideastudio-solid-photo3ideastudio.png"
                alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
                className="mx-auto my-1"
              />{" "}
              Welcome to WordScape's mobile{" "}
              <p className="max-sm:hidden lg:block">app</p>
            </h1>
            <h3 className="text-center my-3 text-xl">
              Hit the menu icon to browse through
            </h3>
          </div>
        </div>
        <div className="drawer-side font-archivo">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-zinc-800 text-base-content">
            {/* Sidebar content here */}
            <li className="mt-[140px]">
              {/* <h1 className="mb-5 text-2xl font-bold">WordScape</h1> */}
              <p className="text-2xl mb-[30px] font-semibold">Dashboard</p>
            </li>
            <li>
              <p className="text-xl mb-3 font-light">Place an order</p>
            </li>
            <li>
              <p className="text-xl mb-3 font-light">Cost Calculation</p>
            </li>
            <li>
              <p className="text-xl mb-3 font-light">Statement</p>
            </li>
            <li>
              <p className="text-xl mb-3 font-light">Logout</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MobileLanding;
