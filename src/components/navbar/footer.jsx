import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../images/logo/WOnly.png";

function Footer() {
  return (
    <div>
      <footer className="footer p-10 bg-zinc-800 text-white font-archivo relative">
        <div className="flex mx-auto items-center justify-between">
          <div className="max-sm:mr-[-30%] max-sm:ml-[-10%]  max-sm:items-center max-sm:flex">
            <img src={logo} className="h-[150px] ml-[10%]" />
            <div className="max-lg:hidden">
              <p
                style={{ fontFamily: "Poppins" }}
                className="text-lg font-regular mb-8 mt-6"
              >
                Your trusted print solutions, crafted<br></br> for your business
                and your success.
              </p>
            </div>
          </div>
        </div>
        <div className="max-sm:self-center max-sm:items-center max-sm:flex max-sm:mx-auto lg:hidden">
          <p
            style={{ fontFamily: "Poppins" }}
            className="text-lg font-regular mt-10"
          >
            Your trusted print solutions, crafted<br></br> for your business and
            your success.
          </p>
        </div>
        <div></div>
        <nav>
          <h6
            style={{ fontFamily: "Poppins" }}
            className="text-[#FFFFFF] footer-title text-xl "
          >
            Services
          </h6>
          <a
            style={{ fontFamily: "Poppins" }}
            className="text-[#CCCCCC] link link-hover"
          >
            Branding
          </a>
          <a
            style={{ fontFamily: "Poppins" }}
            className=" text-[#CCCCCC] link link-hover"
          >
            Design
          </a>
          <a
            style={{ fontFamily: "Poppins" }}
            className=" text-[#CCCCCC] link link-hover"
          >
            Marketing
          </a>
          <a
            style={{ fontFamily: "Poppins" }}
            className=" text-[#CCCCCC] link link-hover"
          >
            Advertisement
          </a>
        </nav>

        <nav>
          <h6
            style={{ fontFamily: "Poppins" }}
            className="footer-title text-xl max-sm:flex"
          >
            Company
          </h6>
          <NavLink to="/about-us">
            <a
              style={{ fontFamily: "Poppins" }}
              className="text-[#CCCCCC] link link-hover"
            >
              About us
            </a>
          </NavLink>
          <NavLink to="/contact-us">
            <a
              style={{ fontFamily: "Poppins" }}
              className="text-[#CCCCCC] link link-hover"
            >
              Contact Us
            </a>
          </NavLink>
          {/* <a className="link link-hover">Jobs</a> /}
        {/ <NavLink to="/faq">
          <a className="link link-hover">FAQ</a>
        </NavLink> */}
        </nav>
        <nav>
          <h6
            style={{ fontFamily: "Poppins" }}
            className="footer-title text-xl"
          >
            Social
          </h6>
          <div className="grid grid-flow-col gap-5">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="fill-current cursor-pointer hover:text-y1"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="fill-current cursor-pointer hover:text-y1"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                className="fill-current cursor-pointer hover:text-y1"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
      <div className="w-full h-[6px] absolute bottom left-0 bg-gradient-to-r from-[#9823A2] via-[#F01515] to-[#F05600]"></div>
    </div>
  );
}

export default Footer;
