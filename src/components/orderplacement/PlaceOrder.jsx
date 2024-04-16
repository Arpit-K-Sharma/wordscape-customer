import React from "react";
import Navbar from "../navbar/navbar";
import OrderNavbar from "./ordernavbar";
import { useState } from "react";
import FirstForm from "./FirstForm";

const paperTypes = [
  { id: 1, name: "Art Paper" },
  { id: 2, name: "Art Board" },
];

const outerPaperGSM = [
  { id: 1, thickness: 100 },
  { id: 2, thickness: 200 },
  { id: 3, thickness: 300 },
];

function OrderPlacement() {
  const [selectedPaperType, setSelectedPaperType] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState(1);

  return (
    <div>
      <OrderNavbar />
      <div className="p-7 text-slate-200 mx-auto relative">
        <div className="mx-auto content-center text-center">
          <FirstForm
            paperTypes={paperTypes}
            outerPaperGSM={outerPaperGSM}
            selectedThickness={selectedPaperType}
            setSelectedThickness={setSelectedThickness}
          />

        </div>
      </div>
    </div>
  );
}

export default OrderPlacement;