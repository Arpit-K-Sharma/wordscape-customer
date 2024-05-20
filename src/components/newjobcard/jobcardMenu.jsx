import React, { useEffect, useState } from 'react';
import axios from 'axios';

function JobcardMenu({ orderId }) {
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/orders/${orderId}`);
                console.log(response.data);
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    return (
        <div className="drawer w-[200px]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn drawer-button ">Order Detail</label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="p-4 w-80 min-h-full bg-base-200 pl-[20px] text-base-content">
                    <h1 className="text-3xl mb-4 mt-5 ">Order Details</h1>
                    {orderDetails ? (
                        <table className="table-auto w-full">
                            <tbody className=''>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Date</td>
                                    <td className="w-1/2">{orderDetails.date}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Paper Size</td>
                                    <td className="w-1/2">{orderDetails.paperSize}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Pages</td>
                                    <td className="w-1/2">{orderDetails.pages}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Quantity</td>
                                    <td className="w-1/2">{orderDetails.quantity}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Binding Type</td>
                                    <td className="w-1/2">{orderDetails.bindingType}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Cover Treatment Type</td>
                                    <td className="w-1/2">{orderDetails.coverTreatmentType}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Inner Paper Type</td>
                                    <td className="w-1/2">{orderDetails.innerPaperType}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Inner Paper Thickness</td>
                                    <td className="w-1/2">{orderDetails.innerPaperThickness}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Outer Paper Type</td>
                                    <td className="w-1/2">{orderDetails.outerPaperType}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Outer Paper Thickness</td>
                                    <td className="w-1/2">{orderDetails.outerPaperThickness}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Lamination Type</td>
                                    <td className="w-1/2">{orderDetails.laminationType}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Ink Type</td>
                                    <td className="w-1/2">{orderDetails.inkType}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Remarks</td>
                                    <td className="w-1/2">{orderDetails.remarks}</td>
                                </tr>
                                <tr className="mb-4 text-lg" style={{ height: '50px' }}>
                                    <td className="w-1/2">Customer Name</td>
                                    <td className="w-1/2">{orderDetails.name}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JobcardMenu;
