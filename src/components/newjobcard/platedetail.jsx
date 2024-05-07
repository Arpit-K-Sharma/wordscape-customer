import React, { useState } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios';

function PlateDetail() {
    const [plate, setPlate] = useState(false);
    const [screenType, setScreenType] = useState("");
    const [platenumber, setPlatenumber] = useState([1,2,3,4])
    const [plateData, setPlateData] = useState([
        { size: "", colour1: "", colour2: "", colour3: "", colour4: "", special: "", total: "" }
    ]);
    const [plateDamage, setPlateDamage] = useState("");
    const [plateRemake, setPlateRemake] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            screenType,
            plateData,
            plateDamage,
            plateRemake
        };
        console.log(data)
        // try {
        //     const response = await axios.post("your-api-endpoint-url", data);
        //     if (response.status === 200) {
                setPlate(true);
        document.getElementById("my_modal_9").close()    
        //     } else {
        //         console.error("Failed to send data to API:", response.statusText);
        //     }
        // } catch (error) {
        //     console.error("Error sending data to API:", error.message);
        // }
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

    const handlePlateDataChange = (index, fieldName, value) => {
      const updatedPlateData = [...plateData];
      if (index >= updatedPlateData.length) {
          while (index >= updatedPlateData.length) {
              updatedPlateData.push({ size: "", colour1: "", colour2: "", colour3: "", colour4: "", special: "", total: "" });
          }
      }
      updatedPlateData[index][fieldName] = value;
      setPlateData(updatedPlateData);
  };
  

    return (
        <>
            <button
                className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
                onClick={() => document.getElementById("my_modal_9").showModal()}
            >
                <a className="flex"> Plate Details </a>{plate === true ? <AiOutlineCheckCircle size={24} color="green" /> : null}
            </button>
            <dialog id="my_modal_9" className="modal flex h-[100%] ml-[37%] bg-[#1c2127]">
                <div className="modal-box max-h-[100%] max-w-[63%] shadow-none bg-[#1c2127]">
                    <h3 className="font-bold text-lg flex align-center justify-center">Plate Details</h3>
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
                                    value={screenType}
                                    onChange={(e) => setScreenType(e.target.value)}
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
                                                    name="size"
                                                    className="input input-bordered w-[80px] h-[40px] max-w-xs"
                                                    value={row.size}
                                                    onChange={(e) => handlePlateDataChange(index, "size", e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </td>
                                            <td className="border-b border-[#393838]">
                                                <input
                                                    type="text"
                                                    name="colour1"
                                                    className="input input-bordered w-[90px] h-[40px] max-w-xs"
                                                    value={row.colour1}
                                                    onChange={(e) => handlePlateDataChange(index, "colour1", e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </td>
                                            <td className="border-b border-[#393838]">
                                                <input
                                                    type="text"
                                                    name="colour2"
                                                    className="input input-bordered w-[90px] h-[40px] max-w-xs"
                                                    value={row.colour2}
                                                    onChange={(e) => handlePlateDataChange(index, "colour2", e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </td>
                                            <td className="border-b border-[#393838]">
                                                <input
                                                    type="text"
                                                    name="colour3"
                                                    className="input input-bordered w-[90px] h-[40px] max-w-xs"
                                                    value={row.colour3}
                                                    onChange={(e) => handlePlateDataChange(index, "colour3", e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </td>
                                            <td className="border-b border-[#393838]">
                                                <input
                                                    type="text"
                                                    name="colour4"
                                                    className="input input-bordered w-[90px] h-[40px] max-w-xs"
                                                    value={row.colour4}
                                                    onChange={(e) => handlePlateDataChange(index, "colour4", e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </td>
                                            <td className="border-b border-[#393838]">
                                                <input
                                                    type="text"
                                                    name="special"
                                                    className="input input-bordered w-[90px] h-[40px] max-w-xs"
                                                    value={row.special}
                                                    onChange={(e) => handlePlateDataChange(index, "special", e.target.value)}
                                                    onKeyDown={handleKeyPress}
                                                />
                                            </td>
                                            <td className="border-b border-r border-[#393838]">
                                                <input
                                                    type="text"
                                                    name="total"
                                                    className="input input-bordered w-[80px] h-[40px] max-w-xs"
                                                    value={row.total}
                                                    onChange={(e) => handlePlateDataChange(index, "total", e.target.value)}
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
                                            onChange={(e) => setPlateDamage(e.target.value)}
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
                                            onChange={(e) => setPlateDamage(e.target.value)}
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
                                    onChange={(e) => setPlateRemake(e.target.value)}
                                />
                            </div>
                        </div>
                    </p>
                    <div className="modal-action">
                        <form onSubmit={handleSubmit}>
                            <button type="submit" className="btn hover:bg-[#376437]">Done</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default PlateDetail;
