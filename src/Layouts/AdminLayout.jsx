import React, { useEffect, useState } from "react";
import FundsAnalysisCard from "../AdminComponent/FundsAnalysisCard";
import StatsCard from "../AdminComponent/StatsCard";
import LineChartCard from "../AdminComponent/LineChartCard";
import PieChartCard from "../AdminComponent/PieChartCard";
import RecentActivityCard from "../AdminComponent/RecentActivityCard";
import BarChartCard from "../AdminComponent/BarChartCard";
import { FaUsers, FaTint, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const AdminLayout = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalFunds: 0,
  });

  // ✅ Fetch real data for StatsCards
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, requestsRes, fundsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/donationRequests"),
          axiosSecure.get("/funds"),
        ]);

        const usersData = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data?.users || [];
        const donorCount = usersData.filter((u) => u.role === "donor").length;

        const requestsData = Array.isArray(requestsRes.data)
          ? requestsRes.data
          : requestsRes.data?.requests || [];

        const fundsData = Array.isArray(fundsRes.data) ? fundsRes.data : [];
        const totalFunds =
          fundsData.reduce((sum, f) => sum + (f.amount || 0), 0) / 100;

        setStats({
          totalDonors: donorCount,
          totalRequests: requestsData.length,
          totalFunds,
        });
      } catch (err) {
        console.error("❌ Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-4 bg-gray-100 rounded-sm">
      {/* ✅ Top Section: Funds Analysis + Live Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Funds Analysis */}
        <div className="w-full">
          <FundsAnalysisCard />
        </div>

        {/* Right Column: Live Stat Cards */}
        <div className="flex flex-col justify-between gap-4">
          <StatsCard
            icon={<FaUsers className="text-2xl" />}
            title="Total Donors"
            value={stats.totalDonors}
            color="text-primary"
          />
          <StatsCard
            icon={<FaTint className="text-2xl" />}
            title="Blood Requests"
            value={stats.totalRequests}
            color="text-red-500"
          />
          <StatsCard
            icon={<FaDollarSign className="text-2xl" />}
            title="Total Funds"
            value={`$${stats.totalFunds.toFixed(2)}`}
            color="text-green-600"
          />
        </div>
      </div>

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          key="donors-trend"
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
          key="blood-group"
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

      {/* Bottom Section: Recent Activity */}
      <RecentActivityCard
        title="Recent Donation Requests"
        activities={[
          { name: "John Doe", status: "Pending" },
          { name: "Jane Smith", status: "Completed" },
          { name: "Michael Brown", status: "In Progress" },
        ]}
      />
    </div>
  );
};

export default AdminLayout;
