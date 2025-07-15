import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import VerifyEmail from "../../Component/VerifyEmail/verify.jsx";
import api from "../../api.js";
import Header_V1 from "../../Component/header/header-v1/header.jsx";
import { toast } from "react-toastify"; // Make sure this is imported

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { email, userId, mode } = location.state || {};

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [otpSuccess, setOtpSuccess] = useState(null);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false); // Initialize as false

  const goBack = () => {
    navigate(-1);
  };

  // Redirect if data is missing
  useEffect(() => {
    if (!email || !mode || (mode !== "reset" && !userId)) {
      navigate("/auth/login");
    }
  }, [email, mode, userId, navigate]);

  const onOtpChange = (e) => setOtp(e.target.value);

  const verifyEndpoints = {
    login: "/verify-otp",
    register: "/verify-otp",
    reset: "/verify-otp-reset",
  };

  const resendEndpoints = {
    login: "/resend-otp",
    register: "/resend-otp",
    reset: "/resend-otp-reset",
  };

const onVerify = async () => {
  setOtpError(null);
  setOtpSuccess(null);
  setLoading(true);
  try {
    const payload =
      mode === "reset" ? { email, otp } : { user_id: userId, otp };

    const response = await api.post(verifyEndpoints[mode], payload);
    const token = response?.data.token;

    setOtpError(null);
    setOtpSuccess("OTP verified successfully!");

    if (mode === "reset") {
      // toast.success("Password reset Successfully.");
      navigate("/auth/reset-password", { state: { email, otp } });
    } else {
      navigate("/");
      localStorage.setItem("token", token);
      toast.success("Registration Successful.");
    }
  } catch (error) {
    setOtpSuccess(null);
    setOtpError(
      error.response?.data?.error || "Invalid or expired OTP. Please try again."
    );
  } finally {
    setLoading(false); 
  }
 };

  const resendOtp = async () => {
    setLoading(true); // Set loading to true while API call is in progress
    try {
      const payload = mode === "reset" ? { email } : { user_id: userId };

      await api.post(resendEndpoints[mode], payload);

      setOtpSuccess("OTP resent successfully!");
      setOtpError(null);
      setOtp("");
      setResendTimer(59);
    } catch {
      setOtpError("Failed to resend OTP.");
      setOtpSuccess(null);
    }
    setLoading(false); // Reset loading after API call finishes
  };

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((t) => t - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
    <div className="auth-wrapper">
      <Header_V1 goBack={goBack} canGoBack={true} />
      <VerifyEmail
        userEmail={email}
        otp={otp}
        onOtpChange={onOtpChange}
        onVerify={onVerify}
        otpError={otpError}
        otpSuccess={otpSuccess}
        resendOtp={resendOtp}
        loading={loading}
        resendTimer={resendTimer}
      />
    </div>
  );
}
