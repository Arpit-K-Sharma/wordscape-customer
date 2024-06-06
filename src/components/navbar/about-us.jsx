import React from "react";

import Printer from "../images/printer.png";
import Footer from "./footer";
import NavBar from "./navbar";

const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="flex h-screen font-archivo">
        <div className="w-1/3 bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col w-full h-screen">
            <h1 className="text-black font-semibold text-5xl pl-[60px] pt-[150px] pb-[50px]">
              We are build differently and exceptionally
            </h1>
            <p className="text-black pl-[60px] pr-[60px]">
              Welcome to WordScape, where tradition meets innovation.
              Established in [Year], we have been at the forefront of the
              printing industry, committed to delivering exceptional quality and
              unmatched customer service.
            </p>
          </div>
        </div>
        <div className="w-1/3 bg-gray-100 flex items-center justify-center">
          <img src={Printer} alt="" />
        </div>
        <div className="w-1/3 bg-gray-100 flex items-center justify-center">
          <div className="flex flex-col w-full h-screen">
            <h1 className="text-black font-medium text-[100px] pl-[60px] pt-[50px]">
              23+
            </h1>
            <p className="text-black pl-[60px] pr-[60px]">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>

            <h1 className="text-black font-medium text-[100px] pl-[60px] pt-[50px]">
              600+
            </h1>
            <p className="text-black pl-[60px] pr-[60px]">
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
