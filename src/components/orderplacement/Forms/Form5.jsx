import React from "react";
import { NavLink } from "react-router-dom";

const FifthForm = ({}) => {
  return (
    <div className="ml-[29%] my-3 content-center p-4">
      <label className="form-control w-full max-w-xl">
        <p className="text-2xl font-light">
          Fill in the details and confirm your order!
        </p>
        <br />
        <div className="ml-[5%] grid grid-cols-2">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">What is your name?</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs ml-[20px]">
            <div className="label">
              <span className="label-text-alt">
                For which company is this for?
              </span>
            </div>
            <input
              type="text"
              placeholder="Company name"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">What is your email?</span>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs ml-[20px]">
            <div className="label">
              <span className="label-text-alt">
                What is the delivery address for the order?
              </span>
            </div>
            <input
              type="text"
              placeholder="Delivery Address"
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label"></div>
            <br />
          </label>
        </div>
        <h1 className="text-m font-bold">Upload the PDF file for Printing here</h1>
        <input type="file" className="file-input w-full max-w-xs mx-auto mt-5" />

        <div className="flex">
          <NavLink to="/order/4">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to="/order/completion">
            <button className="btn btn-primary w-[280px] mt-5 bg-green-700 border-none text-white hover:bg-blue-600">
              Confirm Order
            </button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default FifthForm;
