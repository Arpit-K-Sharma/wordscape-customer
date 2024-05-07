import React, { useState } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios';

function PaperDetail() {
  const [paper, setPaper] = useState(false);
  const [paperSize, setPaperSize] = useState("");
  const [gutterSize, setGutterSize] = useState("");
  const [gripperSize, setGripperSize] = useState("");
  const [coverPaperSize, setCoverPaperSize] = useState("");
  const [innerPaperSize, setInnerPaperSize] = useState("");
  const [folderName, setFolderName] = useState("");
  const [plateProcessBy, setPlateProcessBy] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      paperSize,
      gutterSize,
      gripperSize,
      coverPaperSize,
      innerPaperSize,
      folderName,
      plateProcessBy
    };
    console.log(data)
    // try {
    //   const response = await axios.post("your-api-endpoint-url", data);

    //   if (response.status === 200) {
        setPaper(true);
        document.getElementById("my_modal_8").close()
    //   } else {
    //     console.error("Failed to send data to API:", response.statusText);
    //   }
    // } catch (error) {
    //   console.error("Error sending data to API:", error.message);
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
  }

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={(e) => { document.getElementById("my_modal_8").showModal() }}
      >
        <a className="flex">Paper Details </a>{paper === true ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>
      <dialog id="my_modal_8" className="modal flex h-[100%] ml-[50%] bg-[#1c2127]">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
          <h3 className="font-bold text-lg">Paper Details</h3>
          <p className="py-4">
            <form onSubmit={handleSubmit} className="items-center mt-3">
              <label className="form-control w-full">
                <div className="label mt-1">
                  <span className="label-text">Paper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Paper Size"
                  className="input input-bordered w-full"
                  value={paperSize}
                  onChange={(e) => setPaperSize(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </label>
              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Gutter Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Gutter Size"
                  className="input input-bordered w-full"
                  onKeyDown={handleKeyPress} 
                  onChange={(e) => setGutterSize(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Gripper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Gripper Size"
                  className="input input-bordered w-full "
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setGripperSize(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Cover Paper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Cover Paper Size"
                  className="input input-bordered w-full "
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setCoverPaperSize(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Inner Paper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Inner Paper Size"
                  className="input input-bordered w-full "
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setInnerPaperSize(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Folder Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Folder Name"
                  className="input input-bordered w-full "
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setFolderName(e.target.value)}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Plate Process By</span>
                </div>
                <input
                  type="text"
                  placeholder="Plate Process By"
                  className="input input-bordered w-full "
                  onKeyDown={handleKeyPress}
                  onChange={(e) => setPlateProcessBy(e.target.value)}
                />
              </label>
              <div className="modal-action">
                <button type="submit" className="btn hover:bg-[#376437]">Done</button>
              </div>
            </form>
          </p>
        </div>
      </dialog>
    </>
  );
}

export default PaperDetail;
