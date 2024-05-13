import React from "react";
import logo from ".././images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    fullName: null,
    email: null,
    password: null,
    address: null,
    phoneNumber: null,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform validation checks here
    if (formData.password === formData.confirmPassword) {
      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
      };
      signUpUser(userData);
    } else {
      console.log("Password mismatch");
    }
  };

  const signUpUser = (userData) => {
    axios
      .post("http://localhost:8081/customers/register", userData)
      .then((response) => {
        console.log("Signup successful:", response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  const setChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-zinc-800">
      <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 sm:w-96 lg:w-[550px]">
        <NavLink to="/">
          <img
            className="mx-auto my-1 mb-5 w-24 h-24 sm:w-32 sm:h-32"
            src={logo}
            alt="Logo"
            width="120"
            height="120"
          />
        </NavLink>
        <h1 className="text-3xl font-semibold text-center text-gray-700">
          Sign Up for WordScape
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-500"
              value={formData.fullName}
              onChange={setChange}
              name="fullName"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Email</span>
            </label>
            <input
              type="text"
              placeholder="Email Address"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-500"
              value={formData.email}
              onChange={setChange}
              name="email"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="Address"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-500"
              value={formData.address}
              onChange={setChange}
              name="address"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text ">
                Primary Phone Number
              </span>
            </label>
            <input
              type="white"
              placeholder="+977 98XXXXXXXX"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-500"
              value={formData.phoneNumber}
              onChange={setChange}
              name="phoneNumber"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-500"
              value={formData.password}
              onChange={setChange}
              name="password"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered bg-slate-100 text-zinc-900 placeholder:text-zinc-500"
              value={formData.confirmPassword}
              onChange={setChange}
              name="confirmPassword"
              required
            />
          </div>
          <div className="flex flex-col">
            <button className="btn btn-primary mt-8 lg:mt-0 lg:mr-[20px] lg:w-[500px] text-white bg-[#0369a1] hover:bg-slate-600">
              Signup
            </button>
            <div className="flex flex-col w-full">
              <div className="divider font-semibold">OR</div>
            </div>
            <NavLink to="/login">
              <button className="btn btn-primary lg:mt-0 w-full lg:w-[500px] text-white bg-[#312e81] hover:bg-slate-600">
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
