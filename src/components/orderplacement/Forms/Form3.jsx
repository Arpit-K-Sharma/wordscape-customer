import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiPapers } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import { IoNewspaper } from "react-icons/io5";

const ThirdForm = ({ orderData, setOrderData }) => {
  const { pages, quantity } = orderData;

  return (
    <div className="lg:mt-6 lg:mb-6 font-archivo">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px] text-zinc-900 max-sm:flex max-sm:justify-center">
          How many quantities and pages do you want to print?
        </p>
        <br />
        <div className="label text-center">
          <span className="label-text">Pages</span>
          <IoNewspaper color="black" size={`25px`} />
        </div>
        <input
          className="input input-bordered text-zinc-900"
          type="number"
          min={0}
          max={1000}
          value={pages}
          required
          onChange={(e) => {
            const value = e.target.value === "" ? "" : parseInt(e.target.value);
            if (value === "" || (!isNaN(value) && value >= 0 && value <= 999)) {
              setOrderData({ ...orderData, pages: value });
            }
          }}
          onKeyPress={(e) => {
            if (e.key === "-" || e.key === "e") {
              e.preventDefault();
            }
          }}
        />
        <div className="label">
          <span className="label-text-alt">{""}</span>
          <span className="label-text-alt">
            Number of Pages inside the book
          </span>
        </div>
        <br />
        <div className="label text-center">
          <span className="label-text">Quantities</span>
          <PiBooksBold size={`25px`} color="black" />
        </div>
        <input
          className="input input-bordered text-zinc-900"
          type="number"
          value={quantity}
          max={999999}
          required
          onChange={(e) => {
            const value = e.target.value === "" ? "" : parseInt(e.target.value);
            if (
              value === "" ||
              (!isNaN(value) && value >= 0 && value <= 999999)
            ) {
              setOrderData({ ...orderData, quantity: value });
            }
          }}
        />
        <div className="label">
          <span className="label-text-alt">{""}</span>
          <span className="label-text-alt">Number of Copies</span>
        </div>
        <br />
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/2">
            <button className="btn max-lg:w-full btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to={!pages || !quantity ? "#" : "/order/4"}>
            <button
              className="btn max-lg:w-full bg-blue-600 btn-primary w-[280px] mt-5"
              disabled={!pages || !quantity}
            >
              Next
            </button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default ThirdForm;
