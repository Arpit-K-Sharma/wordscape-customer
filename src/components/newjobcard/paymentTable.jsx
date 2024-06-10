import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

function PaymentTable({ data }) {
  const [paymentdone, setPaymentdone] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      servicePaymentList: {
        paymentWay: "",
        serviceRequired: "",
      },
    },
  });

  useEffect(() => {
    if (data) {
      setValue("servicePaymentList.paymentWay", data.paymentMethod);
      setValue("servicePaymentList.serviceRequired", data.serviceRequired);
    }
  }, [data, setValue]);

  const onSubmit = (formData) => {
    console.log(formData); // Log the form data to verify it's what you expect
    const jsonData = {
      servicePaymentList: {
        paymentMethod: formData.servicePaymentList.paymentWay, // Corrected field access
        serviceRequired: formData.servicePaymentList.serviceRequired, // Corrected field access
      },
    };
    console.log("json data from payment table jsx: ", jsonData);
    Cookies.set("paymentData", JSON.stringify(jsonData));
    setPaymentdone(!paymentdone);

    document.getElementById("my_modal_5").close();
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        <a className="flex"> Payment & Services </a>{" "}
        {paymentdone ? <AiOutlineCheckCircle size={24} color="green" /> : null}
      </button>

      <dialog id="my_modal_5" className="modal flex h-[100%] ml-[50%]">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-bold flex align-center justify-center text-xl">
              Payment Method
            </h2>
            <p className="py-4">
              <div className="flex items-center mt-5 justify-center gap-[30px]">
                <label className="flex">
                  <input
                    required
                    type="radio"
                    name="paymentWay"
                    value="Advance"
                    {...register("servicePaymentList.paymentWay")}
                    className="w-6 h-6 mr-2 ml-[20px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-5 ml-5 "> Advance</span>
                </label>
                <label className="px-4 flex">
                  <input
                    type="radio"
                    name="paymentWay"
                    value="On Delivery"
                    {...register("servicePaymentList.paymentWay")}
                    className="w-6 h-6 mr-2 ml-[20px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="ml-5 mr-5"> On Delivery</span>
                </label>
                <label className="flex">
                  <input
                    type="radio"
                    name="paymentWay"
                    value="Credit"
                    {...register("servicePaymentList.paymentWay")}
                    className="w-6 h-6 mr-2 rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="ml-5 "> Credit</span>
                </label>
              </div>
              <p className=" font-bold flex align-center justify-center text-xl mt-[40px]">
                Service Required:
              </p>
              <div className="flex items-center mt-5 align-center justify-center gap-[30px]">
                <label className="flex">
                  <input
                    required
                    type="radio"
                    name="serviceRequired"
                    value="Pre Press"
                    {...register("servicePaymentList.serviceRequired")}
                    className="w-6 h-6 mr-2 ml-[55px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="mr-6 ml-5"> Pre Press</span>
                </label>
                <label className="px-4 flex">
                  <input
                    type="radio"
                    name="serviceRequired"
                    value="Press"
                    {...register("servicePaymentList.serviceRequired")}
                    className="w-6 h-6 mr-2 ml-[10px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="ml-5 mr-5"> Press</span>
                </label>
                <label className="flex">
                  <input
                    type="radio"
                    name="serviceRequired"
                    value="Post-press"
                    {...register("servicePaymentList.serviceRequired")}
                    className="w-6 h-6 mr-5 ml-[45px] rounded-full border border-gray-300 checked:bg-blue-500 checked:border-blue-500 focus:ring-blue-500 focus:ring-opacity-75"
                  />
                  <span className="ml-4"> Post-press</span>
                </label>
              </div>
            </p>
            <div className="modal-action">
              <button type="submit" className="btn hover:bg-[#376437]">
                Done
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default PaymentTable;
