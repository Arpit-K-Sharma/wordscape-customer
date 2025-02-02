import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import MobileMenu from "../navbar/mobile-menu";
import Footer from "../navbar/footer";
import axios from "../axiosInstance";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      await axios.post("/home/forgot", {
        email: email
      });
      console.log("Reset password email sent!");
      setTimeout(() => {
        toast.success("Email sent successfully");

        console.log("Toast Message");
        setShowOTP(true);
      });
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Customer doesn't exist");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await axios.post("/home/newPassword", {
        otp: otp,
        newPassword: password,
        email: email
      });
      setShowForm(true);
      console.log("Password reset successful!");
      setTimeout(() => {
        toast.success("Password changed successfully");
        navigate("/login");
      });
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
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
                {loading ? (
                  <AiOutlineLoading className="animate-spin mr-2" />
                ) : null}
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
              <button
                className="btn max-lg:w-full bg-zinc-800 hover:bg-zinc-900 text-white mt-5 w-full"
                onClick={handleSendEmail}
              >
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <AiOutlineLoading className="animate-spin text-white" />
                  </div>
                ) : (
                  "Send Email"
                )}
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
