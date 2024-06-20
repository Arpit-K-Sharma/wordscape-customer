import React, { useEffect, useState } from "react";
import axios from "../../axiosInstance";
import { IoMdTimer } from "react-icons/io";
import { SlSizeActual } from "react-icons/sl";
import { SiPowerpages } from "react-icons/si";
import { RiNumbersFill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import {
  FaCut,
  FaPaintBrush,
  FaLayerGroup,
  FaPrint,
  FaTint,
  FaComment,
  FaUser,
} from "react-icons/fa";
import './jobcard.css';

function JobcardMenu({ orderId }) {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `/orders/${orderId}`
        );
        console.log(response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  return (
    <div className="drawer w-[200px] relative">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle hidden" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="btn drawer-button ">
          Order Details
        </label>
      </div>
      <div className="order-details-drawer">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="p-4 w-80 min-h-full bg-base-100 text-base-content w-[38%]">
          
          {orderDetails ? (
            <div className="shadow-2xl bg-base-200 ml-[20px] w-[92%] pl-[20px] h-screen">
              <table className="table-auto w-full mr-[20px] ">
                <tbody>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031] "
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <IoMdTimer className="text-gray-600" size={30} />
                      Date
                    </td>
                    <td className="w-1/2">
                      {new Date(orderDetails.date).toLocaleDateString()}
                    </td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <SlSizeActual className="text-gray-600" />
                      Paper Size
                    </td>
                    <td className="w-1/2">{orderDetails.paperSize}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <SiPowerpages className="text-gray-600" /> Pages
                    </td>
                    <td className="w-1/2">{orderDetails.pages}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <RiNumbersFill className="text-gray-600" />
                      Quantity
                    </td>
                    <td className="w-1/2">{orderDetails.quantity}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaBook className="text-gray-600" />
                      Binding Type
                    </td>
                    <td className="w-1/2">{orderDetails.bindingType}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaCut className="ttext-gray-600" />
                      Cover Treatment Type
                    </td>
                    <td className="w-1/2">{orderDetails.coverTreatmentType}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaPaintBrush className="text-gray-600" />
                      Inner Paper Type
                    </td>
                    <td className="w-1/2">{orderDetails.innerPaperType}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaLayerGroup className="text-gray-600" />
                      Inner Paper Thickness
                    </td>
                    <td className="w-1/2">
                      {orderDetails.innerPaperThickness}
                    </td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaPaintBrush className="text-gray-600" />
                      Outer Paper Type
                    </td>
                    <td className="w-1/2">{orderDetails.outerPaperType}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaLayerGroup className="text-gray-600" />
                      Outer Paper Thickness
                    </td>
                    <td className="w-1/2">
                      {orderDetails.outerPaperThickness}
                    </td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaPrint className="text-gray-600" />
                      Inner Lamination Type
                    </td>
                    <td className="w-1/2">{orderDetails.innerLamination}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaPrint className="text-gray-600" />
                      Outer Lamination Type
                    </td>
                    <td className="w-1/2">{orderDetails.outerLamination}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaTint className="text-gray-600" />
                      Ink Type
                    </td>
                    <td className="w-1/2">{orderDetails.inkType}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaComment className="text-gray-600" />
                      Remarks
                    </td>
                    <td className="w-1/2">
                      {orderDetails.remarks ? orderDetails.remarks : "N/A"}
                    </td>
                  </tr>
                  <tr className="mb-4 text-lg" style={{ height: "50px" }}>
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaUser className="text-gray-600" />
                      Customer Name
                    </td>
                    <td className="w-1/2">{orderDetails.customer}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobcardMenu;
