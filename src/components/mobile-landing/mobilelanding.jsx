import React from "react";
import "./cssforicons.css";
import Navbar from "../navbar/navbar";
import MobileNavbar from "../navbar/mobile-navbar";

function MobileLanding() {
  return (
    <div className="bg-zinc-800 h-[100vh] ">
      <Navbar />
      <MobileNavbar />
    </div>
  );
}

export default MobileLanding;
