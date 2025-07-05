import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./forgotpassword.css";
import Header_V1 from "../../Component/header/header-v1/header.jsx";

export default function ForgotPassword () {
    const [formData, setFormData] = useState({email: ""});
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
      try {
        await axios.post("http://localhost:8000/api/send-otp-reset", formData);
        navigate("/auth/verify-email", { state: { email: formData.email } });
      } catch (err) {
        setError("Failed to send OTP. Please try again.");
      }
    };

    return (
      <>
        <Header_V1 goBack={goBack} canGoBack={true}/>
        <main>
          <section className="login-section forgot_password ">
            <div className="login-box">
              <div className="text-center">
                <img
                  src="/imgs/verify-email.png"
                  className="verify-email-img"
                  alt=""
                />
              </div>
              <h1 className="login-title">
                <span className="primary-gradient-heading">Forgot</span>
                Password!
              </h1>
              <p className="para text-center">
                Enter your email address below and we'll send you a 6-digit code
                on your email.
              </p>
              <form onSubmit={handleSubmit} className="px-24 login-form">
                <div className="form-group mb-4">
                  <label htmlFor="" className="form-label">
                    Email
                  </label>
                  <div className="form-control d-flex align-items-center gap-2">
                    <img src="/imgs/mail-icon.svg" alt="" />
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
                <div className="form-group mb-3">
                  <button type="submit" className="btn login-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </section>
        </main>
      </>
    );
};