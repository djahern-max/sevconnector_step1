import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <div></div>
          <h1 className="x-large"> SevConnector</h1>
          <p className="lead">
            FIELD = ( <h2 className="fa-regular fa-handshake"></h2> ) = OFFICE
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link
              to="/login"
              className="btn btn-light
            "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
