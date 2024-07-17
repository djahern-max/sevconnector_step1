import React from "react";

const Sidebar = ({
  toggleAssignDriver,
  toggleViewAssignments,
  toggleAssignTruck,
  toggleViewTruckAssignments,
}) => {
  return (
    <div className={styles.sidebar}>
      <button className={styles.menuItem} onClick={toggleAssignDriver}>
        Assign Driver
      </button>
      <button className={styles.menuItem} onClick={toggleViewAssignments}>
        View Assignments
      </button>
      <button className={styles.menuItem} onClick={toggleAssignTruck}>
        Assign Truck
      </button>
      <button className={styles.menuItem} onClick={toggleViewTruckAssignments}>
        View Truck Assignments
      </button>
    </div>
  );
};

export default Sidebar;
