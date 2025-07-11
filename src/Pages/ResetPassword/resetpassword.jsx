import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import "./resetpassword.css";
import Header_V1 from "../../Component/header/header-v1/header.jsx";
import api from "../../api.js";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    const rules = {
      minLength: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passedCount = Object.values(rules).filter(Boolean).length;

    return { rules, passedCount };
  };  

  const [passwordStrength, setPasswordStrength] = useState({
    rules: {
      minLength: false,
      uppercase: false,
      number: false,
      specialChar: false,
    },
    passedCount: 0,
  });  

  // Get email and otp from navigation state (if any)
  const { email, otp } = location.state || {};

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showPassword,setShowPassword] = useState(false);
  const [showPasswordConfirm,setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if ((email || otp) && (!email || !otp)) {
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(null);

    try {
      if (email && otp) {
        const response = await api.post(
          "/forgot-password-reset",
          {
            email,
            otp,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
          }
        );
        setSuccessMessage(
          response.data.message || "Password reset successful!"
        );
        // Redirect to login page after 5 seconds
        setTimeout(() => {
          navigate("/auth/login");
        }, 5000);
      } else {
        const token = localStorage.getItem("token");
        const response = await api.post(
          "/resetPassword",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage(
          response.data.message || "Password reset successful!"
        );
      }

    } catch (error) {
      if (error.response?.data?.errors) {
        setError(JSON.stringify(error.response.data.errors));
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <Header_V1 goBack={goBack} canGoBack={true} />
      <main>
        <section className="login-section forgot_password reset-password">
          <div className="login-box">
            <form onSubmit={handleSubmit} className="px-24 login-form">
              <div>
                <h1 className="login-title">
                  Create a
                  <span className="primary-gradient-heading">
                    {" "}
                    New Password{" "}
                  </span>
                </h1>
                <p className="para text-center">
                  Your new password must be different from the previous one.
                </p>
              </div>

              {/* Show success message */}
              {successMessage && (
                <div
                  className="success-message"
                  style={{ color: "green", marginBottom: "10px" }}
                >
                  {successMessage}
                </div>
              )}

              {/* Show error message */}
              {error && (
                <div
                  className="error-message"
                  style={{ color: "red", marginBottom: "10px" }}
                >
                  {error}
                </div>
              )}

              <div className="form-group mb-4">
                <label className="form-label d-flex align-items-center justify-content-between">
                  Create a Password
                </label>
                <div className="form-control d-flex align-items-center gap-2">
                  <img src="/imgs/lock.svg" alt="lock" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                  <img
                    src={showPassword ? "/imgs/eye.svg" : "/imgs/eye-slash.svg"}
                    alt="toggle visibility"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
              <div className="password-status">
                <p className="d-flex align-items-center justify-content-between must-includes">
                  <span className="includes">Password must include:</span>
                  <span className="status-count">
                    {passwordStrength.passedCount}/4
                  </span>
                </p>
                <ul className="status-list">
                  <li className="d-flex align-items-center gap-2">
                    <img
                      src={
                        passwordStrength.rules.minLength
                          ? "/imgs/checkmark-color.png"
                          : "/imgs/checkmark.svg"
                      }
                      alt=""
                    />
                    <p>At least 8 characters</p>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <img
                      src={
                        passwordStrength.rules.uppercase
                          ? "/imgs/checkmark-color.png"
                          : "/imgs/checkmark.svg"
                      }
                      alt=""
                    />
                    <p>At least 1 uppercase letter</p>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <img
                      src={
                        passwordStrength.rules.number
                          ? "/imgs/checkmark-color.png"
                          : "/imgs/checkmark.svg"
                      }
                      alt=""
                    />
                    <p>At least 1 number</p>
                  </li>
                  <li className="d-flex align-items-center gap-2">
                    <img
                      src={
                        passwordStrength.rules.specialChar
                          ? "/imgs/checkmark-color.png"
                          : "/imgs/checkmark.svg"
                      }
                      alt=""
                    />
                    <p>At least 1 special character</p>
                  </li>
                </ul>
              </div>
              <div className="form-group mb-4">
                <label className="form-label d-flex align-items-center justify-content-between">
                  Re-enter New Password
                </label>
                <div className="form-control d-flex align-items-center gap-2">
                  <img src="/imgs/lock.svg" alt="lock" />
                  <input
                    type={showPasswordConfirm ? "text" : "password"}
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                  <img
                    src={
                      showPasswordConfirm
                        ? "/imgs/eye.svg"
                        : "/imgs/eye-slash.svg"
                    }
                    alt="toggle visibility"
                    style={{ cursor: "pointer" }}
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  />
                </div>
              </div>

              <div className="form-group mb-3">
                <button type="submit" className="login-btn">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
