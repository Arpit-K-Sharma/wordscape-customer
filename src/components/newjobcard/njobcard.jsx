import React, { useState, useEffect } from "react";
import PaymentTable from "./paymentTable";
import DeliveryDetail from "./deliverydetail";
import PressUnit from "./prepressunit";
import PaperDetail from "./paperdetail";
import PlateDetail from "./platedetail";
import PaperUnit from "./paperunit";
import Bindery from "./bindery";
import PressUnits from "./pressunit";
import JobcardMenu from "./jobcardMenu";
import axios from "axios";

function NJobCard() {
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderId, setOrderId] = useState();

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const handleOrderChange = (event) => {
    const selectedOrderId = event.target.value;
    setSelectedOrder(selectedOrderId);
    setOrderId(selectedOrderId);
  };

  return (
    <div>
      <div className="grid h-screen grid-cols-2 font-archivo">
        <div className={open ? 'xl:mr-[60%]' : null}>
          <h2 className="text-center w-[200px] xl:ml-[85%] mt-[25px] text-4xl font-extrabold">
            Job Card
          </h2>
          <h1 className="xl:ml-[85%] w-[200px] text-center mt-[20px] text-xl">Order Details</h1>
          <div className="flex gap-[20px]">
          <h1 className="xl:ml-[85%] mt-[10px] text-center text-l">
            <select
              value={selectedOrder}
              onChange={handleOrderChange}
              className="select select-bordered w-[200px] max-w-xs"
            >
              <option value="">Select an order</option>
              {orders.map((order) => (
                <option key={order.orderId} value={order.orderId}>
                  {order.orderId}
                </option>
              ))}
            </select>
          </h1>
          <div className="mt-[10px]">
          {orderId ? <JobcardMenu orderId={orderId} /> : null}
          </div>
          </div>
          <div className={open ? 'xl:ml-[40%]' : "xl:ml-[70%]"}>
            <div onClick={handleClick} className="grid grid-cols-2 gap-x-[250px] gap-y-[50px]">
              <PaymentTable />
              <DeliveryDetail />
              <PressUnit />
              <PaperDetail />
              <PlateDetail />
              <PaperUnit />
              <Bindery />
              <PressUnits />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NJobCard;
