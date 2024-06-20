import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import MobileMenu from "../navbar/mobile-menu";
import Footer from "../navbar/footer";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("ROLE_CUSTOMER");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:8081/home/forgot", {
        email: email,
        role: role,
      });
      console.log("Reset password email sent!");
      setTimeout(() => {
        console.log("Toast Message");
        setShowOTP(true);
        toast.success("Email sent successfully");
      }, 1500);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Customer doesn't exist");
    }
  };

  const handleVerifyOTP = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:8081/home/newPassword",
        {
          otp: otp,
          newPassword: password,
          email: email,
          role: "ROLE_CUSTOMER",
        }
      );
      setShowForm(true);
      console.log("Password reset successful!");
      toast.success("Password changed successfully");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className="flex flex-col items-center justify-center h-[640px] max-sm:h-[540px] font-archivo">
        <div className="max-w-md w-full p-6 bg-white rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-6">
            Forgot Password
          </h1>
          <div className="mb-5">
            <p>It appears you have forgotten your password.</p>
            <p>
              If you have a registered email with WordScape, you will receive an
              OTP code.
            </p>
          </div>
          {showOTP ? (
            <>
              <input
                type="text"
                maxLength="6"
                value={otp}
                placeholder="Enter your OTP Code"
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-5 py-5 mt-6 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="password"
                placeholder="Enter your new password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 mt-6 py-5 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <input
                type="password"
                placeholder="Confirm your password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="w-full px-5 mt-6 py-5 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                onClick={handleVerifyOTP}
                className="btn max-lg:w-full mt-6 bg-zinc-800 hover:bg-zinc-900 text-white mt-5 w-full"
              >
                Verify OTP
              </button>
            </>
          ) : (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            </>
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
      <Footer />
    </>
  );
}

export default ForgotPassword;
