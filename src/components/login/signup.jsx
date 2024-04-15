import React from "react";
import logo from ".././images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";

function SignUp() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-zinc-800">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:w-[600px]">
      <NavLink to="/">
        <img
          className="mx-auto my-1 mb-5"
          src={logo}
          alt="Logo"
          width="120"
          height="120"
        />
        </NavLink>
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
              <span className="text-base label-text ">Primary Phone Number</span>
            </label>
            <input
              type="white"
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
          <div className="flex flex-col lg:flex-row lg:items-center">
            <button className="btn btn-primary mt-5 lg:mt-0 lg:mr-[20px] text-white bg-[#0369a1] hover:bg-slate-600">
              Sign Up
            </button>
            <NavLink to="/login">
              <button className="btn btn-primary mt-5 lg:mt-0 lg:ml-2 text-white bg-[#0369a1] hover:bg-slate-600">
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