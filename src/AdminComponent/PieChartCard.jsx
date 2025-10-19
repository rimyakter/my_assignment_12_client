import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartCard = ({ title, data }) => {
  return (
    <div className="card bg-white shadow-sm rounded-sm p-4">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <Pie key={title} data={data} />
    </div>
  );
};

export default PieChartCard;
