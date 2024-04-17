import React from "react";
import Navbar from "../navbar/navbar";
import OrderNavbar from "./OrderNav1";
import { useState } from "react";
import SecondForm from "./Form2";
import OrderNavbar1 from "./OrderNav2";

const outerPaperTypes = [
  { id: 1, name: "Art Paper" },
  { id: 2, name: "Art Board" },
];

const paperTypes = [
  { id: 1, name: "Art Paper" },
  { id: 2, name: "Art Board" },
];

const outerPaperGSM = [
  { id: 1, thickness: 100 },
  { id: 2, thickness: 200 },
  { id: 3, thickness: 300 },
];

function OrderPlacementSecond() {
  const [selectedPaperType, setSelectedPaperType] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState(1);

  return (
    <div>
      <OrderNavbar1 />
      <div className="p-7 text-slate-200 mx-auto relative">
        <div className="mx-auto content-center text-center">
          <SecondForm
            outerPaperTypes={outerPaperTypes}
            paperTypes={paperTypes}
            outerPaperGSM={outerPaperGSM}
            selectedThickness={selectedThickness}
            setSelectedThickness={setSelectedThickness}
            selectedPaperType={selectedPaperType}
            setSelectedPaperType={setSelectedPaperType}
          />

        </div>
      </div>
    </div>
  );
}

export default OrderPlacementSecond;