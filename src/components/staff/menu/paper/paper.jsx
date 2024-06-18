import React, { useState, useEffect } from "react";
import StaffDrawer from "../StaffDrawer";
import axios from "../../../axiosInstance";

function StaffPaper() {
  const [editingData, setEditingData] = useState(null);
  const [paperDataState, setPaperDataState] = useState([]);

  function getPaper() {
    axios
      .get("/papers")
      .then((response) => {
        // Sort the data by paperId in ascending order
        const sortedData = response.data.sort((a, b) => a.paperId - b.paperId);
        setPaperDataState(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Fetching paper data from the backend
  useEffect(() => {
    getPaper();
  }, []);

  const handleAddPaper = (e) => {
    e.preventDefault();
    const paperType = e.target.elements.paperType.value;
    const rate = parseFloat(e.target.elements.rate.value);
    axios
      .post("/papers", {
        paperType,
        rate,
      })
      .then((response) => {
        setPaperDataState((prevData) => [...prevData, response.data]);
        console.log("Paper added successfully!");
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
        getPaper(); // Refresh paper data
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
    };
    handleUpdate(row.paperId, updatedData);
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
            src="https://img.icons8.com/ios/50/FFFFFF/menu--v1.png"
            alt="menu--v1"
          />
        </label>
        <div className="p-7 text-slate-200">
          <h1 className="text-center mx-auto text-5xl text-archivo mt-[-40px]">
            Papers
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-base-200">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Paper Type</th>
                  <th className="w-[80px]">Rate</th>
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
              className="btn mx-[200px]"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Paper
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top tex-black text-[65px]">
                    X
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
      <StaffDrawer />
    </div>
  );
}

export default StaffPaper;
