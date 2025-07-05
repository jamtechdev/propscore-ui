import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import VerifyEmail from "../../Component/VerifyEmail/verify.jsx";

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [otpSuccess, setOtpSuccess] = useState(null);

  if (!email) {
    // if no email passed, redirect back to forgot password
    navigate("/auth/forgot-password");
    return null;
  }

  const onOtpChange = (e) => setOtp(e.target.value);

  const onVerify = async () => {
    try {
      await axios.post("http://localhost:8000/api/verify-otp-reset", {
        email,
        otp,
      });
      setOtpSuccess("OTP verified!");
      setOtpError(null);
      navigate("/auth/reset-password", { state: { email, otp } });
    } catch {
      setOtpError("Invalid OTP.");
      setOtpSuccess(null);
    }
  };

  const [resendTimer, setResendTimer] = useState(59);
  
      useEffect(() => {
        let interval = null;
        if (resendTimer > 0) {
          interval = setInterval(() => {
            setResendTimer((time) => time - 1);
          }, 1000);
        } else if (interval) {
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [resendTimer]);

  const resendOtp = async () => {
    try {
      await axios.post("http://localhost:8000/api/resend-otp", {
        user_id: userId,
      });
      setOtpSuccess("OTP resent successfully!");
      setOtpError(null);
      setResendTimer(59);
    } catch {
      setOtpError("Failed to resend OTP.");
      setOtpSuccess(null);
    }
  };

  return (
    <VerifyEmail
      userEmail={email}
      otp={otp}
      onOtpChange={onOtpChange}
      onVerify={onVerify}
      otpError={otpError}
      otpSuccess={otpSuccess}
      resendOtp={resendOtp}
      resendTimer={resendTimer}
    />
  );
}
