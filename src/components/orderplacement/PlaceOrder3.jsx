import React from "react";
import Navbar from "../navbar/navbar";
import { useState } from "react";
import ThirdForm from "./Form3";
import OrderNavbar3 from "./OrderNav3";

function OrderPlacementThird() {
  const [selectedPaperType, setSelectedPaperType] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState(1);

  return (
    <div>
      <OrderNavbar3 />
      <div className="p-7 text-slate-200 mx-auto relative">
        <div className="mx-auto content-center text-center">
          <ThirdForm/>
        </div>
      </div>
    </div>
  );
}

export default OrderPlacementThird;