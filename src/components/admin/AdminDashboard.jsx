import React from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "./menu/AdminDrawer";

function AdminDashboard() {
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
        <div className="fixed mt-[15px] top-[-0.5px] left-[1100px] flex items-center px-4 py-2">
          <div className="alert alert-info bg-zinc-900 text-white border-0">
            <p>Logged in as: </p>
          </div>
        </div>
        <div className="p-7 text-slate-200">
          <h1 className="text-center mx-auto text-5xl">Admin Home</h1>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default AdminDashboard;
