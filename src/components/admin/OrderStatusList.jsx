import React, { useEffect, useState } from "react";
import axios from "axios";

function OrderStatusList({ orderDetails }) {
  const [trackingData, setTrackingData] = useState({});
  const pollingInterval = 5000; // Poll every 5000 milliseconds (5 seconds)

  useEffect(() => {
    const fetchTrackingData = async () => {
      const trackingResults = {};
      for (const order of orderDetails) {
        try {
          const response = await axios.get(
            `http://localhost:8081/projectTracking/${order.orderId}`
          );
          const data = response.data;
          trackingResults[order.orderId] = getLastCompletedStage(data);
        } catch (error) {
          console.error(
            `Error fetching tracking data for order ${order.orderId}:`,
            error
          );
        }
      }
      setTrackingData(trackingResults);
    };

    fetchTrackingData(); // Initial fetch

    const intervalId = setInterval(fetchTrackingData, pollingInterval); // Set up polling

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, [orderDetails]);

  function getLastCompletedStage(data) {
    const stages = [
      { key: "orderSlip", label: "Order Slip" },
      { key: "jobCard", label: "Job Card" },
      { key: "paperCutting", label: "Paper Cutting" },
      { key: "platePreparation", label: "Plate Preparation" },
      { key: "printing", label: "Printing" },
      { key: "postPress", label: "Post Press" },
      { key: "delivery", label: "Delivery" },
      { key: "end", label: "End" },
    ];

    for (let i = stages.length - 1; i >= 0; i--) {
      if (data[stages[i].key]) {
        return stages[i].label;
      }
    }
    return "Not Started";
  }

  return (
    <div className="flex flex-col items-center justify-center mt-8 w-full px-4 lg:px-20">
      <div className="w-3/4 overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Order ID</th>
              <th>Tracking Stage</th>
              {/* <th>Current Status</th> */}
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((order) => (
              <tr key={order.orderId}>
                <td>{order.customer || "N/A"}</td>
                <td>{order.orderId}</td>
                <td>{trackingData[order.orderId] || "Loading..."}</td>
                {/* <td>
                  <div className="badge badge-secondary">
                    {order.currentStatus || "Unknown"}
                  </div>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderStatusList;
