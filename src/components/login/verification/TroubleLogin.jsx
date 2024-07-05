import React, { useState } from "react";
import axios from "../../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import Navbar from "../../navbar/navbar";
import MobileMenu from "../../navbar/mobile-menu";
import Footer from "../../navbar/footer";

function TroubleLogin() {
  const [otpCode, setOtpCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8081/customers/resend", {
        email: email,
      });
      toast.success("OTP sent successfully");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otpCode.length !== 6) {
      toast.error("OTP code must be exactly 6 digits.");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8081/customers/verify", {
        otp: parseInt(otpCode),
        email: email,
      });
      console.log("Email verified successfully!");
      toast.success("Email verified successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Invalid OTP code");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "otp") {
      if (value.length <= 6 && /^\d*$/.test(value)) {
        setOtpCode(value);
      }
    }
  };

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className="flex flex-col items-center justify-center min-h-[650px] font-archivo py-10">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center mb-6">
            Trouble logging in?
          </h1>
          {!otpSent ? (
            <>
              <p>Enter your email that you tried registering to on WordScape</p>
              <div className="mb-5 mt-5">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter Your Email"
                  className="w-full px-5 py-3 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                  className="btn w-full mt-5 mb-1 bg-zinc-600 hover:bg-zinc-700 text-white"
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  {loading ? (
                    <AiOutlineLoading className="animate-spin mr-2 inline" />
                  ) : null}
                  Send OTP Code
                </button>
              </div>
            </>
          ) : (
            <>
              <p>Enter the OTP sent to your email</p>
              <input
                type="text"
                name="otp"
                value={otpCode}
                maxLength="6"
                pattern="\d*"
                onChange={handleChange}
                placeholder="Enter Your Verification Code"
                className="w-full px-5 py-3 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
              <button
                className="btn w-full bg-zinc-800 hover:bg-zinc-900 text-white mt-5"
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                {loading ? (
                  <AiOutlineLoading className="animate-spin mr-2 inline" />
                ) : null}
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TroubleLogin;
