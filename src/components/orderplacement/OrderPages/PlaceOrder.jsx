import React, { useState, useEffect } from "react";
import Progress from "../Progressbar/Progress";
import FirstForm from "../Forms/Form1";
import SecondForm from "../Forms/Form2";
import ThirdForm from "../Forms/Form3";
import FourthForm from "../Forms/Form4";
import FifthForm from "../Forms/Form5";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../../navbar/navbar";
import MobileMenu from "../../navbar/mobile-menu";
import axios from "../../axiosInstance";

function OrderPlacement() {
  const [orderData, setOrderData] = useState({
    // name: "",
    address: "",
    // companyName: "",
    innerPaperType: "",
    innerPaperThickness: 0,
    outerPaperType: "",
    outerPaperThickness: 0,
    // paperSize: "",
    pages: "",
    quantity: "",
    estimatedAmount: 0,
    bindingType: "",
    inkType: "",
    // coverTreatmentType: "",
    date: Date.now(),
    deadline: "",
    innerPaperRate: 0,
    outerPaperRate: 0,
    laminationRate: 0,
    bindingRate: 0,
    plateRate: 0,
    deliveryOption: "",
    innerLamination: "",
    outerLamination: "",
    costCalculation: {
      plates: 0,
      printing: 0,
      paper: 0,
      coverPaper: 0,
      innerPaper: 0,
      otherPaper: 0,
      lamination: 0,
      binding: 0,
      finishing: 0,
      extraCharges: 0,
      subTotal: 0,
      vat: 0,
      grandTotal: 0,
      preparedBy: "",
      approvedBy: "",
    },
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
      .get("/coverTreatments")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => a.coverTreatmentId - b.coverTreatmentId
        );
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
          coverTreatment: sortedData,
        }));

        const firstCoverTreatment =
          sortedData.length > 0 ? sortedData[0].coverTreatmentType : "";

        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          coverTreatmentType: firstCoverTreatment,
        }));
        //console.log("COVER T 1 " + firstCoverTreatment);
      })

      .catch((error) => {
        console.error("Error fetching cover treatment data:", error);
      });
  };

  const getInnerPaperType = () => {
    axios
      .get("/papers")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.paperId - b.paperId);
        const paperTypesData = sortedData.map((paper) => ({
          id: paper.paperId,
          name: paper.paperType,
          minThickness: paper.minThickness,
          maxThickness: paper.maxThickness,
        }));

        setEntireData((prevEntireData) => ({
          ...prevEntireData,
          fetchedPaperTypes: paperTypesData,
        }));

        const firstPaperType =
          paperTypesData.length > 0 ? paperTypesData[0].name : "";

        const outerPaperType =
          paperTypesData.length > 0 ? paperTypesData[0].name : "";

        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          innerPaperType: firstPaperType,
          outerPaperType: outerPaperType,
        }));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const getPaperThicknesses = async () => {
    try {
      const response = await axios.get("/paperThickness");
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
      const response = await axios.get("/paperSizes");
      if (response) {
        const sortedData = response.data.sort((a, b) => a.sizeId - b.sizeId);
        // console.log("Sorted data");
        // console.log(sortedData);
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
          paperSizeData: sortedData,
        }));

        const firstPaperSize =
          sortedData.length > 0 ? sortedData[0].paperSize : "";
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          paperSize: firstPaperSize,
        }));
        // console.log("FIRST PAPER SIZE " + firstPaperSize);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const getInks = async () => {
    try {
      const response = await axios.get("/inks");
      if (response) {
        const sortedData = response.data.sort((a, b) => a.inkId - b.inkId);
        setEntireData((prevEntireData) => ({
          ...prevEntireData,
          inkTypes: sortedData,
        }));

        const firstInkType = sortedData.length > 0 ? sortedData[0].inkType : "";
        setOrderData((prevOrderData) => ({
          ...prevOrderData,
          inkType: firstInkType,
        }));
      }
    } catch (error) {
      console.error("Error fetching ink data:", error);
    }
  };

  const getLamination = async () => {
    try {
      const response = await axios.get("/laminations");
      const sortedData = response.data.sort(
        (a, b) => a.laminationId - b.laminationId
      );
      setEntireData((prevEntireData) => ({
        ...prevEntireData,
        laminationTypes: sortedData,
      }));

      const firstLaminationType =
        sortedData.length > 0 ? sortedData[0].laminationType : "";

      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        innerLamination: firstLaminationType,
        outerLamination: firstLaminationType,
      }));
    } catch (error) {
      console.error("Error fetching lamination data:", error);
    }
  };

  console.log("Order Data : ", JSON.stringify(orderData));

  const getBinding = async () => {
    try {
      const response = await axios.get("/bindings");
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
      // console.log(order Data);
      // const id = localStorage.getItem("id");
      // console.log(id);
      console.log("mydatais", orderData);
      const response = await axios.post(`/orders`, orderData);
      console.log("Order placed successfully", response.data);
      toast.success(
        "Order placed successfully. Thank you for ordering through WordScape."
      );
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  // const handleSubmit = async () => {
  //   try {
  //     // console.log("Test");
  //     // console.log(orderData);
  //     const response = await axios.post(
  //       "http://localhost:8081/orders",
  //       orderData
  //     );
  //     console.log("Order placed successfully", response.data);
  //   } catch (error) {
  //     console.error("Error placing order", error);
  //   }
  // };

  {
    console.log("Order Data: " + JSON.stringify(orderData));
  }

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className="">
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
      </div>
    </>
  );
}

export default OrderPlacement;
