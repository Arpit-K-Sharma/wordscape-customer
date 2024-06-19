import React, { useState } from "react";
import Navbar from "../navbar/navbar";
import MobileMenu from "../navbar/mobile-menu";
import Footer from "../navbar/footer";

function OTPForm() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleVerifyOTP = () => {
    // Logic to verify the OTP code
    if (otp.length === 6) {
      console.log("OTP code verified!");
    } else {
      console.log("Please enter a valid 6-digit OTP code.");
    }
  };

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className="flex flex-col items-center min-h-screen justify-center font-archivo">
        <div className="max-w-md w-full p-6 bg-white rounded-lg">
          <h1 className="text-4xl font-bold text-center mb-6">
            Enter OTP Code
          </h1>
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-5 py-5 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="max-w-md w-full p-6 bg-white rounded-lg mt-4 mb-5">
          <h2 className="text-2xl font-bold text-center mb-5">
            Enter New Password
          </h2>
          <input
            type="password"
            placeholder="Enter your new password"
            className="w-full px-5 py-5 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <input
            type="password"
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            className="mt-5 w-full px-5 py-5 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleVerifyOTP}
            className="btn max-lg:w-full bg-zinc-800 hover:bg-zinc-900 text-white mt-5 w-full"
          >
            Verify OTP
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OTPForm;
