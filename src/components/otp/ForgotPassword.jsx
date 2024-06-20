import React from "react";
import Navbar from "../navbar/navbar";
import MobileMenu from "../navbar/mobile-menu";
import Footer from "../navbar/footer";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "../axiosInstance";
import { Navigate } from "react-router";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");

  const handleSendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8081/home/forgot", {
        email: email,
        role: role,
      });
      console.log("Reset password email sent!");
      setTimeout(() => {
        Navigate("/otp");
        toast.success("Email sent successfully");
      }, 1500);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Customer doesn't exist");
    }
  };

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className="flex flex-col items-center justify-center h-[640px] max-sm:h-[540px] font-archivo">
        {" "}
        <div className="max-w-md w-full p-6 bg-white rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-6">
            Forgot Password
          </h1>
          <div className=" mb-5 ">
            <p>It appears you have forgotten your password.</p>
            <p>
              If you have a registered email with WordScape, you will receive an
              OTP code.
            </p>
          </div>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-5 mb-4 border rounded-md mb-6 focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-5 py-3 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="ROLE_ADMIN">Admin</option>
            <option value="ROLE_CUSTOMER">Customer</option>
            <option value="ROLE_USER">User</option>
          </select>

          <button
            className="btn max-lg:w-full bg-zinc-800 hover:bg-zinc-900 text-white mt-5 w-full"
            onClick={handleSendEmail}
          >
            Send Email
          </button>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default ForgotPassword;
