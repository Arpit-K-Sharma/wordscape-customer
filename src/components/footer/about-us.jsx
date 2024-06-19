import React from "react";
import Printer from "../images/printer.png";
import NumberRolling from "./NumberRolling";
import Footer from "../navbar/footer";
import Navbar from "../navbar/navbar";
import MobileMenu from "../navbar/mobile-menu";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      <MobileMenu />

      <div className="flex flex-col lg:flex-row h-full lg:h-screen font-archivo">
        <div className="w-full lg:w-1/3  flex items-center justify-center p-4 lg:p-0">
          <div className="flex flex-col w-full h-full lg:h-screen">
            <h1 className="text-black font-semibold text-3xl lg:text-5xl lg:pl-[45px] lg:ml-[10px] lg:pt-[150px] lg:pb-[40px] text-left max-sm:pt-[20px] max-sm:pb-[20px] max-sm:text-center max-sm:font-[700] max-sm:px-[10px]">
              We are built differently and exceptionally
            </h1>
            <p className="text-black text-center lg:text-left px-4 lg:px-[60px] mt-4 lg:mt-0 max-sm:py-5 max-sm:px-[22px] max-sm:text-[18px]">
              Welcome to WordScape, where tradition meets innovation.
              Established in [Year], we have been at the forefront of the
              printing industry, committed to delivering exceptional quality and
              unmatched customer service.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/3 flex items-center justify-center mt-4 lg:mt-[-70px] max-sm:mt-[20px]">
          <img
            className="w-full max-w-xs lg:max-w-none"
            src={Printer}
            alt="Printer"
          />
        </div>
        <div className="w-full lg:w-1/3 flex items-center justify-center p-4 lg:p-0">
          <div className="flex flex-col w-full h-full lg:h-screen">
            <div className="flex pr-[30px] text-black font-medium text-6xl lg:text-[100px] justify-end max-sm:justify-center lg:text-right lg:pt-[50px] max-sm:font-bold max-sm:mt-[30px]">
              <NumberRolling targetNumber={20} duration={1000} />
            </div>
            <p className="text-black text-justify lg:text-right px-4 lg:px-[60px] mt-4 lg:mt-[-20px] max-sm:mt-[-25px] max-sm:px-[15px] max-sm:text-[18px] max-sm:text-center ">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>

            <div className="flex pr-[30px] text-black font-medium text-6xl lg:text-[100px] justify-end max-sm:justify-center lg:pt-[50px] mt-8 lg:mt-0 max-sm:font-bold ma">
              <NumberRolling targetNumber={200} duration={1000} />
            </div>
            <p className="text-black text-center lg:text-right px-4 lg:px-[60px] mt-4 lg:mt-[-20px] max-sm:pb-[40px] max-sm:mt-[-25px] max-sm:px-[15px]max-sm:text-[18px] max-sm:text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
