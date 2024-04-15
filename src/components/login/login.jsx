import React from "react";
import logo from ".././images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-zinc-800">
      <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 sm:w-96 lg:w-[550px]">
        <NavLink to="/">
          <img
            className="mx-auto my-1 mb-5 w-24 h-24 sm:w-32 sm:h-32 lg:h-[150px]"
            src={logo}
            alt="Logo"
          />
        </NavLink>
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Login to WordScape
        </h1>
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-800"
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-800"
            />
          </div>
          <a
            href="#"
            className="text-xs text-gray-600 hover:underline hover:text-blue-600"
          >
            Forget Password?
          </a>
          <div className="flex flex-col lg:flex-row lg:items-center">
          <button className="btn btn-primary mt-5 lg:mt-0 lg:mr-[20px] text-white bg-[#0369a1] hover:bg-slate-600">
              Login
            </button>
            <NavLink to="/signup">
              <button className="btn btn-primary mt-5 lg:mt-0 w-full lg:w-auto text-white bg-[#312e81] hover:bg-slate-600">
                Sign Up
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
