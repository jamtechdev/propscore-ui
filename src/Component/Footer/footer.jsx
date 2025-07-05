import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="row">
            {/* Logo and CTA Column */}
            <div className="col-12">
              <div className="footer-column px-0 d-flex align-items-center justify-content-between footer-logo-section">
                <div className="footer-logo">
                  <div className="logo-icon">
                    <img src="/imgs/logo.png" alt="Company Logo" />
                  </div>
                </div>
                <a
                  href="#"
                  className="login-btn d-flex align-items-center justify-content-center"
                >
                  Get Your Score
                  <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </div>

            {/* Company Column */}
            <div className="footer-column col-xl-3 col-md-6 col-4 border-right">
              <h3>Company</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">Features</a>
                </li>
                <li>
                  <a href="#">Resources</a>
                </li>
                <li>
                  <a href="#">Career</a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-column col-xl-3 col-md-6 col-8 border-right">
              <h3>Contact us</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <FontAwesomeIcon icon={faEnvelope} />
                  <span>info@mypropscore.com</span>
                </div>
                <div className="contact-item">
                  <FontAwesomeIcon icon={faPhone} />
                  <span>+1 234 567 8901</span>
                </div>
              </div>
            </div>

            {/* Social Media Column */}
            <div className="footer-column col-xl-3 col-md-6 col-12 border-right">
              <h3 style={{ marginTop: 24 }}>Follow Us</h3>
              <div className="social-links">
                <a href="#" className="social-link whatsapp">
                  <i className="ri-twitter-fill" />
                </a>
                <a href="#" className="social-link facebook">
                  <i className="ri-facebook-fill" />
                </a>
                <a href="#" className="social-link linkedin">
                  <i className="ri-linkedin-fill" />
                </a>
              </div>
            </div>

            {/* Legal Column */}
            <div className="footer-column col-xl-3 col-12 col-md-6">
              <h3>Legal</h3>
              <ul className="footer-links">
                <li>
                  <a href="#">NMLS Corporate Access</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Use</a>
                </li>
                <li>
                  <a href="#">Disclosures &amp; Licensing</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">© 2025 All rights reserved</div>
      </div>
    </footer>
  );
}
