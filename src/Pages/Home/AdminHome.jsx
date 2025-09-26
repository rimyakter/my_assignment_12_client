// src/Pages/Admin/AdminHome.jsx
import { useEffect, useState } from "react";
import { FaUsers, FaTint } from "react-icons/fa"; // removed funding icon since API 404
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const AdminHome = () => {
  const { role } = useUserRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonors: 0,
    totalRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, requestsRes] = await Promise.all([
          axiosSecure.get("/users"),
          axiosSecure.get("/donationRequests"),
        ]);

        // handle both array and object formats
        const usersData = Array.isArray(usersRes.data)
          ? usersRes.data
          : usersRes.data?.users || [];

        // ✅ filter only donors
        const donorCount = usersData.filter((u) => u.role === "donor").length;

        const requestsData = Array.isArray(requestsRes.data)
          ? requestsRes.data
          : requestsRes.data?.requests || [];

        setStats({
          totalDonors: donorCount,
          totalRequests: requestsData.length || 0,
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
      <div className="grid md:grid-cols-2 gap-6">
        {/* Total Donors */}
        <div className="card bg-base-100 shadow-lg border rounded-2xl">
          <div className="card-body items-center text-center">
            <FaUsers className="text-5xl text-primary mb-4" />
            <h2 className="text-3xl font-bold">{stats.totalDonors}</h2>
            <p className="text-gray-500">Total Donors</p>
          </div>
        </div>

        {/* Total Requests */}
        <div className="card bg-base-100 shadow-lg border rounded-2xl">
          <div className="card-body items-center text-center">
            <FaTint className="text-5xl text-red-500 mb-4" />
            <h2 className="text-3xl font-bold">{stats.totalRequests}</h2>
            <p className="text-gray-500">Blood Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
