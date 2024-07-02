import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaRegNewspaper } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { GiPapers } from "react-icons/gi";

const SecondForm = ({ orderData, entireData, setOrderData }) => {
  const { paperThicknessData, fetchedPaperTypes } = entireData;
  const [availableThicknesses, setAvailableThicknesses] = useState([]);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  useEffect(() => {
    if (
      orderData.outerPaperType &&
      orderData.outerPaperType !== "Choose a Paper Type"
    ) {
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
      }
    } else {
      setAvailableThicknesses([]);
    }
  }, [orderData.outerPaperType, fetchedPaperTypes, paperThicknessData]);

  useEffect(() => {
    setIsNextDisabled(
      !orderData.outerPaperType ||
        orderData.outerPaperType === "Choose a Paper Type" ||
        !orderData.outerPaperThickness
    );
  }, [orderData]);

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
          value={orderData.outerPaperType || "Choose a Paper Type"}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              outerPaperType: e.target.value,
              outerPaperThickness: "",
            })
          }
        >
          <option disabled>Choose a Paper Type</option>
          {fetchedPaperTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <br />
        {orderData.outerPaperType &&
          orderData.outerPaperType !== "Choose a Paper Type" && (
            <>
              <div className="label text-center">
                <span className="label-text">Outer Paper Thickness</span>
                <GiPapers color="black" size={`25px`} />
              </div>
              <select
                className="select select-bordered text-zinc-900"
                value={orderData.outerPaperThickness || ""}
                onChange={(e) =>
                  setOrderData({
                    ...orderData,
                    outerPaperThickness: parseInt(e.target.value),
                  })
                }
              >
                <option disabled value="">
                  Select Thickness
                </option>
                {availableThicknesses.map((gsm) => (
                  <option key={gsm.id} value={gsm.thickness}>
                    {gsm.thickness}
                  </option>
                ))}
              </select>
            </>
          )}
        <br />
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center ">
          <NavLink to="/order/1">
            <button className="btn max-lg:w-full bg-zinc-900 hover:bg-zinc-600 hover:text-white  w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to={!orderData.outerPaperThickness ? "#" : "/order/3"}>
            <button
              className="btn bg-blue-600 max-lg:w-full text-white btn-primary w-[280px] mt-5"
              disabled={isNextDisabled}
            >
              Next
            </button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default SecondForm;
