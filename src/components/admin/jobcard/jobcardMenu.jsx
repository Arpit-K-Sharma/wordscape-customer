import React, { useEffect, useState } from "react";
import axios from "../../components/axiosInstance";
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
    <div className="drawer w-[200px]">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-1" className="btn drawer-button ">
          Order Details
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="p-4 w-80 min-h-full bg-base-100 text-base-content w-[38%]  ">
          <h1 className="text-3xl mb-4 mt-5 flex justify-center mb-6 ">
            All Details
          </h1>
          {orderDetails ? (
            <div className="shadow-2xl bg-base-200 ml-[20px] w-[92%] pl-[20px]">
              <table className="table-auto w-full mr-[20px] ">
                <tbody>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031] "
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <IoMdTimer className="text-blue-500" size={30} />
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
                      <SlSizeActual className="text-green-500" />
                      Paper Size
                    </td>
                    <td className="w-1/2">{orderDetails.paperSize}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <SiPowerpages className="text-yellow-500" /> Pages
                    </td>
                    <td className="w-1/2">{orderDetails.pages}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <RiNumbersFill className="text-red-500" />
                      Quantity
                    </td>
                    <td className="w-1/2">{orderDetails.quantity}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaBook className="text-purple-500" />
                      Binding Type
                    </td>
                    <td className="w-1/2">{orderDetails.bindingType}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaCut className="text-blue-500" />
                      Cover Treatment Type
                    </td>
                    <td className="w-1/2">{orderDetails.coverTreatmentType}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaPaintBrush className="text-green-500" />
                      Inner Paper Type
                    </td>
                    <td className="w-1/2">{orderDetails.innerPaperType}</td>
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
                      {orderDetails.innerPaperThickness}
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
                    <td className="w-1/2">{orderDetails.outerPaperType}</td>
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
                      {orderDetails.outerPaperThickness}
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
                    <td className="w-1/2">{orderDetails.innerLamination}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaPrint className="text-red-500" />
                      Outer Lamination Type
                    </td>
                    <td className="w-1/2">{orderDetails.outerLamination}</td>
                  </tr>
                  <tr
                    className="mb-4 text-lg border-b-[0.5px] border-[#303031]"
                    style={{ height: "50px" }}
                  >
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaTint className="text-blue-500" />
                      Ink Type
                    </td>
                    <td className="w-1/2">{orderDetails.inkType}</td>
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
                      {orderDetails.remarks ? orderDetails.remarks : "N/A"}
                    </td>
                  </tr>
                  <tr className="mb-4 text-lg" style={{ height: "50px" }}>
                    <td className="w-[100%] flex items-center gap-[10px] mt-[9px]">
                      <FaUser className="text-yellow-500" />
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
