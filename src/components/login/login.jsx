import React from "react";
import logo from ".././images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "../navbar/navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8081/home/login";
      const data = {
        email: email,
        password: password,
        role: "ROLE_CUSTOMER",
      };
      console.log("Request Data:", data);
      const response = await axios.post(url, data);
      console.log("Response Data:", response.data);

      if (response.data && response.data.token) {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 7 });

        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          if (decoded.id) {
            console.log("id:", decoded.id);
            localStorage.setItem("id", decoded.id);
          } else {
            console.error("Error: Username not found in the token");
          }
        } catch (decodeError) {
          console.error("Error decoding token:", decodeError);
        }
      } else {
        console.error("Error: No token found in the response");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="relative flex flex-col lg:justify-center h-[100vh] overflow-hidden">
        <div className="w-full p-6 mx-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 sm:w-96 max-sm:h-[100%] lg:w-[550px] ">
          <NavLink to="/">
            <img
              className="mx-auto my-1 mb-5 w-24 h-24 sm:w-32 sm:h-32 lg:h-[150px]"
              src={logo}
              alt="Logo"
            />
          </NavLink>
          <h1 className="text-3xl font-semibold text-center text-gray-700 p-5">
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <a
              href="#"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div className="flex flex-col">
              <button
                className="btn btn-primary mt-8 lg:mt-0 lg:mr-[20px] lg:w-[500px] text-white bg-[#0369a1] hover:bg-slate-600"
                onClick={handleLogin}
              >
                Login
              </button>
              <div className="flex flex-col w-full">
                <div className="divider font-semibold">OR</div>
              </div>
              <NavLink to="/signup">
                <button className="btn btn-primary lg:mt-0 w-full lg:w-[500px] text-white bg-[#312e81] hover:bg-slate-600">
                  Sign Up
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
