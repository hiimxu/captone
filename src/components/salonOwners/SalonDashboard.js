import React from "react";

export default function SalonDashboard() {
  return (
    <div className="container dark-version">
      <div className="nav-wrapper position-relative end-0">
        <ul className="nav nav-pills nav-fill flex-column p-1" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link mb-0 px-0 py-1 active"
              data-bs-toggle="tab"
              href="#profile-tabs-vertical"
              role="tab"
              aria-controls="preview"
              aria-selected="true"
            >
              My Profile
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link mb-0 px-0 py-1"
              data-bs-toggle="tab"
              href="#dashboard-tabs-vertical"
              role="tab"
              aria-controls="code"
              aria-selected="false"
            >
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link mb-0 px-0 py-1"
              data-bs-toggle="tab"
              href="#payments-tabs-vertical"
              role="tab"
              aria-controls="code"
              aria-selected="false"
            >
              Payments
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
