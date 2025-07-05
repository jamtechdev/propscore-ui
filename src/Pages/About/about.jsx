import React from "react";

function About() {
  return (
    <div className="container mt-5">
      {/* Section 1: Company Overview */}
      <section className="mb-5">
        <div className="row">
          <div className="col-md-6">
            <h2>About Our Company</h2>
            <p>
              We are a passionate team dedicated to providing top-notch services
              to our customers. Our mission is to deliver excellence in every
              project we take on.
            </p>
          </div>
          <div className="col-md-6">
            <img src="/imgs/logo.png" alt="" />
          </div>
        </div>
      </section>

      {/* Section 2: Our Mission */}
      <section className="mb-5 bg-light p-4 rounded">
        <div className="text-center">
          <h2>Our Mission</h2>
          <p>
            To empower our clients through innovative solutions, exceptional
            service, and a commitment to quality. We believe in building
            long-lasting partnerships based on trust and performance.
          </p>
        </div>
      </section>

      {/* Section 3: Meet the Team */}
      <section>
        <h2 className="text-center mb-4">Meet the Team</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-3">
            <img
              src="https://via.placeholder.com/150"
              className="rounded-circle mb-2"
              alt="Team Member"
            />
            <h5>John Doe</h5>
            <p>CEO & Founder</p>
          </div>
          <div className="col-md-4 mb-3">
            <img
              src="https://via.placeholder.com/150"
              className="rounded-circle mb-2"
              alt="Team Member"
            />
            <h5>Jane Smith</h5>
            <p>CTO</p>
          </div>
          <div className="col-md-4 mb-3">
            <img
              src="https://via.placeholder.com/150"
              className="rounded-circle mb-2"
              alt="Team Member"
            />
            <h5>Mike Johnson</h5>
            <p>Head of Marketing</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
