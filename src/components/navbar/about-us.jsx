import React from "react";
import logo from "../images/logo/LogoOnly.png";

import { AiOutlineEnvironment } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";

import Navbar from "../navbar/navbar";
import MobileMenu from "./mobile-menu";

export default function Contactuspage() {
  return (
    <div>
      <Navbar />
      <MobileMenu />

      <div className="mx-[20px] md:mx-[200px] font-archivo">
        <div className="flex flex-col md:flex-row items-center justify-center h-screen">
          <div className="order-1 md:order-2 md:ml-10 w-full md:w-[48%] h-auto md:h-[400px] text-white bg-zinc-900 p-[20px] md:p-[55px]">
            <h1 className="text-left text-[30px] md:text-[40px] font-medium pb-[20px]">
              Info
            </h1>
            <div className="flex mb-[40px]">
              <div>
                <IoMdMail size={"30px"} md:size={"40px"} />
              </div>
              <div className="text-[13px] md:text-[15px] py-[4px] px-[20px]">
                Example@gmail.com
              </div>
            </div>

            <div className="flex mb-[40px]">
              <div>
                <AiOutlineEnvironment size={"30px"} md:size={"40px"} />
              </div>
              <div className="text-[13px] md:text-[15px] py-[4px] px-[20px]">
                Shanti Marga, Karyabinayak
              </div>
            </div>

            <div className="flex mb-[40px]">
              <div className="pl-[5px]">
                <IoCall size={"20px"} md:size={"30px"} />
              </div>
              <div className="text-[13px] md:text-[15px] py-[4px] px-[20px]">
                +977-9865024418
              </div>
            </div>
          </div>
          <div className="order-2 md:order-1 md:w-[48%] w-full justify-items-center px-[20px] md:px-0">
            <h1 className="text-center text-[30px] md:text-[40px] font-medium py-[20px]">
              <b>Contact Us</b>
            </h1>
            <p className="text-center text-[13px] md:text-[15px] leading-[17.6px] mb-[20px]">
              Have some{" "}
              <span className="text-[#933B8D] font-medium">questions</span>?
              <br />
              Feel free to ask them at anytime
            </p>

            <input
              className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[5px]"
              type="text"
              placeholder="Name"
            />
            <hr className="mb-[5px] h-[5px]" width="100%" />
            <input
              className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[5px]"
              type="text"
              placeholder="Email"
            />
            <hr className="mb-[5px] h-[5px]" width="100%" />
            <input
              className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[5px]"
              type="text"
              placeholder="Phone"
            />
            <hr className="mb-[5px] h-[5px]" width="100%" />
            <input
              className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[20px]"
              type="text"
              placeholder="Message"
            />
            <hr className="mb-[20px] h-[5px]" width="100%" />
            <p className="cursor-pointer py-[10px] hover:text-[white] text-center w-full">
              <button className="text-[13px] md:text-[15px] btn btn-neutral bg-slate-600 text-white font-semibold w-full">
                Send Message
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
