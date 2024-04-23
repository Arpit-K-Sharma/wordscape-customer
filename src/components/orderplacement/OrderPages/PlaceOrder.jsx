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


const innerPaperGSM = [
  { id: 1, thickness: 100 },
  { id: 2, thickness: 200 },
  { id: 3, thickness: 300 },
];

const outerPaperTypes = [
  { id: 1, name: "Art Paper" },
  { id: 2, name: "Art Board" },
];
const handleSubmit = (orderData) => {
  // Make the API call with the orderData
  axios
    .post("http://localhost:8081/orders", orderData)
    .then((response) => {
      console.log("Order placed successfully", response.data);
      // Handle successful order placement
    })
    .catch((error) => {
      console.error("Error placing order", error);
      // Handle error in order placement
    });
};
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
  const [paperSizeData, setPaperSizeData] = useState([]);

  const [selectedPaperType, setSelectedPaperType] = useState(1);
  const [selectedThickness, setSelectedThickness] = useState(1);
  const [paperThicknessData, setPaperThicknessData] = useState([]);
  const [fetchedPaperTypes, setFetchedPaperTypes] = useState([]);

  const steps = useSelector((state) => state.progress.step);

  useEffect(() => {
    getPaper();
    getPaperSizes();
    getPaperThicknesses();
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

  const getPaperThicknesses = () => {
    axios
      .get("http://localhost:8081/paperThickness")
      .then((response) => {
        // Sort the data by thicknessId in ascending order
        const sortedData = response.data.sort(
          (a, b) => a.thicknessId - b.thicknessId
        );
        setPaperThicknessData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getPaperSizes = () => {
    axios
      .get("http://localhost:8081/paperSizes")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => a.paperSizeId - b.paperSizeId
        );
        setPaperSizeData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };


  const { step } = useParams();

  return (
    <div>
      <Progress step={step} />
      <div className="text-slate-200 mx-auto relative">
        <div className="flex justify-center max-sm:justify-center max-sm:p-10 max-sm:flex max-sm:flex-col">
          {step == 1 ? (
            <FirstForm
              paperTypes={paperTypes}
              innerPaperGSM={innerPaperGSM}
              selectedThickness={selectedPaperType}
              setSelectedThickness={setSelectedThickness}
              paperSizeData={paperSizeData}
              paperThicknessData={paperThicknessData}
            />
          ) : (
            <></>
          )}

          {step == 2 ? (
            <SecondForm
              outerPaperTypes={outerPaperTypes}
              paperTypes={fetchedPaperTypes}
              outerPaperGSM={outerPaperGSM}
              selectedThickness={selectedThickness}
              paperThicknessData={paperThicknessData}
              setSelectedThickness={setSelectedThickness}
              selectedPaperType={selectedPaperType}
              setSelectedPaperType={setSelectedPaperType}
            />
          ) : (
            <></>
          )}

          {step == 3 ? <ThirdForm /> : <></>}

          {step == 4 ? <FourthForm /> : <></>}

          {step == 5 ? <FifthForm /> : <></>}
        </div>
      </div>
    </div>
  );
}

export default OrderPlacement;
