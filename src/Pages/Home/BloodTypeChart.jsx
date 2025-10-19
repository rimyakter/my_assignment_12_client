import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const BloodTypeChart = () => {
  const data = {
    labels: ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"],
    datasets: [
      {
        label: "Blood Units Available",
        data: [50, 80, 20, 80, 25, 10, 5, 90],
        backgroundColor: [
          "#E41F35",
          "#C21B2E",
          "#F56565",
          "#FC8181",
          "#FEB2B2",
          "#FBB6CE",
          "#F687B3",
          "#FED7E2",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="w-11/12 mx-auto my-12 bg-gray-100 text-primary rounded-2xl p-6 md:p-10 shadow-lg">
      <h2 className="text-xl md:text-2xl font-bold mb-3 text-center text-gray-900">
        Blood Type Availability
      </h2>
      <p className="text-xs md:text-sm text-gray-600 text-center mb-6 max-w-md mx-auto">
        Distribution of blood units in our blood bank.
      </p>

      <div className="max-w-[250px] md:max-w-[300px] mx-auto">
        <Pie data={data} />
      </div>
    </section>
  );
};

export default BloodTypeChart;
