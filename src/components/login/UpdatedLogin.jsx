import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import books from "../images/logo/books.jpg";
import logo from "../images/logo/LogoOnly.png";
import axios from "../axiosInstance";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "/home/login";
      const data = {
        email: email,
        password: password,
        role: role,
      };
      console.log("Request Data:", data);
      const response = await axios.post(url, data);
      console.log("Response Data:", response.data);

      if (response.data && response.data.token) {
        const token = response.data.token;
        Cookies.set("accessToken", token, { expires: 7 });

        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          if (decoded.id) {
            console.log("id:", decoded.id);
            localStorage.setItem("id", decoded.id);
            toast.success("Signed In Successfully", {
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
              if (role === "ROLE_ADMIN") {
                handleAdminLogin();
              } else if (role === "ROLE_USER") {
                handleEmployeeLogin();
              } else {
                setLoggedIn(true);
              }
            }, 1200);
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
        Cookies.set("accessToken", token, { expires: 7 }); // Save admin token with "adminToken" name

        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token: ", decoded);

          if (decoded.id) {
            console.log("id of decoded:", decoded.id);
            localStorage.setItem("id", decoded.id);
            setTimeout(() => {
              setIsAdmin(true);
            }, 1500);
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
        autoClose: 2000,
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
        Cookies.set("accessToken", token, { expires: 7 });
        try {
          const decoded = jwtDecode(token);
          console.log("Decoded Token:", decoded);

          if (decoded.id) {
            console.log("id:", decoded.id);
            // localStorage.setItem("id", decoded.id);
            toast.success("Signed In Successfully", {
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
              setIsEmployee(true);
            }, 2000);
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

  if (isEmployee) {
    return <Navigate to="/staff/dashboard" />; // Replace with the appropriate path
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 max-h-screen font-archivo">
      <div className="bg-zinc-50 p-8 md:p-16 flex items-center">
        <div className="max-w-md mx-auto w-[450px]">
          <NavLink to="/">
            <img
              className="mx-auto my-1 mb-5 sm:w-32 max-sm:h-[200px] lg:h-[100px] "
              src={logo}
              alt="Logo"
            />
          </NavLink>
          <div>
            <h2 className="text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-2 mx-auto text-[22px]">
              Sign in
            </h2>
            {/* <h5 className="mb-8">Enter your credentials to sign in</h5> */}
          </div>
          <form className="space-y-6">
            <div className="form-control w-full">
              <label htmlFor="email" className="label">
                <span className="label-text text-[16px] text-black">
                  Email address
                </span>
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
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              />
            </div>
            <div className="form-control w-full">
              <label htmlFor="password" className="label">
                <span className="label-text text-black text-[16px]">
                  Password
                </span>
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
            <div className="form-control w-full">
              <label htmlFor="role" className="label">
                <span className="label-text text-black text-[16px]">Role</span>
              </label>
              <select
                id="role"
                className="select select-bordered w-full bg-white text-gray-900"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="ROLE_CUSTOMER">Customer</option>
                <option value="ROLE_ADMIN">Admin</option>
                <option value="ROLE_USER">Employee</option>
              </select>
            </div>
            <div className="text-sm">
              <NavLink to="/forgotPassworf">
                <a className="block text-sm font-medium leading-6 text-gray-800 hover:text-gray-600">
                  Forgot password?
                </a>
              </NavLink>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-neutral w-full hover:text-white"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
            <h1 className="text-center">
              Don't have an account?{" "}
              <NavLink to="/signup">
                <a href="" className="text-slate-600">
                  Signup
                </a>
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

export default Signin;
