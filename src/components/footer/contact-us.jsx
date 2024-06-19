import React from "react";
import logo from "../images/logo/LogoOnly.png";
import { AiOutlineEnvironment } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import Navbar from "../navbar/navbar";
import MobileMenu from "../navbar/mobile-menu";
import Footer from "../navbar/footer";

export default function Contactuspage() {
  return (
    <>
      <div>
        <Navbar />
        <MobileMenu />
        <div className="mx-auto max-w-6xl font-archivo">
          <div className="flex flex-col md:flex-row mt-[25px]">
            <div className="w-full md:w-1/2 p-[20px] md:p-[55px]">
              <h1 className="text-center text-[30px] font-medium py-[20px] max-sm:mt-[-80px] lg:mt-[-24%]">
                Contact Us
              </h1>
              <p className="text-center text-[13px] md:text-[15px] leading-[17.6px] mb-[20px]">
                Have some <span className="font-bold">queries</span>?<br />
                Feel free to ask them at anytime.
              </p>
              <input
                className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[5px]"
                type="text"
                placeholder="Name"
              />
              <hr className="mb-[5px]" />
              <input
                className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[5px]"
                type="text"
                placeholder="Email"
              />
              <hr className="mb-[5px]" />
              <input
                className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[5px]"
                type="text"
                placeholder="Phone"
              />
              <hr className="mb-[5px]" />
              <input
                className="w-full text-[13px] md:text-[15px] border-none px-[10px] py-[10px] mb-[20px]"
                type="text"
                placeholder="Message"
              />
              <hr className="mb-[20px]" />
              <button className="w-full text-[13px] md:text-[15px] font-bold py-[10px] text-white bg-zinc-800 hover:bg-zinc-600">
                Send Message
              </button>
            </div>
            <div className="mt-[25px] md:mt-0 w-full md:w-1/2 text-black p-[20px] md:p-[55px] mb-10 lg:mt-[-1%]">
              <h1 className="text-center text-[30px] md:text-[40px] font-medium pb-[20px]">
                Our Info
              </h1>
              <div className="flex items-center justify-center mb-[20px] md:mb-[40px]">
                <IoMdMail size={"30px"} className="mr-[10px]" />
                <span className="text-[13px] md:text-[15px]">
                  wordscape@wordscape.com
                </span>
              </div>
              <div className="flex items-center justify-center mb-[20px] md:mb-[40px]">
                <AiOutlineEnvironment size={"30px"} className="mr-[10px]" />
                <span className="text-[13px] md:text-[15px]">
                  Shanti Marga, Karyabinayak
                </span>
              </div>
              <div className="flex items-center justify-center">
                <IoCall size={"20px"} className="mr-[10px]" />
                <span className="text-[13px] md:text-[15px]">
                  +977-9865024418
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
