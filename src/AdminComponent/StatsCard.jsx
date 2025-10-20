import React from "react";

const StatsCard = ({ icon, title, value, color }) => {
  return (
    <div className="card bg-white shadow-sm rounded-sm p-4 flex flex-col items-center text-center">
      <div className={`text-2xl mb-2 ${color}`}>{icon}</div>
      <h2 className="text-xl font-bold">{value}</h2>
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

export default StatsCard;
