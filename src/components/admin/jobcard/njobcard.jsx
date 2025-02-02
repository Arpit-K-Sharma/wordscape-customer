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
import axios from "../../axiosInstance";
import { NavLink, useLocation } from "react-router-dom";
import AdminDrawer from "../menu/AdminDrawer";
import Costbreakdown from "./costbreakdown";
import Cookies from "js-cookie";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFGenerator from "./pdfGenerator";
import { AiOutlineLoading } from "react-icons/ai";

function NJobCard() {
  const location = useLocation();
  const { ordersId } = location.state || {};
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderId, setOrderId] = useState();
  const [filteredOrder, setFilteredOrder] = useState([]);
  const dropdownRef = useRef(null);
  const [jobCard, setJobCard] = useState([]);
  const [pressunit, setPressunit] = useState(false);
  const [cookiesData, setCookiesData] = useState([]);
  const [reload, setReload] = useState(1);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    axios
      .get("/orders")
      .then((response) => {
        setOrders(response.data.response);
        setFilteredOrder(response.data.response);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [reload]);

  useEffect(() => {
    if (orders.length > 0 && ordersId) {
      handleOrderChange(ordersId);
      const fetchJobCard = async () => {
        const response = await axios.get(`/jobCard/${ordersId}`);
        console.log("jobcard response ", response);
        setJobCard(response.data);
      };
      fetchJobCard();
    }
  }, [orders, ordersId]);

  useEffect(() => {
    jobCard?.projectTracking?.jobCard === true ? handleGeneratePDF() : null;
  }, [jobCard]);

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
  const onUpdate = () => {
    setSpinner(true);
    const parseJSONCookie = (cookie) => {
      try {
        return JSON.parse(cookie);
      } catch (e) {
        console.error("Error parsing cookie:", cookie);
        return null;
      }
    };

    let PaperDetailData = parseJSONCookie(Cookies.get("paperData"));
    let binderyData = parseJSONCookie(Cookies.get("binderyData"));
    let deliveryData = parseJSONCookie(Cookies.get("deliveryData"));
    let paperData = parseJSONCookie(Cookies.get("PaperUnitsData"));
    let paymentData = parseJSONCookie(Cookies.get("paymentData"));
    let plateDetailData = parseJSONCookie(Cookies.get("plateData"));
    let prePressData = parseJSONCookie(Cookies.get("prePressData"));
    let costCalculation = parseJSONCookie(Cookies.get("costCalculation"));
    let pressUnitData = parseJSONCookie(Cookies.get("pressUnitData"));
    console.log(paperData);

    let cookiesData = {
      paperDetailData: PaperDetailData ? PaperDetailData.paperDetail : null,
      binderyData: binderyData ? binderyData.binderyData : null,
      deliveryDetail: deliveryData ? deliveryData.deliveryDetail : null,
      paperData: paperData ? paperData.paperData : null,
      prePressUnitList: paymentData ? paymentData.servicePaymentList : null,
      plateDetailData: plateDetailData ? plateDetailData : null,
      prePressData: prePressData ? prePressData.prePressUnitList : null,
      pressUnitData: pressUnitData ? pressUnitData : null,
      costCalculation: costCalculation ? costCalculation : null,
    };

    const Update = async () => {
      try {
        const response = await axios.put(
          `/jobCard/update/${orderId}`,
          cookiesData
        );
        setSpinner(false);
        alert(response.data);
        clearCookies();
        setReload(reload + 1);
      } catch (error) {
        console.error("Error updating job card:", error);
      }
    };
    Update();
  };
  const onSubmit = async (formData) => {
    console.log(formData);

    document.getElementById("my_modal_12").close();
    setPressunit(true);
    setSpinner(true);

    const parseJSONCookie = (cookie) => {
      try {
        return JSON.parse(cookie);
      } catch (e) {
        console.error("Error parsing cookie:", cookie);
        return null;
      }
    };

    let PaperDetailData = parseJSONCookie(Cookies.get("paperData"));
    let binderyData = parseJSONCookie(Cookies.get("binderyData"));
    let deliveryData = parseJSONCookie(Cookies.get("deliveryData"));
    let paperData = parseJSONCookie(Cookies.get("PaperUnitsData"));
    let paymentData = parseJSONCookie(Cookies.get("paymentData"));
    let plateDetailData = parseJSONCookie(Cookies.get("plateData"));
    let prePressData = parseJSONCookie(Cookies.get("prePressData"));
    let costCalculation = parseJSONCookie(Cookies.get("costCalculation"));
    let pressUnitData = parseJSONCookie(Cookies.get("pressUnitData"));
    console.log();

    let cookiesData = {
      paperDetailData: PaperDetailData ? PaperDetailData.paperDetail : null,
      binderyData: binderyData ? binderyData : null,
      deliveryDetail: deliveryData ? deliveryData.deliveryDetail : null,
      paperData: paperData ? paperData.paperData : null,
      prePressUnitList: paymentData ? paymentData.servicePaymentList : null,
      plateDetailData: plateDetailData ? plateDetailData : null,
      prePressData: prePressData ? prePressData.prePressUnitList : null,
      pressUnitData: pressUnitData ? pressUnitData : null,
      costCalculation: costCalculation ? costCalculation : null,
    };

    const url = `/jobCard/${orderId}`;
    console.log(cookiesData);
    console.log("orderid", orderId);

    try {
      const response = await axios.post(url, cookiesData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSpinner(false);
      alert(response.data);
      clearCookies();
      setReload(reload + 1);
      console.log("Successfully sent data to API:", response.data);
    } catch (error) {
      console.error("Error sending data to API:", error);
    }
  };

  const handleChildData = (data) => {
    setOpen(data);
  };

  const clearCookies = () => {
    Cookies.remove("paperData");
    Cookies.remove("binderyData");
    Cookies.remove("deliveryData");
    Cookies.remove("PaperUnitsData");
    Cookies.remove("paymentData");
    Cookies.remove("plateData");
    Cookies.remove("prePressData");
    Cookies.remove("costCalculation");
    Cookies.remove("pressUnitData");
  };

  const handleGeneratePDF = () => {
    const parseJSONCookie = (cookie) => {
      try {
        return JSON.parse(cookie);
      } catch (e) {
        console.error("Error parsing cookie:", cookie);
        return null;
      }
    };

    let PaperDetailData = parseJSONCookie(Cookies.get("paperData"));
    let binderyData = parseJSONCookie(Cookies.get("binderyData"));
    let deliveryData = parseJSONCookie(Cookies.get("deliveryData"));
    let paperData = parseJSONCookie(Cookies.get("PaperUnitsData"));
    let paymentData = parseJSONCookie(Cookies.get("paymentData"));
    let plateDetailData = parseJSONCookie(Cookies.get("plateData"));
    let prePressData = parseJSONCookie(Cookies.get("prePressData"));
    let costCalculation = parseJSONCookie(Cookies.get("costCalculation"));
    let pressUnitData = parseJSONCookie(Cookies.get("pressUnitData"));

    let cookiesData = {
      job_card_id: jobCard.job_card_id,
      paperDetailData: PaperDetailData ? PaperDetailData.paperDetail : null,
      binderyData: binderyData ? binderyData.binderyData : null,
      deliveryDetail: deliveryData ? deliveryData.deliveryDetail : null,
      paperData: paperData ? paperData.paperData : null,
      prePressUnitList: paymentData ? paymentData.servicePaymentList : null,
      plateDetailData: plateDetailData ? plateDetailData : null,
      prePressData: prePressData ? prePressData.prePressUnitList : null,
      pressUnitData: pressUnitData ? pressUnitData : null,
      costCalculation: costCalculation ? costCalculation : null,
    };
    console.log(cookiesData);
    setCookiesData(cookiesData);
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <AdminDrawer />
      <div className="drawer-content">
        <label
          htmlFor="my-drawer"
          className="btn mx-1 my-1 drawer-button mt-8 ml-5 bg-gray-300 border-gray-100 text-[#201f1f] hover:bg-gray-200 hover:border-gray-100"
        >
          <NavLink to="/admin/dashboard">
            <img
              width="26"
              height="26"
              src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
              alt="menu--v1"
            />
          </NavLink>
          <p className="text-xl">Menu</p>
        </label>

        <div className="grid h-screen grid-cols-2 font-archivo  ">
          <div className={open ? "xl:mr-[60%] " : null}>
            <h2 className="text-center w-[200px] xl:ml-[85%] mt-[25px] text-4xl font-extrabold">
              Job Card
            </h2>
            <h1 className="xl:ml-[85%] w-[200px] text-center mt-[20px] text-xl">
              Order Details
              <div className="flex justify-center items-center">
                {Object.keys(cookiesData).length > 0 ? (
                  <PDFDownloadLink
                    document={<PDFGenerator data={cookiesData} />}
                    fileName="jobcard.pdf"
                  >
                    {({ blob, url, loading, error }) => (
                      <button
                        className="p-[10px] rounded-full hover:bg-[#3eab3e] mt-[10px] hover:text-[white] transition-colors duration-300"
                        disabled={loading}
                        title={loading ? "Generating PDF..." : "Download PDF"}
                      >
                        {loading ? (
                          <svg
                            className="animate-spin h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        ) : (
                          <svg
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                        )}
                      </button>
                    )}
                  </PDFDownloadLink>
                ) : null}
              </div>
            </h1>

            <div
              className={
                open ? "flex gap-[20px] ml-[-100%] " : "flex gap-[20px]"
              }
            >
              <div className="dropdown xl:ml-[75%] mt-[10px] text-center ">
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
                  className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-[230px]"
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
              <div className="grid grid-cols-2 gap-x-[250px] gap-y-[50px]">
                {jobCard ? (
                  <>
                    <PaymentTable
                      data={jobCard.prePressUnitList}
                      onChildData={handleChildData}
                    />
                    <DeliveryDetail
                      data={jobCard.delivery}
                      onChildData={handleChildData}
                    />
                    <PressUnit
                      data={jobCard.prePressData}
                      onChildData={handleChildData}
                    />
                    <PaperDetail
                      data={jobCard.paperDetailData}
                      onChildData={handleChildData}
                    />
                    <PlateDetail
                      data={jobCard.plateDetailData}
                      onChildData={handleChildData}
                    />
                    <PaperUnit
                      data={jobCard.paperData}
                      onChildData={handleChildData}
                    />
                    <Bindery
                      data={jobCard.bindingData}
                      onChildData={handleChildData}
                    />
                    <PressUnits
                      data={jobCard.pressUnitData}
                      onChildData={handleChildData}
                    />
                    <Costbreakdown
                      data={jobCard.costCalculation}
                      onChildData={handleChildData}
                    />
                    <div className="modal-action ml-[200px]">
                      {jobCard?.projectTracking?.jobCard === true ? (
                        <button
                          onClick={onUpdate}
                          className="btn hover:bg-[#3eab3e] mt-[10px] w-[200px] hover:text-[white]"
                          type="submit"
                        >
                          {spinner ? (
                            <AiOutlineLoading className="animate-spin" />
                          ) : (
                            "Update"
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={onSubmit}
                          className="btn hover:bg-[#3eab3e] mt-[10px] w-[200px] hover:text-[white]"
                          type="submit"
                        >
                          {spinner ? (
                            <AiOutlineLoading className="animate-spin" />
                          ) : (
                            "Submit"
                          )}
                        </button>
                      )}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NJobCard;
