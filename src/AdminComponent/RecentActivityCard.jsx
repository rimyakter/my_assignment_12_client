import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUser,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import useAxiosSecure from "../hooks/useAxiosSecure";

const statusIcons = {
  Completed: <FaCheckCircle className="text-green-500" />,
  Pending: <FaClock className="text-yellow-500" />,
  Failed: <FaTimesCircle className="text-red-500" />,
};

const userStatusIcons = {
  all: <FaUser className="text-gray-500" />,
  active: <FaUserCheck className="text-green-500" />,
  blocked: <FaUserTimes className="text-red-500" />,
};

const RecentActivityCard = ({ title }) => {
  const axiosSecure = useAxiosSecure();
  const [funds, setFunds] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch funds
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const { data } = await axiosSecure.get("/funds");
        setFunds(data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };
    fetchFunds();
  }, [axiosSecure]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [axiosSecure]);

  // Aggregate total funds per user
  const userTotals = Object.values(
    funds.reduce((acc, fund) => {
      if (!acc[fund.name]) acc[fund.name] = { name: fund.name, total: 0 };
      acc[fund.name].total += fund.amount / 100;
      return acc;
    }, {})
  );

  // Aggregate users per role
  const roleCounts = users.reduce((acc, user) => {
    if (!acc[user.role]) acc[user.role] = 0;
    acc[user.role]++;
    return acc;
  }, {});

  const usersChartData = Object.keys(roleCounts).map((role) => ({
    role,
    count: roleCounts[role],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Fund Chart */}
      <div className="bg-white shadow-sm rounded-sm p-6 flex flex-col h-full transition">
        <h3 className="text-xl text-center font-semibold mb-3">
          {title} - Funds
        </h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={userTotals}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis
                tickFormatter={(val) => `$${val}`}
                tick={{ fill: "#6B7280" }}
              />
              <Tooltip formatter={(val) => `$${val}`} />
              <Bar dataKey="total" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-4">
          {Object.keys(statusIcons).map((status) => (
            <div
              key={status}
              className="flex items-center gap-1 text-sm font-medium"
            >
              {statusIcons[status]} <span>{status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Users Chart */}
      <div className="bg-white shadow-sm rounded-sm p-6 flex flex-col h-full transition">
        <h3 className="text-xl text-center font-semibold mb-3">
          {title} - Users
        </h3>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={usersChartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="role" tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6B7280" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {Object.keys(userStatusIcons).map((status) => (
            <div
              key={status}
              className="flex items-center gap-1 text-sm font-medium"
            >
              {userStatusIcons[status]} <span>{status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivityCard;
