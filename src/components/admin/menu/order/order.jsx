import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
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
import { FaClock, FaTimesCircle } from "react-icons/fa";

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
  const [recentSteps, setRecentSteps] = useState([
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
  const [lastOrderStatus, setLastOrderStatus] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [currentProcess, setCurrentProcess] = useState("");
  const [recentId, setRecentId] = useState();

  useEffect(() => {
    const recentOrder = orderDetails[orderDetails.length - 1];
    setLastOrder(recentOrder);

    const activeStep = steps.reduce((lastActiveIndex, step, index) => {
      if (step.active) {
        return index;
      }
      return lastActiveIndex;
    }, -1);

    setCurrentProcess(steps[activeStep]?.name || "");
  }, [orderDetails, steps]);

  useEffect(() => {
    const lastOrder = orderDetails[orderDetails.length - 1];
    if (lastOrder) {
      setLastOrderStatus(lastOrder.status);
      setCustomerName(lastOrder.customerName);
    }
  }, [orderDetails]);

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
        const allorder = response.data;
        const recentOrder = allorder.reduce((maxOrder, order) => {
          return order.orderId > (maxOrder?.orderId || 0) ? order : maxOrder;
        }, null);

        handleRecentTracking(recentOrder.orderId);
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
  const handleRecentTracking = async (id) => {
    setRecentId(id);
    try {
      const response = await axios.get(
        `http://localhost:8081/projectTracking/${id}`
      );
      const trackingData = response.data;

      const updatedSteps = recentSteps.map((step) => ({
        ...step,
        active: trackingData[step.key],
      }));
      console.log(updatedSteps);
      setRecentSteps(updatedSteps);
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    }
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
    if (orderid == recentId) {
      setRecentSteps((prevSteps) => {
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
    if (orderid == recentId) {
      setRecentSteps((prevSteps) => {
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
    }
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
  const handleCancel = async (id) => {
    try {
      await axios.put(`http://localhost:8081/orders/cancel/${id}`);
      console.log("Order Cancelled successfully");
    } catch (error) {
      console.error("Error Cancelling Order:", error);
    }
  };
  const handleViewInvoice = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/orders/invoice/${id}`, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  return (
    <div className="drawer h-screen bg-gray-100">
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
        <div className="max-sm:mr-[10%]">
          <div className="font-archivo">
            <div className="dropdown xl:ml-[5%] mt-[30px] p-4 text-center w-[300px] bg-white border border-gray-300 rounded-lg shadow-md">
              <label className="input input-bordered flex items-center gap-2 bg-white border border-white rounded-lg">
                <input
                  tabIndex={0}
                  type="text"
                  className="grow bg-white text-[black]"
                  placeholder="Search"
                  onChange={handleInput}
                  id="input"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-[20px] h-[20px] text-gray-700 opacity-70"
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
                className="dropdown-content z-[1] menu p-2 shadow bg-white border border-gray-300 rounded-box w-[220px]"
              >
                {filteredOrder.map((order) => (
                  <li
                    key={order.orderId}
                    onClick={() => handleOrderChange(order.orderId, order.customer)}
                  >
                    <a className="text-[black]">{order.customer}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-y-auto w-[90%] h-[100%] ml-[5%] mt-[10px] shadow-xl rounded-lg font-medium text mb-[20px]">
              <div className="overflow-x-auto w-full">
                <table className="table w-full text-[13px]">
                  {/* head */}
                  <thead>
                    <tr className="bg-white text-[16px] border-[#d5d4d4] text-gray-700">
                      <th className="">
                        Order ID
                      </th>
                      <th className="">Date</th>
                      <th className="">
                        Delivery Date
                      </th>
                      <th className="">Pages</th>
                      <th className="">
                        Quantity
                      </th>
                      <th className=" w-[200px]">
                        Order Details
                      </th>
                      <th className=" w-[200px]">
                        Job Card
                      </th>
                      <th className=" w-[200px]">
                        View Tracking
                      </th>
                      <th className=" w-[200px]">
                        Status
                      </th>
                      <th className=" w-[200px]">
                        View Invoice
                      </th>

                      <th className=" w-[200px]">
                        Cancel Order
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrderDetails &&
                      filteredOrderDetails.map((details) => (
                        <tr
                          key={details.orderId}
                          className="hover:bg-gray-100 bg-white transition-colors duration-300 border-[#d5d4d4] text-[15px] text-gray-700"
                        >
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
                              className="bg-gray-200 hover:bg-gray-300 p-[10px] rounded-[5px] font-bold w-[107px]"
                              onClick={() => handleViewDetails(details.orderId)}
                            >
                              View details
                            </button>
                          </td>
                          <td>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 p-[10px] rounded-[5px] font-bold w-[83px]"
                              onClick={(e) => handleJobCard(details.orderId)}
                            >
                              Job card
                            </button>
                          </td>
                          <td>
                            <button
                              className="bg-gray-200 hover:bg-gray-300 p-[10px] rounded-[5px] font-bold ml-5 w-[73px]"
                              onClick={() => {
                                handleTracking(details.orderId),
                                  setOrderid(details.orderId);
                              }}
                            >
                              Track It
                            </button>
                          </td>
                          <td>
                            <div className="flex gap-[10px]">
                              {details.status === "PENDING" ? (
                                <FaClock className="mr-2" size={20} color="orange" />
                              ) : details.status === "APPROVED" ||
                                details.status === "COMPLETED" ? (
                                <FaCheckCircle className="mr-2" size={20} color="green" />
                              ) : details.status === "CANCELED" ? (
                                <FaTimesCircle className="mr-2" size={20} color="red" />
                              ) : null}
                              {details.status}
                            </div>
                          </td>
                          <td>
                            <button
                              className=" bg-gray-200 hover:bg-gray-300 p-[10px] rounded-[5px] font-bold ml-5 w-[111px]"
                              onClick={() => handleViewInvoice(details.orderId)}
                            >
                              View Invoice
                            </button>
                          </td>
                          <td className="flex justify-center">
                            <button className=" text-indigo-500 hover:text-[red] mt-[10px]" onClick={(e) => { handleCancel(details.orderId); }}>
                              <FaTrash size={20} />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="drawer drawer-end ">
              <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-side">
                <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                <div className="p-4 w-80 min-h-full bg-white pl-[20px] text-gray-800 w-[35%]">
                  <h1 className="text-3xl mb-4 mt-5 flex justify-center text-gray-800">
                    Order Details
                  </h1>
                  {selectedOrder && (
                    <>
                      <div className="shadow-2xl bg-white border border-gray-300 rounded-lg mt-[20px]">
                        <table className="table-auto w-full ml-[20px]">
                          <tbody>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <IoMdTimer className="text-gray-600" size={30} />
                                Date
                              </td>
                              <td className="w-1/2 text-gray-600">
                                {new Date(selectedOrder.date).toLocaleDateString()}
                              </td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <SlSizeActual className="text-gray-600" />
                                Paper Size
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.paperSize}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <SiPowerpages className="text-gray-600" />
                                Pages
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.pages}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <RiNumbersFill className="text-gray-600" />
                                Quantity
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.quantity}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaBook className="text-gray-600" />
                                Binding Type
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.binding?.bindingType || "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaCut className="text-gray-600" />
                                Cover Treatment Type
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.coverTreatment?.coverTreatmentType || "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaPaintBrush className="text-gray-600" />
                                Inner Paper Type
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.innerPaper?.paperType || "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaLayerGroup className="text-gray-600" />
                                Inner Paper Thickness
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.innerPaperThickness || "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaPaintBrush className="text-gray-600" />
                                Outer Paper Type
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.outerPaper?.paperType || "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaLayerGroup className="text-gray-600" />
                                Outer Paper Thickness
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.outerPaperThickness || "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaPrint className="text-gray-600" />
                                Lamination Type
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.lamination?.laminationType || "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaTint className="text-gray-600" />
                                Ink Type
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.inkType}</td>
                            </tr>
                            <tr className="mb-4 text-lg border-b border-gray-300" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaComment className="text-gray-600" />
                                Remarks
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.remarks ? selectedOrder.remarks : "N/A"}</td>
                            </tr>
                            <tr className="mb-4 text-lg" style={{ height: "50px" }}>
                              <td className="w-[100%] flex items-center gap-[10px] mt-[9px] text-gray-800">
                                <FaUser className="text-gray-600" />
                                Customer Name
                              </td>
                              <td className="w-1/2 text-gray-600">{selectedOrder.customer?.fullName || "N/A"}</td>
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
              <div className="modal-box overflow-hidden max-w-[64%] bg-white text-gray-800">
                <div>
                  <ul className="steps w-[900px] mb-[20px]">
                    {steps.map((step, index) => (
                      <li
                        key={index}
                        className={` step  ${step.active ? "step-primary text-[black]" : "text-[gray] step-neutral"}`}
                        data-content={step.active ? "✓" : null}
                        
                      >
                        {step.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-[67%]">
                  <div className="flex gap-[20px] justify-end">
                    <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 border-[white] hover:border-[white]" onClick={handleBack}>
                      Back
                    </button>
                    <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 border-[white] hover:border-[white]" onClick={handleNext}>
                      Next
                    </button>
                  </div>
                  <div className="modal-action">
                    <form method="dialog">
                      <div className="flex justify-end gap-[15px] mt-[-24px]">
                        <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 border-[white] hover:border-[white]">Close</button>
                        <button className="btn bg-gray-200 text-gray-800 hover:bg-gray-300 border-[white] hover:border-[white]" onClick={handleDone}>
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