import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ViewAssignments.module.css";

const ViewTruckAssignments = ({ companyCode }) => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get("/api/truckAssignments/assignments", {
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

  const handleDelete = async (assignmentId) => {
    try {
      await axios.delete(`/api/truckAssignments/assignments/${assignmentId}`);
      fetchAssignments(); // Refresh assignments after deletion
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  return (
    <div className={styles.assignmentsContainer}>
      <h2>Truck Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments found</p>
      ) : (
        <table className={styles.assignmentsTable}>
          <thead>
            <tr>
              <th>Truck Number</th>
              <th>Truck Name</th>
              <th>Driver Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.truck_number}</td>
                <td>{assignment.truck_name}</td>
                <td>{assignment.driver_name}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(assignment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTruckAssignments;
