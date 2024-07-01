import React, { useState, useEffect } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "../../../axiosInstance";

function Paper() {
  const [editingData, setEditingData] = useState(null);
  const [paperDataState, setPaperDataState] = useState([]);

  function getPaper() {
    axios
      .get("/papers")
      .then((response) => {
        const sortedData = response.data.sort((a, b) => a.paperId - b.paperId);
        setPaperDataState(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getPaper();
  }, []);

  const handleAddPaper = (e) => {
    e.preventDefault();
    const paperType = e.target.elements.paperType.value;
    const rate = parseFloat(e.target.elements.rate.value);
    const minThickness = parseFloat(e.target.elements.minThickness.value);
    const maxThickness = parseFloat(e.target.elements.maxThickness.value);

    axios
      .post("/papers", { paperType, rate, minThickness, maxThickness })
      .then((response) => {
        setPaperDataState((prevData) => [...prevData, response.data]);
        console.log("Paper added successfully!");
        document.getElementById("my_modal_3").close();
        return true;
      })
      .then((status) => {
        if (status) getPaper();
      })
      .catch((error) => {
        console.error("Error adding paper:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`/papers/${id}`, updatedData)
      .then((response) => {
        console.log("Paper updated successfully:", response.data);
        getPaper();
      })
      .catch((error) => {
        console.error("Error updating paper:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleSave = (row) => {
    const updatedData = {
      paperType: document.getElementById(`paper_type_${row.paperId}`).value,
      rate: parseFloat(document.getElementById(`rate_${row.paperId}`).value),
      minThickness: parseFloat(
        document.getElementById(`min_thickness_${row.paperId}`).value
      ),
      maxThickness: parseFloat(
        document.getElementById(`max_thickness_${row.paperId}`).value
      ),
    };
    handleUpdate(row.paperId, updatedData);
    setEditingData(null);
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
          <h1 className="text-center mx-auto text-5xl font-archivo mt-[-40px]">
            Papers
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Paper Type</th>
                  <th className="w-[80px]">Rate</th>
                  <th className="w-[80px]">Min Thickness</th>
                  <th className="w-[80px]">Max Thickness</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paperDataState.map((row) => (
                  <tr key={row.paperId}>
                    <td className="text-wrap">{row.paperId}</td>
                    <td className="text-wrap">
                      {editingData && editingData.paperId === row.paperId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="text"
                            id={`paper_type_${row.paperId}`}
                            name="paper_type"
                            className="input input-bordered"
                            defaultValue={row.paperType}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.paperType}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData && editingData.paperId === row.paperId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="number"
                            id={`rate_${row.paperId}`}
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
                    <td className="text-wrap">
                      {editingData && editingData.paperId === row.paperId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="number"
                            id={`min_thickness_${row.paperId}`}
                            name="min_thickness"
                            className="input input-bordered"
                            defaultValue={row.minThickness}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.minThickness}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData && editingData.paperId === row.paperId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="number"
                            id={`max_thickness_${row.paperId}`}
                            name="max_thickness"
                            className="input input-bordered"
                            defaultValue={row.maxThickness}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.maxThickness}</span>
                      )}
                    </td>
                    <td>
                      {editingData && editingData.paperId === row.paperId ? (
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
              className="btn mx-[45%] btn-neutral"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Paper
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[20px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">Add Paper Type</h3>
                <p className="py-4">
                  <form onSubmit={handleAddPaper}>
                    <input
                      type="text"
                      name="paperType"
                      placeholder="Paper Type"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      name="rate"
                      placeholder="Rate"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      name="minThickness"
                      placeholder="Min Thickness"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      name="maxThickness"
                      placeholder="Max Thickness"
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

export default Paper;
