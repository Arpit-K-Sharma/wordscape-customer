import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";
import axios from "../../components/axiosInstance";

function CoverTreatment() {
  const [editingData, setEditingData] = useState(null);
  const [coverTreatmentData, setCoverTreatmentData] = useState([]);

  function getCoverTreatments() {
    axios
      .get("/coverTreatments")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => a.coverTreatmentId - b.coverTreatmentId
        );
        setCoverTreatmentData(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching cover treatments data:", error);
      });
  }

  useEffect(() => {
    getCoverTreatments();
  }, []);

  const handleAddCoverTreatment = (e) => {
    e.preventDefault();
    const coverTreatmentType = e.target.elements.coverTreatmentType.value;
    const rate = parseFloat(e.target.elements.rate.value);
    axios
      .post("/coverTreatments", {
        coverTreatmentType,
        rate,
      })
      .then((response) => {
        setCoverTreatmentData((prevData) => [...prevData, response.data]);
        console.log("Cover treatment added successfully!");
        getCoverTreatments();
      })
      .catch((error) => {
        console.error("Error adding cover treatment:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`/coverTreatments/${id}`, {
        coverTreatmentType: updatedData.coverTreatmentType,
        rate: updatedData.rate,
      })
      .then((response) => {
        console.log("Cover treatment updated successfully:", response.data);
        getCoverTreatments();
      })
      .catch((error) => {
        console.error("Error updating cover treatment:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleSave = (row) => {
    const updatedData = {
      coverTreatmentType: document.getElementById(
        `cover_treatment_type_${row.coverTreatmentId}`
      ).value,
      rate: parseFloat(
        document.getElementById(`rate_${row.coverTreatmentId}`).value
      ),
    };
    handleUpdate(row.coverTreatmentId, updatedData);
    setEditingData(null);
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
            Cover Treatments
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Cover Treatment Type</th>
                  <th className="w-[80px]">Rate</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {coverTreatmentData.map((row) => (
                  <tr key={row.coverTreatmentId}>
                    <td className="text-wrap">{row.coverTreatmentId}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.coverTreatmentId === row.coverTreatmentId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="text"
                            id={`cover_treatment_type_${row.coverTreatmentId}`}
                            name="cover_treatment_type"
                            className="input input-bordered"
                            defaultValue={row.coverTreatmentType}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.coverTreatmentType}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.coverTreatmentId === row.coverTreatmentId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="number"
                            id={`rate_${row.coverTreatmentId}`}
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
                      editingData.coverTreatmentId === row.coverTreatmentId ? (
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
            <br></br>
            <button
              className="btn mx-[45%] bg-zinc-800 text-white"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Cover Treatment
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-red-200 text-[13px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">
                  Add Cover Treatment Type
                </h3>
                <p className="py-4">
                  <form onSubmit={handleAddCoverTreatment}>
                    <input
                      type="text"
                      name="coverTreatmentType"
                      placeholder="Cover Treatment Type"
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

export default CoverTreatment;
