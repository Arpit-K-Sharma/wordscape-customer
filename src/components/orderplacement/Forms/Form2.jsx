import React from "react";
import { NavLink } from "react-router-dom";

const SecondForm = ({
  paperTypes,
  outerPaperGSM,
  selectedThickness,
  outerPaperTypes,
  setSelectedThickness,
  selectedPaperType,
  setSelectedPaperType,
}) => {
  return (
    <div className="ml-[29%] my-3 content-center p-4">
      <label className="form-control w-full max-w-xl">
        <p className="text-2xl font-light">
          What about the cover of your book that you would want to print on?
        </p>
        <br />
        <div className="label text-center content-center">
          <span className="label-text">Outer Paper Type</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {outerPaperTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <br />
        <div className="label text-center content-center">
          <span className="label-text">Outer Paper Thickness</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {outerPaperGSM.map((gsm) => (
            <option key={gsm.id} value={gsm.id}>
              {gsm.thickness} GSM
            </option>
          ))}
        </select>

        <div className="flex">
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
