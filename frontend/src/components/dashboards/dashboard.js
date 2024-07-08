import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "../../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage and navigate to the login page
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="container">
      <div className="dashboard-container">
        <h2 className="dashboard-title">🚧 Under Construction 🚧</h2>
        <div className="message-container">
          <p className="message">
            Thank you for checking out our application! We are working hard on
            exciting features but they aren't quite ready yet. Please stay tuned
            for exciting updates!
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>{" "}
        {/* Add logout button */}
      </div>
    </div>
  );
};

export default Dashboard;
