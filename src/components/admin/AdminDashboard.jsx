import { NavLink } from "react-router-dom";
import AdminDrawer from "./menu/AdminDrawer";
import React, { useState, useEffect, useRef } from "react";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import axios from "../axiosInstance";
import { isAdmin, isEmployee } from "../../utility/util";

import { useNavigate } from "react-router-dom";
import { FaClock, FaTimesCircle } from "react-icons/fa";
import OrderStatusList from "./orderStatus";

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
  const [order, setOrderid] = useState();
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
    const response = await axios.get(`/jobCard/${order}`);
    setSelectedOrder(response.data);
    console.log(response.data);
    document.getElementById("my-drawer-4").checked = true;
  };
  const [filteredOrderCost, setFilteredOrderCost] = useState();

  const handleViewDetail = async (id) => {
    const response = await axios.get(`/orders/${id}`);
    console.log(response.data);
    setFilteredOrderCost(response.data);
    document.getElementById("my-drawer-4").checked = true;
  };
  const dropdownRef = useRef(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // const id = localStorage.getItem("id");
    // console.log(id);

    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/orders?pageSize=5&sortField=date`);
        const allorder = response.data.response;

        setRecentOrders(allorder);
        setOrderDetails(allorder);
        setFilteredOrder(allorder.sort((a, b) => a.orderId - b.orderId));
        setFilteredOrderDetails(allorder);

        const d = allorder;
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
        console.log(allorder);
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
      await axios.put(`/orders/cancel/${id}`);
      console.log("Order Cancelled successfully");
    } catch (error) {
      console.error("Error Cancelling Order:", error);
    }
  };

  return (
    <div className="drawer  bg-gray-100 h-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn mx-1 my-1 drawer-button mt-8 ml-5 bg-gray-300 border-gray-100 text-[#201f1f] hover:bg-gray-200 hover:border-gray-100"
        >
          <img
            width="26"
            height="26"
            src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
            alt="menu--v1"
          />
          {/* <NavLink to="/admin/dashboard">
            <p className="text-xl">Menu</p>
          </NavLink> */}
        </label>
        {/* <div className="fixed mt-[15px] top-[-0.5px] left-[1100px] flex items-center px-4 py-2">
          <div className="alert alert-info bg-zinc-900 text-white border-0">
            <p>Logged in as: </p>
          </div>
        </div> */}

        <div className="max-sm:mr-[10%]">
          <div className="font-archivo">
            <div className="flex justify-center text-slate-200 mb-9">
              {isAdmin() ? (
                <h1 className="font-bold text-5xl max-sm:text-xl mx-auto text-blue-800">
                  Admin Dashboard
                </h1>
              ) : (
                <h1 className="font-bold text-5xl max-sm:text-xl mx-auto text-blue-800">
                  Employee Dashboard
                </h1>
              )}

              {/* <h2 className="font-bold text-4xl">Orders Summary</h2> */}
              {/* <div className="flex gap-5">
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
              </div> */}
            </div>

            <div className="flex flex-wrap justify-center max-sm:flex-col max-sm:items-center gap-8 mt-6">
              <div className="w-full sm:w-1/4 p-4 bg-white rounded-lg shadow-lg max-sm:max-w-xs">
                <div className="card h-48 bg-gradient-to-r from-blue-800 to-blue-400 rounded-lg">
                  <div className="card-body p-4 mt-4">
                    <a className="flex justify-center text-white mb-2 gap-[10px]">
                      <AiOutlineClockCircle size={25} className="mr-2" />
                      <h3 className="ard-title font-semibold text-lg">
                        {" "}
                        Pending Orders
                      </h3>
                    </a>
                    <h3 className="card-title flex justify-center text-gray-300 text-sm">
                      Waiting to be processed
                    </h3>
                    <div className="card-actions justify-center items-center bg-white bg-opacity-20 h-2/3 rounded-md mt-2">
                      <h2 className="text-3xl font-bold text-white">
                        {pending}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/4 p-4 bg-white rounded-lg shadow-lg max-sm:max-w-xs">
                <div className="card h-48 bg-gradient-to-r from-green-800 to-emerald-600 rounded-lg">
                  <div className="card-body p-4 mt-4">
                    <a className="flex justify-center text-white mb-2 gap-[10px]">
                      <AiOutlineCheckCircle size={25} className="mr-2" />
                      <h3 className="card-title font-semibold text-lg">
                        Approved Orders
                      </h3>
                    </a>
                    <h3 className="card-title flex justify-center text-gray-300 text-sm">
                      Verification Completed
                    </h3>
                    <div className="card-actions justify-center items-center bg-white bg-opacity-20 h-2/3 rounded-md mt-2">
                      <h2 className="text-3xl font-bold text-white">
                        {approved}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-1/4 p-4 bg-white rounded-lg shadow-lg max-sm:max-w-xs">
                <div className="card h-48 bg-gradient-to-r from-blue-800 to-purple-600 rounded-lg">
                  <div className="card-body p-4 mt-4">
                    <a className="flex justify-center text-white mb-2 gap-[10px]">
                      <FaCheckCircle size={22} className="mr-2" />
                      <h3 className="card-title font-semibold text-lg">
                        Completed Orders
                      </h3>
                    </a>
                    <h3 className="card-title flex justify-center text-gray-300 text-sm">
                      Order Finalized
                    </h3>
                    <div className="card-actions justify-center items-center bg-white bg-opacity-20 h-2/3 rounded-md mt-2">
                      <h2 className="text-3xl font-bold text-white">
                        {completed}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-[20px] mt-[30px]">
              <OrderStatusList orderDetails={orderDetails} />
              <div className="grid mt-[-8px] w-full lg:w-1/2">
                <div className="flex justify-end">
                  <h2
                    className="text-indigo-700 font-semibold hover:text-indigo-500 cursor-pointer"
                    onClick={(e) => navigate("/admin/orders")}
                  >
                    View all orders
                  </h2>
                </div>
                <div className="w-full h-[350px] bg-white mt-[5px] rounded-lg text-[#1c1b1b] p-4 overflow-auto mb-10">
                  <table className="w-full text-[13px] bg-white">
                    <thead>
                      <tr className="text-[16px] border-b border-[#d5d4d4] text-[#171717] h-[47px]">
                        <th className="w-[60px] pl-[15px] text-left">
                          Order ID
                        </th>
                        <th className="w-[100px] text-left">Date</th>
                        <th className="w-[150px] text-left">Delivery Date</th>
                        <th className="w-[150px] text-left">
                          Estimated Amount
                        </th>
                        <th className="w-[100px] text-left">Order Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders &&
                        recentOrders.map((details) => (
                          <tr
                            key={details.orderId}
                            className="hover:bg-gray-100 transition-colors duration-300 border-b truncate border-[#d5d4d4] text-[15px] text-gray-700"
                          >
                            <td className="h-[60px] pl-[15px]  text-left truncate">
                              {details.orderId}
                            </td>
                            <td className="h-[60px] text-left">
                              {new Date(details.date).toLocaleDateString()}
                            </td>
                            <td className="h-[60px] text-left">
                              {details.delivery && details.delivery.deliveryDate
                                ? new Date(
                                    details.delivery &&
                                      details.delivery.deliveryDate
                                  ).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td className="h-[60px] text-left pl-[15px]">
                              RS.{details.estimatedAmount}
                            </td>
                            <td className="h-[60px] pr-[10px] text-left">
                              <div className="flex gap-[10px] items-center">
                                {details.status === "PENDING" ? (
                                  <FaClock size={20} color="orange" />
                                ) : details.status === "APPROVED" ||
                                  details.status === "COMPLETED" ? (
                                  <FaCheckCircle size={20} color="green" />
                                ) : details.status === "CANCELED" ? (
                                  <FaTimesCircle size={20} color="red" />
                                ) : null}
                                {details.status}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default AdminDashboard;
