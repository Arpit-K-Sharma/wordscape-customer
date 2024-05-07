import React, { useState } from "react";
import axios from 'axios';
import { AiOutlineCheckCircle } from 'react-icons/ai';

function Bindery() {
  const [bindery, setBindery] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filledBy, setFilledBy] = useState('');
  const [approvedBy, setApprovedBy] = useState('');

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
  }

  // Function to handle radio button selection
  const handleRadioChange = (value) => {
    const updatedSelectedOptions = [...selectedOptions];
    if (updatedSelectedOptions.includes(value)) {
      updatedSelectedOptions.splice(updatedSelectedOptions.indexOf(value), 1); // Remove if already selected
    } else {
      updatedSelectedOptions.push(value); // Add if not selected
    }
    setSelectedOptions(updatedSelectedOptions);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      filledBy,
      approvedBy,
      selectedOptions
    };
    console.log(data)
    // try {
    //     const response = await axios.post("APIENDPOINT", data);

    //     if (response.status === 200) { 
    document.getElementById("my_modal_11").close()
    setBindery(true)
    //     } else {
    //         console.error("Failed to send data to API:", response.statusText);
    //     }
    // } catch (error) {
    //     console.error("Error sending data to API:", error.message);
    // }
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_11").showModal()}
      >
        <a className="flex"> Bindery </a>{bindery === true ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>
      <dialog id="my_modal_11" className="modal flex h-[100%] ml-[50%] bg-[#1c2127]">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
          <form onSubmit={handleSubmit}>
            <h3 className="font-bold text-lg mb-[20px] flex align-center justify-center">Bindery</h3>
            <div className="bindery">
              <div className="flex align-left justify-left mt-[10px]">
                <div class="mr-4 ml-[35px]">
                  <label class="inline-flex items-center">
                    <input type="radio" name="centerstitch" value="centerstitch" className="h-6 w-6" onChange={() => handleRadioChange('centerstitch')} />
                    <span class="ml-1 mr-5">Center stitch</span>
                  </label>
                </div>
                <div class="mr-4 ml-[18px]">
                  <label class="inline-flex items-center">
                    <input type="radio" name="perfect" value="perfect" className="h-6 w-8" onChange={() => handleRadioChange('perfect')} />
                    <span class="ml-1">Perfect</span>
                  </label>
                </div>
                <div class="mr-4 ml-[67px]">
                  <label class="inline-flex items-center">
                    <input type="radio" name="juju" value="juju" className="h-6 w-6" onChange={() => handleRadioChange('juju')} />
                    <span class="ml-1 mr-5">Juju</span>
                  </label>
                </div>
                <div class="mr-4 ml-[67px]">
                  <label class="inline-flex items-center">
                    <input type="radio" name="metalfoiling" value="metal-foiling" className="h-6 w-8" onChange={() => handleRadioChange('metal-foiling')} />
                    <span class="ml-1">Metal-foiling</span>
                  </label>
                </div>
              </div>
              <div className="flex justify-center align-center gap-[40px] mt-[20px]">
                <div class="mr-4">
                  <label class="inline-flex items-center">
                    <input type="radio" name="diecuting" value="diecuting" className="h-6 w-6" onChange={() => handleRadioChange('diecuting')} />
                    <span class="ml-1 mr-5">Diecuting</span>
                  </label>
                </div>
                <div class="mr-4">
                  <label class="inline-flex items-center">
                    <input type="radio" name="perforation" value="perforation" className="h-6 w-8" onChange={() => handleRadioChange('perforation')} />
                    <span class="ml-1">Perforation</span>
                  </label>
                </div>
                <div class="mr-4">
                  <label class="inline-flex items-center">
                    <input type="radio" name="padding" value="padding" className="h-6 w-6" onChange={() => handleRadioChange('padding')} />
                    <span class="ml-1 mr-5">Padding</span>
                  </label>
                </div>
                <div class="mr-4">
                  <label class="inline-flex items-center">
                    <input type="radio" name="spotvarnishing" value="spot-varnishing" className="h-6 w-8" onChange={() => handleRadioChange('spot-varnishing')} />
                    <span class="ml-1">Spot varnishing</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex ml-[30px] mt-[20px]">
              <div className="ml-[10px]">
                <label> Filled-in By: </label><br></br>
                <input type="text" className="input input-bordered w-[305px] max-w-xs" onChange={(e) => { setFilledBy(e.target.value) }} onKeyDown={handleKeyPress} />
              </div>
              <div className="ml-[10px]">
                <label>Approved By: </label><br></br>
                <input type="text" className="input input-bordered w-[305px] max-w-xs" onChange={(e) => { setApprovedBy(e.target.value) }} />
              </div>
            </div>
            <div className="modal-action">
              <button type="submit" className="btn hover:bg-[#376437]">Done</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default Bindery;
