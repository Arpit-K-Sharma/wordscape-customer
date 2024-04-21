import React, { useEffect } from "react";
import Navbar from "../../navbar/navbar";

function Progress({ step }) {
  return (
    <div>
      <Navbar />
      <div className="p-7 text-slate-200 mx-auto relative w-full flex justify-center ">
        <div>
          {/* <h1 className="text-center ml-[60px] text-4xl font-archivo mt-9">
            Place your order through WordScape
          </h1> */}
          <ul className="steps steps-horizontal">
            <li
              className={step == 1 ? `step step-primary` : `step`}
              data-content="●"
            >
              Inner Paper
            </li>
            <li
              className={step == 2 ? `step step-primary` : `step`}
              data-content="●"
            >
              Outer Paper
            </li>
            <li className={step == 3 ? `step step-primary` : `step`}>Quantity</li>
            <li className={step == 4 ? `step step-primary` : `step`}>Extras</li>
            <li className={step == 5 ? `step step-primary` : `step`}>
              Details & Confirmation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Progress;
