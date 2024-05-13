import React from "react";
import { NavLink } from "react-router-dom";
import UserDrawer from "./UserDrawer";
import Menu from "./menu";

function UserDashboard() {
  return (
    <>
      <Menu />
      <div className="p-7 text-slate-200">
        <h1 className="text-center mx-auto text-5xl">User Dashboard</h1>
      </div>
    </>
  );
}

export default UserDashboard;
