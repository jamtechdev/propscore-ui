import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import "./resetpassword.css";
import Header_V1 from "../../Component/header/header-v1/header.jsx";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get email and otp from navigation state (if any)
  const { email, otp } = location.state || {};

  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if ((email || otp) && (!email || !otp)) {
      navigate("/forgot-password");
    }
  }, [email, otp, navigate]);

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
    setSuccessMessage(null);

    try {
      if (email && otp) {
        const response = await axios.post(
          "http://localhost:8000/api/forgot-password-reset",
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
        const response = await axios.post(
          "http://localhost:8000/api/resetPassword",
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
    <>
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
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                  <img src="/imgs/eye.svg" alt="toggle visibility" />
                </div>
              </div>

              <div className="form-group mb-4">
                <label className="form-label d-flex align-items-center justify-content-between">
                  Re-enter New Password
                </label>
                <div className="form-control d-flex align-items-center gap-2">
                  <img src="/imgs/lock.svg" alt="lock" />
                  <input
                    type="password"
                    name="password_confirmation"
                    value={formData.password_confirmation}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                  <img src="/imgs/eye.svg" alt="toggle visibility" />
                </div>
              </div>

              <div className="form-group mb-3">
                <button type="submit" className="btn login-btn">
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
