import React, { useState, useEffect } from "react";
import Menu from "./menu";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { IoMdTimer } from "react-icons/io";
import { SlSizeActual } from "react-icons/sl";
import { SiPowerpages } from "react-icons/si";
import { RiNumbersFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";

import { FaBook } from "react-icons/fa";
import { FaClock, FaTimesCircle } from "react-icons/fa";
import {
  FaCut,
  FaPaintBrush,
  FaLayerGroup,
  FaPrint,
  FaTint,
  FaComment,
  FaUser,
} from "react-icons/fa";

function UserOrder() {
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
    return pastDate.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const handleDownloadFile = async (orderId) => {
    console.log("the id is: " + orderId);
    try {
      const response = await axios.get(
        `http://localhost:8081/orders/files/download/${orderId}`, // Using customerId to construct the URL
        {
          responseType: "arraybuffer",
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState([]);
  const [tracking, setTracking] = useState([]);
  const [pending, setPending] = useState();
  const [approved, setApproved] = useState();
  const [completed, setCompleted] = useState();

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    document.getElementById("my-drawer-4").checked = true;
  };

  useEffect(() => {
    const id = localStorage.getItem("id");

    console.log(id);
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/orders/customer/${id}`
        );
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

  const handleTracking = (id) => {
    const tracking = orderDetails.find((order) => order.orderId == id);
    setTracking(tracking.projectTracking);
  };

  return (
    <div className="font-archivo">
      <Menu />

      <div className="flex flex-col items-center gap-5 mb-9 px-4 max-sm:text-center">
        <h1 className="font-bold text-5xl mt-5 max-sm:text-3xl text-blue-700">
          Orders Summary
        </h1>
        <div className="flex gap-5 max-sm:flex-col max-sm:items-center">
          <div className="w-[150px] max-sm:w-full">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="date"
                className="grow"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
          </div>
          <div className="w-[150px] max-sm:w-full">
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

      <div className="flex justify-center gap-[100px] mt-[20px] max-sm:flex-col max-sm:items-center max-sm:gap-8">
        <div className="card w-[300px] h-[300px] shadow-xl bg-base-200 bg-opacity-40 max-sm:w-[90%]">
          <div className="card-body p-[0.3rem] mt-[10%] mb-5">
            <a className="flex justify-center">
              <AiOutlineClockCircle size={35} color="orange" className="ml-2" />
              <h3 className="card-title font-semibold flex justify-center text-[20px] text-slate-900 pl-5">
                Pending Orders
              </h3>
            </a>
            <h3 className="card-title flex justify-center text-[grey] text-[17px]">
              Waiting to be processed
            </h3>
            <div className="card-actions justify-center items-center bg-yellow-600 b h-2/3 rounded-md ml-6 mr-6 mt-1">
              <h2 className="text-4xl font-bold text-white">{pending}</h2>
            </div>
          </div>
        </div>
        <div className="card w-[300px] h-[300px] shadow-xl bg-base-200 bg-opacity-40 max-sm:w-[90%]">
          <div className="card-body p-[0.3rem] mt-[10%] mb-5">
            <a className="flex justify-center">
              <AiOutlineCheckCircle size={35} color="green" className="ml-2" />
              <h3 className="card-title font-semibold flex justify-center text-[20px] text-slate-900 pl-5">
                Approved Orders
              </h3>
            </a>
            <h3 className="card-title flex justify-center text-[grey] text-[17px]">
              Verification Completed
            </h3>
            <div className="card-actions justify-center items-center bg-green-700 h-2/3 rounded-md ml-6 mr-6 mt-1">
              <h2 className="text-4xl text-white font-bold">{approved}</h2>
            </div>
          </div>
        </div>
        <div className="card w-[300px] h-[300px] shadow-xl bg-base-200 bg-opacity-40 max-sm:w-[90%]">
          <div className="card-body p-[0.3rem] mt-[10%] mb-5">
            <a className="flex justify-center">
              <FaCheckCircle size={32} color="green" className="ml-2" />
              <h3 className="card-title font-semibold flex justify-center text-[20px] text-slate-900 pl-5">
                Completed Orders
              </h3>
            </a>
            <h3 className="card-title flex justify-center text-[grey] text-[17px]">
              Order Finalized
            </h3>
            <div className="card-actions justify-center items-center bg-blue-600 h-2/3 rounded-md ml-6 mr-6 mt-1">
              <h2 className="text-4xl font-bold text-white">{completed}</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-5 text-slate-900 mt-[30px] mb-9 max-sm:text-center">
        <h1 className="font-bold text-4xl max-sm:text-3xl">Order Status</h1>
      </div>

      <div className="overflow-x-auto w-[83%] h-[300px] ml-[9%] mb-[5%] mt-[10px] shadow-xl rounded-lg max-sm:w-[95%] max-sm:ml-[2.5%] max-sm:h-[400px]">
        <table className="table w-full">
          <thead>
            <tr className="bg-zinc-700 text-white font-semibold text-[15px] text-slate-800">
              <th>Order ID</th>
              <th>Date</th>
              <th>Delivery</th>
              <th>Pages</th>
              <th>Qty</th>
              <th>File</th>
              <th>Details</th>
              <th>Track</th>
              <th>Status</th>
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
                      className="btn min-h-[30px] h-[40px] max-sm:btn-sm"
                      onClick={() => handleDownloadFile(details.orderId)}
                    >
                      Download
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn min-h-[30px] h-[40px] max-sm:btn-sm"
                      onClick={() => handleViewDetails(details)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn min-h-[30px] h-[40px] max-sm:btn-sm"
                      onClick={() => (
                        document.getElementById("my_modal_1").showModal(),
                        handleTracking(details.orderId)
                      )}
                    >
                      Track
                    </button>
                  </td>

                  <td>
                    <a
                      className={
                        details.status == "PENDING"
                          ? "bg-blue-400 p-[6px] rounded-[5px] w-[100px] flex gap-[5px] font-bold text-[white] max-sm:w-[80px]"
                          : details.status == "APPROVED" ||
                            details.status == "COMPLETED"
                          ? "bg-[#155415] p-[6px] rounded-[5px] w-[100px] flex gap-[5px] max-sm:w-[80px]"
                          : details.status == "CANCELED"
                          ? "bg-[red] p-[6px] rounded-[5px] w-[100px] flex gap-[5px] text-white font-bold max-sm:w-[80px]"
                          : null
                      }
                    >
                      {details.status == "PENDING" ? (
                        <FaClock size={16} />
                      ) : details.status == "APPROVED" ||
                        details.status == "COMPLETED" ? (
                        <FaCheckCircle size={16} />
                      ) : details.status == "CANCELED" ? (
                        <FaTimesCircle size={16} />
                      ) : null}
                      <span className="max-sm:text-xs">{details.status}</span>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="drawer drawer-end ">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div className="p-4 w-80 min-h-full bg-base-100 pl-[20px] text-base-content w-[35%] max-sm:w-full">
            <h1 className="text-3xl mb-4 mt-5 flex justify-center mb-6 ">
              All Details
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
                          <IoMdTimer className="text-blue-500" size={30} />
                          Date
                        </td>
                        <td className="w-1/2">
                          {new Date(selectedOrder.date).toLocaleDateString()}
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
                        <td className="w-1/2">{selectedOrder.paperSize}</td>
                      </tr>
                      <tr
                        className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                        style={{ height: "50px" }}
                      >
                        <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                          <SiPowerpages className="text-yellow-500" /> Pages
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
                        <td className="w-1/2">{selectedOrder.quantity}</td>
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
                          {selectedOrder.binding.bindingType}
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
                          {selectedOrder.coverTreatment.coverTreatmentType}
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
                          {selectedOrder.innerPaper.paperType}
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
                          {selectedOrder.innerPaperThickness}
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
                          {selectedOrder.outerPaper.paperType}
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
                          {selectedOrder.outerPaperThickness}
                        </td>
                      </tr>
                      <tr
                        className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                        style={{ height: "50px" }}
                      >
                        <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                          <FaPrint className="text-red-500" />
                          Inner Lamination Type
                        </td>
                        <td className="w-1/2">
                          {selectedOrder.innerLamination.laminationType}
                        </td>
                      </tr>
                      <tr
                        className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                        style={{ height: "50px" }}
                      >
                        <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                          <FaPrint className="text-blue-500" />
                          Outer Lamination Type
                        </td>
                        <td className="w-1/2">
                          {selectedOrder.outerLamination.laminationType}
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
                        className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                        style={{ height: "50px" }}
                      >
                        <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                          <FaCar className="text-blue-500" />
                          Delivery Option
                        </td>
                        <td className="w-1/2">
                          {selectedOrder.deliveryOption
                            ? selectedOrder.deliveryOption
                            : "N/A"}
                        </td>
                      </tr>

                      <tr
                        className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                        style={{ height: "50px" }}
                      >
                        <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                          <FaCalendarCheck className="text-red-500" />
                          Deadline
                        </td>
                        <td className="w-1/2">
                          {selectedOrder.deadline
                            ? new Date(
                                selectedOrder.deadline
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                      <tr className="mb-4 text-lg" style={{ height: "50px" }}>
                        <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                          <FaUser className="text-yellow-500" />
                          Customer Name
                        </td>
                        <td className="w-1/2">
                          {selectedOrder.customer.fullName}
                        </td>
                      </tr>
                      <tr className="mb-4 text-lg" style={{ height: "50px" }}>
                        <td className="w-1/2 flex justify-between items-center">
                          {selectedOrder.customer.fullName}
                          <button
                            className="btn btn-primary ml-4"
                            onClick={handleDownloadFile}
                          >
                            Download Customer File
                          </button>
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
        <div className="modal-box overflow-hidden max-w-[55%]">
          <div className="">
            <ul className="steps w-[100%] mb-[20px]">
              <li
                className={tracking.orderSlip ? "step step-primary" : "step"}
                data-content={tracking.orderSlip ? "✓" : null}
              >
                Order Slip
              </li>
              <li
                className={tracking.jobCard ? "step step-primary" : "step"}
                data-content={tracking.jobCard ? "✓" : null}
              >
                Job Card
              </li>
              <li
                className={tracking.paperCutting ? "step step-primary" : "step"}
                data-content={tracking.paperCutting ? "✓" : null}
              >
                Paper Cutting
              </li>
              <li
                className={
                  tracking.platePreparation ? "step step-primary" : "step"
                }
                data-content={tracking.platePreparation ? "✓" : null}
              >
                Plate Preparation
              </li>
              <li
                className={tracking.printing ? "step step-primary" : "step"}
                data-content={tracking.printing ? "✓" : null}
              >
                Printing
              </li>
              <li
                className={tracking.postPress ? "step step-primary" : "step"}
                data-content={tracking.postPress ? "✓" : null}
              >
                Post Press
              </li>
              <li
                className={tracking.delivery ? "step step-primary" : "step"}
                data-content={tracking.delivery ? "✓" : null}
              >
                Delivery
              </li>
              <li
                className={tracking.invoice ? "step step-primary" : "step"}
                data-content={tracking.invoice ? "✓" : null}
              >
                Invoice
              </li>
              <li
                className={tracking.end ? "step step-primary" : "step"}
                data-content={tracking.end ? "✓" : null}
              >
                End
              </li>
            </ul>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default UserOrder;
