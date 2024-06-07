import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaIndustry } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { get } from "react-hook-form";

const FifthForm = ({ orderData, setOrderData, handleSubmit }) => {
  const [plateCost, setPlateCost] = useState(0);
  const [bindingCost, setBindingCost] = useState(0);
  const [laminationPrice, setLaminationPrice] = useState(0);
  const [changeCostPerKg, setChangeCostPerKg] = useState(0);
  const [outerChangeCostPerKg, setOuterChangeCostPerKg] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitWithState = async () => {
    setIsSubmitting(true);
    try {
      await handleSubmit();
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(false);
      }, 3000); // Reset state after 3 seconds
    } catch (error) {
      console.error("Error submitting order:", error);
      setIsSubmitting(false);
    }
  };

  console.log(orderData.quantity, orderData.pages);

  function totalPages(quantity, pages) {
    return Math.round(quantity * pages);
  }

  function totalPacket(quantity) {
    return Math.ceil(totalSheets(quantity, 4) / 100);
  }

  function totalSheets(quantity, pages) {
    return totalPages(quantity, pages) / 16;
  }

  function reamCalc(selectedPaperThickness, costPerKg) {
    return Math.ceil((864 * selectedPaperThickness * costPerKg) / 3100);
  }

  function packetCalc(selectedOuterPaperThickness, outerChangeCostPerKg) {
    return reamCalc(selectedOuterPaperThickness, outerChangeCostPerKg) / 5;
  }

  function innerCost(quantity, pages, selectedPaperThickness, changeCostPerKg) {
    return (
      totalReams(pages, quantity) *
      reamCalc(selectedPaperThickness, changeCostPerKg)
    );
  }

  function platePrice(pages, plateCost) {
    return pages * plateCost;
  }

  function calculateLamination(laminationPrice, quantity, pages) {
    return Math.ceil(((12 * 18 * laminationPrice) / 2) * pages * quantity);
  }

  function totalReams(pages, quantity) {
    return Math.round((pages * quantity) / 16 / 500);
  }

  const getRateForBindingType = (selectedBindingType) => {
    axios
      .get("http://localhost:8081/bindings")
      .then((response) => {
        const selectedBinding = response.data.find(
          (binding) => binding.bindingType === selectedBindingType
        );

        if (selectedBinding) {
          setBindingCost(selectedBinding.rate);
          console.log(
            "Binding Type:",
            selectedBindingType,
            "Rate:",
            selectedBinding.rate
          );
        } else {
          console.error("Binding type not found:", selectedBindingType);
        }
      })
      .catch((error) => {
        console.error("Error fetching binding types:", error);
      });
  };

  const getRateForLaminationType = (selectedLaminationType) => {
    axios
      .get("http://localhost:8081/laminations")
      .then((response) => {
        const selectedLamination = response.data.find(
          (lamination) => lamination.laminationType === selectedLaminationType
        );
        if (selectedLamination) {
          setLaminationPrice(selectedLamination.rate);
          console.log(
            "Lamination Type:",
            selectedLaminationType,
            "Rate:",
            selectedLamination.rate
          );
        } else {
          console.error("Lamination type not found:", selectedLaminationType);
        }
      })
      .catch((error) => {
        console.error("Error fetching lamination types:", error);
      });
  };

  const getRatePlate = (plateSize) => {
    axios
      .get("http://localhost:8081/plates")
      .then((response) => {
        const plate = response.data.find(
          (plate) => plate.plateSize === plateSize
        );

        if (plate) {
          setPlateCost(plate.plateRate);
          console.log("Plate Rate for size", plateSize, "is", plate.plateRate);
        } else {
          console.error("Plate size not found:", plateSize);
        }
      })
      .catch((error) => {
        console.error("Error fetching plate rate:", error);
      });
  };

  const getRatePaper = (selectedPaperType) => {
    axios
      .get("http://localhost:8081/papers")
      .then((response) => {
        const paper = response.data.find(
          (paper) => paper.paperType === selectedPaperType
        );

        if (paper) {
          setChangeCostPerKg(paper.rate);
          console.log(
            "Inner Paper Rate for",
            selectedPaperType,
            " is ",
            paper.rate
          );
        } else {
          console.error("Paper type not found:", selectedPaperType);
        }
      })
      .catch((error) => {
        console.error("Error fetching paper rate:", error);
      });
  };

  const getOuterPaperRate = (selectedOuterPaperType) => {
    axios
      .get("http://localhost:8081/papers")
      .then((response) => {
        const outerPaper = response.data.find(
          (paper) => paper.paperType === selectedOuterPaperType
        );

        if (outerPaper) {
          setOuterChangeCostPerKg(outerPaper.rate);
          console.log(
            "Outer Paper Rate for ",
            selectedOuterPaperType,
            " is ",
            outerPaper.rate
          );
        } else {
          console.error("Outer paper type not found:", selectedOuterPaperType);
        }
      })
      .catch((error) => {
        console.error("Error fetching outer paper rate:", error);
      });
  };

  useEffect(() => {
    if (orderData) {
      getRateForBindingType(orderData.bindingType);
      getRateForLaminationType(orderData.laminationType);
      getRatePlate("18 X 24");
      getRatePaper(orderData.innerPaperType);
      getOuterPaperRate(orderData.outerPaperType);
    }
  }, [orderData]);

  useEffect(() => {
    if (orderData) {
      const cost =
        Math.round(
          Math.ceil(
            totalPacket(orderData.quantity) *
              packetCalc(orderData.outerPaperThickness, outerChangeCostPerKg)
          )
        ) +
        Math.round(
          innerCost(
            orderData.quantity,
            orderData.pages,
            orderData.innerPaperThickness,
            changeCostPerKg
          )
        ) +
        Math.round(platePrice(orderData.pages, plateCost)) +
        Math.round(bindingCost * orderData.quantity) +
        Math.round(
          calculateLamination(
            laminationPrice,
            orderData.quantity,
            orderData.pages
          )
        );

      setTotalCost(cost);
    }
  }, [
    plateCost,
    bindingCost,
    laminationPrice,
    changeCostPerKg,
    outerChangeCostPerKg,
    orderData,
  ]);

  useEffect(() => {
    setOrderData({
      ...orderData,
      innerPaperRate: changeCostPerKg,
      outerPaperRate: outerChangeCostPerKg,
      bindingRate: bindingCost,
      laminationRate: laminationPrice,
      plateRate: plateCost,
      estimatedAmount: totalCost,
    });
  }, [
    changeCostPerKg,
    outerChangeCostPerKg,
    bindingCost,
    laminationPrice,
    plateCost,
    totalCost,
  ]);

  const { companyName, remarks, address, estimatedAmount } = orderData;

  return (
    <div className="lg:mt-6 lg:mb-6">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px] max-sm:flex max-sm:justify-center text-zinc-900">
          Fill in the details and confirm your order!
        </p>
        <br />
        <div className="grid gap-[15px] grid-cols-2 max-sm:flex max-sm:flex-col">
          <label className="form-control w-full max-w-xs lg:ml-[20px]">
            <div className="label">
              <span className="label-text-alt">
                For which company is this for?
              </span>
              <FaIndustry size={`25px`} color="white" />

              {console.log("Estimated amount is Rs. " + estimatedAmount)}
            </div>
            <input
              type="text"
              placeholder="Company name"
              className="input input-bordered w-full max-w-xs"
              value={companyName}
              onChange={(e) =>
                setOrderData({ ...orderData, companyName: e.target.value })
              }
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs lg:ml-[20px]">
            <div className="label">
              <span className="label-text-alt">
                What is the delivery address for the order?
              </span>
              <FaRegAddressCard size={`25px`} color="white" />
            </div>
            <input
              type="text"
              placeholder="Delivery Address"
              className="input input-bordered w-full max-w-xs"
              value={address}
              onChange={(e) =>
                setOrderData({ ...orderData, address: e.target.value })
              }
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs lg:ml-[20px] mb-[10px]">
            <div className="label">
              <span className="label-text-alt">Remarks</span>
              <CiStickyNote size={`25px`} color="white" />
            </div>
            <input
              type="text"
              placeholder="Remarks"
              className="input input-bordered w-full max-w-xs"
              value={remarks}
              onChange={(e) =>
                setOrderData({ ...orderData, remarks: e.target.value })
              }
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs lg:ml-[20px] mb-[10px] ">
            <div className="label">
              <span className="label-text-alt">Total Estimated Cost</span>
              <GiMoneyStack size={`25px`} color="white" />
            </div>
            <input
              type="text"
              placeholder="Remarks"
              className="input input-bordered w-full max-w-xs text-[white] disabled"
              value={`Rs. ${totalCost.toFixed(2)}`}
            />
            {console.log("Estimated amount " + totalCost)}
            <div className="label"></div>
          </label>
        </div>
        <h1 className="text-m mt-[-20px] text-zinc-900">
          <span className="text-[red] text-[30px] mb-[-10px]"> *</span>Please
          note that the estimated price of the order may differ from the actual
          total cost.
        </h1>
        <h1 className="text-m font-bold mt-[10px] text-zinc-900">
          Upload the PDF file for Printing here
        </h1>
        <input
          type="file"
          className="file-input w-full max-w-xs mx-auto mt-5 text-zinc-900"
        />
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/4">
            <button className="btn btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <button
            className={`btn btn-primary w-[280px] mt-5 border-none text-white ${
              isSubmitted ? "bg-blue-600" : "bg-green-700 hover:bg-blue-600"
            }`}
            onClick={handleSubmitWithState}
            disabled={isSubmitting || isSubmitted}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-md text-white mr-2"></span>
                Placing your order...
              </>
            ) : isSubmitted ? (
              <>
                <span className="text-white mr-2">✓</span>
                Order Confirmed
              </>
            ) : (
              "Confirm Order"
            )}
          </button>
        </div>
      </label>
    </div>
  );
};

export default FifthForm;
