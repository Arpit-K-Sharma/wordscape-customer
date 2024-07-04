import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLoading } from "react-icons/ai";
import Navbar from "../../navbar/navbar";
import MobileMenu from "../../navbar/mobile-menu";
import Footer from "../../navbar/footer";

function EmailVerification() {
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve email from location state
    const emailFromState = location.state?.email;
    if (emailFromState) {
      setEmail(emailFromState);
    } else {
      // If email is not in state, redirect to registration or show an error
      toast.error("Email not found. Please register again.");
      navigate("/register");
    }
  }, [location, navigate]);

  const handleVerifyOTP = async () => {
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

  return (
    <>
      <Navbar />
      <MobileMenu />
      <div className="flex flex-col items-center justify-center h-[650px] font-archivo">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center mb-6">
            Email Verification
          </h1>
          <div className="mb-5">
            <p>
              Please enter your OTP code sent to {email} to complete the sign-up
              process.
            </p>
          </div>
          <input
            type="number"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
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
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default EmailVerification;
