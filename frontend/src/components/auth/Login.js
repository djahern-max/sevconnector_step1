import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company_id, setcompany_id] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password, company_id };

    try {
      const response = await axios.post("/api/auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { token } = response.data; // Extract token from response

      if (token) {
        localStorage.setItem("token", token);

        const decoded = jwtDecode(token); // Decode the JWT token
        const role = decoded.role;

        if (role === "driver") {
          navigate("/driver-dashboard");
        } else if (role === "superintendent") {
          navigate("/superintendent-dashboard");
        } else if (role === "office") {
          navigate("/office-dashboard");
        }
      } else {
        console.log("User logged in:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); // Use navigate to redirect
      }
    } catch (err) {
      console.error("Error logging in user:", err);
    }
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Login</h1>
      <form className="form" onSubmit={handleLogin}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company ID"
            name="company_id"
            value={company_id}
            onChange={(e) => setcompany_id(e.target.value)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
