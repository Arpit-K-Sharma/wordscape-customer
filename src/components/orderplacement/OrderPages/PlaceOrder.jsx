import React from "react";
import Navbar from "../../navbar/navbar";
import Progress from "../Progressbar/Progress";
import { useState } from "react";
import FirstForm from "../Forms/Form1";
import { useEffect } from "react";
import axios from "axios";
import SecondForm from "../Forms/Form2";
// const paperTypes = [
//   { id: 1, name: "Art Paper" },
//   { id: 2, name: "Art Board" },
// ];
import ThirdForm from "../Forms/Form3";
import FourthForm from "../Forms/Form4";
import FifthForm from "../Forms/Form5";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MobileNavbar from "../../navbar/mobile-navbar";
import MobileMenu from "../../navbar/mobile-menu";

const innerPaperGSM = [
  { id: 1, thickness: 100 },
  { id: 2, thickness: 200 },
  { id: 3, thickness: 300 },
];

const paperSize = [
  { id: 1, size: "A4" },
  { id: 2, size: "A5" },
];

const outerPaperTypes = [
  { id: 1, name: "Art Paper" },
  { id: 2, name: "Art Board" },
];

// const paperTypes = [
//   { id: 1, name: "Art Paper" },
//   { id: 2, name: "Art Board" },
// ];

const outerPaperGSM = [
  { id: 1, thickness: 100 },
  { id: 2, thickness: 200 },
  { id: 3, thickness: 300 },
];

function OrderPlacement() {
  const [paperTypes, setPaperTypes] = useState([]);
  const [selectedPaperType, setSelectedPaperType] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState(1);

  const steps = useSelector((state) => state.progress.step);

  useEffect(() => {
    getPaper();
  }, []);

  const getPaper = () => {
    axios
      .get("http://localhost:8081/papers")
      .then((response) => {
        // Sort the data by paperId in ascending order
        const sortedData = response.data.sort((a, b) => a.paperId - b.paperId);
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

  const { step } = useParams();

  return (
    <div>
    {/* <MobileMenu/> */}
      <Progress step={step} />
      <div className="text-slate-200 mx-auto relative">
        <div className="flex justify-center content-center text-center sm:justify-center max-sm:justify-center max-sm:p-10">
          {step == 1 ? (
            <FirstForm
              paperTypes={paperTypes}
              innerPaperGSM={innerPaperGSM}
              selectedThickness={selectedPaperType}
              setSelectedThickness={setSelectedThickness}
              paperSize={paperSize}
            />
          ) : (
            <></>
          )}

          {step == 2 ? (
            <SecondForm
              outerPaperTypes={outerPaperTypes}
              paperTypes={paperTypes}
              outerPaperGSM={outerPaperGSM}
              selectedThickness={selectedThickness}
              setSelectedThickness={setSelectedThickness}
              selectedPaperType={selectedPaperType}
              setSelectedPaperType={setSelectedPaperType}
            />
          ) : (
            <></>
          )}
          </div>

          {step == 3 ? <ThirdForm /> : <></>}

          {step == 4 ? <FourthForm /> : <></>}

          {step == 5 ? <FifthForm /> : <></>}
        </div>
      </div>
  );
}

export default OrderPlacement;
