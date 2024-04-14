import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";

const initialPlateData = [
  {
    plate_id: "1",
    plate_size: "10 x 20",
    rate: 50,
    ink_rate: 100,
  },
  {
    plate_id: "2",
    plate_size: "5 x 10",
    rate: 80,
    ink_rate: 200
  },
  {
    plate_id: "3",
    plate_size: "20 x 30",
    rate: 400,
    ink_rate: 50
  },
];

function Plate() {
  const [editingData, setEditingData] = useState(null);
  const [plateDataState, setplateDataState] = useState(initialPlateData);

  const handleEdit = (e, data) => {
    e.preventDefault();
    const updatedData = plateDataState.map((item) => {
      if (item.plate_id === data.plate_id) {
        return {
          ...item,
          rate: e.target.elements.rate.value,
          inkrate: e.target.elements.inkrate.value,
          plate_size: e.target.elements.plate_size.value,
        };
      }
      return item;
    });
    setplateDataState(updatedData);
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
          <h1 className="text-center mx-auto text-5xl text-archivo">Plate</h1>
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
                {plateDataState.map((row) => (
                  <tr key={row.plate_id}>
                    <td className="text-wrap">{row.plate_id}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.plate_id === row.plate_id ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="plate_size"
                            className="input input-bordered"
                            defaultValue={row.plate_size}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.plate_size}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.plate_id === row.plate_id ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="plate_size"
                            className="input input-bordered"
                            defaultValue={row.ink_rate}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.ink_rate}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.plate_id === row.plate_id ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="number"
                            name="rate"
                            className="input input-bordered"
                            defaultValue={row.rate}
                            required
                          />
                        </form>
                      ) : (
                        <span>
                          {
                            plateDataState.find(
                              (item) => item.plate_id === row.plate_id
                            )?.rate
                          }
                        </span>
                      )}
                    </td>
                    <td>
                      {editingData &&
                      editingData.plate_id === row.plate_id ? (
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
            {/* <button
              className="btn btn-success mx-[200px] bg-zinc-900 text-white border-0 hover:bg-blue-800"
              onClick={openForm}
            >
              Add Binding
            </button> */}

            <button
              className="btn mx-[200px]"
              onClick={() => document.getElementById("my_modal_3").showModal()}
            >
              Add Plate
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-red-200 text-[13px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">
                  Add Plate Size
                </h3>
                <p className="py-4">
                  <form>
                    <input
                      type="text"
                      placeholder="Plate Size"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                     <input
                      type="number"
                      placeholder="Rate"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      placeholder="Ink Rate"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <button className="btn mt-5 btn-ghost mx-[115px]">Add</button>
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

export default Plate;
