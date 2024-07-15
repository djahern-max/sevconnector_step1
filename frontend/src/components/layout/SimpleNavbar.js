import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SimpleNavbar.module.css";

const SimpleNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa-regular fa-handshake"></i> SevConnector{" "}
        </Link>
      </h1>

      <a onClick={handleLogout} href="#!">
        <i className="fas fa-sign-out-alt" /> <span className="hide-sm"></span>
      </a>
    </nav>
  );
};

export default SimpleNavbar;
