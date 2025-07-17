import React from "react";
import DashboardTitle from "../../Component/DashboardTitle";
import DashboardSidebar from "../../Component/DashboardSidebar";

export default function Password() {
  return (
    <>
      <DashboardTitle
        title="Account Settings"
        subtitle="Changes to account settings will apply to all of your workspaces. You can make changes as needed."
      />
      <div className="dashboard-inner-layout">
        <DashboardSidebar />
        <div className="dashboard-inner-content">
          <div className="inner-title">
            <h2>Password</h2>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="dashboard-card">
              <div className="form-wrapper-row">
                <div className="form-wrapper-col">
                  <div className="form-heading">
                    <h3>Change Password</h3>
                    <p>
                      This will be your main password to Log
                      <br /> In into the PropScore Platform.
                    </p>
                  </div>
                </div>
                <div className="form-wrapper-col">
                  <div
                    style={{ gridTemplateColumns: "1fr" }}
                    className="d-grid gap-4"
                  >
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">
                          Old Password <a href="">Forgot Your Password?</a>
                        </label>
                        <div className="icon-box password-box">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3.99935 14.666C3.63268 14.666 3.3189 14.5356 3.05802 14.2747C2.79713 14.0138 2.66646 13.6998 2.66602 13.3327V6.66602C2.66602 6.29935 2.79668 5.98557 3.05802 5.72468C3.31935 5.46379 3.63313 5.33313 3.99935 5.33268H4.66602V3.99935C4.66602 3.07713 4.99113 2.29113 5.64135 1.64135C6.29157 0.991572 7.07757 0.666461 7.99935 0.666016C8.92113 0.665572 9.70735 0.990683 10.358 1.64135C11.0087 2.29202 11.3336 3.07802 11.3327 3.99935V5.33268H11.9993C12.366 5.33268 12.68 5.46335 12.9413 5.72468C13.2027 5.98602 13.3331 6.29979 13.3327 6.66602V13.3327C13.3327 13.6993 13.2022 14.0133 12.9413 14.2747C12.6805 14.536 12.3665 14.6665 11.9993 14.666H3.99935ZM7.99935 11.3327C8.36602 11.3327 8.68002 11.2022 8.94135 10.9413C9.20268 10.6805 9.33313 10.3665 9.33268 9.99935C9.33224 9.63224 9.20179 9.31846 8.94135 9.05802C8.6809 8.79757 8.3669 8.6669 7.99935 8.66602C7.63179 8.66513 7.31802 8.79579 7.05802 9.05802C6.79802 9.32024 6.66735 9.63402 6.66602 9.99935C6.66468 10.3647 6.79535 10.6787 7.05802 10.9413C7.32068 11.204 7.63446 11.3345 7.99935 11.3327ZM5.99935 5.33268H9.99935V3.99935C9.99935 3.44379 9.8049 2.97157 9.41602 2.58268C9.02713 2.19379 8.5549 1.99935 7.99935 1.99935C7.44379 1.99935 6.97157 2.19379 6.58268 2.58268C6.19379 2.97157 5.99935 3.44379 5.99935 3.99935V5.33268Z"
                              fill="#97999D"
                            />
                          </svg>
                          <input
                            type="email"
                            className="form-control form-control-invalid"
                            placeholder="Enter old password"
                          />
                          <img
                            src="/imgs/eye.svg"
                            alt=""
                            className="password-eye-icon"
                          />
                        </div>
                        <span className="error-text">Incorrect password</span>
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">
                          New password
                        </label>
                        <div className="icon-box password-box">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3.99935 14.666C3.63268 14.666 3.3189 14.5356 3.05802 14.2747C2.79713 14.0138 2.66646 13.6998 2.66602 13.3327V6.66602C2.66602 6.29935 2.79668 5.98557 3.05802 5.72468C3.31935 5.46379 3.63313 5.33313 3.99935 5.33268H4.66602V3.99935C4.66602 3.07713 4.99113 2.29113 5.64135 1.64135C6.29157 0.991572 7.07757 0.666461 7.99935 0.666016C8.92113 0.665572 9.70735 0.990683 10.358 1.64135C11.0087 2.29202 11.3336 3.07802 11.3327 3.99935V5.33268H11.9993C12.366 5.33268 12.68 5.46335 12.9413 5.72468C13.2027 5.98602 13.3331 6.29979 13.3327 6.66602V13.3327C13.3327 13.6993 13.2022 14.0133 12.9413 14.2747C12.6805 14.536 12.3665 14.6665 11.9993 14.666H3.99935ZM7.99935 11.3327C8.36602 11.3327 8.68002 11.2022 8.94135 10.9413C9.20268 10.6805 9.33313 10.3665 9.33268 9.99935C9.33224 9.63224 9.20179 9.31846 8.94135 9.05802C8.6809 8.79757 8.3669 8.6669 7.99935 8.66602C7.63179 8.66513 7.31802 8.79579 7.05802 9.05802C6.79802 9.32024 6.66735 9.63402 6.66602 9.99935C6.66468 10.3647 6.79535 10.6787 7.05802 10.9413C7.32068 11.204 7.63446 11.3345 7.99935 11.3327ZM5.99935 5.33268H9.99935V3.99935C9.99935 3.44379 9.8049 2.97157 9.41602 2.58268C9.02713 2.19379 8.5549 1.99935 7.99935 1.99935C7.44379 1.99935 6.97157 2.19379 6.58268 2.58268C6.19379 2.97157 5.99935 3.44379 5.99935 3.99935V5.33268Z"
                              fill="#97999D"
                            />
                          </svg>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter new password"
                          />
                          <img
                            src="/imgs/eye.svg"
                            alt=""
                            className="password-eye-icon"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="password-status">
                        <p className="d-flex align-items-center justify-content-between must-includes">
                          <span className="includes">
                            Password must include:
                          </span>
                          <span className="status-count">0/4</span>
                        </p>
                        <ul className="status-list">
                          <li className="d-flex align-items-center gap-2">
                            <img src="/imgs/checkmark.svg" alt="" />
                            <p>At least 8 characters</p>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <img src="/imgs/checkmark.svg" alt="" />
                            <p>At least 1 uppercase letter</p>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <img src="/imgs/checkmark.svg" alt="" />
                            <p>At least 1 number</p>
                          </li>
                          <li className="d-flex align-items-center gap-2">
                            <img src="/imgs/checkmark.svg" alt="" />
                            <p>At least 1 special character</p>
                          </li>
                        </ul>
                      </div>
                    </div>
                   <div>
                      <div className="dashboard-form">
                        <label className="form-label">
                          Re-enter New Password
                        </label>
                        <div className="icon-box password-box">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M3.99935 14.666C3.63268 14.666 3.3189 14.5356 3.05802 14.2747C2.79713 14.0138 2.66646 13.6998 2.66602 13.3327V6.66602C2.66602 6.29935 2.79668 5.98557 3.05802 5.72468C3.31935 5.46379 3.63313 5.33313 3.99935 5.33268H4.66602V3.99935C4.66602 3.07713 4.99113 2.29113 5.64135 1.64135C6.29157 0.991572 7.07757 0.666461 7.99935 0.666016C8.92113 0.665572 9.70735 0.990683 10.358 1.64135C11.0087 2.29202 11.3336 3.07802 11.3327 3.99935V5.33268H11.9993C12.366 5.33268 12.68 5.46335 12.9413 5.72468C13.2027 5.98602 13.3331 6.29979 13.3327 6.66602V13.3327C13.3327 13.6993 13.2022 14.0133 12.9413 14.2747C12.6805 14.536 12.3665 14.6665 11.9993 14.666H3.99935ZM7.99935 11.3327C8.36602 11.3327 8.68002 11.2022 8.94135 10.9413C9.20268 10.6805 9.33313 10.3665 9.33268 9.99935C9.33224 9.63224 9.20179 9.31846 8.94135 9.05802C8.6809 8.79757 8.3669 8.6669 7.99935 8.66602C7.63179 8.66513 7.31802 8.79579 7.05802 9.05802C6.79802 9.32024 6.66735 9.63402 6.66602 9.99935C6.66468 10.3647 6.79535 10.6787 7.05802 10.9413C7.32068 11.204 7.63446 11.3345 7.99935 11.3327ZM5.99935 5.33268H9.99935V3.99935C9.99935 3.44379 9.8049 2.97157 9.41602 2.58268C9.02713 2.19379 8.5549 1.99935 7.99935 1.99935C7.44379 1.99935 6.97157 2.19379 6.58268 2.58268C6.19379 2.97157 5.99935 3.44379 5.99935 3.99935V5.33268Z"
                              fill="#97999D"
                            />
                          </svg>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter new password"
                          />
                          <img
                            src="/imgs/eye.svg"
                            alt=""
                            className="password-eye-icon"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 d-flex align-items-center justify-content-end">
            <button className="dashboard-btn">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
