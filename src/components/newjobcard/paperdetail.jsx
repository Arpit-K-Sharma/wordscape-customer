import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCheckCircle } from "react-icons/ai";
import Cookies from "js-cookie";

function PaperDetail({ data }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
    setValue,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("paperSize", data.paperSize);
      setValue("gutterSize", data.gutterSize);
      setValue("gripperSize", data.gripperSize);
      setValue("coverPaperSize", data.coverPaperSize);
      setValue("innerPaperSize", data.innerPaperSize);
      setValue("folderName", data.folderName);
      setValue("plateProcessBy", data.plateProcessBy);
    }
  }, [data, setValue]);

  const onSubmit = async (formData) => {
    console.log(formData);
    const jsonData = {
      paperDetail: {
        paperSize: formData.paperSize,
        gutterSize: formData.gutterSize,
        gripperSize: formData.gripperSize,
        coverPaperSize: formData.coverPaperSize,
        innerPaperSize: formData.innerPaperSize,
        folderName: formData.folderName,
        plateProcessBy: formData.plateProcessBy,
      },
    };
    Cookies.set("paperData", JSON.stringify(jsonData));
    console.log("Paper Data from Paper Details: " + jsonData);
    document.getElementById("my_modal_8").close();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const inputs = document.querySelectorAll("input");
      const currentIndex = Array.from(inputs).findIndex(
        (input) => document.activeElement === input
      );
      const nextIndex = currentIndex + 1;
      if (nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    }
  };

  return (
    <>
      <button
        className="flex btn mx-auto mt-9 w-[195px] bg-gray-200 text-black hover:bg-base-200 hover:text-white"
        onClick={() => document.getElementById("my_modal_8").showModal()}
      >
        <span className="flex">Paper Details </span>
        {isSubmitSuccessful && <AiOutlineCheckCircle size={24} color="green" />}
      </button>
      <dialog id="my_modal_8" className="modal flex h-[100%] ml-[50%] bg-white">
        <div className="modal-box max-h-[100%] max-w-[50%] shadow-none">
          <h3 className="font-bold text-lg">Paper Details</h3>
          <p className="py-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="items-center mt-3"
            >
              <label className="form-control w-full">
                <div className="label mt-1">
                  <span className="label-text">Paper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Paper Size"
                  className="input input-bordered w-full"
                  {...register("paperSize")}
                  onKeyDown={handleKeyPress}
                />
              </label>
              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Gutter Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Gutter Size"
                  className="input input-bordered w-full"
                  {...register("gutterSize")}
                  onKeyDown={handleKeyPress}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Gripper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Gripper Size"
                  className="input input-bordered w-full"
                  {...register("gripperSize")}
                  onKeyDown={handleKeyPress}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Cover Paper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Cover Paper Size"
                  className="input input-bordered w-full"
                  {...register("coverPaperSize")}
                  onKeyDown={handleKeyPress}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Inner Paper Size</span>
                </div>
                <input
                  type="text"
                  placeholder="Inner Paper Size"
                  className="input input-bordered w-full"
                  {...register("innerPaperSize")}
                  onKeyDown={handleKeyPress}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Folder Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Folder Name"
                  className="input input-bordered w-full"
                  {...register("folderName")}
                  onKeyDown={handleKeyPress}
                />
              </label>

              <label className="form-control w-full">
                <div className="label mt-6">
                  <span className="label-text">Plate Process By</span>
                </div>
                <input
                  type="text"
                  placeholder="Plate Process By"
                  className="input input-bordered w-full"
                  {...register("plateProcessBy")}
                  onKeyDown={handleKeyPress}
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

export default PaperDetail;
