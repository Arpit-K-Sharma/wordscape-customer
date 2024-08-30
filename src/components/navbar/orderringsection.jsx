import React from "react";
import appimg from "../images/appimg.png";
import Rarrow from "../images/arrowright.png";
import { Navigate } from "react-router";

const OrderingSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-9 max-w-6xl mx-auto mb-[7rem] lg:mb-[8rem] max-sm:mb-[1rem]">
      <div className="w-full md:w-1/2 mb-8 md:mb-0 lg:ml-[1rem] ">
        <div className="relative">
          <img src={appimg} className=" max-w-lg w-full lg:mt-[4rem]" />
        </div>
      </div>
      <div className="w-full md:w-1/2 md:pl-8 lg:-mr-[9rem]">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Print Your Vision Anywhere, Anytime – Seamless Ordering at Your
          Fingertips
        </h2>
        <p className="text-gray-600 mb-6">
          Our user-friendly website and mobile app make placing orders a breeze,
          whether you're at your desk or on the go.
        </p>
        <div className="flex flex-col sm:flex-row items-center">
          <button
            className="bg-[#9D1C79] text-white font-semibold py-[2%] px-6  mb- sm:mb-0 sm:mr-4"
            onClick={Navigate("/register")}
          >
            Place an Order
          </button>
          <button className="text-[#1465AF] px-4 py-2 ml-5 font-semibold text-sm sm:text-base flex items-center justify-center w-full sm:w-auto">
            Learn More
            <img src={Rarrow} className="ml-[10px] h-5 w-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderingSection;
