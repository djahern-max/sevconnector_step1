import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ViewAssignments.module.css";

const ViewTruckAssignments = ({ companyCode }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        if (!companyCode) {
          console.error("Company code is undefined");
          return;
        }

        const response = await axios.get("/api/truckAssignments/assignments", {
          params: { company_code: companyCode },
        });
        setAssignments(response.data);
      } catch (error) {
        console.error("Error fetching truck assignments:", error);
      }
    };

    fetchAssignments();
  }, [companyCode]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/api/truckAssignments/assignments/${id}`);
        setAssignments(
          assignments.filter((assignment) => assignment.id !== id)
        );
        alert("Assignment deleted successfully");
      } catch (error) {
        console.error("Error deleting truck assignment:", error);
        alert("Failed to delete truck assignment");
      }
    }
  };

  return (
    <div className={styles.viewAssignmentsContainer}>
      <h2>Truck Assignments</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Truck Number</th>
            <th className="hide-on-small">Truck Name</th>
            <th>Driver Name</th>
            <th className="hide-on-small">Company Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.truck_number}</td>
              <td className="hide-on-small">{assignment.truck_name}</td>
              <td>{assignment.driver_name}</td>
              <td className="hide-on-small">{assignment.company_code}</td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(assignment.id)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewTruckAssignments;
