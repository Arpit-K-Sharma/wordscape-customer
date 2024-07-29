import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import Cookies from "js-cookie";

function Bindery({ data, onChildData }) {
  const [bindery, setBindery] = useState(false);
  const [customOption, setCustomOption] = useState("");

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      filledBy: "",
      approvedBy: "",
      bindingUnitId: 0,
      selectedOptions: [],
    },
  });

  const selectedOptions = watch("selectedOptions", []);

  useEffect(() => {
    if (data) {
      setValue("filledBy", data.filledInBy || "");
      setValue("approvedBy", data.approvedBy || "");
      setValue("selectedOptions", data.binderySelectedOption || []);
      setValue("bindingUnitId", data.bindingUnitId);
      let datas = {
        binderyData: data,
      };
      Cookies.set("binderyData", JSON.stringify(datas));
    }
  }, [data, setValue]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputs = document.querySelectorAll("input");
      const currentIndex = Array.from(inputs).findIndex(
        (input) => document.activeElement === input
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    }
  };

  const handleCheckboxChange = (value) => {
    const currentSelection = watch("selectedOptions");
    if (currentSelection.includes(value)) {
      setValue(
        "selectedOptions",
        currentSelection.filter((option) => option !== value)
      );
    } else {
      setValue("selectedOptions", [...currentSelection, value]);
    }
  };

  const handleCustomOptionChange = (e) => {
    setCustomOption(e.target.value);
  };

  const addCustomOption = () => {
    if (customOption && !selectedOptions.includes(customOption)) {
      setValue("selectedOptions", [...selectedOptions, customOption]);
      setCustomOption("");
    }
  };

  const removeCustomOption = (option) => {
    setValue(
      "selectedOptions",
      selectedOptions.filter((selectedOption) => selectedOption !== option)
    );
  };

  const onSubmit = async (formData) => {
    let jsondata = {
      binderyData: {
        filledInBy: formData.filledBy,
        approvedBy: formData.approvedBy,
        binderySelectedOption: formData.selectedOptions,
      },
    };
    if (formData.bindingUnitId) {
      jsondata.binderyData.bindingUnitId = formData.bindingUnitId;
    }
    console.log("Bindery Data in JSON", jsondata);
    Cookies.set("binderyData", JSON.stringify(jsondata));
    document.getElementById("my_modal_11").close();
    onChildData(false);
    setBindery(true);
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-[black] hover:text-white"
        onClick={() => (
          document.getElementById("my_modal_11").showModal(), onChildData(true)
        )}
      >
        <a className="flex"> Bindery </a>
        {bindery ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>
      <dialog
        id="my_modal_11"
        className="modal flex h-[100%] ml-[50%] bg-white"
      >
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mb-[20px] flex align-center justify-center">
              Bindery
            </h3>
            <div className="bindery">
              <div className="grid grid-cols-5 gap-4 mt-[10px]">
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="Center Stitch"
                      value="Center Stitch"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("Center Stitch")}
                    />
                    <span className="ml-1">Center stitch</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="Perfect"
                      value="Perfect"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("Perfect")}
                    />
                    <span className="ml-1">Perfect</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="N/A"
                      value="N/A"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("N/A")}
                    />
                    <span className="ml-1">N/A</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="binderyOption"
                      value="juju"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("juju")}
                    />
                    <span className="ml-1">Juju</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="binderyOption"
                      value="metal-foiling"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("metal-foiling")}
                    />
                    <span className="ml-1">Metal-foiling</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="binderyOption"
                      value="diecuting"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("diecuting")}
                    />
                    <span className="ml-1">Diecuting</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="binderyOption"
                      value="perforation"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("perforation")}
                    />
                    <span className="ml-1">Perforation</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="binderyOption"
                      value="padding"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("padding")}
                    />
                    <span className="ml-1">Padding</span>
                  </label>
                </div>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="binderyOption"
                      value="spot-varnishing"
                      className="h-6 w-6"
                      {...register("selectedOptions")}
                      onChange={() => handleCheckboxChange("spot-varnishing")}
                    />
                    <span className="ml-1">Spot varnishing</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-center align-center gap-[40px] mt-[20px]">
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="text"
                      value={customOption}
                      onChange={handleCustomOptionChange}
                      placeholder="Custom option"
                      className="input input-bordered w-[200px] mr-6"
                    />
                    <button
                      type="button"
                      onClick={addCustomOption}
                      className="btn btn-sm ml-4"
                    >
                      Add
                    </button>
                  </label>
                </div>
              </div>
              <div className="mt-4 mx-auto ml-10">
                <h4 className="mx-auto text-xl">Selected Options:</h4>
                <ul>
                  {selectedOptions.map((option, index) => (
                    <li key={index} className="font-semibold flex items-center">
                      {option}
                      <button
                        type="button"
                        onClick={() => removeCustomOption(option)}
                        className="ml-5 text-red-500"
                      >
                        <FiX />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex ml-[30px] mt-[20px]">
              <div className="ml-[10px]">
                <label> Filled-in By: </label>
                <br></br>
                <input
                  type="text"
                  className="input input-bordered w-[305px] max-w-xs"
                  {...register("filledBy")}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className="ml-[10px]">
                <label>Approved By: </label>
                <br></br>
                <input
                  type="text"
                  className="input input-bordered w-[305px] max-w-xs"
                  {...register("approvedBy")}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
            <div className="modal-action">
              <button
                className="btn hover:bg-[red] hover:text-white"
                onClick={(e) => (
                  document.getElementById("my_modal_11").close(),
                  onChildData(false)
                )}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn hover:bg-[#3eab3e] hover:text-white"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Bindery;
