import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import logo from "../images/logo/LogoOnly.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import books from "../images/logo/books.jpeg";

import "react-toastify/dist/ReactToastify.css";

function UpdatedRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8081/customers/register";
      const data = {
        fullName: fullName,
        email: email,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
      };
      console.log("Request Data:", data);
      const response = await axios.post(url, data);
      console.log("Response Data:", response.data);

      if (response.data && response.data.token) {
        // Handle token and login
        toast.success("Signed Up Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          setLoggedIn(true);
        }, 2000);
      } else {
        console.error("Error: No token found in the response");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Sign Up Failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="bg-white p-8 md:p-16 flex items-center">
        <div className="max-w-md mx-auto">
          <NavLink to="/">
            <img
              className="mx-auto my-1 mb-5 sm:w-32 sm:h-32 lg:h-[140px]"
              src={logo}
              alt="Logo"
            />
          </NavLink>
          <div>
            <h2 className="text-2xl font-semibold leading-9 tracking-tight text-gray-900 mb-2 mx-auto">
              Sign Up
            </h2>
            <h5 className="mb-8">Enter your details to sign up</h5>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label htmlFor="fullName" className="label">
                  <span className="label-text text-black">Full Name</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="form-control w-full lg:ml-9 max-sm:mx-auto">
                <label htmlFor="email" className="label">
                  <span className="label-text text-black">Email address</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label htmlFor="phoneNumber" className="label">
                  <span className="label-text text-black">Phone Number</span>
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="form-control w-full lg:ml-9 max-sm:mx-auto">
                <label htmlFor="address" className="label">
                  <span className="label-text text-black">Address</span>
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control w-full">
                <label htmlFor="password" className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-control w-full lg:ml-9 max-sm:mx-auto">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text text-black">
                    Confirm Password
                  </span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-neutral w-full hover:text-white"
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </div>
            <h1 className="text-center">
              Already have an account?{" "}
              <NavLink to="/login">
                <a href="" className="text-slate-600">
                  Login
                </a>
              </NavLink>
            </h1>
          </form>
        </div>
      </div>
      <div className="bg-slate-200 hidden md:block">
        <img
          src={books}
          className="max-h-screen w-full max-w-screen-lg"
          alt="Books"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdatedRegister;
