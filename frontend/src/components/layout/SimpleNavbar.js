import React from "react";
import { Link, useNavigate } from "react-router-dom";

const SimpleNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="simple-navbar">
      <h1 className="simple-navbar-logo">
        <Link to="/">
          <i className="fa-regular fa-handshake"></i> SevConnector
        </Link>
      </h1>
      <ul className="simple-navbar-list">
        <li className="simple-navbar-logout">
          <a onClick={handleLogout} href="#!">
            <i className="fas fa-sign-out-alt" />
            <span className="hide-sm"> </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SimpleNavbar;
