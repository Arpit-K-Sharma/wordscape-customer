import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaIndustry, FaCalendar } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { get } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const FifthForm = ({ orderData, setOrderData, handleSubmit }) => {
  const [plateCost, setPlateCost] = useState(0);
  const [file, setFile] = useState(null); // State to hold the uploaded file

  const [bindingCost, setBindingCost] = useState(0);
  const [laminationPrice, setLaminationPrice] = useState(0);
  const [changeCostPerKg, setChangeCostPerKg] = useState(0);
  const [outerChangeCostPerKg, setOuterChangeCostPerKg] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("pickup");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the file to state
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  // const handleSubmitWithState = async () => {
  //   // Check if all required fields are filled
  //   if (!orderData.deliveryOption) {
  //     toast.error("Please select a delivery option.");
  //     return; // Prevent form submission
  //   }
  //   if (!orderData.deadline) {
  //     toast.error("Please enter a deadline.");
  //     return; // Prevent form submission
  //   }
  //   // Add more checks as needed

  //   setIsSubmitting(true);
  //   try {
  //     await handleSubmit();
  //     setIsSubmitted(true);
  //     toast.success("Check your email for the invoice!");
  //     setTimeout(() => {
  //       setIsSubmitting(false);
  //       setIsSubmitted(false);
  //     }, 3000); // Reset state after 3 seconds
  //   } catch (error) {
  //     console.error("Error submitting order:", error);
  //     toast.error("Failed to place order.");
  //     setIsSubmitting(false);
  //   }
  // };

  const handleSubmitWithState = async () => {
    if (!orderData.deliveryOption || !orderData.deadline) {
      toast.error("Please fill all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file
    formData.append("data", JSON.stringify(orderData)); // Append the order data as a JSON string

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/orders/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsSubmitted(true);
      toast.success("Order placed successfully!");
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to place order.");
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setOrderData((prev) => ({
      ...prev,
      deliveryOption: prev.deliveryOption || "pickup",
    }));
  }, [setOrderData]);

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

  const handleDeliveryOptionChange = (event) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      deliveryOption: event.target.value,
    }));
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

  const { companyName, remarks, address, estimatedAmount, deadline } =
    orderData;

  return (
    <div className="lg:mt-6 lg:mb-6 font-archivo">
      <label className="form-control max-sm:mr-5">
        <p className="text-2xl font-light max-sm:text-[24px] max-sm:flex max-sm:justify-center text-zinc-900 font-archivo">
          Fill in the details and confirm your order!
        </p>
        <br />
        <div className="grid gap-[15px] grid-cols-2 max-sm:flex max-sm:flex-col">
          <label className="form-control w-full max-w-xs lg:ml-[20px]">
            <div className="label">
              <span className="label-text-alt">
                For which company is this for?
              </span>
              <FaIndustry size={`25px`} color="black" />

              {console.log("Estimated amount is Rs. " + estimatedAmount)}
            </div>
            <input
              type="text"
              placeholder="Company name"
              className="input input-bordered w-full max-w-xs text-black"
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
              <FaRegAddressCard size={`25px`} color="black" />
            </div>
            <input
              type="text"
              placeholder="Delivery Address"
              className="input input-bordered w-full max-w-xs text-black"
              value={address}
              onChange={(e) =>
                setOrderData({ ...orderData, address: e.target.value })
              }
            />
            <div className="label"></div>
          </label>

          <label className="form-control w-full max-w-xs lg:ml-[20px] mb-[10px]">
            <div className="label">
              <span className="label-text-alt">Deadline</span>
              <FaCalendar size={`25px`} color="black" />
            </div>
            <input
              type="date"
              placeholder="Deadline"
              className="input input-bordered w-full max-w-xs text-black"
              value={deadline}
              onChange={(e) => {
                // Assuming you want to keep the date in YYYY-MM-DD format in the state
                setOrderData({ ...orderData, deadline: e.target.value });
              }}
              required
            />
            <div className="label"></div>
          </label>
          <label className="form-control w-full max-w-xs lg:ml-[20px] mb-[10px] ">
            <div className="label">
              <span className="label-text-alt">Total Estimated Cost</span>
              <GiMoneyStack size={`25px`} color="black" />
            </div>
            <input
              type="text"
              placeholder="Remarks"
              className="input input-bordered w-full max-w-xs text-[black] disabled"
              value={`Rs. ${totalCost.toFixed(2)}`}
            />
            {console.log("Estimated amount " + totalCost)}
            <div className="label"></div>
          </label>

          <div className="form-control w-full lg:flex lg:justify-between lg:items-center lg:px-10 col-span-2 font-archivo">
            <div className="label flex items-center gap-2 mb-2">
              <FaRegAddressCard size={`25px`} color="black" />
              <span className="label text-black">Delivery Option</span>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-10">
              <label className="label cursor-pointer flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="pickup"
                  className="radio lg:mr-[10px] checked:bg-blue-500"
                  checked={orderData.deliveryOption === "pickup"}
                  onChange={handleDeliveryOptionChange}
                  required
                />
                <span className="label-text">Pickup</span>
              </label>
              <label className="label cursor-pointer flex flex-row items-center gap-2">
                <input
                  type="radio"
                  name="deliveryOption"
                  value="delivery"
                  className="radio lg:mr-[10px] checked:bg-blue-500"
                  checked={orderData.deliveryOption === "delivery"}
                  onChange={handleDeliveryOptionChange}
                  required
                />
                <span className="label-text">Delivery on Address</span>
              </label>
            </div>
          </div>

          <label className="form-control w-full lg:ml-[20px] mb-[10px] col-span-2">
            <div className="label">
              <span className="label-text-alt">Remarks</span>
              <CiStickyNote size={`25px`} color="black" />
            </div>
            <textarea
              placeholder="Remarks"
              className="textarea textarea-bordered w-full h-full text-black"
              value={remarks}
              onChange={(e) =>
                setOrderData({ ...orderData, remarks: e.target.value })
              }
            />
            <div className="label"></div>
          </label>
        </div>
        <h1 className="text-m mt-[-20px] text-zinc-900">
          <span className="text-[red] text-[30px] mb-[-10px]"> *</span>Please
          note that the{" "}
          <span className="text-[red] font-semibold">estimated price</span> of
          the order <span className="text-[red] font-semibold">may differ</span>{" "}
          from the actual total cost.
          <br />
          <span className="text-[blue] text-[30px] mb-[-10px]"> *</span>Please
          note flap size within the{" "}
          <span className="text-[blue] font-semibold">remarks </span> along with
          the designated size or any other{" "}
          <span className="text-[blue] font-semibold">
            special instructions
          </span>{" "}
          (page number, etc.).
        </h1>
        <h1 className="text-m font-bold mt-[10px] text-zinc-900">
          Upload the PDF file for Printing here
        </h1>
        <input
          type="file"
          className="file-input w-full max-w-xs mx-auto mt-5 text-zinc-900"
          onChange={handleFileChange}
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default FifthForm;
