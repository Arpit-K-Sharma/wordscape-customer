import React from "react";

function SignUp() {
  return (
    <div className="flex max-w bg-slate-500">
      <div className="w-1/2 h-auto">
        <img
          className="h-auto"
          src="https://placehold.co/500x1000"
          alt="logo"
        />
      </div>
      <div className="w-1/2 flex flex-col mr-[100px]">
        <h1 className="w-80 text-left mb-4 mt-10 text-5xl font-archivo p-8 bg-slate-300 mx-0.5 text-slate-800 h-4">
          Welcome to the sign up page
        </h1>
        <div className="flex flex-row">
          <div className="w-1/2 mr-5">
            <label className="form-control w-full max-w-xs mt-5">
              <div className="label">
                <span className="label-text text-white">What is your name?</span>
              </div>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mt-5">
              <div className="label">
                <span className="label-text text-white">What is your email?</span>
              </div>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mt-5">
              <div className="label">
                <span className="label-text text-white">What is your address?</span>
              </div>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="w-1/2">
            <label className="form-control w-full max-w-xs mt-5">
              <div className="label">
                <span className="label-text text-white">
                  What is your primary phone number?
                </span>
              </div>
              <input
                type="number"
                placeholder="+977 98XXXXXXXX"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mt-5">
              <div className="label">
                <span className="label-text text-white">
                  What do you want to set your password?
                </span>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mt-5">
              <div className="label">
                <span className="label-text text-white">Confirm Password</span>
              </div>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-row justify-end mt-10">
          <button className="btn btn-neutral mx-5">Register</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
