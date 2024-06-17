import React, { useEffect, useState } from "react";
import axios from "../../components/axiosInstance";
import Avatar from "react-avatar";

function OrderStatusList({ orderDetails }) {
  const [trackingData, setTrackingData] = useState({});
  const pollingInterval = 5000; // Poll every 5000 milliseconds (5 seconds)

  useEffect(() => {
    const fetchTrackingData = async () => {
      const trackingResults = {};
      for (const order of orderDetails) {
        try {
          const response = await axios.get(
            `/projectTracking/${order.orderId}`
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

  const sortedOrderDetails = [...orderDetails]
    .sort((a, b) => a.orderId - b.orderId)
    .slice(0, 2);

  return (
    <>
      <div className="w-1/2 h-[350px] bg-white rounded-lg ml-[10%] mt-[20px] text-[#1c1b1b] p-4">
        <table className="min-w-full">
          <thead>
            <tr className="font-medium text-[16px] h-[47px] border-b border-gray-200 text-left">
              <th className="w-[270px] pl-[10px]">Customer Name</th>
              <th className="w-[100px]">Order Id</th>
              <th className="w-[150px]">Tracking Stage</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrderDetails.map((order) => (
              <tr
                key={order.orderId}
                className="border-b border-gray-200 hover:bg-gray-100 text-gray-700"
              >
                <td className="flex items-center gap-[10px] h-[60px]">
                  <Avatar
                    name={order.customer || "N/A"}
                    size="40"
                    round={true}
                    color="#990aff"
                    className="m-3 mb-[5px] mt-[2px] ml-[3px]"
                  />
                  <div className="grid mb-[5px] mt-[5px]">
                    <span>{order.customer || "N/A"}</span>
                  </div>
                </td>
                <td>
                  <h4>#{order.orderId}</h4>
                </td>
                <td>
                  <h3>{trackingData[order.orderId] || "Loading..."}</h3>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderStatusList;
