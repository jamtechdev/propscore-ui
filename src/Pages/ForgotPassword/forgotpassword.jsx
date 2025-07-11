import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./forgotpassword.css";
import Header_V1 from "../../Component/header/header-v1/header.jsx";
import api from "../../api.js"; 

export default function ForgotPassword() {
  const [formData, setFormData] = useState({ email: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/send-otp-reset", formData);
      navigate("/auth/verify-email", {
        state: {
          email: formData.email,
          mode: "reset",
        },
      });
    } catch (err) {
      setError(err.response?.data?.errors ||"Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <Header_V1 goBack={goBack} canGoBack={true} />
      <main>
        <section className="login-section forgot_password">
          <div className="login-box">
            <div className="text-center">
              <img
                src="/imgs/verify-email.png"
                className="verify-email-img"
                alt="Verify Email"
              />
            </div>
            <h1 className="login-title">
              <span className="primary-gradient-heading">Forgot</span> Password!
            </h1>
            <p className="para text-center">
              Enter your registered email address below and we'll send you a 6-digit code
              to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="px-24 login-form">
              <div className="form-group mb-4">
                <label className="form-label">Email</label>
                <div className="form-control d-flex align-items-center gap-2">
                  <img src="/imgs/mail-icon.svg" alt="email" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="form-group mb-3">
                  <p className="text-danger">{error}</p>
                </div>
              )}

              <div className="form-group mb-3">
                <button type="submit" className="login-btn" onSubmit={handleSubmit}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
