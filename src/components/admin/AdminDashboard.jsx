import { NavLink } from "react-router-dom";
import AdminDrawer from "./menu/AdminDrawer";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { IoMdTimer } from "react-icons/io";
import { SlSizeActual } from "react-icons/sl";
import { SiPowerpages } from "react-icons/si";
import { RiNumbersFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import {
  FaCut,
  FaPaintBrush,
  FaLayerGroup,
  FaPrint,
  FaTint,
  FaComment,
  FaUser,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NJobCard from "../newjobcard/njobcard";

function AdminDashboard() {
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    return pastDate.toISOString().split("T")[0];
  });
  const [filteredOrderDetails, setFilteredOrderDetails] = useState([]);
  const [filteredOrder, setFilteredOrder] = useState([]);
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
    const response = await axios.get(`http://localhost:8081/jobCard/${order}`);
    setSelectedOrder(response.data);
    console.log(response.data);
    document.getElementById("my-drawer-4").checked = true;
  };
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("id");
    console.log(id);
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/orders`);
        setOrderDetails(response.data);
        setFilteredOrder(response.data);
        setFilteredOrderDetails(response.data);

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

  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredOrders = orderDetails.filter((order) =>
      order.customer.toLowerCase().startsWith(value)
    );
    setFilteredOrder(filteredOrders);
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "block";
    }
  };

  const handleTracking = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:8081/projectTracking/${id}`
      );
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
      await axios.post(
        `http://localhost:8081/projectTracking/${orderid}`,
        stepData
      );
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

  const handleJobCard = (id) => {
    console.log(id);
    navigate("/jobcard", { state: { ordersId: id } });
  };

  const handleOrderChange = (id, customer) => {
    setSelectedOrder(id);

    if (dropdownRef.current) {
      dropdownRef.current.style.display = "none";
    }
    const filtered = orderDetails.filter((order) => order.customer == customer);
    setFilteredOrderDetails(filtered);
    const filteredOrderWithId = orderDetails.filter(
      (order) => order.orderId === id
    );
    if (filteredOrderWithId.length > 0) {
      const name = filteredOrderWithId[0].customer;
      document.getElementById("input").value = name;
    } else {
      console.log("Order not found");
    }
    console.log("ok");
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn mx-1 my-1 drawer-button mt-8 ml-5"
        >
          <NavLink to="/admin/dashboard">
            <img
              width="26"
              height="26"
              src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
              alt="menu--v1"
            />
          </NavLink>
          <p className="text-xl">Menu</p>
        </label>
        {/* <div className="fixed mt-[15px] top-[-0.5px] left-[1100px] flex items-center px-4 py-2">
          <div className="alert alert-info bg-zinc-900 text-white border-0">
            <p>Logged in as: </p>
          </div>
        </div> */}
        <div className="p-7 text-slate-200">
          <div className="font-archivo">
            <div className="flex justify-center gap-5 text-slate-200 mb-9">
              <h1 className="font-bold text-4xl">Orders Summary</h1>
              <div className="flex gap-5">
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
                      color="white"
                      className="ml-2"
                    />
                    <h3 className="card-title font-semibold flex justify-center text-[20px] text-slate-200 pl-5">
                      Pending Orders
                    </h3>
                  </a>
                  <h3 className="card-title flex justify-center text-[grey] text-[17px]">
                    Waiting to be processed
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
                      color="white"
                      className="ml-2"
                    />
                    <h3 className="card-title font-semibold flex justify-center text-[20px] text-slate-200 pl-5">
                      Approved Orders
                    </h3>
                  </a>
                  <h3 className="card-title flex justify-center text-[grey] text-[17px]">
                    Verification Completed
                  </h3>
                  <div className="card-actions justify-center items-center bg-gray-600 bg-opacity-55 h-2/3 rounded-md ml-6 mr-6 mt-1">
                    <h2 className="text-4xl text-o1 font-bold">{approved}</h2>
                  </div>
                </div>
              </div>
              <div className="card w-[300px] h-[300px] shadow-xl bg-base-200 bg-opacity-40">
                <div className="card-body p-[0.3rem] mt-[10%] mb-5">
                  <a className="flex justify-center">
                    <FaCheckCircle size={32} color="white" className="ml-2" />
                    <h3 className="card-title font-semibold flex justify-center text-[20px] text-slate-200 pl-5">
                      Completed Orders
                    </h3>
                  </a>
                  <h3 className="card-title flex justify-center text-[grey] text-[17px]">
                    Order Finalized
                  </h3>
                  <div className="card-actions justify-center items-center bg-gray-600 bg-opacity-55 h-2/3 rounded-md ml-6 mr-6 mt-1">
                    <h2 className="text-4xl text-o1 font-bold">{completed}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown xl:ml-[10%] mt-[30px] text-center w-[300px]">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  tabIndex={0}
                  type="text"
                  className="grow"
                  placeholder="Search"
                  onChange={handleInput}
                  id="input"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-[20px] h-[20px] opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <ul
                ref={dropdownRef}
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-[230px]"
              >
                {filteredOrder.map((order) => (
                  <li
                    key={order.orderId}
                    onClick={() =>
                      handleOrderChange(order.orderId, order.customer)
                    }
                  >
                    <a>{order.customer}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-y-auto w-[83%] h-[300px] ml-[9%] mt-[10px] shadow-xl rounded-lg">
              <table className="table">
                <thead>
                  <tr className="bg-base-200 font-semibold text-[15px] text-slate-200">
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Delivery Date</th>
                    <th>Pages</th>
                    <th>Quantity</th>
                    <th className="w-[200px]">OrderDetails</th>
                    <th className="w-[200px]">Job Card</th>
                    <th className="w-[200px]">View Tracking</th>
                  </tr>
                </thead>
                <tbody className="text-semibold">
                  {filteredOrderDetails &&
                    filteredOrderDetails.map((details) => (
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
                            onClick={(e) => handleJobCard(details.orderId)}
                          >
                            Job card
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
            </div>
            <div className="drawer drawer-end ">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="p-4 w-80 min-h-full bg-base-100 pl-[20px] text-base-content w-[35%]  ">
                  <h1 className="text-3xl mb-4 mt-5 flex justify-center mb-6 ">
                    Order Details
                  </h1>
                  {selectedOrder && (
                    <>
                      <div className="shadow-2xl bg-base-200">
                        <table className="table-auto w-full ml-[20px]">
                          <tbody>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <IoMdTimer
                                  className="text-blue-500"
                                  size={30}
                                />
                                Date
                              </td>
                              <td className="w-1/2">
                                {new Date(
                                  selectedOrder.date
                                ).toLocaleDateString()}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <SlSizeActual className="text-green-500" />
                                Paper Size
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.paperSize}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <SiPowerpages className="text-yellow-500" />{" "}
                                Pages
                              </td>
                              <td className="w-1/2">{selectedOrder.pages}</td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <RiNumbersFill className="text-red-500" />
                                Quantity
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.quantity}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaBook className="text-purple-500" />
                                Binding Type
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.binding?.bindingType || "N/A"}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaCut className="text-blue-500" />
                                Cover Treatment Type
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.coverTreatment
                                  ?.coverTreatmentType || "N/A"}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaPaintBrush className="text-green-500" />
                                Inner Paper Type
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.innerPaper?.paperType || "N/A"}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaLayerGroup className="text-yellow-500" />
                                Inner Paper Thickness
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.innerPaperThickness || "N/A"}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaPaintBrush className="text-green-500" />
                                Outer Paper Type
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.outerPaper?.paperType || "N/A"}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaLayerGroup className="text-yellow-500" />
                                Outer Paper Thickness
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.outerPaperThickness || "N/A"}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaPrint className="text-red-500" />
                                Lamination Type
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.lamination?.laminationType ||
                                  "N/A"}
                              </td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaTint className="text-blue-500" />
                                Ink Type
                              </td>
                              <td className="w-1/2">{selectedOrder.inkType}</td>
                            </tr>
                            <tr
                              className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                              style={{ height: "50px" }}
                            >
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaComment className="text-purple-500" />
                                Remarks
                              </td>
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
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                                <FaUser className="text-yellow-500" />
                                Customer Name
                              </td>
                              <td className="w-1/2">
                                {selectedOrder.customer?.fullName || "N/A"}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
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
                <div className="flex gap-[67%]">
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
                      <div className="flex justify-end gap-[15px] mt-[-24px] ">
                        <button className="btn">Close</button>
                        <button className="btn" onClick={handleDone}>
                          Done
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default AdminDashboard;
