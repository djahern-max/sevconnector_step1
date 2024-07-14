import React from "react";
import ViewAssignments from "../assignments/ViewAssignments";
import AssignDriver from "../assignments/AssignDriver";

const OfficeDashboard = () => {
  const companyCode = "SEV"; // Replace this with the actual company code if it's dynamic

  return (
    <div>
      <AssignDriver companyCode={companyCode} />
      <ViewAssignments companyCode={companyCode} />
    </div>
  );
};

export default OfficeDashboard;
