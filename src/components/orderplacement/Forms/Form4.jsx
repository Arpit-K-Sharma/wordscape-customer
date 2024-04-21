import React from "react";
import { NavLink } from "react-router-dom";

const laminationTypes = [
  { id: 1, type: "Glossy" },
  { id: 2, type: "Thermal Glossy" },
  { id: 3, type: "Matte" },
  { id: 4, type: "Thermal Matte" },
];

const bindingTypes = [
  { id: 1, type: "Wiro Binding" },
  { id: 2, type: "Spiral Binding" },
  { id: 3, type: "Perfect Binding" },
  { id: 4, type: "Juju" },
];

const FourthForm = ({}) => {
  return (
    <div className="lg:mt-6 lg:mb-6 lg:px-[240px] max-sm:px-10 lg:flex lg:justify-center">
      <label className="form-control w-full max-w-xl">
        <p className="text-2xl font-light max-sm:text-[24px] max-sm:flex max-sm:justify-center">
          What lamination and binding would you want to choose from?
        </p>
        <br />

        <div className="label text-center">
          <span className="label-text">Lamination Types</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {laminationTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
        <br />

        <div className="label text-center content-center">
          <span className="label-text">Binding Types</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {bindingTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.type}
            </option>
          ))}
        </select>
        <br />

        <div>
          <h3 className="text-xl">Color Type: </h3>
          <div className="flex justify-center">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text block mr-5">RGB</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                  checked
                />
              </label>
            </div>
            <div className="form-control ml-[3rem]">
              <label className="label cursor-pointer">
                <span className="label-text block mr-5">CMYK</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                  checked
                />
              </label>
            </div>
          </div>
        </div>

        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/2">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to="/order/5">
            <button className="btn btn-primary w-[280px] mt-5">Next</button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default FourthForm;
