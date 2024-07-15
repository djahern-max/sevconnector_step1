import React, { useState } from "react";
import ViewAssignments from "../assignments/ViewAssignments";
import AssignDriver from "../assignments/AssignDriver";
import styles from "./OfficeDashboard.module.css";

const OfficeDashboard = () => {
  const [isAssignDriverVisible, setAssignDriverVisible] = useState(true);
  const [isViewAssignmentsVisible, setViewAssignmentsVisible] = useState(true);
  const companyCode = "SEV"; // Replace this with the actual company code if it's dynamic

  const toggleAssignDriver = () => {
    setAssignDriverVisible(!isAssignDriverVisible);
  };

  const toggleViewAssignments = () => {
    setViewAssignmentsVisible(!isViewAssignmentsVisible);
  };

  return (
    <div className={styles.officeDashboardContainer}>
      <header className={styles.header}>
        <h1>Office Dashboard</h1>
      </header>
      <main className={styles.mainContent}>
        <div className={styles.section}>
          <button className={styles.toggleButton} onClick={toggleAssignDriver}>
            {isAssignDriverVisible ? "Hide" : "Show"} Assign Driver
          </button>
          {isAssignDriverVisible && <AssignDriver companyCode={companyCode} />}
        </div>
        <div className={styles.section}>
          <button
            className={styles.toggleButton}
            onClick={toggleViewAssignments}
          >
            {isViewAssignmentsVisible ? "Hide" : "Show"} View Assignments
          </button>
          {isViewAssignmentsVisible && (
            <ViewAssignments companyCode={companyCode} />
          )}
        </div>
      </main>
    </div>
  );
};

export default OfficeDashboard;
