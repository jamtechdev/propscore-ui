import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import { Link } from "react-router";

const Header_V1 = ({goBack, canGoBack}) => {
  return (
    <header id="login-header" className="py-3">
      <div className="header-container">
        <div className="d-flex align-items-center justify-content-between">
          <div
            className="left"
            onClick={goBack}
            style={{
              cursor: canGoBack ? "pointer" : "default",
              opacity: canGoBack ? 1 : 0.5,
            }}
          >
            <div className="d-flex align-items-center gap-1 back-button">
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back</span>
            </div>
          </div>
          <div className="right">
            <Link to={"/"} className="text-decoration-none">
              <div className="d-flex align-items-center gap-1">
                <img src="/imgs/logo-dashboard.png" alt="" />
                <span className="d-md-block d-none">PropScore</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header_V1;