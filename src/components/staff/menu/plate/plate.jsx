import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import StaffDrawer from "../StaffDrawer";
import axios from "../../../axiosInstance";

function StaffPlate() {
  const [editingData, setEditingData] = useState(null);
  const [plateDataState, setPlateDataState] = useState([]);
  const [inkDataState, setInkDataState] = useState([]);
  const [editingInkData, setEditingInkData] = useState(null);

  function getInks() {
    axios
      .get("/inks")
      .then((response) => {
        setInkDataState(response.data);
      })
      .catch((error) => {
        console.error("Error fetching ink data:", error);
      });
  }

  function getPlates() {
    axios
      .get("/plates")
      .then((response) => {
        setPlateDataState(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getPlates();
    getInks();
  }, []);

  const handleAddPlates = (e) => {
    e.preventDefault();
    const plateSize = e.target.elements.plateSize.value;
    const plateRate = parseFloat(e.target.elements.plateRate.value);
    const inkRate = parseFloat(e.target.elements.inkRate.value);

    axios
      .post("/plates", {
        plateSize,
        plateRate,
        inkRate,
      })
      .then((response) => {
        setPlateDataState((prevData) => [...prevData, response.data]);
        console.log("Plate added successfully!");
        return true;
      })
      .then((status) => {
        if (status) getPlates();
      })
      .catch((error) => {
        console.error("Error adding plate:", error);
      });
  };

  const handleEditInk = (data) => {
    setEditingInkData(data);
  };

  const handleSaveInk = (row) => {
    const inkTypeInput = document.getElementById(`inkType_${row.inkId}`);

    if (inkTypeInput) {
      const updatedData = { inkType: inkTypeInput.value };
      handleUpdateInk(row.inkId, updatedData);
      setEditingInkData(null); // Reset editing state after save
    } else {
      console.error("Input element not found.");
    }
  };

  const handleAddInks = (e) => {
    e.preventDefault();
    const inkType = e.target.elements.inkType.value;

    axios
      .post("/inks", {
        inkType,
      })
      .then((response) => {
        setInkDataState((prevData) => [...prevData, response.data]);
        console.log("Ink added successfully!");
        return true;
      })
      .then((status) => {
        if (status) getInks();
      })
      .catch((error) => {
        console.error("Error adding ink:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`/plates/${id}`, updatedData)
      .then((response) => {
        console.log("Plate updated successfully:", response.data);
        getPlates(); // Refresh plate data
      })
      .catch((error) => {
        console.error("Error updating plate:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleUpdateInk = (id, updatedData) => {
    axios
      .put(`/inks/${id}`, updatedData)
      .then((response) => {
        console.log("Ink updated successfully:", response.data);
        getInks();
      })
      .catch((error) => {
        console.error("Error updating ink:", error);
      });
  };

  const handleSave = (row) => {
    const plateSizeInput = document.getElementById(`plateSize_${row.plateId}`);
    const plateRateInput = document.getElementById(`plateRate_${row.plateId}`);
    const inkRateInput = document.getElementById(`inkRate_${row.plateId}`);

    if (plateSizeInput && plateRateInput && inkRateInput) {
      const updatedData = {
        plateSize: plateSizeInput.value,
        plateRate: parseFloat(plateRateInput.value),
        inkRate: parseFloat(inkRateInput.value),
      };
      handleUpdate(row.plateId, updatedData);
      setEditingData(null); // Reset editing state after save
    } else {
      console.error("One or more input elements not found.");
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
        <div className="p-7 text-slate-200">
          <h1 className="text-center mx-auto text-5xl text-archivo mt-[-40px]">
            Plate
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-base-200">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Plate Size</th>
                  <th className="w-[80px]">Plate Rate</th>
                  <th className="w-[80px]">Ink Rate</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plateDataState
                  .sort((a, b) => a.plateId - b.plateId) // Sort the array by plateId
                  .map((row) => (
                    <tr key={row.plateId}>
                      <td className="text-wrap">{row.plateId}</td>
                      <td className="text-wrap">
                        {editingData && editingData.plateId === row.plateId ? (
                          <form onSubmit={(e) => handleSave(row)}>
                            <input
                              type="text"
                              id={`plateSize_${row.plateId}`}
                              name="plateSize"
                              className="input input-bordered"
                              defaultValue={row.plateSize}
                              required
                            />
                          </form>
                        ) : (
                          <span>{row.plateSize}</span>
                        )}
                      </td>
                      <td className="text-wrap">
                        {editingData && editingData.plateId === row.plateId ? (
                          <form onSubmit={(e) => handleSave(row)}>
                            <input
                              type="number"
                              id={`plateRate_${row.plateId}`}
                              name="plateRate"
                              className="input input-bordered"
                              defaultValue={row.plateRate}
                              required
                            />
                          </form>
                        ) : (
                          <span>{row.plateRate}</span>
                        )}
                      </td>
                      <td className="text-wrap">
                        {editingData && editingData.plateId === row.plateId ? (
                          <form onSubmit={(e) => handleSave(row)}>
                            <input
                              type="number"
                              id={`inkRate_${row.plateId}`}
                              name="inkRate"
                              className="input input-bordered"
                              defaultValue={row.inkRate}
                              required
                            />
                          </form>
                        ) : (
                          <span>{row.inkRate}</span>
                        )}
                      </td>
                      <td>
                        {editingData && editingData.plateId === row.plateId ? (
                          <button
                            className="btn btn-neutral"
                            onClick={() => handleSave(row)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="btn btn-neutral"
                            onClick={() => handleEdit(row)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <br />
            <button
              className="btn mx-[200px]"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Plate
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[13px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">Add Plate Size</h3>
                <p className="py-4">
                  <form onSubmit={handleAddPlates}>
                    <input
                      type="text"
                      name="plateSize"
                      placeholder="Plate Size"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      name="plateRate"
                      placeholder="Plate Rate"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      name="inkRate"
                      placeholder="Ink Rate"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <button className="btn mt-5 btn-ghost mx-[115px]">
                      Add
                    </button>
                  </form>
                </p>
              </div>
            </dialog>
          </div>
          <div className="ink-class mt-9">
            <h1 className="text-center mx-auto text-5xl text-archivo mt-[-40px] mt-5">
              Ink Type
            </h1>
            <div className="overflow-x-auto mt-[80px]">
              <table className="table w-2/3 mx-auto my-auto">
                <thead>
                  <tr className="bg-base-200">
                    <th className="w-[50px]">S.N</th>
                    <th className="w-[100px]">Ink Type</th>
                    <th className="w-[100px]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inkDataState
                    .sort((a, b) => a.inkId - b.inkId) // Sort the array by inkId
                    .map((row, index) => (
                      <tr key={row.inkId}>
                        <td className="text-wrap">{index + 1}</td>
                        <td className="text-wrap">
                          {editingInkData &&
                          editingInkData.inkId === row.inkId ? (
                            <form onSubmit={(e) => handleSaveInk(row)}>
                              <input
                                type="text"
                                id={`inkType_${row.inkId}`}
                                name="inkType"
                                className="input input-bordered"
                                defaultValue={row.inkType}
                                required
                              />
                            </form>
                          ) : (
                            <span>{row.inkType}</span>
                          )}
                        </td>
                        <td>
                          {editingInkData &&
                          editingInkData.inkId === row.inkId ? (
                            <button
                              className="btn btn-neutral"
                              onClick={() => handleSaveInk(row)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="btn btn-neutral"
                              onClick={() => handleEditInk(row)}
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
          <button
            className="btn mx-[200px]"
            onClick={() => document.getElementById("my_modal_4").showModal()}
          >
            Add Ink
          </button>
          <dialog id="my_modal_4" className="modal">
            <div className="modal-box w-[340px]">
              <form method="dialog">
                <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[20px]">
                  x
                </button>
              </form>
              <h3 className="font-bold mt-5 mb-2 text-lg">Add Ink Type</h3>
              <p className="py-4">
                <form onSubmit={handleAddInks}>
                  <input
                    type="text"
                    name="inkType"
                    placeholder="Ink Type"
                    className="mt-5 input input-bordered w-full max-w-xs"
                  />
                  <button className="btn mt-5 btn-ghost mx-[115px]">Add</button>
                </form>
              </p>
            </div>
          </dialog>
        </div>
      </div>
      <StaffDrawer />
    </div>
  );
}

export default StaffPlate;
