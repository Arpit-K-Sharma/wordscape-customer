import React, { useState, useEffect } from "react";
import StaffDrawer from "../StaffDrawer";
import axios from "../../../axiosInstance";

function StaffPaperThickness() {
  const [editingData, setEditingData] = useState(null);
  const [paperThicknessDataState, setPaperThicknessDataState] = useState([]);

  function getPaperThicknesses() {
    axios
      .get("/paperThickness")
      .then((response) => {
        // Sort the data by thicknessId in ascending order
        const sortedData = response.data.sort(
          (a, b) => a.thicknessId - b.thicknessId
        );
        setPaperThicknessDataState(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  // Fetching paper thickness data from the backend
  useEffect(() => {
    getPaperThicknesses();
  }, []);

  const handleAddPaperThickness = (e) => {
    e.preventDefault();
    const thickness = parseInt(e.target.elements.thickness.value);
    axios
      .post("/paperThickness", {
        thickness,
      })
      .then((response) => {
        setPaperThicknessDataState((prevData) => [...prevData, response.data]);
        console.log("Paper thickness added successfully!");
        return true;
      })
      .then((status) => {
        if (status) getPaperThicknesses();
      })
      .catch((error) => {
        console.error("Error adding paper thickness:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`/paperThickness/${id}`, updatedData)
      .then((response) => {
        console.log("Paper thickness updated successfully:", response.data);
        getPaperThicknesses(); // Refresh paper thickness data
      })
      .catch((error) => {
        console.error("Error updating paper thickness:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleSave = (row) => {
    const updatedData = {
      thickness: parseInt(
        document.getElementById(`thickness_${row.thicknessId}`).value
      ),
    };
    handleUpdate(row.thicknessId, updatedData);
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
            Paper Thicknesses
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-base-200">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Thickness</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paperThicknessDataState.map((row) => (
                  <tr key={row.thicknessId}>
                    <td className="text-wrap">{row.thicknessId}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.thicknessId === row.thicknessId ? (
                        <form onSubmit={(e) => handleSave(e, row)}>
                          <input
                            type="number"
                            id={`thickness_${row.thicknessId}`}
                            name="thickness"
                            className="input input-bordered"
                            defaultValue={row.thickness}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.thickness}</span>
                      )}
                    </td>
                    <td>
                      {editingData &&
                      editingData.thicknessId === row.thicknessId ? (
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
              Add Paper Thickness
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[20px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">
                  Add Paper Thickness
                </h3>
                <p className="py-4">
                  <form onSubmit={handleAddPaperThickness}>
                    <input
                      type="number"
                      name="thickness"
                      placeholder="Thickness"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      required
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

export default StaffPaperThickness;
