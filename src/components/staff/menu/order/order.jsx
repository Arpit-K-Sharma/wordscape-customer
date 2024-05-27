import React, { useState, useEffect } from "react";
import axios from "axios";
import StaffDrawer from "../StaffDrawer";

function StaffOrders() {
  const [orders, setOrders] = useState([]);
  const [steps, setSteps] = useState([
    { name: "Order Slip", active: false, key: "orderSlip" },
    { name: "Job Card", active: false, key: "jobCard" },
    { name: "Paper Cutting", active: false, key: "paperCutting" },
    { name: "Plate Preparation", active: false, key: "platePreparation" },
    { name: "Printing", active: false, key: "printing" },
    { name: "Post Press", active: false, key: "postPress" },
    { name: "Delivery", active: false, key: "delivery" },
    { name: "End", active: false, key: "end" },
  ]);
  const [orderid, setOrderid] = useState();
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
      const response = await axios.get(`http://localhost:8081/orders/invoice/${id}`, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  const handleBack = () => {
    setSteps((prevSteps) => {
      const lastActiveIndex = prevSteps.reduce((lastIndex, step, index) => step.active ? index : lastIndex, -1);
      if (lastActiveIndex > 0) {
        const newSteps = prevSteps.map((step, index) => ({
          ...step,
          active: index < lastActiveIndex
        }));
        return newSteps;
      }
      return prevSteps;
    });
  };

  const handleNext = () => {
    setSteps((prevSteps) => {
      const lastActiveIndex = prevSteps.reduce((lastIndex, step, index) => step.active ? index : lastIndex, -1);
      if (lastActiveIndex < prevSteps.length - 1) {
        const newSteps = prevSteps.map((step, index) => ({
          ...step,
          active: index <= lastActiveIndex + 1
        }));
        return newSteps;
      }
      return prevSteps;
    });
  };

  const handleDone = async () => {
    const stepData = steps.reduce((acc, step) => {
      acc[step.key] = step.active;
      return acc;
    }, {});

    console.log(stepData);

    try {
      await axios.post(`http://localhost:8081/projectTracking/${orderid}`, stepData);
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleTracking = async (id) => {
    console.log(id)
    try {
      const response = await axios.get(`http://localhost:8081/projectTracking/${id}`);
      const trackingData = response.data;

      const updatedSteps = steps.map(step => ({
        ...step,
        active: trackingData[step.key]
      }));
      console.log(updatedSteps);
      setSteps(updatedSteps);
      document.getElementById('my_modal_1').showModal();
    } catch (error) {
      console.error("Error fetching tracking data:", error);
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
                    <th className="w-[50px]">Tracking</th>
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
                      <td>
                        <button
                          className="btn min-h-[30px] h-[40px]"
                          onClick={() => {
                            handleTracking(order.orderId),
                              setOrderid(order.orderId)
                          }}
                        >
                          Track It
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
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box overflow-hidden max-w-[64%]">
          <div className="">
            <ul className="steps w-[900px] mb-[20px]">
              {steps.map((step, index) => (
                <li key={index} className={`step ${step.active ? "step step-primary" : ""}`} data-content={step.active ? "✓" : null}>
                  {step.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-[20px] justify-end">
            <button className="btn" onClick={handleBack}>
              Back
            </button>
            <button className="btn" onClick={handleNext}>
              Next
            </button>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex justify-end gap-[15px]">
                <button className="btn">Close</button>
                <button className="btn" onClick={handleDone}>Done</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <StaffDrawer />
    </div>
  );
}

export default StaffOrders;
