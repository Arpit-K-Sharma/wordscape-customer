import React, { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdAdd } from "react-icons/md"; // Import the add icon
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

function PressUnits({ data, onChildData }) {
  const { register, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: {
      totalset: "",
      forma: "",
      workandturn: "",
      pressUnitDataId: "",
      pressData: [
        { paperType: "", size: "", signature: "", ordered: "", produced: "" },
      ],
    },
  });

  const [pressunit, setPressunit] = useState(false);
  const pressData = watch("pressData");

  useEffect(() => {
    if (data) {
      const nonnullData = data.pressData.filter(
        (datas) => datas.paperType !== null
      );
      const nullData = data.pressData.filter(
        (datas) => datas.paperType === null
      );
      const updatedPressData = [...nonnullData, ...nullData];

      const initialFormValues = {
        totalset: data.totalSet || "",
        forma: data.forma || "",
        workandturn: data.workAndTurn || "",
        pressUnitDataId: data.pressUnitDataId || "",
        pressData: updatedPressData.map((entry) => ({
          pressDataId: entry.pressDataId || "",
          paperType: entry.paperType || "",
          size: entry.size || "",
          signature: entry.signature || "",
          ordered: entry.ordered || "",
          produced: entry.produced || "",
        })),
      };

      const newData = {
        ...data,
        pressData: updatedPressData,
      };

      Cookies.set("pressUnitData", JSON.stringify(newData));
      reset(initialFormValues);
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    const processedPressData = formData.pressData.map((entry) => {
      const processedEntry = {};
      Object.entries(entry).forEach(([key, value]) => {
        processedEntry[key] = value ? value : null;
      });
      return processedEntry;
    });

    let jsonData = {
      totalSet: formData.totalset,
      forma: formData.forma,
      workAndTurn: formData.workandturn,
      pressData: processedPressData,
    };
    if (formData.pressUnitDataId) {
      jsonData.pressUnitDataId = formData.pressUnitDataId;
    }

    document.getElementById("my_modal_12").close();
    onChildData(false);
    setPressunit(true);
    Cookies.set("pressUnitData", JSON.stringify(jsonData));
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

  const handleAddRow = () => {
    const newRow = {
      paperType: "",
      size: "",
      signature: "",
      ordered: "",
      produced: "",
    };
    const updatedPressData = [...pressData, newRow];
    setValue("pressData", updatedPressData);
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-[black] hover:text-white"
        onClick={() => (
          document.getElementById("my_modal_12").showModal(), onChildData(true)
        )}
      >
        <a className="flex"> Press Unit </a>
        {pressunit ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>

      <dialog
        id="my_modal_12"
        className="modal flex h-[100%] ml-[50%] bg-white"
      >
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mb-[20px] flex align-center justify-center">
              Press Unit
            </h3>
            <div className="flex align-center justify-center">
              <label> Total Set: </label>
            </div>
            <div className="flex align-center justify-center">
              <input
                type="text"
                className="input input-bordered w-[305px] max-w-xs"
                {...register("totalset")}
                onKeyDown={handleKeyPress}
              />
            </div>
            <div className="flex ml-[30px] mt-[20px]">
              <div className="ml-[10px]">
                <label> Forma: </label>
                <br></br>
                <input
                  type="text"
                  className="input input-bordered w-[305px] max-w-xs"
                  {...register("forma")}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div className="ml-[10px]">
                <label>Work and Turn: </label>
                <br></br>
                <input
                  type="text"
                  className="input input-bordered w-[305px] max-w-xs"
                  {...register("workandturn")}
                  onKeyDown={handleKeyPress}
                />
              </div>
            </div>
            <table className="table mt-5">
              <thead className="border border-gray-400">
                <tr className="bg-base-200 border-b border-[#393838]">
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th className="flex ml-[-60px]">Impressions</th>
                </tr>
                <tr className="bg-base-200 border-b border-gray-400 ">
                  <th className="">Paper Type</th>
                  <th>Size</th>
                  <th>Signature </th>
                  <th className="border-r border-[#393838]">Ordered</th>
                  <th>Produced</th>
                </tr>
              </thead>
              <tbody>
                {pressData.map((press, index) => (
                  <tr className="border border-[#393838]" key={index}>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        {...register(`pressData.${index}.paperType`)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        {...register(`pressData.${index}.size`)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        {...register(`pressData.${index}.signature`)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        {...register(`pressData.${index}.ordered`)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        {...register(`pressData.${index}.produced`)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-[5px]" onClick={handleAddRow}>
              <MdAdd size={30} color="green" />
            </div>
            <div className="modal-action">
              <button
                className="btn hover:bg-[red] hover:text-white"
                onClick={(e) => (
                  document.getElementById("my_modal_12").close(),
                  onChildData(false)
                )}
              >
                Close
              </button>
              <button
                className="btn hover:bg-[#3eab3e] hover:text-[white]"
                type="submit"
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

export default PressUnits;
