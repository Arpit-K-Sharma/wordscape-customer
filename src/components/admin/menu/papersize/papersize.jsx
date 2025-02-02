import React, { useState, useEffect } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "../../../axiosInstance";

function PaperSize() {
  const [editingData, setEditingData] = useState(null);
  const [paperSizeDataState, setPaperSizeDataState] = useState([]);

  function getPaperSizes() {
    axios
      .get("/paperSizes")
      .then((response) => {
        // Sort the data by paperSizeId in ascending order
        const sortedData = response.data.sort((a, b) =>
          a.paperSizeId.localeCompare(b.paperSizeId)
        );
        setPaperSizeDataState(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  useEffect(() => {
    getPaperSizes();
  }, []);

  const handleAddPaperSize = (e) => {
    e.preventDefault();
    const paperSize = e.target.elements.paperSize.value;
    const dimensions = e.target.elements.dimensions.value;
    const paperLength = parseFloat(e.target.elements.paperLength.value);
    const paperBreadth = parseFloat(e.target.elements.paperBreadth.value);
    axios
      .post("/paperSizes", {
        paperSize,
        dimensions,
        paperLength,
        paperBreadth,
      })
      .then((response) => {
        setPaperSizeDataState((prevData) => [...prevData, response.data]);
        console.log("Paper size added successfully!");
        document.getElementById("my_modal_3").close();
        return true;
      })
      .then((status) => {
        if (status) getPaperSizes();
      })
      .catch((error) => {
        console.error("Error adding paper size:", error);
      });
  };

  const handleUpdate = (id, updatedData) => {
    axios
      .put(`/paperSizes/${id}`, updatedData)
      .then((response) => {
        console.log("Paper size updated successfully:", response.data);
        getPaperSizes(); // Refresh paper size data
      })
      .catch((error) => {
        console.error("Error updating paper size:", error);
      });
  };

  const handleEdit = (data) => {
    setEditingData(data);
  };

  const handleSave = (row) => {
    const updatedData = {
      paperSize: document.getElementById(`paper_size_${row.paperSizeId}`).value,
      dimensions: document.getElementById(`dimensions_${row.paperSizeId}`)
        .value,
      paperLength: parseFloat(
        document.getElementById(`paper_length_${row.paperSizeId}`).value
      ),
      paperBreadth: parseFloat(
        document.getElementById(`paper_breadth_${row.paperSizeId}`).value
      ),
    };
    handleUpdate(row.paperSizeId, updatedData);
    setEditingData(null); // Reset editing state after save
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
            Paper Sizes
          </h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-zinc-600 text-white">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Paper Size</th>
                  <th className="w-[100px]">Dimensions</th>
                  <th className="w-[100px]">Length (in)</th>
                  <th className="w-[100px]">Breadth (in)</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paperSizeDataState.map((row) => (
                  <tr key={row.paperSizeId}>
                    <td className="text-wrap">{row.paperSizeId}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.paperSizeId === row.paperSizeId ? (
                        <input
                          type="text"
                          id={`paper_size_${row.paperSizeId}`}
                          className="input input-bordered"
                          defaultValue={row.paperSize}
                          required
                        />
                      ) : (
                        <span>{row.paperSize}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.paperSizeId === row.paperSizeId ? (
                        <input
                          type="text"
                          id={`dimensions_${row.paperSizeId}`}
                          className="input input-bordered"
                          defaultValue={row.dimensions}
                          required
                        />
                      ) : (
                        <span>{row.dimensions}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.paperSizeId === row.paperSizeId ? (
                        <input
                          type="number"
                          id={`paper_length_${row.paperSizeId}`}
                          className="input input-bordered"
                          defaultValue={row.paperLength}
                          step="0.1"
                          required
                        />
                      ) : (
                        <span>{row.paperLength}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.paperSizeId === row.paperSizeId ? (
                        <input
                          type="number"
                          id={`paper_breadth_${row.paperSizeId}`}
                          className="input input-bordered"
                          defaultValue={row.paperBreadth}
                          step="0.1"
                          required
                        />
                      ) : (
                        <span>{row.paperBreadth}</span>
                      )}
                    </td>
                    <td>
                      {editingData &&
                      editingData.paperSizeId === row.paperSizeId ? (
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
              className="btn mx-[45%] btn-neutral text-white"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Paper Size
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-black text-[20px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">Add Paper Size</h3>
                <p className="py-4">
                  <form onSubmit={handleAddPaperSize}>
                    <input
                      type="text"
                      name="paperSize"
                      placeholder="Paper Size"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      required
                    />
                    <input
                      type="text"
                      name="dimensions"
                      placeholder="Dimensions"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      required
                    />
                    <input
                      type="number"
                      name="paperLength"
                      placeholder="Length (in)"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      step="0.1"
                      required
                    />
                    <input
                      type="number"
                      name="paperBreadth"
                      placeholder="Breadth (in)"
                      className="mt-5 input input-bordered w-full max-w-xs"
                      step="0.1"
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
      <AdminDrawer />
    </div>
  );
}

export default PaperSize;
