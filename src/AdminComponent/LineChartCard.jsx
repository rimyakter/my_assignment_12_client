import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartCard = ({ title, data }) => {
  return (
    <div className="card bg-white shadow-sm rounded-sm p-4">
      <h3 className="text-xl md:text-md font-semibold mb-2 text-center">
        {title}
      </h3>
      {/* Add key based on title to force re-mount */}
      <Line key={title} data={data} />
    </div>
  );
};

export default LineChartCard;
