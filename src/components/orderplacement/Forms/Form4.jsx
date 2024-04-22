import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const FourthForm = () => {
  const [loading, setLoading] = useState(true);
  const [laminationTypes, setLaminationTypes] = useState([]);
  const [bindingTypes, setBindingTypes] = useState([]);

  const getLamination = () => {
    axios
      .get("http://localhost:8081/laminations")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.laminationId - b.laminationId);
        setLaminationTypes(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching lamination data:", error);
      });
  };

  const getBinding = () => {
    axios
      .get("http://localhost:8081/bindings")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.bindingId - b.bindingId);
        setBindingTypes(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching binding data:", error);
      });
  };

  useEffect(() => {
    getLamination();
    getBinding();
  }, []);

  return (
    <div className="lg:mt-6 lg:mb-6">
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
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <option key={index} value={index + 1}>
                  Loading...
                </option>
              ))
            : laminationTypes.map((type) => (
                <option key={type.laminationId} value={type.laminationId}>
                  {type.laminationType}
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
            <option key={type.bindingId} value={type.bindingId}>
              {type.bindingType}
            </option>
          ))}
        </select>
        <br />

        <div>
          <h3 className="text-xl font-archivo">Color Type: </h3>
          <div className="flex justify-center max-sm:mt-5">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text block mr-5">CMYK</span>
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
                <span className="label-text block mr-5">B/W</span>
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-white"
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