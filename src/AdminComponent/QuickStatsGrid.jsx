import React from "react";

const QuickStatsGrid = ({ children }) => {
  return <div className="grid md:grid-cols-3 gap-4 mb-2">{children}</div>;
};

export default QuickStatsGrid;
