import { useEffect, useState } from "react";
import { FaUsers, FaTint, FaDollarSign } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";
import StatsCard from "../../AdminComponent/StatsCard";

const AdminHome = () => {
  const { role } = useUserRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
    totalFunds: 0,
  });

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
          totalRequests: requestsData.length || 0,
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
    <div className="p-6 max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">
          Welcome back,{" "}
          <span className="text-primary">{user?.displayName || "Admin"}</span>{" "}
          👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here’s a quick overview of your blood donation platform.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          icon={<FaUsers />}
          title="Total Donors"
          value={stats.totalDonors}
          color="text-primary"
        />
        <StatsCard
          icon={<FaTint />}
          title="Blood Requests"
          value={stats.totalRequests}
          color="text-red-500"
        />
        <StatsCard
          icon={<FaDollarSign />}
          title="Total Funds Donated"
          value={`$${stats.totalFunds.toFixed(2)}`}
          color="text-green-600"
        />
      </div>
    </div>
  );
};

export default AdminHome;
