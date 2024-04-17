import React from "react";
import Navbar from "../navbar/navbar";

function OrderNavbar5() {
  return (
    <div>
      <Navbar />
      <div className="p-7 text-slate-200 mx-auto relative mt-[-30px]">
        <div>
          <ul className="steps steps-vertical ml-[300px] mt-[60px] lg:steps-horizontal sm:steps-vertical">
            <li className="step step-primary" data-content="✓">
              Inner Paper
            </li>
            <li className="step step-primary" data-content="✓">
              Outer Paper
            </li>
            <li className="step step-primary" data-content="✓">
              Quantity
            </li>
            <li className="step step-primary" data-content="✓">
              Extras
            </li>
            <li className="step step-primary" data-content="●">
              Details & Confirmation
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderNavbar5;
