import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/progressSlice";
import { useEffect } from "react";

const FirstForm = ({ orderData, entireData, setOrderData }) => {
  const {
    paperSizeData,
    fetchedPaperTypes,
    paperThicknessData,
    selectedThickness,
  } = entireData;

  return (
    <div className="lg:mt-6 lg:mb-6">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px]">
          Start placing your order with the paper size, type, and its thickness
        </p>
        <br />
        <div className="label text-center">
          <span className="label-text">Paper Size</span>
        </div>
        <select
          className="select select-bordered"
          onChange={(e) =>
            setOrderData({ ...orderData, paperSizeData: e.target.value })
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
        </div>
        <select
          className="select select-bordered"
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
        </div>
        <select
          className="select select-bordered"
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
          <button className="btn btn-primary mt-5 w-full">Next</button>
        </NavLink>
      </label>
    </div>
  );
};

export default FirstForm;
