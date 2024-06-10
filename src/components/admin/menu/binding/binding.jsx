import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";
import axios from "axios";
import { useEffect } from "react";

function Binding() {
  const [editingData, setEditingData] = useState(null);
  const [bindingDataState, setBindingDataState] = useState([]);

  function getBinding() {
    axios
      .get("http://localhost:8081/bindings")
      .then((response) => {
        // Sort the data by bindingId in ascending order
        const sortedData = response.data.sort(
          (a, b) => a.bindingId - b.bindingId
        );
        setBindingDataState(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Fetching binding data from the backend
  useEffect(() => {
    getBinding();
  }, []);

  const handleAddBinding = (e) => {
    e.preventDefault();
    const bindingType = e.target.elements.bindingType.value;
    const rate = parseFloat(e.target.elements.rate.value);
    axios
      .post("http://localhost:8081/bindings", {
        bindingType,
        rate,
      })
      .then((response) => {
        setBindingDataState((prevData) => [...prevData, response.data]);
        console.log("Binding added successfully!");
        return true;
      })
      .then((status) => {
        if (status) getBinding();
      })
      .catch((error) => {
        console.error("Error adding binding:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`http://localhost:8081/bindings/${id}`, {
        bindingType: updatedData.bindingType,
        rate: updatedData.rate,
      })
      .then((response) => {
        console.log("Binding updated successfully:", response.data);
        getBinding(); // Refresh binding data
      })
      .catch((error) => {
        console.error("Error updating binding:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleSave = (row) => {
    const updatedData = {
      bindingType: document.getElementById(`binding_type_${row.bindingId}`)
        .value,
      rate: parseFloat(document.getElementById(`rate_${row.bindingId}`).value),
    };
    handleUpdate(row.bindingId, updatedData);
    setEditingData(null); // Reset editing state after save
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
            src="https://img.icons8.com/?size=100&id=59832&format=png&color=000000"
            alt="menu--v1"
          />
        </label>
        <div className="p-7 text-zinc-900">
          <h1 className="text-center mx-auto text-5xl text-archivo mt-[-40px]">
            Binding
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Binding Type</th>
                  <th className="w-[80px]">Rate</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bindingDataState.map((row) => (
                  <tr key={row.bindingId}>
                    <td className="text-wrap">{row.bindingId}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.bindingId === row.bindingId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="text"
                            id={`binding_type_${row.bindingId}`}
                            name="binding_type"
                            className="input input-bordered"
                            defaultValue={row.bindingType}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.bindingType}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.bindingId === row.bindingId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="number"
                            id={`rate_${row.bindingId}`}
                            name="rate"
                            className="input input-bordered"
                            defaultValue={row.rate}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.rate}</span>
                      )}
                    </td>
                    <td>
                      {editingData &&
                      editingData.bindingId === row.bindingId ? (
                        <button
                          className="btn btn-neutral"
                          onClick={() => handleSave(row)}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          className="btn btn-neutral"
                          onClick={() => setEditingData(row)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <br></br>
            <button
              className="btn mx-[40%] btn-neutral"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Binding
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-red-200 text-[13px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">
                  Add Binding Type
                </h3>
                <p className="py-4">
                  <form onSubmit={handleAddBinding}>
                    <input
                      type="text"
                      name="bindingType"
                      placeholder="Binding Type"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      required
                    />
                    <input
                      type="number"
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

export default Binding;
