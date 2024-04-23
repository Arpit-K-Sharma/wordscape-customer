import React, { useState, useEffect } from "react";
import Progress from "../Progressbar/Progress";
import FirstForm from "../Forms/Form1";
import SecondForm from "../Forms/Form2";
import ThirdForm from "../Forms/Form3";
import FourthForm from "../Forms/Form4";
import FifthForm from "../Forms/Form5";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const outerPaperGSM = [
  { id: 1, thickness: 100 },
  { id: 2, thickness: 200 },
  { id: 3, thickness: 300 },
];

function OrderPlacement() {
  const [orderData, setOrderData] = useState({
    name: "",
    paperTypes: [],
    email: "",
    address: "",
    companyName: "",
    innerPaperType: "",
    innerPaperThickness: "",
    outerPaperType: "",
    outerPaperThickness: "",
    selectedPaperType: "",
    selectedThickness: "",
    paperSize: "",
    fetchedPaperTypes: [],
    paperSizeData: [],
    paperThicknessData: [],
    pages: "",
    quantity: "",
    laminationTypes: [],
    bindingType: [],
    inkTypes: [],
  });

  useEffect(() => {
    getInnerPaperType();
    getPaperSizes();
    getLamination();
    getInks();
    getBinding();
    getPaperThicknesses();
  }, []);

  const getInnerPaperType = () => {
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
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          fetchedPaperTypes: paperTypesData,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getPaperThicknesses = async () => {
    try {
      const response = await axios.get("http://localhost:8081/paperThickness");
      if (response) {
        const sortedData = response.data.sort(
          (a, b) => a.thicknessId - b.thicknessId
        );
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          paperThicknessData: sortedData,
        }));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const getPaperSizes = async () => {
    try {
      const response = await axios.get("http://localhost:8081/paperSizes");
      if (response) {
        const sortedData = response.data.sort((a, b) => a.sizeId - b.sizeId);
        console.log("Sorted data");
        console.log(sortedData);
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          paperSizeData: sortedData,
        }));
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const getInks = async () => {
    try {
      const response = await axios.get("http://localhost:8081/inks");
      if (response) {
        const sortedData = response.data.sort((a, b) => a.inkId - b.inkId);
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          inkTypes: sortedData,
        }));
      }
    } catch (error) {
      console.error("Error fetching ink data:", error);
    }
  };

  const getLamination = async () => {
    try {
      const response = await axios.get("http://localhost:8081/laminations");
      const sortedData = response.data.sort(
        (a, b) => a.laminationId - b.laminationId
      );
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        laminationTypes: sortedData,
      }));
    } catch (error) {
      console.error("Error fetching lamination data:", error);
    }
  };

  const getBinding = async () => {
    try {
      const response = await axios.get("http://localhost:8081/bindings");
      const sortedData = response.data.sort(
        (a, b) => a.bindingId - b.bindingId
      );
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        bindingType: sortedData,
      }));
    } catch (error) {
      console.error("Error fetching binding data:", error);
    }
  };

  const { step } = useParams();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/orders",
        orderData
      );
      console.log("Order placed successfully", response.data);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div>
      <Progress step={step} />
      <div className="text-slate-200 mx-auto relative">
        <div className="flex justify-center max-sm:justify-center max-sm:p-10 max-sm:flex max-sm:flex-col">
          {step == 1 ? (
            <FirstForm orderData={orderData} setOrderData={setOrderData} />
          ) : (
            <></>
          )}

          {step == 2 ? (
            <SecondForm orderData={orderData} setOrderData={setOrderData} />
          ) : (
            <></>
          )}

          {step == 3 ? (
            <ThirdForm
              orderData={orderData}
              setOrderData={setOrderData}
              // paperTypes={orderData.fetchedPaperTypes}
              // selectedThickness={orderData.selectedThickness}
              // setSelectedThickness={setOrderData}
              // paperSizeData={orderData.paperSizeData}
              // paperThicknessData={orderData.paperThicknessData}
            />
          ) : (
            <></>
          )}

          {step == 4 ? (
            <FourthForm orderData={orderData} setOrderData={setOrderData} />
          ) : (
            <></>
          )}

          {step == 5 ? (
            <FifthForm
              paperTypes={orderData.fetchedPaperTypes}
              selectedThickness={orderData.selectedThickness}
              setSelectedThickness={setOrderData}
              paperSizeData={orderData.paperSizeData}
              paperThicknessData={orderData.paperThicknessData}
              handleSubmit={handleSubmit}
              setName={setOrderData}
              setEmail={setOrderData}
              setAddress={setOrderData}
              setCompanyName={setOrderData}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderPlacement;
