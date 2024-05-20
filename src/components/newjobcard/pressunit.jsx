import React, { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

function PressUnits() {
  const [pressUnit, setPressUnit] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [pressunit, setPressunit] = useState(false);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      totalset: "",
      forma: "",
      workandturn: "",
      pressData: [
        { paperType: "", size: "", signature: "", ordered: "", produced: "" },
      ],
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    // Process pressData to replace empty strings with null
    const processedPressData = data.pressData.map((entry) => {
      const processedEntry = {};
      Object.entries(entry).forEach(([key, value]) => {
        processedEntry[key] = value ? value : null;
      });
      return processedEntry;
    });

    const jsonData = {
      totalSet: data.totalset,
      forma: data.forma,
      workAndTurn: data.workandturn,
      pressData: processedPressData,
    };

    Cookies.set("pressUnitData", JSON.stringify(jsonData));
    console.log("Press Units Data: ", jsonData);
    document.getElementById("my_modal_12").close();
    setPressunit(true);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent default behavior of the Enter key
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

  const handlePressDataChange = (index, fieldName, value) => {
    const updatedPressData = [...pressData];
    if (index >= updatedPressData.length) {
      while (index >= updatedPressData.length) {
        updatedPressData.push({
          paperType: "",
          size: "",
          signature: "",
          ordered: "",
          produced: "",
        });
      }
    }
    updatedPressData[index][fieldName] = value;
    setPressData(updatedPressData);
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_12").showModal()}
      >
        <a className="flex"> Press Unit </a>
        {pressunit == true ? (
          <AiOutlineCheckCircle size={24} color="green" />
        ) : null}
      </button>

      <dialog
        id="my_modal_12"
        className="modal flex h-[100%] ml-[50%] bg-[#1c2127]"
      >
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
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
                  <th className=" flex ml-[-60px]">Impressions</th>
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
                {pressUnit.map((press, index) => (
                  <>
                    <tr className="border border-[#393838]" key={press}>
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
                          type="signature"
                          className="input input-bordered  h-[40px] w-full max-w-xs"
                          {...register(`pressData.${index}.signature`)}
                          onKeyDown={handleKeyPress}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="input input-bordered  h-[40px] w-full max-w-xs"
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
                  </>
                ))}
              </tbody>
            </table>
            <div className="modal-action">
              <button className="btn hover:bg-[#376437]" type="submit">
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
