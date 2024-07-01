import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "../../axiosInstance";
import { FaRegNewspaper } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { GiPapers } from "react-icons/gi";

const SecondForm = ({ orderData, entireData, setOrderData }) => {
  const { paperThicknessData, fetchedPaperTypes } = entireData;
  const [availableThicknesses, setAvailableThicknesses] = useState([]);

  useEffect(() => {
    if (fetchedPaperTypes.length > 0) {
      const defaultPaperType = fetchedPaperTypes[0].name;
      setOrderData((prevData) => ({
        ...prevData,
        outerPaperType: defaultPaperType,
      }));
    }
  }, [fetchedPaperTypes]);

  useEffect(() => {
    if (orderData.outerPaperType) {
      const selectedPaperType = fetchedPaperTypes.find(
        (type) => type.name === orderData.outerPaperType
      );
      if (selectedPaperType) {
        const minThickness = selectedPaperType.minThickness;
        const maxThickness = selectedPaperType.maxThickness;
        const thicknessOptions = paperThicknessData.filter(
          (gsm) =>
            gsm.thickness >= minThickness && gsm.thickness <= maxThickness
        );
        setAvailableThicknesses(thicknessOptions);
        if (thicknessOptions.length > 0) {
          setOrderData((prevData) => ({
            ...prevData,
            outerPaperThickness: thicknessOptions[0].thickness,
          }));
        }
      }
    }
  }, [orderData.outerPaperType, fetchedPaperTypes, paperThicknessData]);

  return (
    <div className="lg:mt-6 lg:mb-6 font-archivo">
      <label className="form-control">
        <p className="text-2xl font-light max-sm:text-[24px] text-zinc-900 max-sm:flex max-sm:justify-center">
          What about the cover of your book that you would want to print on?
        </p>
        <br />
        <div className="label text-center">
          <span className="label-text">Outer Paper Type</span>
          <FaRegNewspaper color="black" size={`25px`} />
        </div>
        <select
          className="select select-bordered text-zinc-900"
          value={orderData.outerPaperType}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              outerPaperType: e.target.value,
              outerPaperThickness: "", // Reset thickness when paper type changes
            })
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
          <span className="label-text">Outer Paper Thickness</span>
          <GiPapers color="black" size={`25px`} />
        </div>
        <select
          className="select select-bordered text-zinc-900"
          value={orderData.outerPaperThickness}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              outerPaperThickness: parseInt(e.target.value),
            })
          }
        >
          {availableThicknesses.map((gsm) => (
            <option key={gsm.id} value={gsm.thickness}>
              {gsm.thickness}
            </option>
          ))}
        </select>
        <br />
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center ">
          <NavLink to="/order/1">
            <button className="btn max-lg:w-full bg-zinc-900 hover:bg-zinc-600 hover:text-white  w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to="/order/3">
            <button className="btn bg-blue-600 max-lg:w-full text-white btn-primary w-[280px] mt-5">
              Next
            </button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default SecondForm;
