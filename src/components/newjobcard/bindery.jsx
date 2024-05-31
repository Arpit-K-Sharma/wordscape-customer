import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Cookies from "js-cookie";

function Bindery({ data }) {
  const [bindery, setBindery] = useState(false); // Use state to manage bindery status

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      filledBy: "",
      approvedBy: "",
      selectedOption: "",
    },
  });

  const selectedOption = watch("selectedOption", "");

  useEffect(() => {
    if (data) {
      setValue("filledBy", data.filledInBy || "");
      setValue("approvedBy", data.approvedBy || "");
      setValue("selectedOption", data.bindingSelectedOption || "");
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

  const handleRadioChange = (value) => {
    setValue("selectedOption", value);
  };

  const onSubmit = async (formData) => {
    const jsondata = {
      binderyData: {
        filledInBy: formData.filledBy,
        approvedBy: formData.approvedBy,
        bindingSelectedOption: formData.selectedOption,
      },
    };
    console.log("Bindery Data in JSON", jsondata);
    Cookies.set("binderyData", JSON.stringify(jsondata));
    document.getElementById("my_modal_11").close();
    setBindery(true); // Update the bindery state here
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_11").showModal()}
      >
        <a className="flex"> Bindery </a>
        {bindery ? (
          <AiOutlineCheckCircle size={24} color="green" />
        ) : null}
      </button>
      <dialog
        id="my_modal_11"
        className="modal flex h-[100%] ml-[50%] bg-[#1c2127]"
      >
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mb-[20px] flex align-center justify-center">
              Bindery
            </h3>
            <div className="bindery">
              <div className="flex align-left justify-left mt-[10px]">
                <div className="mr-4 ml-[35px]">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="Center Stitch"
                      value="Center Stitch"
                      className="h-6 w-6"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("Center Stitch")}
                    />
                    <span className="ml-1 mr-5">Center stitch</span>
                  </label>
                </div>
                <div className="mr-4 ml-[18px]">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="Perfect"
                      value="Perfect"
                      className="h-6 w-8"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("Perfect")}
                    />
                    <span className="ml-1">Perfect</span>
                  </label>
                </div>
                <div className="mr-4 ml-[67px]">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="binderyOption"
                      value="juju"
                      className="h-6 w-6"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("juju")}
                    />
                    <span className="ml-1 mr-5">Juju</span>
                  </label>
                </div>
                <div className="mr-4 ml-[67px]">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="binderyOption"
                      value="metal-foiling"
                      className="h-6 w-8"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("metal-foiling")}
                    />
                    <span className="ml-1">Metal-foiling</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-center align-center gap-[40px] mt-[20px]">
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="binderyOption"
                      value="diecuting"
                      className="h-6 w-6"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("diecuting")}
                    />
                    <span className="ml-1 mr-5">Diecuting</span>
                  </label>
                </div>
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="binderyOption"
                      value="perforation"
                      className="h-6 w-8"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("perforation")}
                    />
                    <span className="ml-1">Perforation</span>
                  </label>
                </div>
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="binderyOption"
                      value="padding"
                      className="h-6 w-6"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("padding")}
                    />
                    <span className="ml-1 mr-5">Padding</span>
                  </label>
                </div>
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="binderyOption"
                      value="spot-varnishing"
                      className="h-6 w-8"
                      {...register("selectedOption")}
                      onChange={() => handleRadioChange("spot-varnishing")}
                    />
                    <span className="ml-1">Spot varnishing</span>
                  </label>
                </div>
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
              <button type="submit" className="btn hover:bg-[#376437]">
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
