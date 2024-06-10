import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo/LogoOnly.png";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import books from "../images/logo/books.jpeg";

function UpdatedRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: null,
    email: null,
    password: null,
    address: null,
    phoneNumber: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      toast.error("Password mismatch");
    }
  };

  const signUpUser = (userData) => {
    axios
      .post("http://localhost:8081/customers/register", userData)
      .then((response) => {
        console.log("Signup successful:", response.data);
        toast.success("Signed Up Successfully", {
          position: "top-right",
          autoClose: 1500, // Show for 1.5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-archivo">
      <div className="bg-white p-8 md:p-16 flex items-center">
        <div className="max-w-md mx-auto">
          <NavLink to="/">
            <img
              className="mx-auto my-1 mb-5 sm:w-32 max-sm:h-[200px] lg:h-[100px]"
              src={logo}
              alt="Logo"
            />
          </NavLink>
          <div>
            <h2 className="text-2xl font-semibold leading-9 tracking-tight text-gray-900 mb-2 mx-auto">
              Sign Up
            </h2>
            {/* <h5 className="mb-8">Enter your details to sign up</h5> */}
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={formData.fullName || ""}
                  onChange={handleInputChange}
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
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address"
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={formData.email || ""}
                  onChange={handleInputChange}
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
                  minLength={10}
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={formData.phoneNumber || ""}
                  onChange={handleInputChange}
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
                  value={formData.address || ""}
                  onChange={handleInputChange}
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
                  minLength={8}
                  autoComplete="password"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={formData.password || ""}
                  onChange={handleInputChange}
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
                  minLength={8}
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={formData.confirmPassword || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-neutral w-full hover:text-white"
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
      <div className="bg-slate-200 hidden md:block max-h-screen overflow-hidden">
        <img src={books} className="h-full w-full object-cover" alt="Books" />
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdatedRegister;
