import React, { useState, useEffect, useRef } from "react";
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
import { useLocation } from "react-router-dom";
import AdminDrawer from "../admin/menu/AdminDrawer";

function NJobCard() {
  const location = useLocation();
  const { ordersId } = location.state || {};
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderId, setOrderId] = useState();
  const [filteredOrder, setFilteredOrder] = useState([]);
  const dropdownRef = useRef(null);

  const handleClick = () => {
    setOpen(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/orders")
      .then((response) => {
        setOrders(response.data);
        setFilteredOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  useEffect(() => {
    if (orders.length > 0 && ordersId) {
      handleOrderChange(ordersId);
    }
  }, [orders, ordersId]);

  const handleOrderChange = (id) => {
    setSelectedOrder(id);
    setOrderId(id);
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "none";
    }
    const filteredOrderWithId = orders.filter((order) => order.orderId === id);
    if (filteredOrderWithId.length > 0) {
      const name = filteredOrderWithId[0].customer;
      document.getElementById("input").value = name;
    } else {
      console.log("Order not found");
    }
  };

  const handleInput = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredOrders = orders.filter((order) =>
      order.customer.toLowerCase().startsWith(value)
    );
    setFilteredOrder(filteredOrders);
    if (dropdownRef.current) {
      dropdownRef.current.style.display = "block";
    }
  };

  return (
    <div>
      <AdminDrawer />
      <div className="grid h-screen grid-cols-2 font-archivo">
        <div className={open ? "xl:mr-[60%]" : null}>
          <h2 className="text-center w-[200px] xl:ml-[85%] mt-[25px] text-4xl font-extrabold">
            Job Card
          </h2>
          <h1 className="xl:ml-[85%] w-[200px] text-center mt-[20px] text-xl">
            Order Details
          </h1>
          <div className="flex gap-[20px]">
            <div className="dropdown xl:ml-[80%] mt-[10px] text-center">
              <label className="input input-bordered flex items-center gap-2">
                <input
                  tabIndex={0}
                  type="text"
                  className="grow"
                  placeholder="Search"
                  onChange={handleInput}
                  id="input"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-[20px] h-[20px] opacity-70"
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
                className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-[230px]"
              >
                {filteredOrder.map((order) => (
                  <li
                    key={order.orderId}
                    onClick={() => handleOrderChange(order.orderId)}
                  >
                    <a>{order.customer}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-[10px]">
              {orderId ? <JobcardMenu orderId={orderId} /> : null}
            </div>
          </div>
          <div className={open ? "xl:ml-[40%]" : "xl:ml-[70%]"}>
            <div
              onClick={handleClick}
              className="grid grid-cols-2 gap-x-[250px] gap-y-[50px]"
            >
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
