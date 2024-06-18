import React from "react";
import { NavLink } from "react-router-dom";

function AdminLogin() {
  return (
    <div className="flex max-w bg-slate-500">
      <div className="w-1/2 h-auto">
        <img
          className="h-auto"
          src="https://placehold.co/500x1000"
          alt="logo"
        />
      </div>
      <div className="w-1/2 mr-[100px]">
        <h1 className="w-80 text-left mb-4 mt-10 text-5xl font-archivo p-8 bg-slate-300 mx-0.5 text-slate-800 h-4">
          Administrator Login Page
        </h1>
        <label className="form-control w-full max-w-xs mt-5">
          <div className="label">
            <span className="label-text text-white">Administrator Email</span>
          </div>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        {/* <p></p> */}
        <label className="form-control w-full max-w-xs mt-5">
          <div className="label">
            <span className="label-text text-white">
              Administrator Password
            </span>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <button className="btn mt-5">Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;
