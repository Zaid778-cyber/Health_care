import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-logo">🩺 HealthVault</div>

      <div className="navbar-links">
        <Link
          to="/dashboard"
          className={`nav-link ${
            location.pathname === "/dashboard" ? "active" : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/HealthCondition"
          className={`nav-link ${
            location.pathname === "/HealthCondition" ? "active" : ""
          }`}
        >
          Health Condition
        </Link>
      </div>
    </nav>
  );
}
