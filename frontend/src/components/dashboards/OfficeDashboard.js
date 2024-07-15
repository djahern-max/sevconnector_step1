import React, { useState, useEffect } from "react";
import ViewAssignments from "../assignments/ViewAssignments";
import AssignDriver from "../assignments/AssignDriver";
// import Navbar from "../layout/Navbar";
import styles from "./OfficeDashboard.module.css";
import axios from "axios";

const OfficeDashboard = () => {
  const [isAssignDriverVisible, setAssignDriverVisible] = useState(false);
  const [isViewAssignmentsVisible, setViewAssignmentsVisible] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const companyCode = "SEV"; // Replace this with the actual company code if it's dynamic

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("/api/driverAssignments/assignments", {
        params: { company_code: companyCode },
      });
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [companyCode]);

  const toggleAssignDriver = () => {
    setAssignDriverVisible(!isAssignDriverVisible);
  };

  const toggleViewAssignments = () => {
    setViewAssignmentsVisible(!isViewAssignmentsVisible);
  };

  const handleAssignmentAdded = () => {
    fetchAssignments();
  };

  return (
    <>
      <div className={styles.officeDashboardContainer}>
        <div className={styles.sidebar}>
          <button className={styles.menuItem} onClick={toggleAssignDriver}>
            {isAssignDriverVisible ? "Hide" : "Show"} Assign Driver
          </button>
          <button className={styles.menuItem} onClick={toggleViewAssignments}>
            {isViewAssignmentsVisible ? "Hide" : "Show"} View Assignments
          </button>
        </div>
        <div className={styles.mainContent}>
          {isAssignDriverVisible && (
            <div className={styles.section}>
              <AssignDriver
                companyCode={companyCode}
                onAssignmentAdded={handleAssignmentAdded}
              />
            </div>
          )}
          {isViewAssignmentsVisible && (
            <div className={styles.section}>
              <ViewAssignments
                companyCode={companyCode}
                assignments={assignments}
                onDeleteAssignment={fetchAssignments}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OfficeDashboard;
