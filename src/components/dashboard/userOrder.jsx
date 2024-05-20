import React, { useState, useEffect } from 'react';
import Menu from './menu';
import { AiOutlineClockCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';

function UserOrder() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [ordersDetail, setOrdersDetail] = useState([]);

    const orderDetails = {
        date: "2024-05-16T08:38:01.928+00:00",
        paperSize: "A4",
        pages: 100,
        quantity: 50,
        bindingType: "Center Stitch",
        coverTreatmentType: "Die Cutting",
        innerPaperType: "Art_Paper",
        innerPaperThickness: 120,
        outerPaperType: "Art_Board",
        outerPaperThickness: 200,
        laminationType: "Normal Glossy",
        inkType: "CMYK",
        remarks: "Sample order 1",
        customerName: "John Doe"
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
        document.getElementById("my-drawer-4").checked = true;
    };

    useEffect(() => {
        const id = localStorage.getItem('id');
        console.log(id);
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/orders/customer/${id}`);
                setOrdersDetail(response.data);
                console.log(response.data); 
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, []); 

    return (
        <>
            <Menu />
            <div className='flex justify-center text-5xl '>
                <h1>Orders</h1>
            </div>
            <div className='flex justify-center gap-[100px] mt-[20px]'>
                <div className="card w-[300px] h-[200px] shadow-xl bg-base-200 bg-opacity-40 ">
                    <div className="card-body p-[0.3rem] mt-[10%] mb-5">
                        <a className='flex justify-center'><AiOutlineClockCircle size={35} color="white" className="ml-2" /></a>
                        <h3 className="card-title flex justify-center text-[grey] text-[17px]">Pending Orders</h3>
                        <div className="card-actions justify-center items-center">
                            <h2 className='text-4xl'>1</h2>
                        </div>
                    </div>
                </div>
                <div className="card w-[300px] h-[200px] shadow-xl bg-base-200 bg-opacity-40 ">
                    <div className="card-body p-[0.3rem] mt-[10%] mb-5">
                        <a className='flex justify-center'><AiOutlineCheckCircle size={35} color="white" className="ml-2" /></a>
                        <h3 className="card-title flex justify-center text-[grey] text-[17px]">Approved Orders</h3>
                        <div className="card-actions justify-center items-center">
                            <h2 className='text-4xl'>1</h2>
                        </div>
                    </div>
                </div>
                <div className="card w-[300px] h-[200px] shadow-xl bg-base-200 bg-opacity-40 ">
                    <div className="card-body p-[0.3rem] pt-[10px] mt-[10%] mb-5">
                        <a className='flex justify-center'><FaCheckCircle size={32} color="white" className="ml-2" /></a>
                        <h3 className="card-title flex justify-center text-[grey] text-[17px]">Completed Orders </h3>
                        <div className="card-actions justify-center items-center">
                            <h2 className='text-4xl'>1</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-[70px] ml-[13%] flex gap-5'>
                <div className='w-[200px]'>
                    <label>From: </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <input
                            type="date"
                            className="grow"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                </div>
                <div className='w-[200px]'>
                    <label>To: </label>
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
            <div className="overflow-y-auto w-[75%] h-[300px] ml-[13%] mt-[10px]">
                <table className="table">
                    <thead>
                        <tr className='border border-gray-400 bg-base-200'>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Delivery Date</th>
                            <th>Pages</th>
                            <th>Quantity</th>
                            <th className='w-[200px]'>All Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2024-05-16</td>
                            <td>-- --</td>
                            <td>100</td>
                            <td>50</td>
                            <td><button className='btn min-h-[30px] h-[40px]' onClick={() => handleViewDetails(orderDetails)}>View details</button></td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>2023-05-17</td>
                            <td>-- --</td>
                            <td>50</td>
                            <td>30</td>
                            <td><button className='btn min-h-[30px] h-[40px]'>View details</button></td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>2023-05-18</td>
                            <td>-- --</td>
                            <td>200</td>
                            <td>100</td>
                            <td><button className='btn min-h-[30px] h-[40px]'>View details</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="drawer drawer-end">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
                    <div className="p-4 w-80 min-h-full bg-base-200 pl-[20px] text-base-content">
                        <h1 className="text-3xl mb-4 mt-5 ">All Details</h1>
                        {selectedOrder && (
                            <table className="table-auto w-full">
                                <tbody>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Date</td>
                                        <td className="w-1/2">{selectedOrder.date}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Paper Size</td>
                                        <td className="w-1/2">{selectedOrder.paperSize}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Pages</td>
                                        <td className="w-1/2">{selectedOrder.pages}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Quantity</td>
                                        <td className="w-1/2">{selectedOrder.quantity}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Binding Type</td>
                                        <td className="w-1/2">{selectedOrder.bindingType}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Cover Treatment Type</td>
                                        <td className="w-1/2">{selectedOrder.coverTreatmentType}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Inner Paper Type</td>
                                        <td className="w-1/2">{selectedOrder.innerPaperType}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Inner Paper Thickness</td>
                                        <td className="w-1/2">{selectedOrder.innerPaperThickness}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Outer Paper Type</td>
                                        <td className="w-1/2">{selectedOrder.outerPaperType}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Outer Paper Thickness</td>
                                        <td className="w-1/2">{selectedOrder.outerPaperThickness}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Lamination Type</td>
                                        <td className="w-1/2">{selectedOrder.laminationType}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Ink Type</td>
                                        <td className="w-1/2">{selectedOrder.inkType}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Remarks</td>
                                        <td className="w-1/2">{selectedOrder.remarks}</td>
                                    </tr>
                                    <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                        <td className="w-1/2">Customer Name</td>
                                        <td className="w-1/2">{selectedOrder.customerName}</td> {/* Corrected property name */}
                                    </tr>
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserOrder;
