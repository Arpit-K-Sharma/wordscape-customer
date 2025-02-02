import { Navigate, NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import { FaIndustry, FaCalendar } from "react-icons/fa6";
import { FaRegAddressCard } from "react-icons/fa";
import { CiStickyNote } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { get } from "react-hook-form";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const FifthForm = ({ orderData, setOrderData, handleSubmit }) => {
  const [plateCost, setPlateCost] = useState(0);
  const [pdfFile, setpdfFile] = useState([]); // State to hold the uploaded file
  const [showDeadlineError, setShowDeadlineError] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [bindingCost, setBindingCost] = useState(0);
  const [laminationPrice, setLaminationPrice] = useState(0);
  const [changeCostPerKg, setChangeCostPerKg] = useState(0);
  const [outerChangeCostPerKg, setOuterChangeCostPerKg] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPdfSubmitting, setIsPdfSubmitting] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [isPdfDone, setIsPdfDone] = useState(true);

  const handleFileChange = (event) => {
    setCurrentFile(event.target.files[0]); // Set the file to state
  };

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPdfSubmitted, setIsPdfSubmitted] = useState(false);

  const handleSubmitData = async () => {
    // Check if all required fields are filled
    if (!orderData.deliveryOption) {
      toast.error("Please select a delivery option.");
      return; // Prevent form submission
    }
    if (!orderData.deadline) {
      setShowDeadlineError(true);
      return; // Prevent form submission
    }
    // Add more checks as needed

    setIsSubmitting(true);
    try {
      await handleSubmit();
      setIsSubmitted(true);

      setTimeout(() => {
        toast.success("Check your email for the invoice!", {
          pauseOnHover: false,
        });
        setIsSubmitting(false);
        setIsSubmitted(false);
        navigate("/user/orders");
      }, 1200);
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error(`Failed to place order. Error: ${error.message}`);

      setIsSubmitting(false);
    }
  };

  const hanndlepdfUpload = async () => {
    // if (!orderData.deliveryOption || !orderData.deadline) {
    //   toast.error("Please fill all required fields.");
    //   return;
    // }

    // // Ensure the pdfFile state is holding the actual file
    // if (!pdfFile) {
    //   toast.error("Please upload a PDF file.");
    //   return;
    // }

    setIsPdfDone(false);

    const updatedOrderData = {
      ...orderData,
      pdfFile: currentFile.filename,
    };

    const formData = new FormData();
    formData.append("pdfFile", currentFile);
    formData.append("data", JSON.stringify(updatedOrderData));

    setIsPdfSubmitting(true);
    try {
      const response = await axios.post("/orders/files", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.filename) {
        setpdfFile([...pdfFile, response.data.filename]);
        setOrderData({
          ...orderData,
          pdfFile: [...pdfFile, response.data.filename],
        });
        setIsPdfSubmitting(false);
        setIsPdfSubmitted(false);
        setIsPdfDone(true);
        toast.success("PDF Uploaded Successfully", {
          pauseOnHover: false,
        });
      }

      // toast.success("PDF Uploaded Successfully");
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Failed to place order.");
      setIsPdfSubmitted(false);
    }
  };

  useEffect(() => {
    setOrderData((prev) => ({
      ...prev,
      deliveryOption: prev.deliveryOption || "pickup",
      // pdfFile: pdfFile.name,
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

  function calculateLamination(
    sheetLength,
    sheetBreadth,
    laminationPrice,
    quantity
  ) {
    console.log(sheetLength, sheetBreadth, laminationPrice, quantity);
    const effectiveLength = sheetLength;
    const effectiveBreadth = sheetBreadth;
    return Math.ceil(
      effectiveLength * effectiveBreadth * laminationPrice * quantity
    );
  }

  function totalReams(pages, quantity) {
    return Math.round((pages * quantity) / 16 / 500);
  }

  const getRateForBindingType = (selectedBindingType) => {
    axios
      .get("/bindings")
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
      .get("/laminations")
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
      .get("/plates")
      .then((response) => {
        const plate = response.data.find(
          (plate) => plate.plateSize === plateSize
        );
        console.log("this is response", response.data);

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
      .get("/papers")
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
      .get("/papers")
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
    getRateForBindingType(orderData.bindingType);
    getRateForLaminationType(orderData.outerLamination);
    getRatePlate("19 X 25");
    getRatePaper(orderData.innerPaperType);
    getOuterPaperRate(orderData.outerPaperType);
  }, []);

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
          calculateLamination(50, 50, laminationPrice, orderData.quantity)
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
  const navigate = useNavigate();

  useEffect(() => {
    setOrderData({
      ...orderData,
      innerPaperRate: changeCostPerKg,
      outerPaperRate: outerChangeCostPerKg,
      bindingRate: bindingCost,
      laminationRate: laminationPrice,
      plateRate: plateCost,
      estimatedAmount: totalCost,
      costCalculation: {
        plates: 0,
        printing: 0,
        paper: 0,
        coverPaper: packetCalc(
          orderData.outerPaperThickness,
          outerChangeCostPerKg
        ),
        innerPaper: innerCost(
          orderData.quantity,
          orderData.pages,
          orderData.innerPaperThickness,
          changeCostPerKg
        ),
        otherPaper: 0,
        lamination: calculateLamination(
          50,
          50,
          laminationPrice,
          orderData.quantity
        ),
        binding: bindingCost * orderData.quantity,
        finishing: 0,
        extraCharges: 0,
        subTotal: 0,
        vat: 0,
        grandTotal: 0,
        preparedBy: "",
        approvedBy: "",
      },
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
            {showDeadlineError && (
              <p className="text-red-500 text-sm mt-1">
                Please fill the deadline.
              </p>
            )}
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
          Upload the PDF file for Printing here{" "}
        </h1>
        <input
          type="file"
          className="file-input w-full max-w-xs mx-auto mt-5 text-zinc-900"
          onChange={handleFileChange}
          accept=".pdf"
        />
        <span className="italic text-gray-400">Optional</span>
        <div className="flex flex-col gap-2 mt-4 justify-center items-center">
          <p className="italic text-gray-400 mb-[10px]">Your Pdf:</p>
          {pdfFile.map((fileName, index) => (
            <div
              key={index}
              className="flex items-center mt-[10px] bg-gray-200 rounded-md shadow-md max-w-xs overflow-hidden"
            >
              <p className="text-gray-700 truncate flex-1 pl-[10px]">
                {fileName}
              </p>
              <button
                className="text-red-500 hover:text-red-700 ml-[5px] mr-[5px] text-[30px]"
                onClick={() => {
                  const updatedPdfFile = pdfFile.filter((_, i) => i !== index);
                  setpdfFile(updatedPdfFile);
                  setOrderData({ ...orderData, pdfFile: updatedPdfFile });
                }}
              >
                <span className="">&times;</span>
              </button>
            </div>
          ))}
        </div>
        <button
          className={`btn btn-primary max-lg:w-full w-[280px] lg:mx-auto mt-5 border-none justify-center text-white ${
            isPdfSubmitting ? "bg-blue-600" : "bg-blue-500 hover:bg-blue-800"
          }`}
          onClick={(e) => hanndlepdfUpload()}
          disabled={isPdfSubmitting || isPdfSubmitted}
        >
          {isPdfSubmitting ? (
            <>
              <span className="loading loading-spinner loading-md text-white mr-2"></span>
              Uploading your PDF...
            </>
          ) : isPdfSubmitting ? (
            <>
              <span className="text-white mr-2">✓</span>
              Order Confirmed
            </>
          ) : (
            "Upload PDF"
          )}
        </button>
        <div className="lg:flex max-sm:flex-col justify-center max-sm:justify-center">
          <NavLink to="/order/4">
            <button className="btn max-lg:w-full btn-primary w-[280px] mt-5 mr-5 bg-gray-900 text-white border-none">
              Previous
            </button>
          </NavLink>
          <button
            className={`btn btn-primary max-lg:w-full w-[280px] mt-5 border-none text-white ${
              isSubmitted ? "bg-green-600" : "bg-green-700 hover:bg-green-800"
            }`}
            onClick={handleSubmitData}
            disabled={isSubmitting || isSubmitted || !isPdfDone}
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
            ) : isPdfDone ? ( // Check if PDF is done, then render this
              "Confirm Order"
            ) : (
              "PDF is being uploaded" // Inform user to upload PDF first if not done
            )}
          </button>
        </div>
      </label>
    </div>
  );
};

export default FifthForm;
