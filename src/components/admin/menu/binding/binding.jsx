import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";

const initialBindingData = [
  {
    binding_id: "1",
    binding_type: "Art Paper",
    rate: "50",
  },
  {
    binding_id: "2",
    binding_type: "Art Board",
    rate: "100",
  },
  {
    binding_id: "3",
    binding_type: "Ivory",
    rate: "400",
  },
];

function Binding() {
  const [editingData, setEditingData] = useState(null);
  const [bindingDataState, setBindingDataState] = useState(initialBindingData);

  const handleEdit = (e, data) => {
    e.preventDefault();
    const updatedData = bindingDataState.map((item) => {
      if (item.binding_id === data.binding_id) {
        return {
          ...item,
          rate: e.target.elements.rate.value,
          binding_type: e.target.elements.binding_type.value,
        };
      }
      return item;
    });
    setBindingDataState(updatedData);
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
          <h1 className="text-center mx-auto text-5xl text-archivo">Binding</h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-base-200">
                  <th className="w-[50px]">S.N</th>
                  <th className="w-[100px]">Binding Type</th>
                  <th className="w-[80px]">Rate</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bindingDataState.map((row) => (
                  <tr key={row.binding_id}>
                    <td className="text-wrap">{row.binding_id}</td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.binding_id === row.binding_id ? (
                        <form onSubmit={(e) => handleEdit(e, row)}>
                          <input
                            type="text"
                            name="binding_type"
                            className="input input-bordered"
                            defaultValue={row.binding_type}
                            required
                          />
                        </form>
                      ) : (
                        <span>{row.binding_type}</span>
                      )}
                    </td>
                    <td className="text-wrap">
                      {editingData &&
                      editingData.binding_id === row.binding_id ? (
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
                            bindingDataState.find(
                              (item) => item.binding_id === row.binding_id
                            )?.rate
                          }
                        </span>
                      )}
                    </td>
                    <td>
                      {editingData &&
                      editingData.binding_id === row.binding_id ? (
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
              Add Binding
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box w-[340px]">
                <form method="dialog">
                  <button className="btn btn-m btn-ghost absolute left-[290px] top-2 text-red-200 text-[13px]">
                    x
                  </button>
                </form>
                <h3 className="font-bold mt-5 mb-2 text-lg">
                  Add Binding Type
                </h3>
                <p className="py-4">
                  <form>
                    <input
                      type="text"
                      placeholder="Binding Type"
                      className="mt-5 input input-bordered w-full max-w-xs"
                    />
                    <input
                      type="number"
                      placeholder="Rate"
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

export default Binding;
