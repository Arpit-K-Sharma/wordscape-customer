import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

function PlateDetail({ data }) {
  const [plate, setPlate] = useState(false);
  const [platenumber, setPlatenumber] = useState([1, 2, 3, 4]);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      screenType: "",
      plateData: Array(4).fill({
        size: "",
        colour1: "",
        colour2: "",
        colour3: "",
        colour4: "",
        special: "",
        total: "",
      }),
      plateDamage: "",
      plateRemake: "",
    },
  });

  useEffect(() => {
    if (data) {
      setValue("screenType", data.screenType || "");
      setValue("plateDamage", data.plateDamage || "");
      setValue("plateRemake", data.plateRemake || "");
      
      const plateData = data.plateData || [];
      plateData.forEach((plate, index) => {
        setValue(`plateData[${index}].size`, plate.size || "");
        setValue(`plateData[${index}].colour1`, plate.colour1 || "");
        setValue(`plateData[${index}].colour2`, plate.colour2 || "");
        setValue(`plateData[${index}].colour3`, plate.colour3 || "");
        setValue(`plateData[${index}].colour4`, plate.colour4 || "");
        setValue(`plateData[${index}].special`, plate.special || "");
        setValue(`plateData[${index}].total`, plate.total || "");
      });
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    const jsonData = {
      screenType: formData.screenType,
      plateData: formData.plateData,
      plateDamage: formData.plateDamage,
      plateRemake: formData.plateRemake,
    };
    Cookies.set("plateData", JSON.stringify(jsonData));
    console.log("Plate Data from Plate Details: ", jsonData);
    document.getElementById("my_modal_9").close();
    setPlate(true);
  };

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

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_9").showModal()}
      >
        <a className="flex"> Plate Details </a>
        {plate && <AiOutlineCheckCircle size={24} color="green" />}
      </button>
      <dialog
        id="my_modal_9"
        className="modal flex h-[100%] ml-[37%] bg-[#1c2127]"
      >
        <div className="modal-box max-h-[100%] max-w-[63%] shadow-none bg-[#1c2127]">
          <h3 className="font-bold text-lg flex align-center justify-center">
            Plate Details
          </h3>
          <p className="py-4">
            <div className="items-center mt-3">
              <label className="form-control w-full">
                <div className="label mt-1">
                  <span className="label-text">Screen Type</span>
                </div>
                <input
                  type="text"
                  placeholder="Screen Type"
                  className="input input-bordered w-full"
                  {...register("screenType")}
                  onKeyDown={handleKeyPress}
                />
              </label>
            </div>

            <div className="overflow-x-auto">
              <table className="table mt-5">
                <thead>
                  <tr className="bg-base-200 border border-gray-400">
                    <th className="border-r border-[#393838]">Sn</th>
                    <th>Size</th>
                    <th>1 color</th>
                    <th>2 color</th>
                    <th>3 color</th>
                    <th>4 color</th>
                    <th>Special</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {platenumber.map((row, index) => (
                    <tr key={index}>
                      <td className="border-b bg-base-200 border-l border-r border-[#393838]">
                        <h2 className="text-lg">{index + 1}</h2>
                      </td>
                      <td className="border-b border-[#393838]">
                        <input
                          type="text"
                          className="input input-bordered w-[80px] h-[40px] max-w-xs"
                          {...register(`plateData.${index}.size`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                      <td className="border-b border-[#393838]">
                        <input
                          type="text"
                          className="input input-bordered w-[90px] h-[40px] max-w-xs"
                          {...register(`plateData.${index}.colour1`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                      <td className="border-b border-[#393838]">
                        <input
                          type="text"
                          className="input input-bordered w-[90px] h-[40px] max-w-xs"
                          {...register(`plateData.${index}.colour2`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                      <td className="border-b border-[#393838]">
                        <input
                          type="text"
                          className="input input-bordered w-[90px] h-[40px] max-w-xs"
                          {...register(`plateData.${index}.colour3`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                      <td className="border-b border-[#393838]">
                        <input
                          type="text"
                          className="input input-bordered w-[90px] h-[40px] max-w-xs"
                          {...register(`plateData.${index}.colour4`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                      <td className="border-b border-[#393838]">
                        <input
                          type="text"
                          className="input input-bordered w-[90px] h-[40px] max-w-xs"
                          {...register(`plateData.${index}.special`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                      <td className="border-b border-r border-[#393838]">
                        <input
                          type="text"
                          className="input input-bordered w-[80px] h-[40px] max-w-xs"
                          {...register(`plateData.${index}.total`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center mt-[20px] mb-[10px] ml-[20px]">
              <div className="flex items-center mb-4 mt-[8px]">
                <label className="mr-5">Plate damage:</label>
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="plateDamage"
                      value="onCTP"
                      className="h-6 w-6"
                      {...register("plateDamage")}
                    />
                    <span className="ml-1 mr-5">on CTP</span>
                  </label>
                </div>
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="plateDamage"
                      value="onPress"
                      className="h-6 w-6"
                      {...register("plateDamage")}
                    />
                    <span className="ml-1">on Press</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center ml-[30px]">
                <label className="mr-2">No. of plate remake:</label>
                <input
                  type="number"
                  className="input input-bordered xl:w-[600px] h-[40px] ml-[20px] max-w-xs"
                  {...register("plateRemake")}
                />
              </div>
            </div>
          </p>
          <div className="modal-action">
            <form onSubmit={handleSubmit(onSubmit)}>
              <button type="submit" className="btn hover:bg-[#376437]">
                Done
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default PlateDetail;
