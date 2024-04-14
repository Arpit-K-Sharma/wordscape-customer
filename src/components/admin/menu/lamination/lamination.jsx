import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";
import axios from "axios";

function Lamination() {
  const [laminationData, setLaminations] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/laminations")
      .then((response) => {
        setLaminations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);;

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleAddLamination = (e) => {
    e.preventDefault();
    const laminationType = e.target.elements.laminationType.value;
    const rate = parseFloat(e.target.elements.rate.value);
    axios
      .post("http://localhost:8081/laminations", {
        laminationType,
        rate,
      })
      .then((response) => {
        setLaminations((prevData) => [...prevData, response.data]);
        console.log("Binding added successfully!");
      })
      .catch((error) => {
        console.error("Error adding binding:", error);
      });
  };

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer" className="btn mx-1 my-1 drawer-button">
          <img
            width="26"
            height="26"
            src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
            alt="menu--v1"
          />
        </label>
        <div className="p-7 text-slate-200">
          <h1 className="text-center mx-auto text-5xl text-archivo">
            Laminations
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-base-200">
                  <th className="w-[50px]">ID</th>
                  <th className="w-[100px]">Lamination Type</th>
                  <th className="w-[80px]">Rate</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {laminationData.map((row) => (
                  <tr key={row.laminationId}>
                    <td className="text-wrap">{row.laminationId}</td>
                    <td className="text-wrap">{row.laminationType}</td>
                    <td className="text-wrap">{row.rate}</td>
                    <td>
                      <button className="btn btn-neutral">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <br />
            </table>
            <button
              className="btn ml-[180px]"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Lamination
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button
                    className="btn btn-m btn-ghost absolute left-[290px] top-2 text-red-200 text-[13px]"
                    onClick={handleRefresh}
                  >
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">
                  Add Lamination Type
                </h3>
                <p className="py-4">
                  <form onSubmit={handleAddLamination}>
                    <input
                      type="text"
                      name="laminationType"
                      placeholder="Lamination Type"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      required
                    />
                    <input
                      type="float"
                      name="rate"
                      placeholder="Rate"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      required
                    />
                    <button
                      type="submit"
                      className="btn mt-5 btn-ghost mx-[115px]"
                    >
                      Add
                    </button>
                  </form>
                </p>
              </div>
            </dialog>
          </div>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default Lamination;
