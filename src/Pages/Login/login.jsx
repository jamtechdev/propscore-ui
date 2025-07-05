import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import "./login.css";
import VerifyEmail from "../../Component/VerifyEmail/verify.jsx";
import Header_V1 from "../../Component/header/header-v1/header.jsx";

export default function Login() {
    const [formData, setFormData] = useState({
          email: "",
          password: "",
        });

    const [error, setError] = useState("");
    const [userId, setUserId] = useState(null);
    const [otpStep, setOtpStep] = useState(false);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(null);
    const [otpSuccess, setOtpSuccess] = useState(null);
    const navigate = useNavigate();

    const goBack = () => {
      if (otpStep) {
        // If user is on OTP verification step, go back to login form
        setOtpStep(false);
        setOtp("");
        setOtpError(null);
        setOtpSuccess(null);
      } else {
        navigate(-1); // This will go back one step in the browser history
      }
    };

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const payload = { ...formData };

          const response = await axios.post(
            "http://localhost:8000/api/login",
            payload
          );

          const user_id = response.data.user.id;
          const token = response.data.token;

          localStorage.setItem("token", token);

          setUserId(user_id);
          await axios.post("http://localhost:8000/api/send-otp", {
            user_id: user_id,
          });
          setOtpStep(true);
          //navigate("/auth/verify-email", { state: { email: formData.email } });

        } catch (error) {
          if (error.response?.data?.errors) {
            setError(error.response.data.errors);
          } else if (error.response?.data?.message) {
            setError(error.response.data.message);
          } else {
            setError("An unexpected error occurred.");
          }
        }
    };  
    
    const handleOtpChange = (e) => {
      setOtp(e.target.value);
      setOtpError(null);
      setOtpSuccess(null);
    };

    // Verify OTP submit handler
    const verifyOtp = async () => {
      setOtpError(null);
      setOtpSuccess(null);
      if (otp.length !== 6) {
        setOtpError("OTP must be 6 digits.");
        return;
      }

      try {
        const res = await axios.post("http://localhost:8000/api/verify-otp", {
          user_id: userId,
          otp,
        });

        setOtpSuccess("OTP verified successfully! User Logged In.");

        // redirect user or reset form here
      } catch (error) {
        setOtpError(
          error.response?.data?.error ||
            "Invalid or expired OTP. Please try again."
        );
      }
    };

    const [resendTimer, setResendTimer] = useState(0);

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

    // Resend OTP handler
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
      <>
        <Header_V1 goBack={goBack} canGoBack={true} />
        <main>
          {!otpStep ? (
            <section className="login-section">
              <div className="login-box">
                <h1 className="login-title">
                  <span className="primary-gradient-heading">Welcome </span>
                  back!
                </h1>

                <form onSubmit={handleSubmit} className="px-24 login-form">
                  <div className="form-group mb-3">
                    <label className="form-label">Email</label>
                    <div className="form-control d-flex align-items-center gap-2">
                      <img src="/imgs/mail-icon.svg" alt="" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label className="form-label d-flex align-items-center justify-content-between">
                      Password{" "}
                      <Link
                        className="primary-gradient-heading"
                        to="/auth/forgot-password"
                      >
                        Forgot Your Password?
                      </Link>
                    </label>
                    <div className="form-control d-flex align-items-center gap-2">
                      <img src="/imgs/lock.svg" alt="" />
                      <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <img src="/imgs/eye.svg" alt="" />
                    </div>
                  </div>

                  {error && (
                    <div className="form-group mb-3">
                      <p className="text-danger">{error}</p>
                    </div>
                  )}

                  <div className="form-group mb-3">
                    <button type="submit" className="btn login-btn">
                      Log In
                    </button>
                  </div>
                </form>

                <div className="px-24 mb-xl-3">
                  <p className="or text-center">or continue with</p>
                </div>

                <div className="d-flex px-24 btn-group align-items-center justify-content-between gap-3 mb-4">
                  <a
                    href="#"
                    className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                  >
                    <img src="/imgs/logos_facebook.svg" alt="" />
                    <span>Facebook</span>
                  </a>
                  <a
                    href="#"
                    className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                  >
                    <img src="/imgs/devicon_google.svg" alt="" />
                    <span>Google</span>
                  </a>
                </div>

                <div className="an-acccount">
                  <span>Don’t have an account ?</span>{" "}
                  <a
                    href="/pages/signUp.html"
                    className="primary-gradient-heading"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </section>
          ) : (
            <VerifyEmail
              userEmail={formData.email}
              otp={otp}
              onOtpChange={handleOtpChange}
              onVerify={verifyOtp}
              otpError={otpError}
              otpSuccess={otpSuccess}
              resendOtp={resendOtp}
              resendTimer={resendTimer}
            />
          )}
        </main>
      </>
    );
};
