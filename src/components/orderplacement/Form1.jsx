import React from "react";
import { NavLink } from "react-router-dom";

const FirstForm = ({
  paperTypes,
  paperSize,
  innerPaperGSM,
  selectedThickness,
  setSelectedThickness,
}) => {
  return (
    <div className="ml-[31%] my-3 content-center p-4">
      <label className="form-control w-full max-w-xl">
        <p className="text-2xl font-light">
          Start placing your order with the paper size, type
          and its thickness
        </p>
        <br />

        <div className="label text-center content-center">
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
        </select><br/>
      
        <div className="label text-center content-center">
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
        </select><br/>
        <div className="label text-center content-center">
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
        </select><br/>
        <NavLink to="/order/2">
          <button className="btn btn-primary mt-5 w-[500px]">Next</button>
        </NavLink>
      </label>
    </div>
  );
};

export default FirstForm;
