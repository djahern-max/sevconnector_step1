// Sidebar.js
import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ toggleAssignDriver, toggleViewAssignments }) => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.menuItem} onClick={toggleAssignDriver}>
        Assign Driver
      </button>
      <button className={styles.menuItem} onClick={toggleViewAssignments}>
        View Assignments
      </button>
    </div>
  );
};

export default Sidebar;
