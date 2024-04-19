import React from "react";

function NJobCard() {
  return (
    <div>
      <div className="grid h-screen grid-cols-2 font-archivo">
        <div className="">
          <h1 className="text-center mt-[90px] text-5xl font-extrabold">Job Card</h1>
          <h1 className="text-center mt-[50px] text-xl">
            Retrieve Order Details
          </h1>
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
        </div>
        <div className="bg-gray-100"></div>
      </div>
    </div>
  );
}

export default NJobCard;
