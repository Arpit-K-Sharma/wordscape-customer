import React from "react";
import Navbar from "../navbar/navbar";

function OrderNavbar() {
  return (
    <div>
      <Navbar />
      <div className="p-7 text-slate-200 mx-auto relative">
        <div>
          <h1 className="text-center mx-auto text-4xl font-archivo mt-9">
            Place your order through WordScape
          </h1>
          <ul className="steps steps-vertical ml-[450px] mt-[60px] lg:steps-horizontal sm:steps-vertical">
            <li className="step step-primary" data-content="●">Place an Order</li>
            <li className="step">Choose Lamination</li>
            <li className="step">Purchase</li>
            <li className="step">Receive Product</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderNavbar;
