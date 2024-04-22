import { useState } from "react";

import "./App.css";
import HomePage from "./components/home";
import SignIn from "./components/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Route correctly
import Dashboard from "./components/dashboard/UserDrawer";
import ProductCard from "./components/cart/productcard";
import Cart from "./components/cart/cart";
import MobileLanding from "./components/mobile-landing/mobilelanding";
import WebLanding from "./components/landing/landing";
import SignUp from "./components/login/signup";
import AdminLogin from "./components/login/adminlogin";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminCustomer from "./components/admin/menu/customer/customer";
import Paper from "./components/admin/menu/paper/paper";
import Users from "./components/admin/menu/users/users";
import Binding from "./components/admin/menu/binding/binding";
import Lamination from "./components/admin/menu/lamination/lamination";
import Plate from "./components/admin/menu/plate/plate";
import CostCalculation from "./components/costcalculation/costcalculation";
import OrderPlacement from "./components/orderplacement/OrderPages/PlaceOrder";
import UserDashboard from "./components/dashboard/UserDashboard";
import JobCard from "./components/jobcard/jobcard";
import PrevJobCard from "./components/jobcard/previousjobcard/jobcard1";
// import DashboardTasks from "./components/dashboard/DashboardTasks";
import NJobCard from "./components/newjobcard/njobcard";
import PaperSize from "./components/admin/menu/papersize/papersize.jsx";
import PaperThickness from "./components/admin/menu/paperthickness/paperthickness.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLanding />} />
        <Route path="/web" element={<WebLanding />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/cost" element={<CostCalculation />} />
        {/* <Route path="/jobcard" element={<JobCard />} />
        <Route path="/pjobcard" element={<PrevJobCard />} /> */}
        <Route path="/jobcard" element={<NJobCard />} />

        <Route path="/order/:step" element={<OrderPlacement />} />
        {/* <Route path="/order/2" element={<OrderPlacementSecond />} />
        <Route path="/order/3" element={<OrderPlacementThird />} />
        <Route path="/order/4" element={<OrderPlacementFourth />} />
        <Route path="/order/5" element={<OrderPlacementFifth />} /> */}

        <Route path="/user/dashboard" element={<UserDashboard />} />

        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/customer" element={<AdminCustomer />} />
        <Route path="/admin/paper" element={<Paper />} />
        <Route path="/admin/papersize" element={<PaperSize />} />
        <Route path="/admin/paperthickness" element={<PaperThickness />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/binding" element={<Binding />} />
        <Route path="/admin/lamination" element={<Lamination />} />
        <Route path="/admin/plate" element={<Plate />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<ProductCard />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
