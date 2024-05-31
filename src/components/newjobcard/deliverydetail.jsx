import React, { useState, useEffect } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";

function DeliveryDetail({ data }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      deliveryDetail: {
        company: "",
        venue: "",
        contactPersonName: "",
        contactPersonNumber: "",
      },
    },
  });

  useEffect(() => {
    if (data) {
      setValue("deliveryDetail.company", data.company);
      setValue("deliveryDetail.venue", data.venue);
      setValue("deliveryDetail.contactPersonName", data.contactPersonName);
      setValue("deliveryDetail.contactPersonNumber", data.contactPersonNumber);
    }
  }, [data, setValue]);

  const [deliverydone, setDeliverydone] = useState(false);

  const onSubmit = async (formData) => {
    console.log(formData);
    const jsonData = {
      deliveryDetail: {
        company: formData.deliveryDetail.company,
        venue: formData.deliveryDetail.venue,
        contactPersonName: formData.deliveryDetail.contactPersonName,
        contactPersonNumber: formData.deliveryDetail.contactPersonNumber,
      },
    };

    console.log("json data from delivery: ", jsonData);
    Cookies.set("deliveryData", JSON.stringify(jsonData));
    setDeliverydone(!deliverydone);
    document.getElementById("my_modal_6").close();
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => {
          document.getElementById("my_modal_6").showModal();
        }}
      >
        <a className="flex"> Delivery Details </a>{" "}
        {deliverydone === true ? (
          <AiOutlineCheckCircle size={24} color="green" />
        ) : null}
      </button>
      <dialog
        id="my_modal_6"
        className="modal flex h-[100%] ml-[50%] bg-[#1c2127]"
      >
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none bg-[#1c2127]">
          <h3 className="font-bold text-lg">If to be sent to</h3>
          <p className="mt-5">Fill Below</p>
          <p className="py-4">
            <form className="mt-5 w-full" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("deliveryDetail.company")}
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
                  {...register("deliveryDetail.venue")}
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
                  {...register("deliveryDetail.contactPersonName")}
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
                  {...register("deliveryDetail.contactPersonNumber")}
                />
              </label>
              <div className="modal-action">
                <button type="submit" className="btn hover:bg-[#376437]">
                  Done
                </button>
              </div>
            </form>
          </p>
        </div>
      </dialog>
    </>
  );
}

export default DeliveryDetail;
