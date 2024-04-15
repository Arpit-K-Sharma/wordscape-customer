import React from "react";
import logo from ".././images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";

function SignUp() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-zinc-800 my-auto">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <img
          className="mx-auto my-1 mb-5"
          src={logo}
          alt="Logo"
          width="120"
          height="120"
        />
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Sign Up for WordScape
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered bg-slate-100 text-zinc-500 placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered bg-slate-100 text-zinc-500 placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              className="w-full input input-bordered bg-slate-100 text-zinc-500 placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Primary Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="+977 98XXXXXXXX"
              className="w-full input input-bordered bg-slate-100 text-zinc-500 placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered bg-slate-100 text-zinc-500 placeholder:text-zinc-500"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered bg-slate-100 text-zinc-500 placeholder:text-zinc-500"
            />
          </div>
          <div className="flex">
            <button className="btn btn-primary mt-5 ml-[280px] align-center text-white bg-[#0369a1] hover:bg-slate-600">
              Sign Up
            </button>
            <NavLink to="/login">
              <button className="btn btn-primary mt-5 ml-6 align-center text-white bg-[#312e81] hover:bg-slate-600">
                Login
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;