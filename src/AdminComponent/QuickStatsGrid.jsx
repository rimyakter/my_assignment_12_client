import React from "react";

const QuickStatsGrid = ({ children }) => {
  return <div className="grid md:grid-cols-3 gap-4 mb-4">{children}</div>;
};

export default QuickStatsGrid;
