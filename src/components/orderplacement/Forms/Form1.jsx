import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { increment } from "../../redux/progressSlice";

const FirstForm = ({
  paperTypes,
  paperSize,
  innerPaperGSM,
  selectedThickness,
  setSelectedThickness,
}) => {

  const dispatch = useDispatch();

  function addStep(){
    dispatch(increment());
  }

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
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {paperSize.map((type) => (
            <option key={type.id} value={type.id}>
              {type.size}
            </option>
          ))}
        </select>
        <br />

        <div className="label text-center">
          <span className="label-text">Cover Paper Type</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {paperTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <br />

        <div className="label text-center">
          <span className="label-text">Cover Paper Thickness</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {innerPaperGSM.map((gsm) => (
            <option key={gsm.id} value={gsm.id}>
              {gsm.thickness} GSM
            </option>
          ))}
        </select>
        <br />
        <NavLink to="/order/2">
          <button className="btn btn-primary mt-5 w-full" onClick={addStep} >Next</button>
        </NavLink>
      </label>
    </div>
  );
};

export default FirstForm;
