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

function OrderPlacement() {
  const [orderData, setOrderData] = useState({
    name: "",
    email: "",
    address: "",
    companyName: "",
    innerPaperType: "Art_Paper",
    innerPaperThickness: 100,
    outerPaperType: "Art_Paper",
    outerPaperThickness: 100,
    paperSize: "A4",
    pages: "",
    quantity: "",
    bindingType: "Center Stitch",
    inkType: "Black and White",
    laminationType: "Normal Glossy",
    coverTreatmentType: "Die Cutting",
    date: Date.now(),
  });

  useEffect(() => {
    getInnerPaperType();
    getPaperSizes();
    getLamination();
    getInks();
    getBinding();
    getPaperThicknesses();
    getCoverTreatment();
  }, []);

  const [entireData, setEntireData] = useState({
    fetchedPaperTypes: [],
    paperSizeData: [],
    inkTypes: [],
    laminationTypes: [],
    bindingType: [],
    paperThicknessData: [],
    coverTreatment: [],
  });

  const getCoverTreatment = () => {
    axios
      .get("http://localhost:8081/coverTreatments")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => a.coverTreatmentId - b.coverTreatmentId
        );
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
          coverTreatment: sortedData,
        }));
      })
      .catch((error) => {
        console.error("Error fetching cover treatment data:", error);
      });
  };

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
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
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
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
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
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
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
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
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
      setEntireData((prevEntireData) => ({
        ...prevEntireData,
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
      setEntireData((prevEntireData) => ({
        ...prevEntireData,
        bindingType: sortedData,
      }));
    } catch (error) {
      console.error("Error fetching binding data:", error);
    }
  };

  const { step } = useParams();

  const handleSubmit = async () => {
    try {
      // console.log("Test");
      // console.log(orderData);
      const id = localStorage.getItem("id");
      console.log(id);
      const response = await axios.post(
        `http://localhost:8081/orders/${id}`,
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
      <div className="text-slate-200 mx-auto relative text-white">
        <div className="flex justify-center max-sm:justify-center max-sm:p-10 max-sm:flex max-sm:flex-col">
          {step == 1 ? (
            <FirstForm
              entireData={entireData}
              orderData={orderData}
              setOrderData={setOrderData}
            />
          ) : (
            <></>
          )}

          {step == 2 ? (
            <SecondForm
              orderData={orderData}
              entireData={entireData}
              setOrderData={setOrderData}
            />
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
            <FourthForm
              orderData={orderData}
              entireData={entireData}
              setOrderData={setOrderData}
            />
          ) : (
            <></>
          )}

          {step == 5 ? (
            <FifthForm
              orderData={orderData}
              setOrderData={setOrderData}
              handleSubmit={handleSubmit}
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
