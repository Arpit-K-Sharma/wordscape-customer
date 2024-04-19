import React from "react";
import Navbar from "../../navbar/navbar";
import { useState } from "react";
import Progress5 from "../Progressbar/Progress5";
import FifthForm from "../Forms/Form5";

function OrderPlacementFifth() {

  return (
    <div>
      <Progress5/>
      <div className="p-7 text-slate-200 mx-auto relative">
        <div className="mx-auto content-center text-center">
          <FifthForm/>
        </div>
      </div>
    </div>
  );
}

export default OrderPlacementFifth;