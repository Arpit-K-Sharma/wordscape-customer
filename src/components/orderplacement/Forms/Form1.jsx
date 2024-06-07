import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/progressSlice";
import { useEffect } from "react";
import { IoNewspaper } from "react-icons/io5";
import { GiPapers } from "react-icons/gi";
import { ImBook } from "react-icons/im";

const FirstForm = ({ orderData, entireData, setOrderData }) => {
  const {
    paperSizeData,
    fetchedPaperTypes,
    paperThicknessData,
    selectedThickness,
  } = entireData;

  return (
    <div className="lg:mt-6 lg:mb-6 max-sm:mx-auto max-sm:justify-center">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl max-sm:text-[24px] text-zinc-900 font-light">
          Start placing your order with the paper size, type, and its thickness
        </p>
        <br />
        <div className="label text-center">
          <span className="label-text">Paper Size</span>
          <span className="ml-2">
            <IoNewspaper color="black" size={`25px`} />
          </span>
        </div>
        <select
          className="select select-bordered text-zinc-900"
          onChange={(e) =>
            setOrderData({ ...orderData, paperSize: e.target.value })
          }
        >
          {paperSizeData &&
            paperSizeData.map((type) => (
              <option key={type.id} value={type.id}>
                {type.paperSize}
              </option>
            ))}
        </select>
        <br />

        <div className="label text-center">
          <span className="label-text">Inner Paper Type</span>
          <span>
            {" "}
            <ImBook color="black" size={`25px`} />
          </span>
        </div>
        <select
          className="select select-bordered text-zinc-900"
          onChange={(e) =>
            setOrderData({ ...orderData, innerPaperType: e.target.value })
          }
        >
          {fetchedPaperTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <br />

        <div className="label text-center">
          <span className="label-text">Inner Paper Thickness</span>
          <span>
            <GiPapers color="black" size={`25px`} />
          </span>
        </div>
        <select
          className="select select-bordered text-zinc-900"
          value={selectedThickness}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              innerPaperThickness: parseInt(e.target.value),
            })
          }
        >
          {paperThicknessData.map((gsm) => (
            <option key={gsm.id} value={gsm.id} className="text-bold">
              {gsm.thickness}
            </option>
          ))}
        </select>
        <br />
        <NavLink to="/order/2">
          <button className="btn bg-blue-600 btn-primary max-sm:mx-auto mt-5 w-full text-white">
            Next
          </button>
        </NavLink>
      </label>
    </div>
  );
};

export default FirstForm;
