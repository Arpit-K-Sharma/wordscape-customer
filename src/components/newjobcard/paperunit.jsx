import React from "react";
import { useForm, Controller } from "react-hook-form";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Cookies from "js-cookie";
import { useState } from "react";
function PaperUnit() {
  const [paperunitdone, setPaperunitdone] = useState(false);
  const { handleSubmit, control, getValues, reset } = useForm({
    defaultValues: {
      paperData: {
        readyBy: "",
        date: "",
        time: "",
        type: "",
        size: "",
        numberOfPages: "",
        printrun: "",
        side: ""
      },
      papersData1: [
        { type: "Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" },
        { type: "Cover Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" },
        { type: "Inner Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" },
        { type: "Other Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" }
      ],
      papersData2: [
        { type: "Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" },
        { type: "Cover Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" },
        { type: "Inner Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" },
        { type: "Other Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" }
      ],
      papersData3: [
        { Type: "Paper", type: "", gsm: "", printColor: "", lamination: "" },
        { Type: "Cover Paper", type: "", gsm: "", printColor: "", lamination: "" },
        { Type: "Inner Paper", type: "", gsm: "", printColor: "", lamination: "" },
        { Type: "Other Paper", type: "", gsm: "", printColor: "", lamination: "" }
      ]
    }
  });

  const onSubmit = async (data) => {
    setPaperunitdone(true);
    const replaceEmptyWithNull = (obj) => {
      Object.keys(obj).forEach(key => {
        if (obj[key] === "") {
          obj[key] = null;
        }
      });
    };

    replaceEmptyWithNull(data.paperData);
    data.papersData1.forEach(replaceEmptyWithNull);
    data.papersData2.forEach(replaceEmptyWithNull);
    data.papersData3.forEach(replaceEmptyWithNull);
    console.log(data);
    
    document.getElementById("my_modal_10").close();
  };
  
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputs = document.querySelectorAll("input");
      const currentIndex = Array.from(inputs).findIndex(input => document.activeElement === input);
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
        onClick={() => document.getElementById("my_modal_10").showModal()}
      >
        <a className="flex"> Paper Unit </a>
 {paperunitdone ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>
      <dialog id="my_modal_10" className="modal flex h-[100%] ml-[50%] bg-[#1c2127]">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127] overflow-y-scroll ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="font-bold text-lg mb-[10px]">Paper Unit</h3>
            <table className="table">
              <thead>
                <tr className="bg-base-200 border border-gray-400">
                  <th className="border-r border-[#393838]">Type</th>
                  <th>Full Sheet Size</th>
                  <th>Weight</th>
                  <th>Paper type</th>
                  <th>Total Sheets</th>
                </tr>
              </thead>
              <tbody>
                {getValues("papersData1").map((row, index) => (
                  <tr key={index} className="border-b border-[#393838]">
                    <th className="border-r bg-base-200 border-[#393838]">
                      {row.type}
                    </th>
                    <td>
                      <Controller
                        name={`papersData1[${index}].fullSheetSize`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData1[${index}].weight`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData1[${index}].paperType`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData1[${index}].totalSheets`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="table mt-5">
              <thead>
                <tr className="bg-base-200 border border-gray-400">
                  <th className="border-r border-[#393838]">Paper Type</th>
                  <th>Cut Sheet Size</th>
                  <th>Wastage</th>
                  <th>Total Cut Sheet</th>
                </tr>
              </thead>
              <tbody>
                {getValues("papersData2").map((row, index) => (
                  <tr key={index} className="border-b border-[#393838]">
                    <th className="border-r bg-base-200 border-[#393838]">
                      {row.type}
                    </th>
                    <td>
                      <Controller
                        name={`papersData2[${index}].CutSheetSize`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData2[${index}].Wastage`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData2[${index}].TotalCutSheet`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex mt-[20px]">
              <div>
                <label>Paper Ready By: </label> <br />
                <Controller
                  name="paperData.readyBy"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input input-bordered w-[220px] max-w-xs"
                      onKeyDown={handleKeyPress}
                    />
                  )}
                />
              </div>
              <div className="ml-[10px]">
                <label>Date: </label><br />
                <Controller
                  name="paperData.date"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className="input input-bordered w-[220px] max-w-xs"
                      onKeyDown={handleKeyPress}
                    />
                  )}
                />
              </div>
              <div className="ml-[10px]">
                <label>Time: </label><br />
                <Controller
                  name="paperData.time"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="time"
                      className="input input-bordered w-[220px] max-w-xs"
                      onKeyDown={handleKeyPress}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex mt-[20px]">
              <div>
                <label>Type: </label> <br />
                <Controller
                  name="paperData.type"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input input-bordered w-[220px] max-w-xs"
                      onKeyDown={handleKeyPress}
                    />
                  )}
                />
              </div>
              <div className="ml-[10px]">
                <label>Size: </label> <br />
                <Controller
                  name="paperData.size"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input input-bordered w-[220px] max-w-xs"
                      onKeyDown={handleKeyPress}
                    />
                  )}
                />
              </div>
              <div className="ml-[10px]">
                <label>Number Of Page: </label> <br />
                <Controller
                  name="paperData.numberOfPages"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input input-bordered w-[220px] max-w-xs"
                      onKeyDown={handleKeyPress}
                    />
                  )}
                />
              </div>
            </div>
            <div className="flex mt-[20px]">
              <div>
                <label>Printrun: </label> <br />
                <Controller
                  name="paperData.printrun"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="input input-bordered w-[330px] max-w-xs"
                      onKeyDown={handleKeyPress}
                    />
                  )}
                />
              </div>
              <div className="flex mt-[35px] mb-4 ml-[20px]">
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <Controller
                      name="paperData.side"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="radio"
                            value="singleside"
                            className="h-6 w-6"
                          />
                          <span className="ml-1 mr-5">Single Side</span>
                        </>
                      )}
                    />
                  </label>
                </div>
                <div className="mr-4">
                  <label className="inline-flex items-center">
                    <Controller
                      name="paperData.side"
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            {...field}
                            type="radio"
                            value="bothside"
                            className="h-6 w-8"
                          />
                          <span className="ml-1">Both Side</span>
                        </>
                      )}
                    />
                  </label>
                </div>
              </div>
            </div>
            <table className="table mt-[20px]">
              <thead className="">
                <tr className="bg-base-200 border border-gray-400">
                  <th className="border-r border-[#393838]">Paper Type</th>
                  <th>Type</th>
                  <th>gsm.</th>
                  <th>Print color</th>
                  <th>Lamination</th>
                </tr>
              </thead>
              <tbody className="border-r border-l  border-[#393838]">
                {getValues("papersData3").map((row, index) => (
                  <tr key={index} className="border-b border-[#393838]">
                    <th className="border-r bg-base-200 border-[#393838]">
                      {row.Type}
                    </th>
                    <td>
                      <Controller
                        name={`papersData3[${index}].type`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData3[${index}].gsm`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData3[${index}].printColor`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                    <td>
                      <Controller
                        name={`papersData3[${index}].lamination`}
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            className="input input-bordered h-[40px] w-full max-w-xs"
                            onKeyDown={handleKeyPress}
                          />
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-action">
              <button className="btn hover:bg-[#376437]" type="submit">Done</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PaperUnit;
