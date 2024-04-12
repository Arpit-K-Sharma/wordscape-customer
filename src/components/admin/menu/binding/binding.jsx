import React from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";

const bindingData = [
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
                {bindingData.map((row) => (
                  <tr key={row.s_n}>
                    <td className="text-wrap">{row.binding_id}</td>
                    <td className="text-wrap">{row.binding_type}</td>
                    <td className="text-wrap">{row.rate}</td>
                    <td>
                      <button className="btn btn-neutral">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <br></br>
              <button className="btn btn-success mx-auto bg-zinc-900 text-white border-0 hover:bg-blue-800">
                Add Binding
              </button>
            </table>
          </div>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default Binding;
