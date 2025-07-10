import React from "react";
import "./homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function EarlyAccessSection() {
  return (
      <section className="get-early-section">
        <div className="d-flex align-items-center justify-content-center banner-get">
          <div className="max-w-605">
            <div className="d-flex align-items-center justify-content-center gap-3">
              <button className="d-flex align-items-center justify-content-center glass-btn">
                <img src="/imgs/bullzy.svg" alt="AI Icon 1" />
                <span>
                  AI-Powered <span className="opacity-8">Analysis</span>
                </span>
              </button>
              <button className="d-flex align-items-center justify-content-center glass-btn">
                <img src="/imgs/pie.svg" alt="AI Icon 2" />
                <span>
                  Data-Backed <span className="opacity-8">Decisions</span>
                </span>
              </button>
            </div>

            <div className="contents">
              <h3 className="heading-white">Get Early Access to PropScore</h3>
              <p className="para">
                Thousands are already on the list. Join them for{" "}
                <strong>FREE</strong> and see what makes PropScore a smarter way
                to buy or invest.
              </p>
            </div>

            <button className="green-line-btn mx-auto">
              Join Waitlist <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </section>
  );
}
