import { useState } from "react";

import "./App.css";
import HomePage from "./components/home";
import SignIn from "./components/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Route correctly
import Dashboard from "./components/dashboard/dashboard";
import ProductCard from "./components/cart/productcard";
import Cart from "./components/cart/cart";
import MobileLanding from "./components/mobile-landing/mobilelanding";
import WebLanding from "./components/landing/landing";
import SignUp from "./components/login/signup";
import AdminLogin from "./components/login/adminlogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminCustomer from "./components/admin/menu/customer/customer";
import Paper from "./components/admin/menu/paper/paper";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLanding />} />
          <Route path="/web" element={<WebLanding />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customer" element={<AdminCustomer />} />
          <Route path="/admin/paper" element={<Paper/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<ProductCard />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
