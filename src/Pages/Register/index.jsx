import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../../api.js";
import Header_V1 from "../../Component/header/header-v1/header.jsx";
import "./index.css";

export default function Register() {
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

  const rolesData = [
    {
      role: "agent",
      label: "Agent",
      description: "I help clients buy, sell, or rent properties.",
    },
    {
      role: "client",
      label: "Client",
      description: "I'm working with an agent to find the right property.",
    },
    {
      role: "private_buyer",
      label: "Private Buyer",
      description: "I'm buying a property on my own, for personal use.",
    },
    {
      role: "investor",
      label: "Investor",
      description: "I'm buying to build wealth, flip, or rent.",
    },
    {
      role: "broker",
      label: "Broker",
      description: "I manage events or oversee real estate deals.",
    },
  ];

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: "",
    first_name: "",
    last_name: "",
    goal_id: "",
    preferred_property_type_id: "",
    address: "",
    mls_regions: "",
    first_property_address: "",
    agency_name: "",
    license_number: "",
    email: "",
    password: "",
    agreeTerms: false,
  });
  const [goals, setGoals] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    api.get("/goals").then((res) => setGoals(res.data));
    api
      .get("/preferred-property-types")
      .then((res) => setPropertyTypes(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "password") setPasswordStrength(checkPasswordStrength(value));
  };

  const nextStep = () => {
    setErrors(null);
    setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  const handleClickAuth = async () => {
    console.log("googogogo");
    try{
      await api.get("/auth/google");
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else alert("An error occurred.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      delete payload.agreeTerms;

      const res = await api.post("/register", payload);
      const user_id = res.data.user.id;
      await api.post("/send-otp", { user_id });

      navigate("/auth/verify-email", {
        state: { email: formData.email, userId: user_id, mode: "register" },
      });
    } catch (err) {
      if (err.response?.data?.errors) setErrors(err.response.data.errors);
      else alert("An error occurred.");
    }
  };

  return (
    <>
      <Header_V1 goBack={goBack} canGoBack={step > 1} />
      <main>
        <section className="login-section sign-up py-xl-5">
          <div className="login-box">
            <div className="account-steps px-24 mb-3">
              <div className={`steps ${step >= 1 ? "active" : ""}`} />
              <div className={`steps ${step >= 2 ? "active" : ""}`} />
              <div className={`steps ${step >= 3 ? "active" : ""}`} />
            </div>

            {step === 1 && (
              <div className="select-roles-sec">
                <h1 className="login-title mb-2">
                  <span className="primary-gradient-heading">Select</span> Your
                  Role
                </h1>
                <p className="para max-w-400 text-center mb-4">
                  Tell us who you are in the real estate journey. We’ll
                  personalize your experience based on your role.
                </p>
                <div className="roles-list px-24 mb-4">
                  {rolesData.map(({ role, label, description }) => (
                    <div
                      key={role}
                      className={`role-box ${
                        formData.role === role ? "selected-role" : ""
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, role }))}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={`/imgs/${role.replace("_", "-")}.png`}
                        alt={role}
                      />
                      <div className="content">
                        <h3 className="heading">{label}</h3>
                        <p className="para">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="form-group mb-3 px-24">
                  <button
                    className="btn login-btn"
                    onClick={nextStep}
                    disabled={!formData.role}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="tell-about-section">
                <h1 className="login-title mb-2">
                  <span className="primary-gradient-heading">Tell Us</span>{" "}
                  About Yourself
                </h1>
                <p className="para max-w-400 text-center mb-4">
                  This helps us understand your goals and set up your account
                  the right way.
                </p>
                <div className="px-24 login-form">
                  <form className="row g-3">
                    {/* Step 2 */}
                    <div className="form-group col-6 ps-0">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-6 pe-0">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-12 px-0">
                      <label className="form-label">Your Goal</label>
                      <select
                        name="goal_id"
                        className="form-select"
                        value={formData.goal_id}
                        onChange={handleChange}
                      >
                        <option value="">Select your goal</option>
                        {goals.map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group col-12 px-0">
                      <label className="form-label">
                        Preferred Property Type
                      </label>
                      <select
                        name="preferred_property_type_id"
                        className="form-select"
                        value={formData.preferred_property_type_id}
                        onChange={handleChange}
                      >
                        <option value="">Select preferred property type</option>
                        {propertyTypes.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {["agent", "client", "private_buyer", "investor"].includes(
                      formData.role
                    ) && (
                      <div className="form-group col-12 px-0">
                        <label className="form-label">Address</label>
                        <input
                          type="text"
                          name="address"
                          className="form-control"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>
                    )}
                    {formData.role === "broker" && (
                      <>
                        <div className="form-group col-12 px-0">
                          <label className="form-label">MLS Regions</label>
                          <input
                            type="text"
                            name="mls_regions"
                            className="form-control"
                            value={formData.mls_regions}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-12 px-0">
                          <label className="form-label">
                            First Property Address to Score
                          </label>
                          <input
                            type="text"
                            name="first_property_address"
                            className="form-control"
                            value={formData.first_property_address}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-12 px-0">
                          <label className="form-label">Agency Name</label>
                          <input
                            type="text"
                            name="agency_name"
                            className="form-control"
                            value={formData.agency_name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group col-12 px-0">
                          <label className="form-label">License Number</label>
                          <input
                            type="text"
                            name="license_number"
                            className="form-control"
                            value={formData.license_number}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="form-group col-12 px-0 pb-3">
                      <button
                        className="btn login-btn"
                        type="button"
                        onClick={nextStep}
                      >
                        Continue
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="create-acc-section">
                <h1 className="login-title mb-2">
                  <span className="primary-gradient-heading">Create</span> Your
                  Account
                </h1>
                <p className="para max-w-400 text-center mb-4">
                  Use an email you check often and a strong password to protect
                  your account.
                </p>
                <form onSubmit={handleSubmit} className="px-24 login-form">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <div className="form-control d-flex align-items-center gap-2">
                      <img src="/imgs/mail-icon.svg" alt="" />
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label">
                      Create a Password
                    </label>
                    <div className="form-control d-flex align-items-center gap-2">
                      <img src="/imgs/lock.svg" alt="" />
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      <img
                        src={
                          showPassword ? "/imgs/eye.svg" : "/imgs/eye-slash.svg"
                        }
                        alt="toggle visibility"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </div>
                  </div>

                  <div className="password-status">
                    <p className="d-flex align-items-center justify-content-between must-includes">
                      <span>Password must include:</span>
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

                  <div className="checkbox-container form-group mb-4">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      className="form-checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="agreeTerms" className="checkbox-text">
                      I agree to the{" "}
                      <a href="#terms" className="primary-gradient-heading">
                        Terms
                      </a>{" "}
                      and{" "}
                      <a href="#privacy" className="primary-gradient-heading">
                        Privacy Policy
                      </a>
                      .
                    </label>
                  </div>

                  {errors && <div className="text-danger mb-3">{errors}</div>}

                  <div className="form-group mb-3">
                    <button type="submit" className="btn login-btn">
                      Create Account
                    </button>
                  </div>

                  <div className="px-24 mb-xl-3">
                    <p className="or text-center">or continue with</p>
                  </div>

                  <div className="d-flex px-24 btn-group align-items-center justify-content-between gap-3 mb-4">
                    {/* <a
                      href="#"
                      className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                    >
                      <img src="/imgs/logos_facebook.svg" alt="" />
                      <span>Facebook</span>
                    </a> */}
                    <button
                      type="submit"
                      className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                      onClick={handleClickAuth}
                    >
                      <img src="/imgs/logos_facebook.svg" alt="" />
                      <span>Facebook</span>
                    </button>
                    {/* <a
                      href="#"
                      className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                    >
                      <img src="/imgs/devicon_google.svg" alt="" />
                      <span>Google</span>
                    </a> */}
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
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
