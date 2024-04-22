import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ThirdForm = ({ onSubmitPagesQuantity }) => {
  const [pages, setPages] = useState(50);
  const [quantity, setQuantity] = useState(100);

  const handleNext = () => {
    onSubmitPagesQuantity({ pages, quantity });
    history.push("/order/4");
  };

  return (
    <div className="lg:mt-6 lg:mb-6">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px] max-sm:flex max-sm:justify-center">
          How many quantities and pages do you want to print?
        </p>
        <br />
        <div className="label text-center">
          <span className="label-text">Pages</span>
        </div>
        <input
          className="input input-bordered"
          type="number"
          value={pages}
          onChange={(e) => setPages(parseInt(e.target.value))}
        />
        <div className="label">
          <span className="label-text-alt">{""}</span>
          <span className="label-text-alt">
            Number of Pages inside the book
          </span>
        </div>
        <br />
        <div className="label text-center">
          <span className="label-text">Quantities</span>
        </div>
        <input
          className="input input-bordered"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <div className="label">
          <span className="label-text-alt">{""}</span>
          <span className="label-text-alt">Number of Copies</span>
        </div>
        <br />
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/2">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <NavLink to="/order/4">
            <button className="btn btn-primary w-[280px] mt-5" onClick={handleNext}>
              Next
            </button>
          </NavLink>
        </div>
      </label>
    </div>
  );
};

export default ThirdForm;