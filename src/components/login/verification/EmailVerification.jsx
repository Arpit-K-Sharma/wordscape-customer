import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import Navbar from "../../navbar/navbar";
import MobileMenu from "../../navbar/mobile-menu";
import Footer from "../../navbar/footer";
import { baseURL } from "../../axiosInstance";

function EmailVerification() {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    } else {
      toast.error("Email not found. Please register again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate("/register");
    }
  }, [location, navigate]);

  const handleVerifyOTP = async () => {
    console.log("Check");
    if (otpCode.length !== 6) {
      toast.error("OTP code must be exactly 6 digits.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${baseURL}/customers/verify`, {
        otp: parseInt(otpCode),
        email: email,
      });
      console.log("Email verified successfully!");
      toast.success("Email verified successfully", {
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
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error verifying email:", error);
      toast.error("Invalid OTP code", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length <= 6 && /^\d*$/.test(value)) {
      setOtpCode(value);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    try {
      await axios.post(`${baseURL}/customers/resend`, {
        email: email,
      });
      toast.success("OTP resent successfully", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("Failed to resend OTP", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <MobileMenu />
      <div className="flex flex-col items-center justify-center h-[650px] font-archivo">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center mb-6">
            Email Verification
          </h1>
          <div className="mb-5 text-center">
            <p>
              Please enter your OTP code sent to{" "}
              <span className="font-bold">{email}</span> to complete the sign-up
              process.
            </p>
          </div>
          <input
            type="text"
            value={otpCode}
            maxLength="6"
            pattern="\d*"
            onChange={handleChange}
            placeholder="Enter Your Verification Code"
            className="w-full px-5 py-5 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
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
          <div className="mt-5 text-center">
            <button
              className="text-blue-600 hover:underline"
              onClick={handleResendOTP}
              disabled={resendLoading}
            >
              {resendLoading ? (
                <AiOutlineLoading className="animate-spin mr-2 inline" />
              ) : null}{" "}
              Resend OTP
            </button>
          </div>
        </div>
        {/* <ToastContainer /> */}
      </div>
      <Footer />
    </div>
  );
}

export default EmailVerification;
