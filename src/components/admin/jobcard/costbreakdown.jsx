import React from "react";
import { useState, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import Cookies from "js-cookie";
import { Nav } from "rsuite";
import { AiOutlineCheckCircle } from "react-icons/ai";

function Costbreakdown({ data, onChildData }) {
  const [costdone, setCostdone] = useState(false);
  const [vendors, setVendors] = useState([1, 2, 3, 4, 5]);
  const [costCalculation, setCostCalculation] = useState({
    plates: "",
    printing: "",
    paper: "",
    coverPaper: "",
    innerPaper: "",
    otherPaper: "",
    lamination: "",
    binding: "",
    finishing: "",
    extraCharges: "",
    deliveryCharges: "",
    subTotal: "",
    vat: "",
    grandTotal: "",
    preparedBy: "",
    approvedBy: "",
    billingInfo: {
      approvalStatus: "",
      invoiceIssueDate: "",
      invoiceNo: "",
      customerName: "",
      issuedBy: "",
    },
  });

  useEffect(() => {
    if (data) {
      const initialData = {
        costCalculationId: data.costCalculationId || 0,
        plates: data.plates || 0,
        printing: data.printing || 0,
        paper: data.paper || 0,
        coverPaper: data.coverPaper || 0,
        innerPaper: data.innerPaper || 0,
        otherPaper: data.otherPaper || 0,
        lamination: data.lamination || 0,
        binding: data.binding || 0,
        finishing: data.finishing || 0,
        extraCharges: data.extraCharges || 0,
        deliveryCharges: data.deliveryCharges || 0,
        subTotal: data.subTotal || 0,
        vat: data.vat || 0,
        grandTotal: data.grandTotal || 0,
        preparedBy: data.preparedBy || "",
        approvedBy: data.approvedBy || "",
        billingInfo: {
          approvalStatus: data.billingInfo?.approvalStatus || "",
          invoiceIssueDate: data.billingInfo?.invoiceIssueDate || "",
          invoiceNo: data.billingInfo?.invoiceNo || "",
          customerName: data.billingInfo?.customerName || "",
          issuedBy: data.billingInfo?.issuedBy || "",
        },
      };
      setCostCalculation(initialData);
      Cookies.set("costCalculation", JSON.stringify(initialData));
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setCostCalculation((prevState) => ({
        ...prevState,
        billingInfo: {
          ...prevState.billingInfo,
          approvalStatus: value,
        },
      }));
    } else {
      let parsedValue = value;

      if (["preparedBy", "approvedBy"].includes(name)) {
        setCostCalculation((prevState) => ({
          ...prevState,
          [name]: parsedValue.trim(),
        }));
      } else if (["grandTotal", "subTotal", "vat"].includes(name)) {
        setCostCalculation((prevState) => ({
          ...prevState,
          [name]: parseFloat(parsedValue),
        }));
      } else if (
        ["invoiceIssueDate", "invoiceNo", "customerName", "issuedBy"].includes(
          name
        )
      ) {
        setCostCalculation((prevState) => ({
          ...prevState,
          billingInfo: {
            ...prevState.billingInfo,
            [name]: parsedValue.trim(),
          },
        }));
      } else {
        setCostCalculation((prevState) => ({
          ...prevState,
          [name]: parseFloat(parsedValue),
        }));
      }
    }
  };

  const handleClick = () => {
    const dataToSave = {
      costCalculationId: costCalculation.costCalculationId,
      plates: costCalculation.plates,
      printing: costCalculation.printing,
      paper: costCalculation.paper,
      coverPaper: costCalculation.coverPaper,
      innerPaper: costCalculation.innerPaper,
      otherPaper: costCalculation.otherPaper,
      lamination: costCalculation.lamination,
      binding: costCalculation.binding,
      finishing: costCalculation.finishing,
      extraCharges: costCalculation.extraCharges,
      deliveryCharges: costCalculation.deliveryCharges,
      subTotal: costCalculation.subTotal,
      vat: costCalculation.vat,
      grandTotal: costCalculation.grandTotal,
      preparedBy: costCalculation.preparedBy,
      approvedBy: costCalculation.approvedBy,
      billingInfo: {
        approvalStatus: costCalculation.billingInfo.approvalStatus,
        invoiceIssueDate: costCalculation.billingInfo.invoiceIssueDate,
        invoiceNo: costCalculation.billingInfo.invoiceNo,
        customerName: costCalculation.billingInfo.customerName,
        issuedBy: costCalculation.billingInfo.issuedBy,
      },
    };

    Cookies.set("costCalculation", JSON.stringify(dataToSave));
    console.log("Cost Calc " + JSON.stringify(dataToSave));
    document.getElementById("my_modal_13").close();
    onChildData(false);
    setCostdone(true);
  };

  const handleAdd1 = () => {
    setVendors((prevVendors) => [...prevVendors, vendors.length + 1]);
  };
  const [vendor, setVendor] = useState([1, 2, 3, 4, 5]);

  const handleAdd2 = () => {
    setVendor((prevVendors) => [...prevVendors, vendor.length + 1]);
  };
  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-[black] hover:text-white"
        onClick={() => (
          document.getElementById("my_modal_13").showModal(), onChildData(true)
        )}
      >
        <a className="flex">Cost Breakdown </a>{" "}
        {costdone == true ? (
          <AiOutlineCheckCircle size={24} color="green" />
        ) : null}
      </button>

      <dialog id="my_modal_13" className="modal flex h-[100%] ml-[50%]">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none">
          <h3 className="font-bold text-xl">Cost Calculation</h3>
          <div className="grid w-full gap-4">
            <input
              type="number"
              name="plates"
              id="plates"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Plates"
              value={costCalculation.plates}
              onChange={handleChange}
            />
            <input
              type="number"
              id="printing"
              name="printing"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Printing"
              value={costCalculation.printing}
              onChange={handleChange}
            />
            <input
              type="number"
              id="paper"
              name="paper"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Paper"
              value={costCalculation.paper}
              onChange={handleChange}
            />
            <input
              type="number"
              id="coverPaper"
              name="coverPaper"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Cover Paper"
              value={costCalculation.coverPaper}
              onChange={handleChange}
            />
            <input
              type="number"
              id="innerPaper"
              name="innerPaper"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Inner Paper"
              value={costCalculation.innerPaper}
              onChange={handleChange}
            />
            <input
              type="number"
              id="otherPaper"
              name="otherPaper"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Other Paper"
              value={costCalculation.otherPaper}
              onChange={handleChange}
            />
            <input
              type="number"
              id="lamination"
              name="lamination"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Lamination"
              value={costCalculation.lamination}
              onChange={handleChange}
            />
            <input
              type="number"
              id="binding"
              name="binding"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Binding"
              value={costCalculation.binding}
              onChange={handleChange}
            />
            <input
              type="number"
              id="finishing"
              name="finishing"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Finishing"
              value={costCalculation.finishing}
              onChange={handleChange}
            />
            <input
              type="number"
              id="extraCharges"
              name="extraCharges"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Extra Charges"
              value={costCalculation.extraCharges}
              onChange={handleChange}
            />
            <input
              type="number"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Delivery Charges"
              id="deliveryCharges"
              value={costCalculation.deliveryCharges}
              name="deliveryCharges"
              onChange={handleChange}
            />
            <input
              type="number"
              id="subTotal"
              name="subTotal"
              className="w-full border-b-2 pt-[20px] border-gray-400 font-bold focus:outline-none focus:border-black"
              placeholder="Sub Total"
              value={costCalculation.subTotal}
              onChange={handleChange}
            />
            <input
              type="number"
              id="vat"
              name="vat"
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Vat 13%"
              value={costCalculation.vat}
              onChange={handleChange}
            />
            <input
              type="number"
              id="grandTotal"
              name="grandTotal"
              className="w-full border-b-2 pt-[20px] border-gray-400 font-bold focus:outline-none focus:border-black"
              placeholder="Grand Total"
              value={costCalculation.grandTotal}
              onChange={handleChange}
            />
            <div className="flex gap-[20px] mt-[20px]">
              <input
                type="text"
                id="preparedBy"
                name="preparedBy"
                className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
                placeholder="Prepared By"
                value={costCalculation.preparedBy}
                onChange={(e) =>
                  setCostCalculation({
                    ...costCalculation,
                    preparedBy: e.target.value,
                  })
                }
              />
              <input
                type="text"
                id="approvedBy"
                name="approvedBy"
                className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
                placeholder="Approved By"
                value={costCalculation.approvedBy}
                onChange={(e) =>
                  setCostCalculation({
                    ...costCalculation,
                    approvedBy: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="border border-black h-[250px] mt-[40px] p-[20px]">
            <div className="flex">
              <div>
                <h2 className="font-bold">Billing Information:</h2>
                <input
                  className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
                  placeholder="Invoice Issue Date"
                  type="date"
                  value={costCalculation.billingInfo.invoiceIssueDate}
                  onChange={(e) =>
                    setCostCalculation({
                      ...costCalculation,
                      billingInfo: {
                        ...costCalculation.billingInfo,
                        invoiceIssueDate: e.target.value,
                      },
                    })
                  }
                />
                <input
                  className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
                  placeholder="Invoice no."
                  value={costCalculation.billingInfo.invoiceNo}
                  onChange={(e) =>
                    setCostCalculation({
                      ...costCalculation,
                      billingInfo: {
                        ...costCalculation.billingInfo,
                        invoiceNo: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="mt-[9px] ml-[20px]">
                <div className="flex items-center mb-[15px]">
                  <input
                    type="radio"
                    className="radio"
                    name="approvalStatus"
                    value="required"
                    checked={
                      costCalculation.billingInfo.approvalStatus === "required"
                    }
                    onChange={handleChange}
                  />
                  <label className="text-[17px] ml-[10px]">Required</label>
                </div>
                <div className="flex items-center mb-[15px]">
                  <input
                    type="radio"
                    className="radio"
                    name="approvalStatus"
                    value="approved"
                    checked={
                      costCalculation.billingInfo.approvalStatus === "approved"
                    }
                    onChange={handleChange}
                  />
                  <label className="text-[17px] ml-[10px]">Approved</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="radio"
                    name="approvalStatus"
                    value="reviseneeded"
                    checked={
                      costCalculation.billingInfo.approvalStatus ===
                      "reviseneeded"
                    }
                    onChange={handleChange}
                  />
                  <label className="text-[17px] ml-[10px]">Revise needed</label>
                </div>
              </div>
            </div>
            <input
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Customer Name"
              value={costCalculation.billingInfo.customerName}
              onChange={(e) =>
                setCostCalculation({
                  ...costCalculation,
                  billingInfo: {
                    ...costCalculation.billingInfo,
                    customerName: e.target.value,
                  },
                })
              }
            />
            <input
              className="w-full border-b-2 pt-[20px] border-gray-400 focus:outline-none focus:border-black"
              placeholder="Issue By"
              value={costCalculation.billingInfo.issuedBy}
              onChange={(e) =>
                setCostCalculation({
                  ...costCalculation,
                  billingInfo: {
                    ...costCalculation.billingInfo,
                    issuedBy: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="modal-action">
            <button
              className="btn hover:bg-[red] hover:text-white"
              onClick={(e) => (
                document.getElementById("my_modal_13").close(),
                onChildData(false)
              )}
            >
              Close
            </button>
            <button
              className="btn hover:bg-[#3eab3e] hover:text-white"
              type="submit"
              onClick={handleClick}
            >
              Done
            </button>
          </div>
          {/* <div className="p-4 mt-[20px]">
            <h2 className="font-semibold mb-[10px]">Project Details:</h2>
            <div className="flex justify-between">
              <div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[150px]">
                        Plate Size
                      </th>
                      <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">
                        Plate Type
                      </th>
                      <th className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                        Total Plate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                      <td className="border border-gray-400 p-[10px]">
                        <input className="input input-bordered h-[40px] w-full max-w-xs" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="border border-gray-400 p-[10px]">
                <h4 className="mb-[7px] text-sm">CUSTOMER PROVIDED</h4>
                <div className="flex items-center mb-[10px]">
                  <input type="radio" className="radio" />
                  <label className="text-[15px] ml-[10px]">Plate</label>
                </div>
                <div className="flex items-center mb-[10px]">
                  <input type="radio" className="radio" />
                  <label className="text-[15px] ml-[10px]">Paper</label>
                </div>
                <div className="flex items-center mb-[10px]">
                  <input type="radio" className="radio" />
                  <label className="text-[15px] ml-[10px]">None</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" className="radio" />
                  <label className="text-[15px] ml-[10px]">
                    Printed material
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20px]">
            <h2 className="font-semibold mb-[10px]">Paper Used:</h2>
            <div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[100px]"></th>
                    <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[150px]">
                      Full Sheet Size
                    </th>
                    <th className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Weight
                    </th>
                    <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">
                      Paper Type
                    </th>
                    <th className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Total Sheets
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Cover Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Inner Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-400 p-[15px] text-[15px] w-[130px] text-left">
                      Other Paper
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-[20px]">
            <h2 className="font-semibold mb-[10px]">
              Contract job ( out source ):
            </h2>
            <h3 className="font-semibold mb-[10px]">
              Lamination/Creasing/Juju/Metal-foiling/Diecuting/Padding/Spot
              varnishing
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[250px]">
                    Vendors
                  </th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">
                    Details
                  </th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[110px] text-left">
                    Rate
                  </th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[120px] text-left">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {vendors.map((vendor, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-[5px]" onClick={handleAdd1}>
              <MdAdd size={30} color="green" />
            </div>
          </div>
          <div className="mt-[5px]">
            <h2 className="font-semibold mb-[10px]">Delivery details:</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 p-[15px]  text-[15px] text-left w-[100px]">
                    Slip no.
                  </th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[190px] text-left">
                    Date/Time
                  </th>
                  <th className="border border-gray-400 p-[15px] text-[15px] w-[110px] text-left">
                    Quantity
                  </th>
                </tr>
              </thead>
              <tbody>
                {vendor.map((vendor, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                    <td className="border border-gray-400 p-[10px]">
                      <input className="input input-bordered h-[40px] w-full max-w-xs" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-[5px]" onClick={handleAdd2}>
              <MdAdd size={30} color="green" />
            </div>
          </div> */}
        </div>
      </dialog>
    </>
  );
}

export default Costbreakdown;
