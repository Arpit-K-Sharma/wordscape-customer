import React from "react";
import Navbar from "../navbar/navbar";

function OrderNavbar1() {
  return (
    <div>
      <Navbar />
      <div className="p-7 text-slate-200 mx-auto relative mt-[-30px]">
        <div>
          <h1 className="text-center ml-[60px] text-4xl font-archivo mt-9">
            Place your order through WordScape
          </h1>
          <ul className="steps steps-vertical ml-[450px] mt-[60px] lg:steps-horizontal sm:steps-vertical">
            <li className="step step-primary" data-content="●">
              Inner Paper
            </li>
            <li className="step step-primary" data-content="●">
              Outer Paper
            </li>
            <li className="step">Purchase</li>
            <li className="step">Receive Product</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderNavbar1;
