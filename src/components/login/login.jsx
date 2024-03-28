import React from "react";



function SignIn() {
  return (
    <div className="flex max-w bg-slate-500">
      <div className="w-1/2 h-auto">
        <img
          className="h-auto"
          src="https://placehold.co/600x1000"
          alt="logo"
        />
      </div>
      <div className="w-1/2">
        <h1 className="w-80 text-left mb-4 mt-10 text-5xl font-archivo p-8 bg-slate-300 mx-0.5 text-slate-800 h-4">
          Welcome to the login page
        </h1>
        <h2 className="mt-10 text-archivo text-2xl text-white">
          Please put down your credentials
        </h2>
        <label className="form-control w-full max-w-xs mt-5">
          <div className="label">
            <span className="label-text text-white">
              What is your registered email?
            </span>
          </div>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs mt-5">
          <div className="label">
            <span className="label-text text-white">
              What is your password?
            </span>
          </div>
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs"
          />
          <div className="label">
            <span className="label-text-alt text-slate-300">Forgot password?</span>
          </div>
        </label>

        <button className="btn">Login</button>
        <button className="btn btn-neutral mt-5 mx-5">Signup</button>
      </div>
    </div>
  );
}

export default SignIn;
