import React from "react";
import { NavLink } from "react-router-dom";

const SecondForm = ({
  paperTypes,
  outerPaperGSM,
  selectedThickness,
  setSelectedThickness,
}) => {
  return (
    <div className="ml-[31%] my-3 content-center p-4">
      <label className="form-control w-full max-w-xl">
        <div className="label text-center content-center">
          <span className="label-text">Choose your Paper Size</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
        </select>
        <div className="label">
          <span className="label-text-alt">Outer Paper Type</span>
        </div>
        <select
          className="select select-bordered w-full max-w-xl mt-5"
          value={selectedThickness}
          onChange={(e) => setSelectedThickness(e.target.value)}
        >
          <option disabled defaultValue>
            Pick one
          </option>
        </select>
        <div className="label">
          <span className="label-text-alt">Outer Paper Thickness</span>
        </div>
        <div className="flex">
        <NavLink to="/order">
          <button className="btn btn-primary w-[280px] mt-5 mr-5">Previous</button>
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
