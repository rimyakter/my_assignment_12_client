import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChartCard = ({ title, data, options }) => {
  return (
    <div className="card bg-base-100 shadow-sm rounded-sm p-4">
      <h2 className="text-md font-semibold mb-4">{title}</h2>
      <Bar
        key={title} // important to avoid canvas reuse error
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: false, text: title },
          },
          ...options,
        }}
      />
    </div>
  );
};

export default BarChartCard;
