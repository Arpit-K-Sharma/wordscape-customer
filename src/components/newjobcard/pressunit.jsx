import React, { useState } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';
function PressUnits (){
    const [pressUnit, setPressUnit] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const [pressunit, setPressunit] = useState(false); 
    const [totalset, setTotalset] = useState('');
    const [forma, setForma] = useState('');
    const [workandturn, setWorkandturn] = useState('');
    const [pressData, setPressData] = useState([
      { paperType: "", size: "", signature: "", ordered: "", produced: ""}
    ]);
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
          event.preventDefault(); // Prevent default behavior of the Enter key
          const inputs = document.querySelectorAll("input");
          const currentIndex = Array.from(inputs).findIndex(input => document.activeElement === input);
          const nextIndex = currentIndex + 1;
          if (nextIndex < inputs.length) {
              inputs[nextIndex].focus();
          }
      }
    }
    const handlePressDataChange = (index, fieldName, value) => {
      const updatedPressData = [...pressData];
      if (index >= updatedPressData.length) {
          while (index >= updatedPressData.length) {
            updatedPressData.push({ paperType: "", size: "", signature: "", ordered: "", produced: ""});
          }
      }
      updatedPressData[index][fieldName] = value;
      setPressData(updatedPressData);
  };
     const handleSubmit= async (event) => {
      event.preventDefault();

        const data = {
            totalset,
            forma,
            workandturn,
            pressData
        };
        console.log(data)
        // try {
        //     const response = await axios.post("APIENDPOINT", data);

        //     if (response.status === 200) {
                 setPressunit(true); 
        document.getElementById("my_modal_12").close()
        //     } else {
        //         console.error("Failed to send data to API:", response.statusText);
        //     }
        // } catch (error) {
        //     console.error("Error sending data to API:", error.message);
        // }
    };
     
    return(
        <>
        <button
              className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
              onClick={() => document.getElementById("my_modal_12").showModal()}
            >
              <a className="flex"> Press Unit </a>{pressunit == true ? <AiOutlineCheckCircle size={24} color="green" /> : null}
            </button>
          
          <dialog id="my_modal_12" className="modal flex h-[100%] ml-[50%] bg-[#1c2127]">
            <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
              <form onSubmit={handleSubmit}>
              <h3 className="font-bold text-lg mb-[20px] flex align-center justify-center">Press Unit</h3>
              <div className="flex align-center justify-center">
                <label> Total Set: </label>
              </div>
              <div className="flex align-center justify-center">
                <input type="text" className="input input-bordered w-[305px] max-w-xs" onChange={(e) => {setTotalset(e.target.value)}} onKeyDown={handleKeyPress}  />
              </div>
              <div className="flex ml-[30px] mt-[20px]">
                <div className="ml-[10px]">
                  <label> Forma: </label><br></br>
                  <input type="text" className="input input-bordered w-[305px] max-w-xs" onChange={(e) => {setForma(e.target.value)}}onKeyDown={handleKeyPress}  />
                </div>
                <div className="ml-[10px]">
                  <label>Work and Turn: </label><br></br>
                  <input type="text" className="input input-bordered w-[305px] max-w-xs" onChange={(e) => {setWorkandturn(e.target.value)}} onKeyDown={handleKeyPress} />
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
                  {pressUnit.map((press, index) => <>
                    <tr className="border border-[#393838]" key={press}>                                               
                      <td><input type="text" className="input input-bordered h-[40px] w-full max-w-xs" onChange={(e) => handlePressDataChange(index, "paperType", e.target.value)} onKeyDown={handleKeyPress}  /></td>
                      <td><input type="text" className="input input-bordered h-[40px] w-full max-w-xs" onChange={(e) => handlePressDataChange(index, "size", e.target.value)} onKeyDown={handleKeyPress} /></td>
                      <td><input type="signature" className="input input-bordered  h-[40px] w-full max-w-xs" onChange={(e) => handlePressDataChange(index, "signature", e.target.value)} onKeyDown={handleKeyPress} /></td>
                      <td><input type="text" className="input input-bordered  h-[40px] w-full max-w-xs" onChange={(e) => handlePressDataChange(index, "ordered", e.target.value)} onKeyDown={handleKeyPress} /></td>
                      <td><input type="text" className="input input-bordered h-[40px] w-full max-w-xs" onChange={(e) => handlePressDataChange(index, "produced", e.target.value)} onKeyDown={handleKeyPress} /></td>
                    </tr>
                  </>)}
                  

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
export default PressUnits