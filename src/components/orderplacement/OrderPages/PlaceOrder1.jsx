import React from "react";
import Navbar from "../../navbar/navbar";
import Progress1 from "../Progressbar/Progress1";
import { useState } from "react";
import FirstForm from "../Forms/Form1";
import { useEffect } from "react";
import axios from "axios";

// const paperTypes = [
//   { id: 1, name: "Art Paper" },
//   { id: 2, name: "Art Board" },
// ];

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
  const [paperTypes, setPaperTypes] = useState([]);
  const [selectedPaperType, setSelectedPaperType] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState(1);



  useEffect(() => {
    getPaper();
  }, []);

  const getPaper = () => {
    axios
      .get("http://localhost:8081/papers")
      .then((response) => {
        // Sort the data by paperId in ascending order
        const sortedData = response.data.sort(
          (a, b) => a.paperId - b.paperId
        );
        // Extract the paper types data
        const paperTypesData = sortedData.map((paper) => ({
          id: paper.paperId,
          name: paper.paperType,
        }));
        // Set the paper types data as state
        setPaperTypes(paperTypesData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      <Progress1 />
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