import React, { useState } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios';

function PaymentTable() {
    const [paymentdone, setPaymentdone] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [serviceRequired, setServiceRequired] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            paymentMethod,
            serviceRequired
        };
        console.log(data)
        // try {
        //     const response = await axios.post("APIENDPOINT", data);
        //     if (response.status === 200) {
                setPaymentdone(true); 
        document.getElementById("my_modal_5").close()
        //     } else {
        //         console.error("Failed to send data to API:", response.statusText);
        //     }
        // } catch (error) {
        //     console.error("Error sending data to API:", error.message);
        // }
    };

    return (
        <>
            <button
                className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
                onClick={() => document.getElementById("my_modal_5").showModal()}
            >
                <a className="flex"> Payment & Services </a> {paymentdone ? <AiOutlineCheckCircle size={24} color="green" /> : null}
            </button>

            <dialog id="my_modal_5" className="modal flex h-[100%] ml-[50%] bg-[#1c2127]">
                <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
                    <form onSubmit={handleSubmit}>
                        <h2 className="font-bold flex align-center justify-center text-xl">Payment Method</h2>
                        <p className="py-4">
                            <div className="flex items-center mt-5 justify-center gap-[30px]">
                                <label className="flex">
                                    <input
                                        required
                                        type="radio"
                                        name="paymentMethod"
                                        value="Advance"
                                        checked={paymentMethod === "Advance"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-6 h-6 mr-2 ml-[20px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                                    />
                                    <span className="mr-5 ml-5 "> Advance</span>
                                </label>
                                <label className="px-4 flex">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="On Delivery"
                                        checked={paymentMethod === "On Delivery"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-6 h-6 mr-2 ml-[20px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                                    />
                                    <span className="ml-5 mr-5"> On Delivery</span>
                                </label>
                                <label className="flex">
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="Credit"
                                        checked={paymentMethod === "Credit"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-6 h-6 mr-2 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                                    />
                                    <span className="ml-5 "> Credit</span>
                                </label>
                            </div>
                            <p className=" font-bold flex align-center justify-center text-xl mt-[40px]">Service Required:</p>
                            <div className="flex items-center mt-5 align-center justify-center gap-[30px]">
                                <label className="flex">
                                    <input
                                        required
                                        type="radio"
                                        name="serviceRequired"
                                        value="Pre Press"
                                        checked={serviceRequired === "Pre Press"}
                                        onChange={(e) => setServiceRequired(e.target.value)}
                                        className="w-6 h-6 mr-2 ml-[55px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                                    />
                                    <span className="mr-6 ml-5"> Pre Press</span>
                                </label>
                                <label className="px-4 flex">
                                    <input
                                        type="radio"
                                        name="serviceRequired"
                                        value="Press"
                                        checked={serviceRequired === "Press"}
                                        onChange={(e) => setServiceRequired(e.target.value)}
                                        className="w-6 h-6 mr-2 ml-[10px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                                    />
                                    <span className="ml-5 mr-5"> Press</span>
                                </label>
                                <label className="flex">
                                    <input
                                        type="radio"
                                        name="serviceRequired"
                                        value="Post-press"
                                        checked={serviceRequired === "Post-press"}
                                        onChange={(e) => setServiceRequired(e.target.value)}
                                        className="w-6 h-6 mr-5 ml-[45px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                                    />
                                    <span className="ml-4"> Post-press</span>
                                </label>
                            </div>
                        </p>
                        <div className="modal-action">
                            <button type="submit" className="btn hover:bg-[#376437]">Done</button>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    )
}

export default PaymentTable;
