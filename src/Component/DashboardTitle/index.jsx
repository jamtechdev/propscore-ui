import React from "react";

export default function index({title,subtitle}) {
  return (
    <div className="dashboard-title-wrapper">
      <div className="dashboard-title">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
