import React from "react";
import config from "../../../config.json";
import logo from "../images/logo/LogoOnly.png";
import textlogo from "../images/logo/TextOnly.png";
import { NavLink } from "react-router-dom";
import Footer from "./footer";
import Pricing from "./pricing";
import Services from "./services";

function MobileNavbar() {
  return (
    <div className="drawer">
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
        <div className="p-7 text-slate-200 bg-zinc-800">
          <img
            width="350"
            height="350"
            src={logo}
            alt="Logo"
            className="mx-auto my-5"
          />{" "}
          <h3 className="text-center my-7 text-xl">
            <div className="">
              <h1 className="text-[#FEFEFE] mb-[18px] text-[40px] lg:text-[40px] leading-10 mx-auto w-[50%] text-center font-bold font-archivo max-sm:text-[35px]">
                All your printing needs in{" "}
                <span
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #FFA500, #FF69B4)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    marginTop: "90px",
                  }}
                  className="text-[#5C61F3]"
                >
                  one <br />
                  place
                </span>
              </h1>
              <p className="w-[30%] text-center mx-auto leading-[23px] text-[18px] max-sm:text-[14px] max-sm:w-[60%] font-archivo ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry.
              </p>
              <div className="flex flex-row justify-center mt-[40px] mb-[150px]">
                <NavLink to="/order/1">
                  <button className="mr-[10px] px-[20px] py-[10px] text-[#ffffff] rounded-[8px] font-archivo font-bold bg-[#f87642] hover:bg-[#c83db3] transition-colors duration-300">
                    Place an Order
                  </button>
                </NavLink>
                <button className="bg-[#ffffff] px-[20px] py-[10px] text-[#000000] rounded-[8px] font-archivo font-semibold">
                  Learn More
                </button>
              </div>
            </div>
          </h3>
        </div>
        <Services />
        <Pricing />
        <Footer />
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
                width="120"
                height="120"
                src={logo}
                alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
                className="mx-auto my-1 mb-5"
              />
            </NavLink>
            <p className="text-2xl mb-[30px] font-semibold">WordScape</p>
          </li>
          <li>
            <NavLink to="/user/dashboard">
              <p className="text-xl mb-3 font-light">Dashboard</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/dashboard">
              <p className="text-xl mb-3 font-light">Admin Dashboard</p>
            </NavLink>
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
            <NavLink to="/login">
              <p className="text-xl mb-3 font-light">Login</p>
            </NavLink>
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

export default MobileNavbar;
