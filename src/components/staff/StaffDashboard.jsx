import { NavLink } from "react-router-dom";
import StaffDrawer from "./menu/StaffDrawer";
import React, { useState, useEffect } from "react";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import axios from "../axiosInstance";

function StaffDashboard() {
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    return pastDate.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [pending, setPending] = useState();
  const [approved, setApproved] = useState();
  const [completed, setCompleted] = useState();
  const [steps, setSteps] = useState([
    { name: "Order Slip", active: false, key: "orderSlip" },
    { name: "Job Card", active: false, key: "jobCard" },
    { name: "Paper Cutting", active: false, key: "paperCutting" },
    { name: "Plate Preparation", active: false, key: "platePreparation" },
    { name: "Printing", active: false, key: "printing" },
    { name: "Post Press", active: false, key: "postPress" },
    { name: "Delivery", active: false, key: "delivery" },
    { name: "End", active: false, key: "end" },
  ]);
  const [orderid, setOrderid] = useState();

  const handleViewDetails = async (order) => {
    const response = await axios.get(`/jobCard/${order}`);
    console.log(response.data);
    console.log(order);
    setSelectedOrder(order);
    document.getElementById("my-drawer-4").checked = true;
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log(id);
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/orders`);
        setOrderDetails(response.data);

        const d = response.data;
        let Pending = 0;
        let Approved = 0;
        let Completed = 0;
        for (let index = 0; index < d.length; index++) {
          if (d[index].status === "PENDING") {
            Pending++;
          }
          if (d[index].status === "APPROVED") {
            Approved++;
          }
          if (d[index].status === "COMPLETED") {
            Completed++;
          }
        }
        setPending(Pending);
        setApproved(Approved);
        setCompleted(Completed);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  const handleTracking = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(`/projectTracking/${id}`);
      const trackingData = response.data;

      const updatedSteps = steps.map((step) => ({
        ...step,
        active: trackingData[step.key],
      }));
      console.log(updatedSteps);
      setSteps(updatedSteps);
      document.getElementById("my_modal_1").showModal();
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    }
  };
  const handleNext = () => {
    setSteps((prevSteps) => {
      const lastActiveIndex = prevSteps.reduce(
        (lastIndex, step, index) => (step.active ? index : lastIndex),
        -1
      );
      if (lastActiveIndex < prevSteps.length - 1) {
        const newSteps = prevSteps.map((step, index) => ({
          ...step,
          active: index <= lastActiveIndex + 1,
        }));
        return newSteps;
      }
      return prevSteps;
    });
  };

  const handleDone = async () => {
    const stepData = steps.reduce((acc, step) => {
      acc[step.key] = step.active;
      return acc;
    }, {});

    console.log(stepData);

    try {
      await axios.post(`/projectTracking/${orderid}`, stepData);
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  const handleBack = () => {
    setSteps((prevSteps) => {
      const lastActiveIndex = prevSteps.reduce(
        (lastIndex, step, index) => (step.active ? index : lastIndex),
        -1
      );
      if (lastActiveIndex > 0) {
        const newSteps = prevSteps.map((step, index) => ({
          ...step,
          active: index < lastActiveIndex,
        }));
        return newSteps;
      }
      return prevSteps;
    });
  };
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn mx-1 my-1 drawer-button mt-8 ml-5"
        >
          <img
            width="26"
            height="26"
            src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
            alt="menu--v1"
          />
        </label>
        {/* <div className="fixed mt-[15px] top-[-0.5px] left-[1100px] flex items-center px-4 py-2">
          <div className="alert alert-info bg-zinc-900 text-white border-0">
            <p>Logged in as: </p>
          </div>
        </div> */}
        <div className="p-7 text-black">
          <div className="font-archivo">
            <div className="flex justify-center gap-5 text-black mb-9">
              <h1 className="font-bold text-4xl">Employee Tasks</h1>
              <div className="flex gap-5 text-black">
                <div className="w-[150px] ml-[420px]">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="date"
                      className="grow"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </label>
                </div>
                <div className="w-[150px]">
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      type="date"
                      className="grow"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-[100px] mt-[20px]">
              <div className="card w-[300px] h-[300px] shadow-xl bg-base-200 bg-opacity-40">
                <div className="card-body p-[0.3rem] mt-[10%] mb-5">
                  <a className="flex justify-center">
                    <AiOutlineClockCircle
                      size={35}
                      color="green"
                      className="ml-2"
                    />
                    <h3 className="card-title font-semibold flex justify-center text-[20px] text-black pl-5">
                      Pending Tasks
                    </h3>
                  </a>
                  <h3 className="card-title flex justify-center text-black text-[17px]">
                    Tasks on the way
                  </h3>
                  <div className="card-actions justify-center items-center bg-gray-600 bg-opacity-55 h-2/3 rounded-md ml-6 mr-6 mt-1">
                    <h2 className="text-4xl text-o1 font-bold">{pending}</h2>
                  </div>
                </div>
              </div>
              <div className="card w-[300px] h-[300px] shadow-xl bg-base-200 bg-opacity-40">
                <div className="card-body p-[0.3rem] mt-[10%] mb-5">
                  <a className="flex justify-center">
                    <AiOutlineCheckCircle
                      size={35}
                      color="green"
                      className="ml-2"
                    />
                    <h3 className="card-title font-semibold flex justify-center text-[20px] text-black pl-5">
                      Approved Tasks
                    </h3>
                  </a>
                  <h3 className="card-title flex justify-center text-black text-[17px]">
                    Tasks Completed
                  </h3>
                  <div className="card-actions justify-center items-center bg-gray-600 bg-opacity-55 h-2/3 rounded-md ml-6 mr-6 mt-1">
                    <h2 className="text-4xl text-o1 font-bold">{approved}</h2>
                  </div>
                </div>
              </div>
              <div className="card w-[300px] h-[300px] shadow-xl bg-base-200 bg-opacity-40">
                <div className="card-body p-[0.3rem] mt-[10%] mb-5">
                  <a className="flex justify-center">
                    <FaCheckCircle size={32} color="green" className="ml-2" />
                    <h3 className="card-title font-semibold flex justify-center text-[20px] text-black pl-5">
                      Completed Tasks
                    </h3>
                  </a>
                  <h3 className="card-title flex justify-center text-black text-[17px]">
                    Task Finalized
                  </h3>
                  <div className="card-actions justify-center items-center bg-gray-600 bg-opacity-55 h-2/3 rounded-md ml-6 mr-6 mt-1">
                    <h2 className="text-4xl text-o1 font-bold">{completed}</h2>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="overflow-y-auto w-[83%] h-[300px] ml-[9%] mt-[30px] shadow-xl rounded-lg">
              <table className="table">
                <thead>
                  <tr className="bg-base-200 font-semibold text-[15px] text-black">
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Delivery Date</th>
                    <th>Pages</th>
                    <th>Quantity</th>
                    <th className="w-[200px]">All Details</th>
                    <th className="w-[200px]">View Tracking</th>
                  </tr>
                </thead>
                <tbody className="text-semibold">
                  {orderDetails &&
                    orderDetails.map((details) => (
                      <tr key={details.orderId}>
                        <td>{details.orderId}</td>
                        <td>{new Date(details.date).toLocaleDateString()}</td>
                        <td>
                          {details.delivery
                            ? new Date(details.delivery).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>{details.pages}</td>
                        <td>{details.quantity}</td>
                        <td>
                          <button
                            className="btn min-h-[30px] h-[40px]"
                            onClick={() => handleViewDetails(details.orderId)}
                          >
                            View details
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn min-h-[30px] h-[40px]"
                            onClick={() => {
                              handleTracking(details.orderId),
                                setOrderid(details.orderId);
                            }}
                          >
                            Track It
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div> */}
            <div className="drawer drawer-end">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="p-4 w-80 min-h-full bg-base-200 pl-[20px] text-base-content">
                  <h1 className="text-3xl mb-4 mt-5 ">All Details</h1>
                  {selectedOrder && (
                    <>
                      <table className="table-auto w-full">
                        <tbody>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Date</td>
                            <td className="w-1/2">
                              {new Date(
                                selectedOrder.date
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Paper Size</td>
                            <td className="w-1/2">{selectedOrder.paperSize}</td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Pages</td>
                            <td className="w-1/2">{selectedOrder.pages}</td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Quantity</td>
                            <td className="w-1/2">{selectedOrder.quantity}</td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Binding Type</td>
                            <td className="w-1/2">
                              {selectedOrder.bindingType}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Cover Treatment Type</td>
                            <td className="w-1/2">
                              {selectedOrder.coverTreatmentType}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Inner Paper Type</td>
                            <td className="w-1/2">
                              {selectedOrder.innerPaperType}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Inner Paper Thickness</td>
                            <td className="w-1/2">
                              {selectedOrder.innerPaperThickness}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Outer Paper Type</td>
                            <td className="w-1/2">
                              {selectedOrder.outerPaperType}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Outer Paper Thickness</td>
                            <td className="w-1/2">
                              {selectedOrder.outerPaperThickness}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Lamination Type</td>
                            <td className="w-1/2">
                              {selectedOrder.laminationType}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Ink Type</td>
                            <td className="w-1/2">{selectedOrder.inkType}</td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Remarks</td>
                            <td className="w-1/2">
                              {selectedOrder.remarks
                                ? selectedOrder.remarks
                                : "N/A"}
                            </td>
                          </tr>
                          <tr
                            className="mb-4 text-lg"
                            style={{ height: "50px" }}
                          >
                            <td className="w-1/2">Customer Name</td>
                            <td className="w-1/2">{selectedOrder.customer}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                </div>
              </div>
            </div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box overflow-hidden max-w-[64%]">
                <div className="">
                  <ul className="steps w-[900px] mb-[20px]">
                    {steps.map((step, index) => (
                      <li
                        key={index}
                        className={`step ${
                          step.active ? "step step-primary" : ""
                        }`}
                        data-content={step.active ? "✓" : null}
                      >
                        {step.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-[20px] justify-end">
                  <button className="btn" onClick={handleBack}>
                    Back
                  </button>
                  <button className="btn" onClick={handleNext}>
                    Next
                  </button>
                </div>
                <div className="modal-action">
                  <form method="dialog">
                    <div className="flex justify-end gap-[15px]">
                      <button className="btn">Close</button>
                      <button className="btn" onClick={handleDone}>
                        Done
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <StaffDrawer />
    </div>
  );
}

export default StaffDashboard;
