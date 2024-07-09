import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage and navigate to the login page
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa-regular fa-handshake"></i> SevConnector{" "}
        </Link>
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <a onClick={handleLogout} href="#!">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm"></span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
