import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoNewspaper } from "react-icons/io5";
import { GiPapers } from "react-icons/gi";
import { ImBook } from "react-icons/im";
import { MdAdd, MdClose } from "react-icons/md";

const FirstForm = ({ orderData, entireData, setOrderData }) => {
  const {
    paperSizeData,
    fetchedPaperTypes,
    paperThicknessData,
    selectedThickness,
  } = entireData;

  const [paperSize1, setPaperSize1] = useState("");
  const [paperSize2, setPaperSize2] = useState("");
  const [addPaper, setAddPaper] = useState(false);
  const [availableThicknesses, setAvailableThicknesses] = useState([]);
  const [isNextDisabled, setIsNextDisabled] = useState(true);

  const handleAdd = () => {
    setAddPaper(!addPaper);
  };

  useEffect(() => {
    if (
      orderData.innerPaperType &&
      orderData.innerPaperType !== "Choose a Paper Type"
    ) {
      const selectedPaperType = fetchedPaperTypes.find(
        (type) => type.name === orderData.innerPaperType
      );
      if (selectedPaperType) {
        const minThickness = selectedPaperType.minThickness;
        const maxThickness = selectedPaperType.maxThickness;
        const thicknessOptions = paperThicknessData.filter(
          (gsm) =>
            gsm.thickness >= minThickness && gsm.thickness <= maxThickness
        );
        setAvailableThicknesses(thicknessOptions);
      }
    } else {
      setAvailableThicknesses([]);
    }
  }, [orderData.innerPaperType, fetchedPaperTypes, paperThicknessData]);

  useEffect(() => {
    setIsNextDisabled(
      !orderData.paperSize ||
        !orderData.innerPaperType ||
        orderData.innerPaperType === "Choose a Paper Type" ||
        !orderData.innerPaperThickness
    );
  }, [orderData]);

  const handleNext = () => {
    if (addPaper) {
      setOrderData({
        ...orderData,
        paperSize: `${paperSize1} x ${paperSize2}`,
      });
    }
  };

  return (
    <div className="lg:mt-6 lg:mb-6 text-zinc-800 font-archivo">
      <label className="form-control ">
        <p className="text-2xl font-light max-sm:text-[24px] font-archivo">
          Start placing your order with the paper size, type, and its thickness
        </p>
        <br />
        <div className="label text-center">
          <div className="flex ">
            <span className="label-text mt-[5px]">Paper Size</span>
          </div>
          <span className="ml-2">
            <IoNewspaper color="black" size={25} />
          </span>
        </div>
        {!addPaper ? (
          <select
            id="selectPaperSize"
            className="select select-bordered"
            onChange={(e) =>
              setOrderData({ ...orderData, paperSize: e.target.value })
            }
          >
            {paperSizeData &&
              paperSizeData.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.paperSize}
                </option>
              ))}
          </select>
        ) : (
          <div className="mb-[-10px] font-archivo">
            <div className="flex justify-center items-center">
              <label className="form-control">
                <input
                  className="input input-bordered w-[70px] mr-8"
                  onChange={(e) => setPaperSize1(e.target.value)}
                />
                <div className="label">
                  <span className="label-text-alt font-light text-[14px]">
                    Length
                  </span>
                </div>
              </label>

              <span className="flex text-xl font-light mb-8 mr-7">x</span>

              <label className="form-control">
                <input
                  className="input input-bordered w-[70px]"
                  onChange={(e) => setPaperSize2(e.target.value)}
                />
                <div className="label">
                  <span className="label-text-alt font-light text-[14px]">
                    Breadth in <span className="font-semibold">inches</span>
                  </span>
                </div>
              </label>
            </div>
            <h4 className="mt-[14px] text-[14px] font-light">
              <span className="text-[red] text-[13px] mr-[10px]">*</span>
              Select your customizable paper size in{" "}
              <span className="font-semibold">inches</span>.
            </h4>
          </div>
        )}
        <div className="mt-5"></div>
        <div className="icon-container text-center">
          {addPaper ? (
            <MdClose size={30} color="red" onClick={handleAdd} />
          ) : (
            <MdAdd size={30} color="green" onClick={handleAdd} />
          )}
        </div>{" "}
        {!addPaper && (
          <p className="text-[13px] mt-[5px] font-semibold">
            Add custom paper size by clicking the plus icon
          </p>
        )}
        <br />
        <div className="label text-center">
          <span className="label-text">Inner Paper Type</span>

          <span>
            <ImBook color="black" size={25} />
          </span>
        </div>
        <select
          className="select select-bordered"
          value={orderData.innerPaperType || "Choose a Paper Type"}
          onChange={(e) =>
            setOrderData({
              ...orderData,
              innerPaperType: e.target.value,
              innerPaperThickness: "",
            })
          }
        >
          <option disabled>Choose a Paper Type</option>
          {fetchedPaperTypes.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <br />
        {orderData.innerPaperType &&
          orderData.innerPaperType !== "Choose a Paper Type" && (
            <>
              <div className="label text-center">
                <span className="label-text">
                  <span className="text-red-500">*</span> Inner Paper Thickness{" "}
                  <span className="font-bold">(in GSM)</span>
                </span>
                <span>
                  <GiPapers color="black" size={25} />
                </span>
              </div>
              <select
                className="select select-bordered"
                value={orderData.innerPaperThickness || ""}
                onChange={(e) =>
                  setOrderData({
                    ...orderData,
                    innerPaperThickness: parseInt(e.target.value),
                  })
                }
              >
                <option disabled value="">
                  Select Thickness
                </option>
                {availableThicknesses.map((gsm) => (
                  <option
                    key={gsm.id}
                    value={gsm.thickness}
                    className="text-bold"
                  >
                    {gsm.thickness}
                  </option>
                ))}
              </select>
            </>
          )}
        <br />
        <NavLink to={!orderData.innerPaperThickness ? "#" : "/order/2"}>
          <button
            className="btn max-lg:w-full text-white btn-primary mt-5 w-full"
            onClick={handleNext}
            disabled={isNextDisabled}
          >
            Next
          </button>
        </NavLink>
      </label>
    </div>
  );
};

export default FirstForm;
