import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post("/api/auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // console.log("User logged in:", response.data);
      // localStorage.setItem("token", response.data.token);
      // navigate("/dashboard"); // Use navigate to redirect

      //For now navigating to driver dashboard when logged until we have roles set up
      console.log("User logged in:", response.data);
      localStorage.setItem("token", response.data.token);
      navigate("/DriverDashboard"); // Use navigate to redirect
    } catch (err) {
      console.error("Error logging in user:", err);
      alert("Invalid credentials, please try again");
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account yet? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

export default Login;
