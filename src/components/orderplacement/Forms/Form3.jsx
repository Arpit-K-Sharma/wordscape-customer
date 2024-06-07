import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiPapers } from "react-icons/gi";
import { FaBookOpen } from "react-icons/fa6";
import { PiBooksBold } from "react-icons/pi";
import { IoNewspaper } from "react-icons/io5";

const ThirdForm = ({ orderData, setOrderData }) => {
  const { pages, quantity } = orderData;

  return (
    <div className="lg:mt-6 lg:mb-6">
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
          value={pages}
          onChange={(e) =>
            setOrderData({ ...orderData, pages: parseInt(e.target.value) })
          }
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
          onChange={(e) =>
            setOrderData({ ...orderData, quantity: parseInt(e.target.value) })
          }
        />
        <div className="label">
          <span className="label-text-alt">{""}</span>
          <span className="label-text-alt">Number of Copies</span>
        </div>
        <br />
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/2">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to="/order/4">
            <button className="btn bg-blue-600 btn-primary w-[280px] mt-5">
              Next
            </button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default ThirdForm;
