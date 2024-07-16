import React, { useState, useEffect } from "react";
import ViewAssignments from "../assignments/ViewAssignments";
import styles from "./OfficeDashboard.module.css";
import axios from "axios";

const SuperDashboard = () => {
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

  const toggleViewAssignments = () => {
    setViewAssignmentsVisible(!isViewAssignmentsVisible);
  };

  return (
    <>
      <div className={styles.officeDashboardContainer}>
        <div className={styles.sidebar}>
          <button className={styles.menuItem} onClick={toggleViewAssignments}>
            {isViewAssignmentsVisible ? "Hide" : "Show"} View Assignments
          </button>
        </div>
        <div className={styles.mainContent}>
          {isViewAssignmentsVisible && (
            <ViewAssignments
              companyCode={companyCode}
              assignments={assignments}
              onDeleteAssignment={fetchAssignments}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SuperDashboard;
