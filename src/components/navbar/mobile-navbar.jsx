import React from "react";
import config from "../../../config.json";
import logo from "../images/logo/WOnly.png";
import textlogo from "../images/logo/TextOnly.png";
import { NavLink } from "react-router-dom";
import Footer from "./footer";
import Products from "./products";
import ServiceCarousel from "./servicecarousel";
import VideoPlay from "./videoplay";
import OrderingSection from "./orderringsection";
import Cookies from "js-cookie";
import InfiniteLogoSlider from "./logoslide";
import PrintCraft from "./printcraft";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useMediaQuery } from "react-responsive";
import { FunctionComponent } from "react";
import img1 from "../images/IMAGE1.png";
import img2 from "../images/IMAGE2.png";
import img3 from "../images/IMAGE3.png";
import img4 from "../images/image4.png";
import Rarrow from "../images/arrowright.png";

import {
  isLoggedIn,
  isAdmin,
  isCustomer,
  isEmployee,
} from "../../utility/util";

function MobileNavbar() {
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <div className="drawer bg-white">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn btn-ghost mx-1 my-1 lg:hidden p-0"
        >
          <img
            width="26"
            height="26"
            src="https://img.icons8.com/?size=100&id=8113&format=png&color=000000"
            alt="menu icon"
            className="mx-auto"
          />
        </label>
        <div className="bg-[#ECECEC] flex flex-row items-center min-h-[98vh] max-sm:flex-col max-sm:justify-center mb-[10rem] md:p-10 ">
          <div className="w-1/2 max-sm:w-full lg:p-10 max-sm:mt-8 flex flex-col justify-center max-sm:p-10 ">
            <p className="text-xl font-semibold tracking-wide text-[#000000] mb-2 lg:mb-[3rem] lg:ml-[3.4rem] max-sm:text-sm max-sm:mb-[2rem]">
              PREMIER PRINTING DESTINATION
            </p>
            <h1 className="text-6xl max-sm:text-4xl font-semibold leading-tight mb-6 lg:ml-[3rem] font-archivo">
              YOUR VISION, OUR <br></br> PRINT -{" "}
              <span className="text-[#9D1C79]">PERFECT</span>
              <br></br> EVERY TIME!
            </h1>
            <p className="text-lg font-medium mb-6 lg:ml-[3rem] text-[#3D3B3B] font-archivo">
              Precision Prints With Flawless Detail,<br></br> Tailored To Make
              Your Vision Shine.
            </p>
            <div className="flex lg:mt-[4%] flex-row space-x-4 h-auto w-full max-w-[30rem] lg:ml-[3rem] lg:mb-10 ">
              <NavLink to="/login">
                <button className="px-6  py-[0.5rem] bg-[#9D1C79] text-white font-semibold hover:bg-[#8A1869] transition-colors duration-300 whitespace-nowrap">
                  Login To Start
                </button>
              </NavLink>
              <button className="px-6 py-[.5rem] text-[#9D1C79] font-semibold hover:text-[#8A1869] transition-colors duration-300 whitespace-nowrap">
                Request demo →
              </button>
            </div>
          </div>
          <div className="w-1/2 relative max-sm:w-full max-sm:mt-8">
            <div className="relative w-[80%] pb-[80%] mb-[10rem]">
              <div className="max-sm:mt-[5rem] lg:h-auto absolute inset-0 bg-[#ECECEC] rounded-tl-full rounded-tr-full border-[3px] border-[#C01690] flex items-center justify-center max-sm:h-[19rem] pt-[3rem] pr-[3rem] pl-[3rem] pb-0 max-sm:ml-[15%]">
                <div className="w-full h-auto overflow-hidden rounded-tl-full rounded-tr-full border-[3px] border-[#B39797]">
                  <Carousel
                    showArrows={false}
                    showStatus={false}
                    showIndicators={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={1500}
                    showThumbs={false}
                    className="w-full h-full"
                  >
                    <div className="w-full h-full">
                      <img
                        src={img2}
                        alt="Printing sample 2"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="w-full h-full">
                      <img
                        src={img3}
                        alt="Printing sample 3"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Carousel>
                </div>
              </div>
            </div>
          </div>
        </div>

        <PrintCraft />
        <InfiniteLogoSlider />
        <VideoPlay />
        <Products />
        <OrderingSection />
        <ServiceCarousel />
        <Footer />
      </div>
      <div className="drawer-side font-archivo">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-zinc-900 text-white">
          {/* Sidebar content here */}
          <li className="mt-[45%] flex flex-col items-center">
            <NavLink to="/" className="flex justify-center">
              <img
                width="140"
                height="140"
                src={logo}
                alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
                className="mx-auto my-1 mb-5"
              />
            </NavLink>
            <p className="text-2xl mb-[30px] font-semibold text-center">
              WordScape
            </p>
          </li>
          {isCustomer() && (
            <li>
              <NavLink to="/user/orders">
                <p className="text-xl mb-3 font-light">Dashboard</p>
              </NavLink>
            </li>
          )}

          {isEmployee() && (
            <li>
              <NavLink to="/admin/dashboard">
                <p className="text-xl mb-3 font-light">Staff Dashboard</p>
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

          {isCustomer() && (
            <li>
              <NavLink to="/order/1">
                <p className="text-xl mb-3 font-light">Place an order</p>
              </NavLink>
            </li>
          )}

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

export default MobileNavbar;
