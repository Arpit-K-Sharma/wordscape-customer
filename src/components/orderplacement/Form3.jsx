import React from "react";
import { NavLink } from "react-router-dom";

const ThirdForm = ({}) => {
  return (
    <div className="ml-[31%] my-3 content-center p-4">
      <label className="form-control w-full max-w-xl">
        <p className="text-2xl font-light">
          How many quantites and pages do you want to print?
        </p>
        <br />
        <div className="label text-center content-center">
          <span className="label-text">Pages</span>
        </div>
        <input className="input input-bordered" type="number"/>
        <div className="label">
        <span className="label-text-alt">{""}</span>
          <span className="label-text-alt">Number of Pages inside the book</span>
        </div>
        <br/>
        <div className="label text-center content-center">
          <span className="label-text">Quantities</span>
        </div>
        <input className="input input-bordered" type="number"/>
        <div className="label">
          <span className="label-text-alt">{""}</span>
          <span className="label-text-alt">Number of Copies</span>
        </div>
        <br/>

        <div className="flex">
          <NavLink to="/order/2">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to="/order/4">
            <button className="btn btn-primary w-[280px] mt-5">Next</button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default ThirdForm;
