import React from "react";
import Navbar from "../navbar/navbar";
import MobileMenu from "../navbar/mobile-menu";
import Footer from "../navbar/footer";

function ForgotPassword() {
  const handleSendEmail = () => {
    // Logic to send reset password email
    console.log("Reset password email sent!");
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
            className="w-full px-5 py-5 mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button className="btn max-lg:w-full bg-zinc-800 hover:bg-zinc-900 text-white mt-5 w-full">
            Send Email
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
