import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import "./login.css";
import Header_V1 from "../../Component/header/header-v1/header.jsx";
import api from "../../api.js";
import { toast } from "react-toastify";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (typeof token === "string" && token.trim() !== "") {
      toast.success("You are already logged in");
      navigate("/"); 
    }

    const handleMessage = (event) => {
      const { success, token } = event.data;
      if (success && token) {
        localStorage.setItem("token", token);
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
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", formData);
      const user_id = response?.data.user.id;
      const token = response?.data.token;

      if (response.data.status === true) {
        localStorage.setItem("token", token);
        toast.success(response.data.message);
        navigate("/");
      }

      // Optional OTP logic (currently commented)
    } catch (error) {
      if (error?.response?.data?.errors) {
        setError(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClickAuth = async () => {
    try {
      const res = await api.get("/auth/google");
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
        setError(err.response.data.errors);
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
                  {loading ? "Loging..." : "Log In"}
                </button>
              </div>

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
            </form>

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
