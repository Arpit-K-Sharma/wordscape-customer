import React, { useState } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';
function PaperUnit() {
  const [unit, setUnit] = useState(false);
  const [papersData, setPapersData] = useState([
    { type: "Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" },
    { type: "Cover Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" },
    { type: "Inner Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" },
    { type: "Other Paper", fullSheetSize: "", weight: "", paperType: "", totalSheets: "" },
  ]);
  const [papersData2, setPapersData2] = useState([
    { type: "Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" },
    { type: "Cover Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" },
    { type: "Inner Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" },
    { type: "Other Paper", CutSheetSize: "", Wastage: "", TotalCutSheet: "" },
  ]);
  const [papersData3, setPapersData3] = useState([
    { Type: "Paper", type: "", gsm: "", printColor: "", 	lamination: "" },
    { Type: "Cover Paper", type: "", gsm: "", printColor: "", lamination: "" },
    { Type: "Inner Paper", type: "", gsm: "", printColor: "", lamination: "" },
    { Type: "Other Paper", type: "", gsm: "", printColor: "", lamination: "" },
  ]);
  const [paperData, setPaperData] = useState({
    readyBy: "",
    date: "",
    time: "",
    type: "",
    size: "",
    numberOfPages: "",
    printrun: "",
    side: ""
  });
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
        paperData,
        papersData,
        papersData2,
        papersData3
    };
    console.log(data)
    // try {
    //     const response = await axios.post("APIENDPOINT", data);
    //     if (response.status === 200) {
    //         setPaymentdone(true); 
    document.getElementById("my_modal_10").close()
    //     } else {
    //         console.error("Failed to send data to API:", response.statusText);
    //     }
    // } catch (error) {
    //     console.error("Error sending data to API:", error.message);
    // }
};
  const handleInputChange = (index, property, value) => {
    const updatedPaperData = papersData;
    updatedPaperData[index][property] = value;
    setPapersData(updatedPaperData);
  };
  const handleInputChange2 = (index, property, value) => {
    const updatedPaperData2 = papersData2;
    updatedPaperData2[index][property] = value;
    setPapersData2(updatedPaperData2);
    console.log(updatedPaperData2);
  };
  const handleInputChange3 = (index, property, value) => {
    const updatedPaperData3 = papersData3;
    updatedPaperData3[index][property] = value;
    setPapersData3(updatedPaperData3);
    console.log(updatedPaperData3);
  };
  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_10").showModal()}
      >
        <a className="flex"> Paper Unit </a>{unit == true ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>



      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_10" className="modal flex h-[100%] ml-[50%] bg-[#1c2127]">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127] overflow-y-scroll ">
          <form onSubmit={handleSubmit}>
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
                {papersData.map((row, index) => (
                  <tr key={index} className="border-b border-[#393838]">
                    <th className="border-r bg-base-200 border-[#393838]">
                      {row.type}
                      </th>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange(index, 'fullSheetSize', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange(index, 'weight', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange(index, 'paperType', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange(index, 'totalSheets', e.target.value)}
                        onKeyDown={handleKeyPress}
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
                {papersData2.map((row, index) => (
                  <tr key={index} className="border-b border-[#393838]">
                    <th className="border-r bg-base-200 border-[#393838]">
                      {row.type}
                      </th>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange2(index, 'CutSheetSize', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange2(index, 'Wastage', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange2(index, 'TotalCutSheet', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex mt-[20px]">
              <div>
                <label>Paper Ready By: </label> <br></br>
                <input type="text" className="input input-bordered w-[220px] max-w-xs" onChange={(e) => setPaperData({ ...paperData, readyBy: e.target.value })} onKeyDown={handleKeyPress} />
              </div>
              <div className="ml-[10px]">
                <label>Date: </label><br></br>
                <input type="date" className="input input-bordered w-[220px] max-w-xs" onChange={(e) => setPaperData({ ...paperData, date: e.target.value })} onKeyDown={handleKeyPress} />
              </div>
              <div className="ml-[10px]">
                <label>Time: </label><br></br>
                <input type="time" className="input input-bordered w-[220px] max-w-xs" onChange={(e) => setPaperData({ ...paperData, time: e.target.value })} onKeyDown={handleKeyPress} />
              </div>
            </div>
            <div className="flex mt-[20px]">
              <div>
                <label>Type: </label> <br></br>
                <input type="text" className="input input-bordered w-[220px] max-w-xs" onChange={(e) => setPaperData({ ...paperData, type: e.target.value })} onKeyDown={handleKeyPress} />
              </div>
              <div className="ml-[10px]">
                <label>Size: </label> <br></br>
                <input type="text" className="input input-bordered w-[220px] max-w-xs" onChange={(e) => setPaperData({ ...paperData, size: e.target.value })} onKeyDown={handleKeyPress} />
              </div>
              <div className="ml-[10px]">
                <label>Number Of Page: </label> <br></br>
                <input type="text" className="input input-bordered w-[220px] max-w-xs" onChange={(e) => setPaperData({ ...paperData, numberOfPages: e.target.value })} onKeyDown={handleKeyPress} />
              </div>
            </div>
            <div className="flex mt-[20px]">
              <div>
                <label>Printrun: </label> <br></br>
                <input type="text" className="input input-bordered w-[330px] max-w-xs" onChange={(e) => setPaperData({ ...paperData, printrun: e.target.value })} onKeyDown={handleKeyPress} />
              </div>
              <div class="flex mt-[35px] mb-4 ml-[20px]">

                <div class="mr-4 ">
                  <label class="inline-flex items-center">
                    <input type="radio" name="sides" value="singleside" className="h-6 w-6" onChange={(e) => setPaperData({ ...paperData, side: e.target.value })} onKeyDown={handleKeyPress} />
                    <span class="ml-1 mr-5">Single Side</span>
                  </label>
                </div>
                <div class="mr-4">
                  <label class="inline-flex items-center">
                    <input type="radio" name="sides" value="bothside" className="h-6 w-8" onChange={(e) => setPaperData({ ...paperData, side: e.target.value })} onKeyDown={handleKeyPress}/>
                    <span class="ml-1"> Both Side</span>
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
              {papersData3.map((row, index) => (
                  <tr key={index} className="border-b border-[#393838]">
                    <th className="border-r bg-base-200 border-[#393838]">
                      {row.Type}
                      </th>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange3(index, 'type', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange3(index, 'gsm', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange3(index, 'printColor', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input input-bordered h-[40px] w-full max-w-xs"
                        onChange={(e) => handleInputChange3(index, 'lamination', e.target.value)}
                        onKeyDown={handleKeyPress}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="modal-action">
              <button className="btn hover:bg-[#376437]" onClick={(e) => { setUnit(true) }}>Done</button>
          </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
export default PaperUnit