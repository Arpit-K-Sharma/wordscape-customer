import React from "react";
import Navbar from "../../navbar/navbar";
import { useState } from "react";
import OrderNavbar4 from "../Progressbar/Progress4";
import FourthForm from "../Forms/Form4";

function OrderPlacementFourth() {

  return (
    <div>
      <OrderNavbar4 />
      <div className="p-7 text-slate-200 mx-auto relative">
        <div className="mx-auto content-center text-center">
          <FourthForm/>
        </div>
      </div>
    </div>
  );
}

export default OrderPlacementFourth;