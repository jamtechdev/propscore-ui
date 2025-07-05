import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./index.css";
import VerifyEmail from "../../Component/VerifyEmail/verify.jsx";
import Header_V1 from "../../Component/header/header-v1/header.jsx";

export default function Register() {
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
    const navigate = useNavigate();
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

    const [otpStep, setOtpStep] = useState(false);
    const [registeredUserId, setRegisteredUserId] = useState(null);
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(null);
    const [otpSuccess, setOtpSuccess] = useState(null);

    const goBack = () => {
      if (otpStep) {
        // If in OTP step, back goes to create account step
        setOtpStep(false);
      } else {
        setStep((prev) => (prev > 1 ? prev - 1 : prev));
      }
    };

    useEffect(() => {
      axios.get("http://localhost:8000/api/goals").then((res) => setGoals(res.data));
      axios
        .get("http://localhost:8000/api/preferred-property-types")
        .then((res) => setPropertyTypes(res.data));
    }, []);
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  
    const nextStep = () => {
      setErrors(null);
      setStep((prev) => prev + 1);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const payload = { ...formData };
        delete payload.agreeTerms;
  
        const response = await axios.post("http://localhost:8000/api/register",payload);

        const user_id = response.data.user.id;
        setRegisteredUserId(user_id);

        await axios.post("http://localhost:8000/api/send-otp", {
          user_id: user_id,
        });
        setOtpStep(true);

      } catch (error) {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else {
          alert("An error occurred.");
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
          user_id: registeredUserId,
          otp,
        });

        setOtpSuccess("OTP verified successfully! Registration complete.");

        // redirect user or reset form here
        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (error) {
        setOtpError(
          error.response?.data?.error ||
            "Invalid or expired OTP. Please try again."
        );
      }
    };

    const [resendTimer, setResendTimer] = useState(59);

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
          user_id: registeredUserId,
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
        <Header_V1 goBack={goBack} canGoBack={step > 1 || otpStep} />
        <main>
          {!otpStep ? (
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
                      <span className="primary-gradient-heading">Select</span>{" "}
                      Your Role
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
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, role }))
                          }
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
                      This helps us understand your goals and set up your
                      account the right way.
                    </p>
                    <div className="px-24 login-form">
                      <form className="row g-3">
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
                            {goals.map((goal) => (
                              <option key={goal.id} value={goal.id}>
                                {goal.name}
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
                            <option value="">
                              Select preferred property type
                            </option>
                            {propertyTypes.map((type) => (
                              <option key={type.id} value={type.id}>
                                {type.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {[
                          "agent",
                          "client",
                          "private_buyer",
                          "investor",
                        ].includes(formData.role) && (
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
                            <div className="form-group col-6 ps-0">
                              <label className="form-label">Agency Name</label>
                              <input
                                type="text"
                                name="agency_name"
                                className="form-control"
                                value={formData.agency_name}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="form-group col-6 pe-0">
                              <label className="form-label">
                                License Number
                              </label>
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
                      <span className="primary-gradient-heading">Create</span>{" "}
                      Your Account
                    </h1>
                    <p className="para max-w-400 text-center mb-4">
                      Use an email you check often and a strong password to
                      protect your account.
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
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="checkbox-container form-group mb-4">
                        <input
                          id="agreeTerms"
                          name="agreeTerms"
                          type="checkbox"
                          checked={formData.agreeTerms}
                          onChange={handleChange}
                          className="form-checkbox"
                          required
                        />
                        <label htmlFor="agreeTerms" className="checkbox-text">
                          I agree to the{" "}
                          <a href="#terms" className="primary-gradient-heading">
                            Terms
                          </a>{" "}
                          and{" "}
                          <a
                            href="#privacy"
                            className="primary-gradient-heading"
                          >
                            Privacy Policy
                          </a>
                          .
                        </label>
                      </div>

                      {errors && (
                        <div className="text-danger mb-3">{errors}</div>
                      )}

                      <div className="form-group mb-3">
                        <button type="submit" className="btn login-btn">
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                )}
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
}

