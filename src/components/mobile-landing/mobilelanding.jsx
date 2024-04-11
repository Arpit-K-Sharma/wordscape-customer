import React from "react";
import "./cssforicons.css";

function MobileLanding() {
  return (
    <div>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn mx-1 my-1 drawer-button ">
            <img
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
              alt="menu--v1"
            />
          </label>
          <div>
            <h1 className="text-center text-3xl mt-5 font-archivo p-8 leading-10 my-5 font-semibold">
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/external-photo3ideastudio-solid-photo3ideastudio/64/FFFFFF/external-knot-china-photo3ideastudio-solid-photo3ideastudio.png"
              alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
              className="mx-auto my-1"
            />
              {" "}
              Welcome to WordScape's mobile app
            </h1>
            <h3 className="text-center my-3 text-xl">Hit the menu icon to browse through</h3>
            
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
