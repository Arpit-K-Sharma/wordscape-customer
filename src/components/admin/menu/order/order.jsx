import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminDrawer from "../AdminDrawer";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleViewInvoice = async (id) => {
    try {
      // Fetch invoice PDF using order ID
      const response = await axios.get(`http://localhost:8081/orders/${id}`, {
        responseType: "arraybuffer", // Ensure the response is treated as a binary array buffer
      });

      // Create Blob from response data
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Open PDF in a new window
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
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
            src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
            alt="menu--v1"
          />
        </label>
        <div>
          <div className="p-7 text-slate-200">
            <h1 className="text-center mx-auto text-5xl text-archivo mt-[-40px]">
              Orders
            </h1>
            <div className="overflow-x-auto mt-[80px]">
              <table className="table w-2/3 mx-auto my-auto">
                <thead>
                  <tr className="bg-base-200">
                    <th className="w-[50px]">Order ID</th>
                    <th className="w-[100px]">Date</th>
                    <th className="w-[100px]">Paper Size</th>
                    <th className="w-[80px]">Pages</th>
                    <th className="w-[80px]">Quantity</th>
                    <th className="w-[100px]">Binding Type</th>
                    <th className="w-[100px]">Cover Treatment Type</th>
                    <th className="w-[100px]">Inner Paper Type</th>
                    <th className="w-[80px]">Inner Paper Thickness</th>
                    <th className="w-[100px]">Outer Paper Type</th>
                    <th className="w-[80px]">Outer Paper Thickness</th>
                    <th className="w-[100px]">Lamination Type</th>
                    <th className="w-[100px]">Ink Type</th>
                    <th className="w-[100px]">Remarks</th>
                    <th className="w-[50px]">Customer Name</th>
                    <th className="w-[50px]">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="text-wrap">{order.orderId}</td>
                      <td className="text-wrap">{order.date}</td>
                      <td className="text-wrap">{order.paperSize}</td>
                      <td className="text-wrap">{order.pages}</td>
                      <td className="text-wrap">{order.quantity}</td>
                      <td className="text-wrap">{order.bindingType}</td>
                      <td className="text-wrap">{order.coverTreatmentType}</td>
                      <td className="text-wrap">{order.innerPaperType}</td>
                      <td className="text-wrap">{order.innerPaperThickness}</td>
                      <td className="text-wrap">{order.outerPaperType}</td>
                      <td className="text-wrap">{order.outerPaperThickness}</td>
                      <td className="text-wrap">{order.laminationType}</td>
                      <td className="text-wrap">{order.inkType}</td>
                      <td className="text-wrap">{order.remarks}</td>
                      <td className="text-wrap">{order.name}</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleViewInvoice(order.orderId)}
                        >
                          View Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default Orders;
