import React from "react";
import { NavLink } from "react-router-dom";

const paperData = [
  {
    s_n: "1",
    paper_type: "Art Paper",
    rate: "50",
  },
  {
    s_n: "2",
    paper_type: "Art Board",
    rate: "100",
  },
  {
    s_n: "3",
    paper_type: "Ivory",
    rate: "400",
  },
];

function Paper() {
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
          <h1 className="text-center mx-auto text-5xl text-archivo">
            Paper Types
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
                {paperData.map((row) => (
                  <tr key={row.s_n}>
                    <td className="text-wrap">{row.s_n}</td>
                    <td className="text-wrap">{row.paper_type}</td>
                    <td className="text-wrap">{row.rate}</td>
                    <td>
                      <button className="btn btn-neutral">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="drawer-side font-archivo">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-zinc-700 text-white">
          {/* Sidebar content here */}
          <li className="mt-[40px]">
            <img
              width="120"
              height="120"
              src="https://img.icons8.com/external-photo3ideastudio-solid-photo3ideastudio/64/FFFFFF/external-knot-china-photo3ideastudio-solid-photo3ideastudio.png"
              alt="external-knot-china-photo3ideastudio-solid-photo3ideastudio"
              className="mx-auto my-1 mb-5"
            />
          </li>
          <li>
            <NavLink to="/admin/dashboard">
              <p className="text-xl font-light">Main Dashboard</p>
            </NavLink>
          </li>
          <br></br>
          <li>
            <NavLink to="/admin/paper">
              <p className="text-xl mb-3 font-light">Paper</p>
            </NavLink>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Binding</p>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Lamination</p>
          </li>
          <li>
            <NavLink to="/admin/customer">
              <p className="text-xl mb-3 font-light">Customer</p>
            </NavLink>
          </li>
          <li>
            <p className="text-xl mb-3 font-light">Order</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Paper;
