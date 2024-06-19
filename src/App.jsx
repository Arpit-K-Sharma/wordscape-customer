import { useState } from "react";

import "./App.css";
import HomePage from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import Route correctly
import MobileLanding from "./components/mobile-landing/mobilelanding";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminCustomer from "./components/admin/menu/customer/customer";
import Paper from "./components/admin/menu/paper/paper";
import Users from "./components/admin/menu/users/users";
import Binding from "./components/admin/menu/binding/binding";
import Lamination from "./components/admin/menu/lamination/lamination";
import Plate from "./components/admin/menu/plate/plate";
import CostCalculation from "./components/admin/costcalculation/costcalculation";
import OrderPlacement from "./components/orderplacement/OrderPages/PlaceOrder";
// import DashboardTasks from "./components/dashboard/DashboardTasks";
import NJobCard from "./components/admin/jobcard/njobcard";
import PaperSize from "./components/admin/menu/papersize/papersize.jsx";
import PaperThickness from "./components/admin/menu/paperthickness/paperthickness.jsx";
import Orders from "./components/admin/menu/order/order.jsx";
import ProtectedRoutes from "./components/protectedRoutes.jsx";
import Profile from "./components/dashboard/profile.jsx";
import CoverTreatment from "./components/admin/menu/covertreatment/covertreatment.jsx";
import UserOrder from "./components/dashboard/userOrder.jsx";
import OrderDetails from "./components/dashboard/orderDetail.jsx";
import StaffDashboard from "./components/staff/StaffDashboard.jsx";
import StaffPaper from "./components/staff/menu/paper/paper.jsx";
import StaffPaperSize from "./components/staff/menu/papersize/papersize.jsx";
import StaffPaperThickness from "./components/staff/menu/paperthickness/paperthickness.jsx";
import StaffBinding from "./components/staff/menu/binding/binding.jsx";
import StaffLamination from "./components/staff/menu/lamination/lamination.jsx";
import StaffCoverTreatment from "./components/staff/menu/covertreatment/covertreatment.jsx";
import StaffPlate from "./components/staff/menu/plate/plate.jsx";
import StaffCustomer from "./components/staff/menu/customer/customer.jsx";
import StaffOrders from "./components/staff/menu/order/order.jsx";
import ProtectedUser from "./components/protectedUser.jsx";
import UpdatedLogin from "./components/login/UpdatedLogin.jsx";
import UpdatedRegister from "./components/login/UpdatedRegister.jsx";
import AboutUs from "./components/footer/about-us.jsx";
import NotFoundPage from "./components/NotFoundPage.jsx";
import Contactuspage from "./components/footer/contact-us.jsx";
import FAQ from "./components/navbar/faq.jsx";
import ForgotPassword from "./components/otp/ForgotPassword.jsx";
import OTPForm from "./components/otp/Otp.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLanding />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<UpdatedLogin />} />
        <Route path="/signup" element={<UpdatedRegister />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<Contactuspage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTPForm />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customer" element={<AdminCustomer />} />
          <Route path="/admin/paper" element={<Paper />} />
          <Route path="/admin/papersize" element={<PaperSize />} />
          <Route path="/admin/paperthickness" element={<PaperThickness />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/binding" element={<Binding />} />
          <Route path="/admin/lamination" element={<Lamination />} />
          <Route path="/admin/covertreatment" element={<CoverTreatment />} />
          <Route path="/admin/plate" element={<Plate />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/jobcard" element={<NJobCard />} />
          <Route path="/cost" element={<CostCalculation />} />

          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/staff/paper" element={<StaffPaper />} />
          <Route path="/staff/papersize" element={<StaffPaperSize />} />
          <Route
            path="/staff/paperthickness"
            element={<StaffPaperThickness />}
          />
          <Route path="/staff/binding" element={<StaffBinding />} />
          <Route path="/staff/lamination" element={<StaffLamination />} />
          <Route
            path="/staff/covertreatment"
            element={<StaffCoverTreatment />}
          />
          <Route path="/staff/plate" element={<StaffPlate />} />
          <Route path="/staff/customer" element={<StaffCustomer />} />
          <Route path="/staff/orders" element={<StaffOrders />} />
        </Route>

        <Route element={<ProtectedUser />}>
          <Route path="/order/:step" element={<OrderPlacement />} />
          <Route path="/user/orders" element={<UserOrder />} />
          <Route path="/user/edit" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
