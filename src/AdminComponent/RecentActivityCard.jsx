import React from "react";

const RecentActivityCard = ({ title, activities }) => {
  return (
    <div className="card bg-white shadow-md rounded-2xl p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {activities.map((act, index) => (
          <li
            key={index}
            className="flex justify-between border-b pb-2 text-gray-700"
          >
            <span>{act.name}</span>
            <span>{act.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivityCard;
