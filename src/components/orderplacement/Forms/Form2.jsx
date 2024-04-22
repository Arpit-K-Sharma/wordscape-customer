import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const SecondForm = ({
  paperTypes,
  outerPaperGSM,
  selectedThickness,
  outerPaperTypes,
  setSelectedThickness,
  selectedPaperType,
  setSelectedPaperType,
}) => {
  const [fetchedPaperTypes, setFetchedPaperTypes] = useState([]);

  useEffect(() => {
    getPaper();
  }, []);

  const getPaper = () => {
    axios
      .get("http://localhost:8081/papers")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.paperId - b.paperId);
        const paperTypesData = sortedData.map((paper) => ({
          id: paper.paperId,
          name: paper.paperType,
        }));
        setFetchedPaperTypes(paperTypesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div className="lg:mt-6 lg:mb-6">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px] max-sm:flex max-sm:justify-center">
          What about the cover of your book that you would want to print on?
        </p>
        <br />
        <div className="label text-center">
          <span className="label-text">Outer Paper Type</span>
        </div>
        <select className="select select-bordered">
          <option disabled defaultValue>
            Pick one
          </option>
          {fetchedPaperTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <br />
        <div className="label text-center">
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
        <br />

        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
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