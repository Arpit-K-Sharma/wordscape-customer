import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FaRegNewspaper } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { GiPapers } from "react-icons/gi";

const SecondForm = ({ orderData, entireData, setOrderData }) => {
  const { paperThicknessData, fetchedPaperTypes } = entireData;

  return (
    <div className="lg:mt-6 lg:mb-6">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px] max-sm:flex max-sm:justify-center">
          What about the cover of your book that you would want to print on?
        </p>
        <br />
        <div className="label text-center">
          <span className="label-text">Outer Paper Type</span>
          <FaRegNewspaper size={`25px`} />
        </div>
        <select
          className="select select-bordered"
          onChange={(e) =>
            setOrderData({ ...orderData, outerPaperType: e.target.value })
          }
        >
          <option disabled defaultValue>
            Pick one
          </option>
          {fetchedPaperTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <br />
        <div className="label text-center">
          <span className="label-text">Outer Paper Thickness</span>
          <GiPapers color="white" size={`25px`} />
        </div>
        <select
          className="select select-bordered"
          onChange={(e) =>
            setOrderData({
              ...orderData,
              outerPaperThickness: parseInt(e.target.value),
            })
          }
        >
          <option disabled defaultValue>
            Pick one
          </option>
          {paperThicknessData.map((gsm) => (
            <option key={gsm.id} value={gsm.thickness}>
              {gsm.thickness}
            </option>
          ))}
        </select>
        <br />
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/1">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to="/order/3">
            <button className="btn btn-primary w-[280px] mt-5">Next</button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default SecondForm;
