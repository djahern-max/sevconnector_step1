import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="simple-navbar">
      <h1 className="simple-navbar-logo">
        <Link to="/">
          <i className="fa-regular fa-handshake"></i> SevConnector
        </Link>
      </h1>
      <ul className="simple-navbar-list">
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
