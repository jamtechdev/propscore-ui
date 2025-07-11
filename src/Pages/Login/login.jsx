import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router"; 
import "./login.css";
import Header_V1 from "../../Component/header/header-v1/header.jsx";
import api from "../../api.js";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const handleMessage = (event) => {
        const { success, token } = event.data;
        if (success) {
          localStorage.setItem("token", token);
          // Navigate to homepage
          navigate("/");
        }
      };
      window.addEventListener("message", handleMessage);
      return () => {
        window.removeEventListener("message", handleMessage);
      };
    }, [navigate]);

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
      const response = await api.post("/login", formData);

      const user_id = response.data.user.id;
      const token = response.data.token;

      localStorage.setItem("token", token);

      // Send OTP request
      await api.post("/send-otp", {
        user_id,
      });

      // Navigate VerifyEmailPage
      navigate("/auth/verify-email", {
        state: {
          email: formData.email,
          userId: user_id,
          mode: "login",
        },
      });
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

  const handleClickAuth = async () => {
    try {
      // Make the API call
      const res = await api.get('/auth/google');

      // Open popup as before
      const popupUrl = res.data.url;
      const width = 500;
      const height = 600;
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;

      const popup = window.open(
        popupUrl,
        "GoogleAuth",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      if (!popup) {
        alert("Popup blocked! Please allow popups for this website.");
      }
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("An error occurred.");
      }
    }
  };  

  return (
    <div className="auth-wrapper">
      <Header_V1 goBack={goBack} canGoBack={true} />
      <main>
        <section className="login-section">
          <div className="login-box">
            <h1 className="login-title">
              <span className="primary-gradient-heading">Welcome </span>back!
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
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
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

              {error && (
                <div className="form-group mb-3">
                  <p className="text-danger">{error}</p>
                </div>
              )}

              <div className="form-group mb-3">
                <button type="submit" className="login-btn">
                  Log In
                </button>
              </div>
            </form>

            <div className="px-24 mb-xl-3">
              <p className="or text-center">or continue with</p>
            </div>

            <div className="d-flex px-24 btn-group align-items-center justify-content-between gap-3 mb-4">
              <button
                type="submit"
                className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                onClick={handleClickAuth}
              >
                <img src="/imgs/logos_facebook.svg" alt="" />
                <span>Facebook</span>
              </button>
              <button
                type="submit"
                className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                onClick={handleClickAuth}
              >
                <img src="/imgs/devicon_google.svg" alt="" />
                <span>Google</span>
              </button>
            </div>

            <div className="an-acccount">
              <span>Don’t have an account ?</span>{" "}
              <Link className="primary-gradient-heading" to="/auth/register">
                Sign Up
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
