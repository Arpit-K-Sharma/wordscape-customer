import React from "react";
import logo from ".././images/logo/LogoOnly.png";
import { NavLink } from "react-router-dom";
import axios from "../axiosInstance";
import { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "../navbar/navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "/home/login";
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
        Cookies.set("userToken", token, { expires: 7 });

        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          if (decoded.id) {
            console.log("id:", decoded.id);
            localStorage.setItem("id", decoded.id);
            toast.success("Signed In Successfully", {
              position: "top-right",
              autoClose: 2000, // Show for 2 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              setLoggedIn(true);
            }, 2000); // Navigate after 2 seconds
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
      toast.error("Login Failed", {
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

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "/home/login";
      const data = {
        email: email,
        password: password,
        role: "ROLE_ADMIN",
      };
      console.log("Request Data:", data);
      const response = await axios.post(url, data);
      console.log("Response Data:", response.data);

      if (response.data && response.data.token) {
        const token = response.data.token;
        Cookies.set("adminToken", token, { expires: 7 }); // Save admin token with a different name

        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          if (decoded.id) {
            console.log("id:", decoded.id);
            localStorage.setItem("id", decoded.id);
            toast.success("Signed In Successfully", {
              position: "top-right",
              autoClose: 2000, // Show for 2 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              setIsAdmin(true); // Set isAdmin to true for admin login
            }, 2000); // Navigate after 2 seconds
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
      toast.error("Login Failed", {
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

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "/home/login";
      const data = {
        email: email,
        password: password,
        role: "ROLE_USER",
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
            toast.success("Signed In Successfully", {
              position: "top-right",
              autoClose: 2000, // Show for 2 seconds
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              setLoggedIn(true);
            }, 2000); // Navigate after 2 seconds
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
      toast.error("Login Failed", {
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

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

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
            <div>
              <label className="label">
                <span className="text-base label-text">Role</span>
              </label>
              <select
                className="w-full select select-bordered bg-slate-100 text-zinc-900"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option value="ROLE_CUSTOMER">Customer</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_USER">Employee</option>
              </select>
            </div>
            <a
              href="#"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div className="flex flex-col">
              {role === "ROLE_ADMIN" ? (
                <button
                  className="btn btn-primary mt-8 lg:mt-0 lg:mr-[20px] lg:w-[500px] text-white bg-[#0369a1] hover:bg-slate-600"
                  onClick={handleAdminLogin}
                >
                  Login as Admin
                </button>
              ) : role === "ROLE_USER" ? (
                <button
                  className="btn btn-primary mt-8 lg:mt-0 lg:mr-[20px] lg:w-[500px] text-white bg-[#0369a1] hover:bg-slate-600"
                  onClick={handleEmployeeLogin}
                >
                  Login as Employee
                </button>
              ) : (
                <button
                  className="btn btn-primary mt-8 lg:mt-0 lg:mr-[20px] lg:w-[500px] text-white bg-[#0369a1] hover:bg-slate-600"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
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
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
