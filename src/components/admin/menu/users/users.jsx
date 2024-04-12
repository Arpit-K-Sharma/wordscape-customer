import React from "react";
import { NavLink } from "react-router-dom";
import AdminDrawer from "../AdminDrawer";

const userData = [
  {
    user_id: "1",
    username: "niken101",
    password: "hashed-password",
    email: "niken@gmail.com",
    status: true,
  },
  {
    user_id: "2",
    username: "sunil404",
    password: "hashed-password",
    email: "niken@gmail.com",
    status: true,
  },
  {
    user_id: "3",
    username: "ram900",
    password: "hashed-password",
    email: "niken@gmail.com",
    status: false,
  },
];

function Users() {
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
          <h1 className="text-center mx-auto text-5xl text-archivo">Users</h1>
          <div className="overflow-x-auto mt-[80px]">
            <table className="table w-2/3 mx-auto my-auto">
              <thead>
                <tr className="bg-base-200">
                  <th className="w-[50px]">User ID</th>
                  <th className="w-[100px]">Username</th>
                  <th className="w-[80px]">Email</th>
                  <th className="w-[80px]">Password</th>
                  <th className="w-[80px]">Status</th>
                  <th className="w-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((row) => (
                  <tr key={row.user_id}>
                    <td className="text-wrap">{row.user_id}</td>
                    <td className="text-wrap">{row.username}</td>
                    <td className="text-wrap">{row.email}</td>
                    <td>{"*".repeat(row.password.length)}</td>{" "}
                    <td className="text-wrap">
                      {row.status ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <button className="btn btn-neutral">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <br></br>
              <button className="btn btn-success mx-auto bg-zinc-900 text-white border-0 hover:bg-blue-800 w-[130px]">
                Add Users
              </button>
            </table>
          </div>
        </div>
      </div>
      <AdminDrawer />
    </div>
  );
}

export default Users;
