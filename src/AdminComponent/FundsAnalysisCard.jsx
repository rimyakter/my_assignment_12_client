import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useAxiosSecure from "../hooks/useAxiosSecure";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FundsAnalysisCard = () => {
  const axiosSecure = useAxiosSecure();
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch funds from backend
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { data } = await axiosSecure.get("/funds");
        setFunds(data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFunds();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!funds.length) {
    return (
      <div className="bg-white border shadow-lg rounded-2xl p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Funds Analysis
        </h2>
        <p className="text-gray-500">No funding data available yet.</p>
      </div>
    );
  }

  // ✅ Convert cents → USD and group by month
  const monthlyFunds = {};
  funds.forEach((f) => {
    const date = new Date(f.createdAt);
    const month = date.toLocaleString("default", { month: "short" });
    monthlyFunds[month] = (monthlyFunds[month] || 0) + f.amount / 100;
  });

  const months = Object.keys(monthlyFunds);
  const amounts = Object.values(monthlyFunds);

  // ✅ Derived stats
  const totalFunds = amounts.reduce((a, b) => a + b, 0);
  const avgDonation = (totalFunds / amounts.length).toFixed(2);
  const growthRate =
    amounts.length > 1
      ? (
          ((amounts[amounts.length - 1] - amounts[0]) / amounts[0]) *
          100
        ).toFixed(1)
      : 0;

  // ✅ Chart data
  const cumulative = amounts.map(
    (
      (sum) => (value) =>
        (sum += value)
    )(0)
  );
  const chartData = {
    labels: months,
    datasets: [
      {
        type: "bar",
        label: "Monthly Donations ($)",
        data: amounts,
        backgroundColor: "#E41F35",
        borderRadius: 6,
      },
      {
        type: "line",
        label: "Cumulative Growth",
        data: cumulative,
        borderColor: "#4CAF50",
        tension: 0.3,
        fill: false,
        yAxisID: "y1",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    stacked: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
        beginAtZero: true,
        ticks: {
          callback: (val) => `$${val}`,
        },
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <div className="bg-white shadow-sm rounded-sm p-4">
      <h2 className="text-xl md:text-md font-semibold mb-3 text-gray-800 text-center">
        Funds Analysis
      </h2>

      {/* Key Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-3 text-center">
        <div className="p-2 bg-gray-50 rounded-sm">
          <h3 className="text-lg font-bold text-gray-900">
            ${totalFunds.toLocaleString()}
          </h3>
          <p className="text-sm text-gray-500">Total Funds</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-sm">
          <h3 className="text-lg font-bold text-gray-900">${avgDonation}</h3>
          <p className="text-sm text-gray-500">Avg Monthly Donation</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-sm">
          <h3
            className={`text-lg font-bold ${
              growthRate >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {growthRate}%
          </h3>
          <p className="text-sm text-gray-500">Growth Rate</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-60">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FundsAnalysisCard;
