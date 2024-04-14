import React, { useState } from "react";
import AdminDrawer from "../AdminDrawer";
import axios from "axios";
import { useEffect } from "react";

function Paper() {
  const [editingData, setEditingData] = useState(null);
  const [paperDataState, setPaperDataState] = useState([]);

  function getPaper() {
    axios
      .get("http://localhost:8081/papers")
      .then((response) => {
        setPaperDataState(response.data);
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
      .post("http://localhost:8081/papers", {
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

  const handleEdit = (e, data) => {
    e.preventDefault();
    const updatedData = paperDataState.map((item) => {
      if (item.s_n === data.s_n) {
        return {
          ...item,
          rate: e.target.elements.rate.value,
          paper_type: e.target.elements.paper_type.value,
        };
      }
      return item;
    });
    setPaperDataState(updatedData);
    setEditingData(null);
    console.log("Data saved successfully!");
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
          <h1 className="text-center mx-auto text-5xl text-archivo">Papers</h1>
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
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="paper_type"
                            className="input input-bordered"
                            defaultValue={row.paper_type}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.paperType}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData && editingData.s_n === row.s_n ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="float"
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
                      {editingData && editingData.s_n === row.s_n ? (
                        <button className="btn btn-neutral" type="submit">
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
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-red-200 text-[13px]">
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
                      type="float"
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
      <AdminDrawer />
    </div>
  );
}

export default Paper;
