import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const FifthForm = ({ orderData, setOrderData, handleSubmit }) => {
  const { name, companyName, email, address } = orderData;

  return (
    <div className="lg:mt-6 lg:mb-6">
      <label className="form-control  max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px] max-sm:flex max-sm:justify-center">
          Fill in the details and confirm your order!
        </p>
        <br />
        <div className="grid grid-cols-2 max-sm:flex max-sm:flex-col">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text-alt">What is your name?</span>
            </div>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full max-w-xs"
              value={name}
              onChange={(e) =>
                setOrderData({ ...orderData, name: e.target.value })
              }
            />
            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs lg:ml-[20px]">
            <div className="label">
              <span className="label-text-alt">
                For which company is this for?
              </span>
            </div>
            <input
              type="text"
              placeholder="Company name"
              className="input input-bordered w-full max-w-xs"
              value={companyName}
              onChange={(e) =>
                setOrderData({ ...orderData, companyName: e.target.value })
              }
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
              value={email}
              onChange={(e) =>
                setOrderData({ ...orderData, email: e.target.value })
              }
            />

            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs lg:ml-[20px]">
            <div className="label">
              <span className="label-text-alt">
                What is the delivery address for the order?
              </span>
            </div>
            <input
              type="text"
              placeholder="Delivery Address"
              className="input input-bordered w-full max-w-xs"
              value={address}
              onChange={(e) =>
                setOrderData({ ...orderData, address: e.target.value })
              }
            />
            <div className="label"></div>
            <br />
          </label>
        </div>
        <h1 className="text-m font-bold">
          Upload the PDF file for Printing here
        </h1>
        <input
          type="file"
          className="file-input w-full max-w-xs mx-auto mt-5"
        />

        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/4">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>

          <button
            className="btn btn-primary w-[280px] mt-5 bg-green-700 border-none text-white hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Confirm Order
          </button>
        </div>
      </label>
    </div>
  );
};

export default FifthForm;
