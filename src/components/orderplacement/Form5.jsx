import React from "react";
import { NavLink } from "react-router-dom";

const FifthForm = ({}) => {
  return (
    <div className="ml-[31%] my-3 content-center p-4">
      <label className="form-control w-full max-w-xl">
        <p className="text-2xl font-light">
          Fill in the details and confirm your order!
        </p>
        <br />

        <div className="">

        </div>



        <div>
            <p>Hover Bug</p>
        </div>
        <div className="flex">
          <NavLink to="/order/2">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none hover:bg-slate-500">
              Previous
            </button>
          </NavLink>
          <NavLink to="/">
            <button className="btn btn-primary w-[280px] mt-5">Next</button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default FifthForm;
