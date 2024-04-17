import React from "react";
import Navbar from "../navbar/navbar";
import OrderNavbar from "./OrderNav1";
import { useState } from "react";
import FirstForm from "./Form1";

const paperTypes = [
  { id: 1, name: "Art Paper" },
  { id: 2, name: "Art Board" },
];

const innerPaperGSM = [
  { id: 1, thickness: 100 },
  { id: 2, thickness: 200 },
  { id: 3, thickness: 300 },
];

const paperSize = [
  { id: 1, size: "A4" },
  { id: 2, size: "A5"}
]

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
            innerPaperGSM={innerPaperGSM}
            selectedThickness={selectedPaperType}
            setSelectedThickness={setSelectedThickness}
            paperSize={paperSize}
          />

        </div>
      </div>
    </div>
  );
}

export default OrderPlacement;