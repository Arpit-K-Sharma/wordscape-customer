import React from "react";
import { NavLink } from "react-router-dom";
import { MdError } from "react-icons/md"; // Import the error icon

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div className="text-center p-4">
        <div className="flex flex-col justify-center items-center">
          <MdError className="text-yellow-500 text-6xl md:text-8xl lg:text-9xl mb-4" />{" "}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-yellow-500">
            404 - Page Not Found
          </h1>
        </div>
        <p className="text-xl md:text-2xl lg:text-4xl text-white font-bold mt-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <NavLink to="/">
          <button className="btn btn-neutral mt-8 text-white text-lg px-10 py-3">
            Return Home
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default NotFoundPage;
