import React from "react";
import DashboardTitle from "../../Component/DashboardTitle";
import DashboardSidebar from "../../Component/DashboardSidebar";

export default function Subscription() {
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
            <h2>Subscriptions</h2>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="dashboard-card">
              <div className="form-wrapper-row">
                <div className="form-wrapper-col">
                  <div className="form-heading">
                    <h3>Your Subscription</h3>
                    <p>
                      View your current plan, billing details,
                      <br /> and renewal date.
                    </p>
                  </div>
                </div>
                <div className="form-wrapper-col"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
