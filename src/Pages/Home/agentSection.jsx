import React from "react";
import "./homepage.css";

export default function AgentSection() {
  return (
      <section className="agent-section">
        <div className="container px-0">
          <div className="agent-section-txt-content">
            <h2 className="secondary-title ">
              <span>Designed for</span>
              Homebuyers, Agents &amp; Investors
            </h2>
            <p className="para text-center">
              No matter your role in real estate, PropScore simplifies the
              complex and brings clarity to every decision.
            </p>
          </div>

          <div className="flow-img-continer">
            <img src="/imgs/flow-banner.png" alt="Flow Banner" />
          </div>

          <div className="d-flex agent-card-block gap-3 flex-lg-row flex-column align-items-center justify-content-between">
            <div className="card agents-card">
              <div className="card-body">
                <div className="agent-img">
                  <img src="/imgs/homebuyers.png" alt="Homebuyers" />
                </div>
                <div className="content">
                  <h3 className="subheading">For Homebuyers</h3>
                  <p className="para">
                    Instantly uncover a property’s true value and hidden risks,
                    so you bid with confidence and avoid costly surprises.
                  </p>
                </div>
              </div>
            </div>

            <div className="card agents-card">
              <div className="card-body">
                <div className="agent-img">
                  <img src="/imgs/agents.png" alt="Agents" />
                </div>
                <div className="content">
                  <h3 className="subheading">For Agents</h3>
                  <p className="para">
                    Differentiate your listings with transparent PropScore™
                    badges—sell homes faster, win more listings, and earn higher
                    commissions.
                  </p>
                </div>
              </div>
            </div>

            <div className="card agents-card">
              <div className="card-body">
                <div className="agent-img">
                  <img src="/imgs/for-investor.png" alt="Investors" />
                </div>
                <div className="content">
                  <h3 className="subheading">For Investors</h3>
                  <p className="para">
                    Rapidly screen, rank, and compare dozens of deals in
                    seconds, backed by institutional grade data and predictive
                    analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
