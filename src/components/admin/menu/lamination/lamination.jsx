import React, { useState, useEffect } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "../../../axiosInstance";

function Lamination() {
  const [editingData, setEditingData] = useState(null);
  const [laminationData, setLaminations] = useState([]);

  function getLamination() {
    axios
      .get("/laminations")
      .then((response) => {
        // Sort the data by laminationId in ascending order
        const sortedData = response.data.sort(
          (a, b) => a.laminationId - b.laminationId
        );
        setLaminations(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getLamination();
  }, []);

  const handleAddLamination = (e) => {
    e.preventDefault();
    const laminationType = e.target.elements.laminationType.value;
    const rate = parseFloat(e.target.elements.rate.value);
    axios
      .post("/laminations", {
        laminationType,
        rate,
      })
      .then((response) => {
        setLaminations((prevData) => [...prevData, response.data]);
        console.log("Lamination added successfully!");
        document.getElementById("my_modal_3").close();
        return true;
      })
      .then((status) => {
        if (status) getLamination();
      })
      .catch((error) => {
        console.error("Error adding lamination:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`/laminations/${id}`, updatedData)
      .then((response) => {
        console.log("Lamination updated successfully:", response.data);
        getLamination(); // Refresh lamination data
      })
      .catch((error) => {
        console.error("Error updating lamination:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleSave = (row) => {
    const updatedData = {
      laminationType: document.getElementById(
        `lamination_type_${row.laminationId}`
      ).value,
      rate: parseFloat(
        document.getElementById(`rate_${row.laminationId}`).value
      ),
    };
    handleUpdate(row.laminationId, updatedData);
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
            Laminations
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
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
                    <td className="text-wrap">
                      {editingData &&
                      editingData.laminationId === row.laminationId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="text"
                            id={`lamination_type_${row.laminationId}`}
                            name="lamination_type"
                            className="input input-bordered"
                            defaultValue={row.laminationType}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.laminationType}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.laminationId === row.laminationId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="number"
                            id={`rate_${row.laminationId}`}
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
                      editingData.laminationId === row.laminationId ? (
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
              <br />
            </table>
            <button
              className="btn mx-[45%] bg-zinc-700 text-white"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Lamination
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[20px]">
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

export default Lamination;
