import React, { useState, useEffect, useRef } from "react";
import "./verify.css";

export default function VerifyEmail({
  userEmail,
  otp,
  onOtpChange,
  onVerify,
  otpError,
  otpSuccess,
  resendOtp,
  loading,
  resendTimer,
}) {
  // Split otp into array of 6 digits for controlled inputs
  const [otpDigits, setOtpDigits] = useState(Array(6).fill(""));
  const [localError, setLocalError] = useState(""); // For validation error on submit

  const inputsRef = useRef([]);

  // When otp prop changes (from parent), update otpDigits state
  useEffect(() => {
    if (otp && otp.length === 6) {
      setOtpDigits(otp.split(""));
    }
  }, [otp]);

  // Handle change for each digit input
  const handleDigitChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      // only allow single digit number or empty
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = val;
      setOtpDigits(newOtpDigits);
      // Call parent's onOtpChange with combined value
      onOtpChange({ target: { value: newOtpDigits.join("") } });

      // Move focus to next input if digit entered
      if (val && index < 5) {
        inputsRef.current[index + 1].focus();
      }

      // Clear local error on input change
      if (localError) setLocalError("");
    }
  };

  // Handle backspace to move focus to previous input
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Form submit handler with length check
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otpDigits.join("");
    if (enteredOtp.length < 6) {
      setLocalError("Please enter the complete 6-digit code.");
      return;
    }
    setLocalError("");
    onVerify();
  };

  return (
    <>
      <section className="login-section forgot_password verify-email">
        <div className="login-box">
          <div className="text-center">
            <img
              src="/imgs/verify-email.png"
              className="verify-email-img"
              alt="Verify Email"
            />
          </div>
          <h1 className="login-title">
            Verify Your
            <span className="primary-gradient-heading"> Email</span>
          </h1>
          <p className="para text-center">
            We’ve sent a 6-digit code to <strong>{userEmail}</strong>. Enter it
            below to continue.
          </p>

          <form className="px-24 login-form" onSubmit={handleSubmit}>
            <div className="form-group mb-4 d-flex align-items-center gap-2 justify-content-center">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  type="tel"
                  maxLength={1}
                  className={`form-control ${
                    index === 0 ? "focused" : "unfocused"
                  }`}
                  value={digit}
                  onChange={(e) => handleDigitChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  style={{
                    width: "40px",
                    textAlign: "center",
                    fontSize: "1.5rem",
                  }}
                />
              ))}
            </div>

            {/* Show local validation error first, then external otpError */}
            {(localError || otpError) && (
              <div className="text-danger mb-2">{localError || otpError}</div>
            )}

            {otpSuccess && (
              <div className="text-success mb-2">{otpSuccess}</div>
            )}

            <div className="form-group mb-3">
              <button
                type="submit"
                className={`login-btn ${loading ? "disabled" : ""}`}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
            </div>

            <div className="an-acccount bg-transparent p-0 mb-3 text-center">
              <span>Didn't receive the code? </span>
              <button
                type="button"
                onClick={resendOtp}
                disabled={resendTimer > 0 || loading}
                className="resend-time btn btn-link"
              >
                {resendTimer > 0
                  ? `Resend code in 00:${resendTimer
                      .toString()
                      .padStart(2, "0")}`
                  : "Resend Code"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
