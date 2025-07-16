import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import api from "../../api.js";
import Header_V1 from "../../Component/header/header-v1/header.jsx";
import "./index.css";
import PlacesAutocompleteInput from "../../Component/Autocomplete/PlacesAutoComplete.jsx";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M2.66797 28.668V4.0013C2.66797 3.64768 2.80844 3.30854 3.05849 3.05849C3.30854 2.80844 3.64768 2.66797 4.0013 2.66797C4.35492 2.66797 4.69406 2.80844 4.94411 3.05849C5.19416 3.30854 5.33464 3.64768 5.33464 4.0013V5.27464H27.972C28.3262 5.28571 28.6621 5.43421 28.9088 5.68867C29.1554 5.94314 29.2933 6.2836 29.2933 6.63797C29.2933 6.99234 29.1554 7.3328 28.9088 7.58727C28.6621 7.84173 28.3262 7.99022 27.972 8.0013H5.33464V28.668C5.33464 28.8448 5.2644 29.0143 5.13937 29.1394C5.01435 29.2644 4.84478 29.3346 4.66797 29.3346H3.33464C3.15782 29.3346 2.98826 29.2644 2.86323 29.1394C2.73821 29.0143 2.66797 28.8448 2.66797 28.668ZM6.66797 10.0013C6.66797 9.82449 6.73821 9.65492 6.86323 9.5299C6.98826 9.40487 7.15782 9.33463 7.33464 9.33463H26.0013C26.1781 9.33463 26.3477 9.40487 26.4727 9.5299C26.5977 9.65492 26.668 9.82449 26.668 10.0013V20.3346C26.668 21.6607 26.1412 22.9325 25.2035 23.8702C24.2658 24.8079 22.9941 25.3346 21.668 25.3346H11.668C10.3419 25.3346 9.07012 24.8079 8.13243 23.8702C7.19475 22.9325 6.66797 21.6607 6.66797 20.3346V10.0013ZM12.468 15.6013C12.3216 15.7265 12.2041 15.8819 12.1236 16.0568C12.043 16.2317 12.0013 16.422 12.0013 16.6146V20.668C12.0013 20.8448 12.0715 21.0143 12.1966 21.1394C12.3216 21.2644 12.4912 21.3346 12.668 21.3346H15.0013C15.0897 21.3346 15.1745 21.2995 15.237 21.237C15.2995 21.1745 15.3346 21.0897 15.3346 21.0013V19.3346C15.3346 19.1578 15.4049 18.9883 15.5299 18.8632C15.6549 18.7382 15.8245 18.668 16.0013 18.668H17.3346C17.5114 18.668 17.681 18.7382 17.806 18.8632C17.9311 18.9883 18.0013 19.1578 18.0013 19.3346V21.0013C18.0013 21.1853 18.1506 21.3346 18.3346 21.3346H20.668C20.8448 21.3346 21.0144 21.2644 21.1394 21.1394C21.2644 21.0143 21.3346 20.8448 21.3346 20.668V16.6146C21.3346 16.422 21.2929 16.2317 21.2124 16.0568C21.1318 15.8819 21.0143 15.7265 20.868 15.6013L17.1013 12.3746C16.9805 12.2713 16.8269 12.2146 16.668 12.2146C16.5091 12.2146 16.3554 12.2713 16.2346 12.3746L12.468 15.6013Z" fill="current-color"/></svg>',
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

  const goBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const handleClickAuth = async (provider) => {
    try {
      // Pick relevant fields from formData (step 1 & 2)
      const {
        role,
        first_name,
        last_name,
        goal_id,
        preferred_property_type_id,
        address,
        mls_regions,
        first_property_address,
        agency_name,
        license_number,
      } = formData;

      // Build query parameters dynamically
      const params = new URLSearchParams();

      if (role) params.append("role", role);
      if (first_name) params.append("first_name", first_name);
      if (last_name) params.append("last_name", last_name);
      if (goal_id) params.append("goal_id", goal_id);
      if (preferred_property_type_id)
        params.append("preferred_property_type_id", preferred_property_type_id);
      if (address) params.append("address", address);
      if (mls_regions) params.append("mls_regions", mls_regions);
      if (first_property_address)
        params.append("first_property_address", first_property_address);
      if (agency_name) params.append("agency_name", agency_name);
      if (license_number) params.append("license_number", license_number);

      // Construct final URL
      const url = `/auth/${provider}?${params.toString()}`;
      // Make the API call
      const res = await api.get(url);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="auth-wrapper register-page">
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
                      <div className="role-img">
                        {formData.role === role ? (
                          <img
                            src={`/imgs/${role.replace("_", "-")}-active.png`}
                            alt={role}
                          />
                        ) : (
                          <img
                            src={`/imgs/${role.replace("_", "-")}.png`}
                            alt={role}
                          />
                        )}
                      </div>
                      <div className="content">
                        <h3 className="heading">{label}</h3>
                        <p className="para">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="form-group mb-3 px-24">
                  <button
                    className="login-btn"
                    onClick={nextStep}
                    disabled={!formData.role}
                  >
                    Continue
                  </button>
                </div>
                <div className="an-acccount">
                  <span>Already have an account ?</span>{" "}
                  <Link className="primary-gradient-heading" to="/auth/login">
                    Log In
                  </Link>
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
                    <div className="form-group col-md-6 col-12 ps-0">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Enter your last name"
                        className="form-control"
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6 col-12 pe-0">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="Enter your first name"
                        className="form-control"
                        value={formData.first_name}
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
                    {["client", "private_buyer", "investor"].includes(
                      formData.role
                    ) && (
                      <div className="form-group col-12 px-0">
                        <label className="form-label">Address</label>
                        <PlacesAutocompleteInput
                          name="address"
                          placeholder="Enter your full home address"
                          value={formData.address}
                          onChange={handleChange}
                          onPlaceSelected={(place) => {
                            const formattedAddress =
                              place.formatted_address || "";
                            setFormData((prev) => ({
                              ...prev,
                              address: formattedAddress,
                            }));
                          }}
                        />
                      </div>
                    )}
                    {["broker", "agent"].includes(formData.role) && (
                      <>
                        <div className="form-group col-12 px-0">
                          <label className="form-label">MLS Regions</label>
                          <PlacesAutocompleteInput
                            name="mls_regions"
                            placeholder="Enter your MLS regions/areas"
                            value={formData.mls_regions}
                            onChange={handleChange}
                            onPlaceSelected={(place) => {
                              const formattedAddress =
                                place.formatted_address || "";
                              setFormData((prev) => ({
                                ...prev,
                                mls_regions: formattedAddress,
                              }));
                            }}
                          />
                        </div>
                        <div className="form-group col-12 px-0">
                          <label className="form-label">
                            First Property Address to Score
                          </label>
                          <PlacesAutocompleteInput
                            name="first_property_address"
                            placeholder="Enter your full property address"
                            value={formData.first_property_address}
                            onChange={handleChange}
                            onPlaceSelected={(place) => {
                              const formattedAddress =
                                place.formatted_address || "";
                              setFormData((prev) => ({
                                ...prev,
                                first_property_address: formattedAddress,
                              }));
                            }}
                          />
                        </div>
                        <div className="form-group col-12 px-0">
                          <label className="form-label">Agency Name</label>
                          <input
                            type="text"
                            name="agency_name"
                            placeholder="Enter agency name"
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
                            placeholder="Enter license number"
                            className="form-control"
                            value={formData.license_number}
                            onChange={handleChange}
                          />
                        </div>
                      </>
                    )}
                    <div className="form-group col-12 px-0 pb-3">
                      <button
                        className="login-btn"
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
                        <p>One uppercase letter</p>
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
                        <p>One number</p>
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
                        <p>One special character </p>
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
                    <button
                      type="submit"
                      className={`login-btn ${loading ? "disabled" : ""}`}
                      disabled={loading}
                    >
                      {loading ? "Creating..." : "Create Account"}
                    </button>
                  </div>

                  <div className="px-24 mb-xl-3">
                    <p className="or text-center">or continue with</p>
                  </div>

                  <div className="d-flex px-24 btn-group align-items-center justify-content-between gap-3 mb-4">
                    <button
                      type="submit"
                      className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleClickAuth("facebook")}
                    >
                      <img src="/imgs/logos_facebook.svg" alt="" />
                      <span>Facebook</span>
                    </button>
                    <button
                      type="submit"
                      className="btn btn-facebook d-flex align-items-center justify-content-center gap-2"
                      onClick={() => handleClickAuth("google")}
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
    </div>
  );
}
