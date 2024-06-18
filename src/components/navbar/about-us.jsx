import React from "react";
import Printer from "../images/printer.png";
import NumberRolling from "./NumberRolling";
import Footer from "./footer";
import NavBar from "./navbar";
import MobileMenu from "./mobile-menu";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <MobileMenu />
      <div className="flex h-screen font-archivo max-sm:h-[150vh] max-sm:pl-[15%]">
        <div className="w-1/3 md:w-1/2 lg:w-1/3 flex items-center justify-center max-sm:mt-[-330px]">
          <div className="flex flex-col w-full h-screen">
            <h1 className="text-black font-semibold text-5xl pl-[60px] pt-[150px] pb-[50px] max-sm:text-2xl max-sm:pt-[5px]  max-sm:pl-[20px] max-sm:w-[350px] max-sm:max-w-[230px] max-sm:text-center">
              We build differently and exceptionally
            </h1>
            <p className="text-black pl-[60px] pr-[60px] max-sm:text-[15px] max-sm:mt-[240px] max-sm:pl-[40px] max-sm:w-[300px] max-sm:text-center">
              Welcome to WordScape, where tradition meets innovation.
              Established in [Year], we have been at the forefront of the
              printing industry, committed to delivering exceptional quality and
              unmatched customer service.
            </p>
          </div>
        </div>
        <div className="w-1/3 md:w-1/2 lg:w-1/3 mt-[-70px] flex items-center justify-center max-sm:mt-[-250%] max-sm:ml-[-10%]">
          <img className="" src={Printer} alt="" />
        </div>
        <div className="w-1/3 md:w-1/2 lg:w-1/3 flex items-center justify-center max-sm:pl-[10%]">
          <div className="flex flex-col w-full h-screen">
            <div className="flex text-black font-medium text-[100px] pl-[60px] pt-[50px] max-sm:ml-[-190px] max-sm:text-[55px] max-sm:font-extrabold max-sm:mt-[320px]">
              <NumberRolling targetNumber={20} duration={1000} />
              {/* 23+ */}
            </div>
            <p className="text-black pl-[60px] pr-[60px] max-sm:mt-[-20px] max-sm:w-[350px] max-sm:ml-[-260px] max-sm:text-[15px] max-sm:text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>

            <div className="flex text-black font-medium text-[100px] pl-[60px] pt-[50px] max-sm:ml-[-210px] max-sm:mt-[-50px] max-sm:text-[55px] max-sm:font-extrabold">
              <NumberRolling targetNumber={200} duration={1000} />
              {/* 23+ */}
            </div>
            <p className="text-black pl-[60px] pr-[60px] max-sm:w-[350px] max-sm:ml-[-260px] max-sm:text-[15px] max-sm:text-center max-sm:mt-[-20px] ">
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
