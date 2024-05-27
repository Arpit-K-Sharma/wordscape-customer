import React, { useState, useEffect } from "react";
import Menu from "./menu";
import { AiOutlineClockCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import { IoMdTimer } from "react-icons/io";
import { SlSizeActual } from "react-icons/sl";
import { SiPowerpages } from "react-icons/si";
import { RiNumbersFill } from "react-icons/ri";
import { FaBook } from 'react-icons/fa';
import { FaCut, FaPaintBrush, FaLayerGroup, FaPrint, FaTint, FaComment, FaUser } from 'react-icons/fa';

function UserOrder() {
    const [startDate, setStartDate] = useState(() => {
        const currentDate = new Date();
        const pastDate = new Date(currentDate.setDate(currentDate.getDate() - 30));
        return pastDate.toISOString().split("T")[0];
    });
    const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
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
                const response = await axios.get(`http://localhost:8081/orders/customer/${id}`);
                setOrderDetails(response.data);
                const d = response.data;
                let Pending = 0;
                let Approved = 0;
                let Completed = 0;
                for (let index = 0; index < d.length; index++) {
                    if (d[index].status === "PENDING") {
                        Pending++;
                    } if (d[index].status === "APPROVED") {
                        Approved++;
                    } if (d[index].status === "COMPLETED") {
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
    }

    return (
        <div className="font-archivo">
            <Menu />
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
                            <AiOutlineClockCircle size={35} color="white" className="ml-2" />
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
                            <AiOutlineCheckCircle size={35} color="white" className="ml-2" />
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
            <div className="overflow-y-auto w-[83%] h-[300px] ml-[9%] mt-[30px] shadow-xl rounded-lg">
                <table className="table">
                    <thead>
                        <tr className="bg-base-200 font-semibold text-[15px] text-slate-200">
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
                        {orderDetails && orderDetails.map((details) => (
                            <tr key={details.orderId}>
                                <td>{details.orderId}</td>
                                <td>{new Date(details.date).toLocaleDateString()}</td>
                                <td>{details.delivery ? new Date(details.delivery).toLocaleDateString() : 'N/A'}</td>
                                <td>{details.pages}</td>
                                <td>{details.quantity}</td>
                                <td>
                                    <button
                                        className="btn min-h-[30px] h-[40px]"
                                        onClick={() => handleViewDetails(details)}
                                    >
                                        View details
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn  min-h-[30px] h-[40px]"
                                        onClick={() => (document.getElementById("my_modal_1").showModal(),
                                            handleTracking(details.orderId))}
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
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <div className="p-4 w-80 min-h-full bg-base-100 pl-[20px] text-base-content w-[35%]  ">
                        <h1 className="text-3xl mb-4 mt-5 flex justify-center mb-6 ">All Details</h1>
                        {selectedOrder && (
                            <>
                            <div className="shadow-2xl bg-base-200"> 
                                <table className="table-auto w-full ml-[20px]">
                                    <tbody>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><IoMdTimer className="text-blue-500" size={30}/>Date</td>
                                            <td className="w-1/2">{new Date(selectedOrder.date).toLocaleDateString()}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><SlSizeActual className="text-green-500"/>Paper Size</td>
                                            <td className="w-1/2">{selectedOrder.paperSize}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><SiPowerpages className="text-yellow-500"/> Pages</td>
                                            <td className="w-1/2">{selectedOrder.pages}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><RiNumbersFill className="text-red-500" />Quantity</td>
                                            <td className="w-1/2">{selectedOrder.quantity}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaBook className="text-purple-500"/>Binding Type</td>
                                            <td className="w-1/2">{selectedOrder.binding.bindingType}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaCut className="text-blue-500" />Cover Treatment Type</td>
                                            <td className="w-1/2">{selectedOrder.coverTreatment.coverTreatmentType}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaPaintBrush className="text-green-500"/>Inner Paper Type</td>
                                            <td className="w-1/2">{selectedOrder.innerPaper.paperType}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaLayerGroup className="text-yellow-500"/>Inner Paper Thickness</td>
                                            <td className="w-1/2">{selectedOrder.innerPaperThickness}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaPaintBrush className="text-green-500" />Outer Paper Type</td>
                                            <td className="w-1/2">{selectedOrder.outerPaper.paperType}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaLayerGroup className="text-yellow-500"/>Outer Paper Thickness</td>
                                            <td className="w-1/2">{selectedOrder.outerPaperThickness}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaPrint className="text-red-500"/>Lamination Type</td>
                                            <td className="w-1/2">{selectedOrder.lamination.laminationType}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaTint className="text-blue-500"/>Ink Type</td>
                                            <td className="w-1/2">{selectedOrder.inkType}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg border-b-[0.5px] border-[#303031]" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaComment className="text-purple-500"/>Remarks</td>
                                            <td className="w-1/2">{selectedOrder.remarks ? selectedOrder.remarks : 'N/A'}</td>
                                        </tr>
                                        <tr className="mb-4 text-lg" style={{ height: "50px" }}>
                                            <td className="w-[100%] flex items-center gap-[10px] mt-[9px]"><FaUser className="text-yellow-500"/>Customer Name</td>
                                            <td className="w-1/2">{selectedOrder.customer.fullName}</td>
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
                <div className="modal-box overflow-hidden max-w-[900px]">
                    <div className="">
                        <ul className="steps w-[900px] mb-[20px]">
                            <li className={tracking.orderSlip ? "step step-primary" : "step"} data-content={tracking.orderSlip ? "✓" : null}>Order Slip</li>
                            <li className={tracking.jobCard ? "step step-primary" : "step"} data-content={tracking.jobCard ? "✓" : null}>Job Card</li>
                            <li className={tracking.paperCutting ? "step step-primary" : "step"} data-content={tracking.paperCutting ? "✓" : null}>Paper Cutting</li>
                            <li className={tracking.platePreparation ? "step step-primary" : "step"} data-content={tracking.platePreparation ? "✓" : null}>Plate Preparation</li>
                            <li className={tracking.printing ? "step step-primary" : "step"} data-content={tracking.printing ? "✓" : null}>Printing</li>
                            <li className={tracking.postPress ? "step step-primary" : "step"} data-content={tracking.postPress ? "✓" : null}>Post Press</li>
                            <li className={tracking.delivery ? "step step-primary" : "step"} data-content={tracking.delivery ? "✓" : null}>Delivery</li>
                            <li className={tracking.end ? "step step-primary" : "step"} data-content={tracking.end ? "✓" : null}>End</li>
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
