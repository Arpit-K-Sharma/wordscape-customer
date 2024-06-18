import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo/LogoOnly.png";
import axios from "../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import books from "../images/logo/books.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function UpdatedRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phoneNumber: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const errors = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
    };
    setValidationErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      toast.error("Password mismatch");
    }
  };

  const signUpUser = (userData) => {
    axios
      .post("/customers/register", userData)
      .then((response) => {
        toast.success("Signed Up Successfully", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/login");
        }, 1200);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message;
        toast.error(errorMessage);
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen font-archivo">
      <div className="bg-white p-8 md:p-16 flex items-center">
        <div className="max-w-md mx-auto">
          <NavLink to="/">
            <img
              className="mx-auto my-1 mb-5 sm:w-32 lg:h-[100px]"
              src={logo}
              alt="Logo"
            />
          </NavLink>
          <div>
            <h2 className="text-2xl font-semibold leading-9 tracking-tight text-gray-900 mb-2 mx-auto">
              Sign Up
            </h2>
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
                  value={formData.fullName}
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
                  value={formData.email}
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
                  maxLength="10"
                  pattern="\d*"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={formData.phoneNumber}
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
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="form-control w-full">
                <label htmlFor="password" className="label">
                  <span className="label-text text-gray-700">Password</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  minLength={8}
                  autoComplete="new-password"
                  required
                  className="input input-bordered w-full bg-white text-gray-900"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <ul className="mt-5 text-sm text-gray-600 list-none">
                  <li
                    className={`flex items-center ${
                      validationErrors.minLength
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={validationErrors.minLength ? faCheck : faTimes}
                      className="mr-1"
                    />
                    At least 8 characters long
                  </li>
                  <li
                    className={`flex items-center ${
                      validationErrors.hasUpperCase
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={validationErrors.hasUpperCase ? faCheck : faTimes}
                      className="mr-1"
                    />
                    Include uppercase letters
                  </li>
                  <li
                    className={`flex items-center ${
                      validationErrors.hasLowerCase
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={validationErrors.hasLowerCase ? faCheck : faTimes}
                      className="mr-1"
                    />
                    Include lowercase letters
                  </li>
                  <li
                    className={`flex items-center ${
                      validationErrors.hasNumber
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={validationErrors.hasNumber ? faCheck : faTimes}
                      className="mr-1"
                    />
                    Add numbers (0-9)
                  </li>
                  <li
                    className={`flex items-center ${
                      validationErrors.hasSpecialChar
                        ? "text-green-500"
                        : "text-black"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={validationErrors.hasSpecialChar ? faCheck : faTimes}
                      className="mr-1"
                    />
                    Use special characters (!@#$%^&*)
                  </li>
                </ul>
              </div>
              <div className="form-control w-full">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text text-gray-700">
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
                  value={formData.confirmPassword}
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
                <span className="text-slate-600">Login</span>
              </NavLink>
            </h1>
          </form>
        </div>
      </div>
      <div className="bg-slate-200 lg:block hidden md:max-h-screen md:overflow-hidden">
        <img
          src={books}
          className="fixed h-full w-full object-cover"
          alt="Books"
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default UpdatedRegister;
