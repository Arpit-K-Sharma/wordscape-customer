import React, { useState, useEffect } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "../../../axiosInstance";

function Sheets() {
  const [editingData, setEditingData] = useState(null);
  const [sheetDataState, setSheetDataState] = useState([]);

  function getSheets() {
    axios
      .get("/sheetSizes")
      .then((response) => {
        setSheetDataState(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sheet data:", error);
      });
  }

  useEffect(() => {
    getSheets();
  }, []);

  const handleAddSheet = (e) => {
    e.preventDefault();
    const sheetSize = e.target.elements.sheetSize.value;
    const value = parseInt(e.target.elements.value.value, 10);

    axios
      .post("/sheetSizes", {
        sheetSize,
        value,
      })
      .then((response) => {
        setSheetDataState((prevData) => [...prevData, response.data]);
        console.log("Sheet added successfully!");
        document.getElementById("my_modal_3").close();
        return true;
      })
      .then((status) => {
        if (status) getSheets();
      })
      .catch((error) => {
        console.error("Error adding sheet:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`/sheetSizes/${id}`, updatedData)
      .then((response) => {
        console.log("Sheet updated successfully:", response.data);
        getSheets(); // Refresh sheet data
      })
      .catch((error) => {
        console.error("Error updating sheet:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleSave = (row) => {
    const sheetSizeInput = document.getElementById(
      `sheetSize_${row.sheetSizeId}`
    );
    const valueInput = document.getElementById(`value_${row.sheetSizeId}`);

    if (sheetSizeInput && valueInput) {
      const updatedData = {
        sheetSize: sheetSizeInput.value,
        value: parseInt(valueInput.value, 10),
      };
      handleUpdate(row.sheetSizeId, updatedData);
      setEditingData(null); // Reset editing state after save
    } else {
      console.error("One or more input elements not found.");
    }
  };

  return (
    <div className="drawer font-archivo">
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
        <div className="p-7 text-zinc-800">
          <h1 className="text-center mx-auto text-5xl text-archivo mt-[-40px]">
            Sheets
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Sheet Size</th>
                  <th className="w-[80px]">Value</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sheetDataState.map((row, index) => (
                  <tr key={row.sheetSizeId}>
                    <td className="text-wrap">{index + 1}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.sheetSizeId === row.sheetSizeId ? (
                        <form onSubmit={(e) => handleSave(row)}>
                          <input
                            type="text"
                            id={`sheetSize_${row.sheetSizeId}`}
                            name="sheetSize"
                            className="input input-bordered"
                            defaultValue={row.sheetSize}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.sheetSize}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.sheetSizeId === row.sheetSizeId ? (
                        <form onSubmit={(e) => handleSave(row)}>
                          <input
                            type="number"
                            id={`value_${row.sheetSizeId}`}
                            name="value"
                            className="input input-bordered"
                            defaultValue={row.value}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.value}</span>
                      )}
                    </td>
                    <td>
                      {editingData &&
                      editingData.sheetSizeId === row.sheetSizeId ? (
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
              className="btn mx-[45%] bg-zinc-700 text-white"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Sheet
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[13px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">Add Sheet Size</h3>
                <p className="py-4">
                  <form onSubmit={handleAddSheet}>
                    <input
                      type="text"
                      name="sheetSize"
                      placeholder="Sheet Size"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      name="value"
                      placeholder="Value"
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
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default Sheets;
