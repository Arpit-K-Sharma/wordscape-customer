import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

function PressUnit({ data }) {
  const [predone, setPredone] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      prePressUnitList: {
        paymentMethod: "",
        materialReceived: "",
        flapSize: "",
      },
    },
  });

  useEffect(() => {
    if (data) {
      setValue("prePressUnitList.paymentMethod", data.paymentMethod);
      setValue("prePressUnitList.materialReceived", data.materialReceived);
      setValue("prePressUnitList.flapSize", data.flapSize);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    console.log(formData);
    const jsonData = {
      prePressUnitList: {
        paymentMethod: formData.prePressUnitList.paymentMethod,
        materialReceived: formData.prePressUnitList.materialReceived,
        flapSize: formData.prePressUnitList.flapSize,
      },
    };
    console.log("json data from prepress unit: ", jsonData);
    Cookies.set("prePressData", JSON.stringify(jsonData));
    setPredone(!predone);
    document.getElementById("my_modal_7").close();
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_7").showModal()}
      >
        <a className="flex">Pre Press Unit </a>
        {predone ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>
      <dialog id="my_modal_7" className="modal flex h-[100%] ml-[50%] bg-white">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-xl flex align-center justify-center">
              Payment Method
            </h3>
            <p className="py-4">
              <div className="flex justify-center  mt-5">
                <label className="flex">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PS/PDF"
                    {...register("prePressUnitList.paymentMethod")}
                    className="w-6 h-6 mr-2 ml-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-[25px] ml-[15px]"> PS/PDF</span>
                </label>
                <label className="px-4 flex">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Original Document File"
                    {...register("prePressUnitList.paymentMethod")}
                    className="w-6 h-6 mr-2 ml-3 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-[25px] ml-[15px]">
                    Original Document File
                  </span>
                </label>
              </div>
              <p className="mt-[30px] font-bold text-xl flex justify-center">
                Material Received:
              </p>
              <div className="flex justify-center mt-5">
                <label className="flex">
                  <input
                    type="radio"
                    name="materialReceived"
                    value="Dummy"
                    {...register("prePressUnitList.materialReceived")}
                    className="w-6 h-6 mr-2 ml-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-[10px] ml-[10px]"> Dummy</span>
                </label>
                <label className="px-4 flex">
                  <input
                    type="radio"
                    name="materialReceived"
                    value="CD/DVD"
                    {...register("prePressUnitList.materialReceived")}
                    className="w-6 h-6 mr-2 ml-[15px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-[10px] ml-[10px]"> CD/DVD</span>
                </label>
                <label className="flex">
                  <input
                    type="radio"
                    name="materialReceived"
                    value="Flash Drive"
                    {...register("prePressUnitList.materialReceived")}
                    className="w-6 h-6 ml-[15px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-[10px] ml-[10px]"> Flash Drive</span>
                </label>
                <label className="ml-5 flex">
                  <input
                    type="radio"
                    name="materialReceived"
                    value="Email"
                    {...register("prePressUnitList.materialReceived")}
                    className="w-6 h-6 mr-2 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-[10px] ml-[10px]"> Email</span>
                </label>
              </div>
              <p className="mt-[30px] font-bold flex text-xl justify-center">
                Imposition:
              </p>
              <div className="flex items-center mt-5">
                <label className="form-control w-full">
                  <div className="label mt-[-20px]">
                    <span className="label-text">Flap Size</span>
                  </div>
                  <input
                    type="number"
                    placeholder="Flap Size"
                    {...register("prePressUnitList.flapSize")}
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </p>
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
export default PressUnit;
