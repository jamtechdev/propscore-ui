import { useState } from "react";
import "./App.css";
import { Route, Routes, Outlet } from "react-router";
import Register from "./Pages/Register/index.jsx";
import Login from "./Pages/Login/login.jsx";
import ResetPassword from "./Pages/ResetPassword/resetpassword.jsx";
import ForgotPassword from "./Pages/ForgotPassword/forgotpassword.jsx";
import VerifyEmailPage from "./Pages/ForgotPassword/VerifyEmailPage.jsx";
import Layout from "./Layout/layout.jsx";
import DashboardLayout from "./Layout/DashboardLayout.jsx";
import Home from "./Pages/Home/index.jsx";
import About from "./Pages/About/about.jsx";
import PropScore from "./Pages/PropScore/page.jsx";
import AccountSetting from "./Pages/Dashboard/accountSetting.jsx";
import Password from "./Pages/Dashboard/password.jsx";
import Subscription from "./Pages/Dashboard/subscription.jsx";
// import VerifyEmail from "./Component/VerifyEmail/verify.jsx"; 


function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/auth" element={<Outlet />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* <Route path="/">
        <Route path="verifyEmail" element={<VerifyEmail />} />
      </Route> */}

      {/* Main App Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="propscore" element={<PropScore />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route path="account-setting" element={<AccountSetting/>} />
        <Route path="password" element={<Password/>} />
        <Route path="subscription" element={<Subscription/>} />
      </Route>
    </Routes>
  );
}

export default App;
