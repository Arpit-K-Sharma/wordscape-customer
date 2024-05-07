import React, { useState } from "react";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import axios from 'axios'; 

function DeliveryDetail() {
    const [deliverydone, setDeliverydone] = useState(false);
    const [formData, setFormData] = useState({
        company: "",
        venue: "",
        contactPersonName: "",
        contactPersonNumber: ""
    });

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const inputs = document.querySelectorAll("input");
            const currentIndex = Array.from(inputs).findIndex(input => document.activeElement === input);
            const nextIndex = currentIndex + 1;
            if (nextIndex < inputs.length) {
                inputs[nextIndex].focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            console.log(formData)
            // const response = await axios.post('APIENDPOINT', formData);
            // console.log(response.data);
            setDeliverydone(true);
            document.getElementById("my_modal_6").close();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <button
                className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
                onClick={() => { document.getElementById("my_modal_6").showModal() }}
            >
                <a className="flex"> Delivery Details </a> {deliverydone === true ? <AiOutlineCheckCircle size={24} color="green" /> : null}
            </button>
            <dialog id="my_modal_6" className="modal flex h-[100%] ml-[50%] bg-[#1c2127]">
                <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
                    <h3 className="font-bold text-lg">If to be sent to</h3>
                    <p className="mt-5">Fill Below</p>
                    <p className="py-4">
                        <form className="mt-5 w-full" onSubmit={handleSubmit}>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Company</span>
                                </div>
                                <input
                                required
                                    type="text"
                                    name="company"
                                    placeholder="Company Name"
                                    className="input input-bordered w-full"
                                    onKeyDown={handleKeyPress}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </label>

                            <label className="form-control w-full">
                                <div className="label mt-6">
                                    <span className="label-text">Venue</span>
                                </div>
                                <input
                                required
                                    type="text"
                                    name="venue"
                                    placeholder="Venue Name"
                                    className="input input-bordered w-full "
                                    onKeyDown={handleKeyPress}
                                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                />
                            </label>

                            <label className="form-control w-full mt-3">
                                <div className="label mt-6">
                                    <span className="label-text">Contact Person Name</span>
                                </div>
                                <input
                                required
                                    type="text"
                                    name="contactPersonName"
                                    placeholder="Contact Person Name"
                                    className="input input-bordered w-full"
                                    onKeyDown={handleKeyPress}
                                    onChange={(e) => setFormData({ ...formData, contactPersonName: e.target.value })}
                                />
                            </label>

                            <label className="form-control w-full mt-5">
                                <div className="label mt-3">
                                    <span className="label-text">Contact Person Number</span>
                                </div>
                                <input
                                    type="number"
                                    required
                                    name="contactPersonNumber"
                                    placeholder="Contact Person Number"
                                    className="input input-bordered w-full"
                                    onKeyDown={handleKeyPress}
                                    onChange={(e) => setFormData({ ...formData, contactPersonNumber: e.target.value })}
                                />
                            </label>
                            <div className="modal-action">
                                <button type="submit" className="btn hover:bg-[#376437]" >Done</button>
                            </div>
                        </form>
                    </p>
                </div>
            </dialog>
        </>
    );
}

export default DeliveryDetail;
