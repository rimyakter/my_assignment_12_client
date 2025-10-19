import React from "react";
import AdminHome from "../Pages/Home/AdminHome";
import StatsCard from "../AdminComponent/StatsCard";
import LineChartCard from "../AdminComponent/LineChartCard";
import PieChartCard from "../AdminComponent/PieChartCard";
import RecentActivityCard from "../AdminComponent/RecentActivityCard";
import QuickStatsGrid from "../AdminComponent/QuickStatsGrid";
import { FaUsers, FaTint, FaDollarSign } from "react-icons/fa";
import BarChartCard from "../AdminComponent/BarChartCard";

const AdminLayout = () => {
  return (
    <div>
      <div className="p-4 max-w-6xl mx-auto">
        {/* Quick Stats */}
        <QuickStatsGrid>
          <StatsCard
            icon={<FaUsers />}
            title="Total Donors"
            value={100}
            color="text-primary"
          />
          <StatsCard
            icon={<FaTint />}
            title="Blood Requests"
            value={50}
            color="text-red-500"
          />
          <StatsCard
            icon={<FaDollarSign />}
            title="Total Funds"
            value="$1200"
            color="text-green-600"
          />
        </QuickStatsGrid>

        {/* Charts */}
        <div className="w-full bg-gray-100 p-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
          <BarChartCard
            title="Monthly Blood Requests"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May"],
              datasets: [
                {
                  label: "Requests",
                  data: [12, 19, 14, 20, 25],
                  backgroundColor: "#E41F35",
                },
                {
                  label: "Donors",
                  data: [8, 15, 10, 18, 22],
                  backgroundColor: "#4CAF50",
                },
              ],
            }}
          />
          <LineChartCard
            key="donors-trend" // important to avoid canvas reuse
            title="Donors Trend"
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr"],
              datasets: [
                {
                  label: "Donors",
                  data: [10, 20, 15, 25],
                  borderColor: "#E41F35",
                  backgroundColor: "#E41F35",
                  fill: false,
                },
              ],
            }}
          />

          <PieChartCard
            key="blood-group" // important to avoid canvas reuse
            title="Blood Group Distribution"
            data={{
              labels: ["A+", "B+", "O+", "AB+"],
              datasets: [
                {
                  data: [30, 25, 20, 25],
                  backgroundColor: ["#E41F35", "#FF7F50", "#FFD700", "#4CAF50"],
                },
              ],
            }}
          />
        </div>

        {/* Recent Activities */}
        <RecentActivityCard
          title="Recent Donation Requests"
          activities={[
            { name: "John Doe", status: "Pending" },
            { name: "Jane Smith", status: "Completed" },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminLayout;
