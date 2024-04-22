import React from "react";

function NJobCard() {
  return (
    <div>
      <div className="grid h-screen grid-cols-2 font-archivo">
        <div className="">
          <h1 className="text-center mt-[90px] text-5xl font-extrabold">
            Job Card
          </h1>
          <h1 className="text-center mt-[50px] text-xl">Order Details</h1>
          <h1 className="text-center mt-4 text-l">TO DO: Pull Order DB Here</h1>
          <div></div>
          <button
            className="btn mx-auto ml-[240px] mt-9 w-[150px]"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Payment & Services
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Payment Method</h3>
              <p className="py-4">
                <form className="flex items-center mt-5">
                  <label className="">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option1"
                      className="w-4 h-4 mr-2 ml-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="mr-6 ml-4"> Advance</span>
                  </label>
                  <label className="px-4">
                    {" "}
                    <input
                      type="radio"
                      name="radio-group"
                      value="option2"
                      className="w-4 h-4 mr-2 ml-3 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4 mr-5"> On Delivery</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio-group"
                      value="option3"
                      className="w-4 h-4 mr-2 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4"> Credit</span>
                  </label>
                </form>
                <p className="mt-5 font-bold">Service Required:</p>
                <form className="flex items-center mt-5">
                  <label className="">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option1"
                      className="w-4 h-4 mr-2 ml-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="mr-6 ml-4"> Pre Press</span>
                  </label>
                  <label className="px-4">
                    {" "}
                    <input
                      type="radio"
                      name="radio-group"
                      value="option2"
                      className="w-4 h-4 mr-2 ml-3 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4 mr-5"> Press</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio-group"
                      value="option3"
                      className="w-4 h-4 mr-2 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4"> Post-press</span>
                  </label>
                </form>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <button
            className="btn mx-auto ml-[240px] mt-9 w-[150px]"
            onClick={() => document.getElementById("my_modal_6").showModal()}
          >
            Delivery Details
          </button>
          <dialog
            id="my_modal_6"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">If to be sent to</h3>
              <p className="mt-5">Fill Below</p>
              <p className="py-4">
                <form className="mt-5 w-full">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Company</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Company Name"
                      className="input input-bordered w-full"
                    />
                  </label>

                  <label className="form-control w-full">
                    <div className="label mt-6">
                      <span className="label-text">Venue</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Venue Name"
                      className="input input-bordered w-full "
                    />
                  </label>

                  <label className="form-control w-full mt-3">
                    <div className="label mt-6">
                      <span className="label-text">Contact Person Name</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Contact Person Name"
                      className="input input-bordered w-full"
                    />
                  </label>

                  <label className="form-control w-full mt-5">
                    <div className="label mt-3">
                      <span className="label-text">Contact Person Number</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Contact Person Number"
                      className="input input-bordered w-full"
                    />
                  </label>
                </form>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <button
            className="btn mx-auto ml-[240px] mt-9 w-[150px]"
            onClick={() => document.getElementById("my_modal_7").showModal()}
          >
            Pre Press Unit
          </button>
          <dialog
            id="my_modal_7"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Payment Method</h3>
              <p className="py-4">
                <form className="flex items-center mt-5">
                  <label className="">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option1"
                      className="w-4 h-4 mr-2 ml-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="mr-6 ml-4"> PS/PDF</span>
                  </label>
                  <label className="px-4">
                    {" "}
                    <input
                      type="radio"
                      name="radio-group"
                      value="option2"
                      className="w-4 h-4 mr-2 ml-3 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4 mr-5"> Original Document File</span>
                  </label>
                </form>
                <p className="mt-5 font-bold">Material Received:</p>
                <form className="flex items-center mt-5">
                  <label className="">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option1"
                      className="w-4 h-4 mr-2 ml-4 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="mr-6 ml-4"> Dummy</span>
                  </label>
                  <label className="px-4">
                    {" "}
                    <input
                      type="radio"
                      name="radio-group"
                      value="option2"
                      className="w-4 h-4 mr-2 ml-3 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4 mr-5"> CD/DVD</span>
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="radio-group"
                      value="option3"
                      className="w-4 h-4 mr-2 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4"> Flash Drive</span>
                  </label>
                  <label className="ml-5">
                    <input
                      type="radio"
                      name="radio-group"
                      value="option3"
                      className="w-4 h-4 mr-2 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                    />
                    <span className="ml-4"> Email</span>
                  </label>
                </form>
                <p className="mt-5 font-bold">Imposition:</p>
                <form className="flex items-center mt-5">
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">Flap Size</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Flap Size"
                      className="input input-bordered w-full"
                    />
                  </label>
                </form>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <button
            className="btn mx-auto ml-[240px] mt-9 w-[150px]"
            onClick={() => document.getElementById("my_modal_8").showModal()}
          >
            Paper Details
          </button>
          <dialog
            id="my_modal_8"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Paper Details</h3>
              <p className="py-4">
                <form className="items-center mt-3">
                  <label className="form-control w-full">
                    <div className="label mt-1">
                      <span className="label-text">Paper Size</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Paper Size"
                      className="input input-bordered w-full"
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label mt-6">
                      <span className="label-text">Gutter Size</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Gutter Size"
                      className="input input-bordered w-full "
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label mt-6">
                      <span className="label-text">Gripper Size</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Gutter Size"
                      className="input input-bordered w-full "
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
                    />
                  </label>
                </form>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <button
            className="btn mx-auto ml-[240px] mt-9 w-[150px]"
            onClick={() => document.getElementById("my_modal_9").showModal()}
          >
            Plate Details
          </button>
          <dialog
            id="my_modal_9"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Plate Details</h3>
              <p className="py-4">
                <form className="items-center mt-3">
                  <label className="form-control w-full">
                    <div className="label mt-1">
                      <span className="label-text">Screen Type</span>
                    </div>
                    <input
                      type="text"
                      placeholder="Screen Type"
                      className="input input-bordered w-full"
                    />
                  </label>
                </form>

                <div className="overflow-x-auto">
                  <table className="table mt-5">
                    {/* head */}
                    <thead>
                      <tr className="bg-base-200">
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
                    
                    
                      {/* row 1 */}
                      
                      {/* row 2 */}
                  
                      {/* row 3 */}
                      
                    </tbody>
                  </table>
                </div>
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <div className="bg-gray-100"></div>
      </div>
    </div>
  );
}

export default NJobCard;
