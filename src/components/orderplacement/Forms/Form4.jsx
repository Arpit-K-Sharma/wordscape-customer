import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const FourthForm = ({ orderData, setOrderData, entireData }) => {
  const { laminationTypes, bindingType, inkTypes, coverTreatment } = entireData;
  console.log(coverTreatment);
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
        <select
          className="select select-bordered"
          onChange={(e) =>
            setOrderData({ ...orderData, laminationType: e.target.value })
          }
        >
          {laminationTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.laminationType}
            </option>
          ))}
        </select>
        <br />

        <div className="label text-center content-center">
          <span className="label-text">Binding Types</span>
        </div>
        <select
          className="select select-bordered"
          onChange={(e) =>
            setOrderData({ ...orderData, bindingType: e.target.value })
          }
        >
          {bindingType.map((type) => (
            <option key={type.id} value={type.id}>
              {type.bindingType}
            </option>
          ))}
        </select>
        <br />

        <div className="label text-center content-center">
          <span className="label-text">Cover Treatment</span>
        </div>
        <select
          className="select select-bordered"
          onChange={(e) =>
            setOrderData({ ...orderData, coverTreatmentType: e.target.value })
          }
        >
          {coverTreatment.map((type) => (
            <option key={type.coverTreatmentId} value={type.coverTreatmentType}>
              {type.coverTreatmentType}
            </option>
          ))}
        </select>
        <br />

        <div>
          <h3 className="text-xl font-archivo">Color Type: </h3>
          <div className="flex justify-center max-sm:mt-5">
            <select
              className="select select-bordered"
              onChange={(e) =>
                setOrderData({ ...orderData, inkType: e.target.value })
              }
            >
              {inkTypes.map((type) => (
                <option key={type.inkId} value={type.inkType}>
                  {type.inkType}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />

        <div className="lg:flex flex mb-9 max-sm:flex-col justify-center max-sm:justify-center">
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
