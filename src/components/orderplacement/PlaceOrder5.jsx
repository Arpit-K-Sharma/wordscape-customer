import React from "react";
import Navbar from "../navbar/navbar";
import { useState } from "react";
import OrderNavbar5 from "./OrderNav5";
import FifthForm from "./Form5";

function OrderPlacementFifth() {

  return (
    <div>
      <OrderNavbar5/>
      <div className="p-7 text-slate-200 mx-auto relative">
        <div className="mx-auto content-center text-center">
          <FifthForm/>
        </div>
      </div>
    </div>
  );
}

export default OrderPlacementFifth;