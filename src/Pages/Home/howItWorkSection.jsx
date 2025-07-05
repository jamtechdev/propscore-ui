import React, { useState } from "react";
import "./homepage.css";

export default function HowItWork() {
  const [activeCollapse, setActiveCollapse] = useState("collapseOne");

  const images = {
    collapseOne: "/imgs/how-it-banner.png",
    collapseTwo: "/imgs/instant-market.png",
    collapseThree: "/imgs/predictive-analytics.png",
    collapseFour: "/imgs/auditable.png",
    default: "/imgs/how-it-banner.png",
  };

  const handleToggle = (collapseId) => {
    setActiveCollapse((prev) => (prev === collapseId ? null : collapseId));
  };

  return (
    <>
      <section className="how-it-work--section">
        <div className="container px-0">
          <div className="d-flex align-items-start justify-content-between gap-3  mb-5">
            <div className="content">
              <h2 className="secondary-title">
                How it <span>Works</span>
              </h2>
              <p className="para">
                We analyze everything — so you don’t have to. One score, powered
                by hundreds of real estate signals.
              </p>
            </div>
            <button className="outline-btn d-none d-xl-block">
              Learn More <i className="ri-arrow-right-long-line"></i>
            </button>
          </div>

          <div className="row g-5">
            {/* Accordion Section */}
            <div className="col-xl-6 col-12">
              <div className="accordion" id="featureAccordion">
                {/* Accordion Item 1 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        activeCollapse === "collapseOne" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleToggle("collapseOne")}
                    >
                      <img src="/imgs/data.svg" alt="" />
                      Unified Data Intelligence
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${
                      activeCollapse === "collapseOne" ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <p className="para">
                        Seamlessly fuses MLS, ATTOM, Zillow, public records, and
                        satellite imagery into the most complete property
                        profile in the industry.
                      </p>
                      <img
                        src="/imgs/mobile-how.png"
                        className="d-xl-none w-100 d-block"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Accordion Item 2 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        activeCollapse === "collapseTwo" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleToggle("collapseTwo")}
                    >
                      <img src="/imgs/market-res.svg" alt="" />
                      Instant Market Response
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${
                      activeCollapse === "collapseTwo" ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <p className="para">
                        Respond to market changes as they happen with real-time
                        data insights and alerts.
                      </p>
                      <img
                        src="/imgs/instant-market-mob.png"
                        className="d-xl-none w-100 d-block"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Accordion Item 3 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        activeCollapse === "collapseThree" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleToggle("collapseThree")}
                    >
                      <img src="/imgs/analatics.svg" alt="" />
                      AI-Powered Predictive Analytics
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${
                      activeCollapse === "collapseThree" ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <p className="para">
                        Leverage machine learning to predict market trends and
                        property values.
                      </p>
                      <img
                        src="/imgs/predictive-analytics-mob.png"
                        className="d-xl-none w-100 d-block"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Accordion Item 4 */}
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        activeCollapse === "collapseFour" ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => handleToggle("collapseFour")}
                    >
                      <img src="/imgs/transparent.svg" alt="" />
                      Transparent &amp; Auditable
                    </button>
                  </h2>
                  <div
                    className={`accordion-collapse collapse ${
                      activeCollapse === "collapseFour" ? "show" : ""
                    }`}
                  >
                    <div className="accordion-body">
                      <p className="para">
                        Ensure every decision is trackable, explainable, and
                        backed by data.
                      </p>
                      <img
                        src="/imgs/auditable-mob.png"
                        className="d-xl-none w-100 d-block"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="col-xl-6 col-12">
              <div className="how-it-img d-xl-block d-none">
                <img
                  src={images[activeCollapse] || images.default}
                  alt="How it works"
                />
              </div>
              <button className="outline-btn d-xl-none d-block w-100">
                Learn More <i className="ri-arrow-right-long-line" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
