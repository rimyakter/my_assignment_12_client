import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaUser,
  FaMapMarkerAlt,
  FaTint,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";

export default function AllDonationRequests() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/donationRequests/pending`);
        setRequests(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch donation requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading)
    return <div className="text-center py-8">Loading pending donations...</div>;

  if (error)
    return <div className="alert alert-error text-center my-4">{error}</div>;

  if (requests.length === 0)
    return (
      <div className="alert alert-info text-center my-4">
        No pending donations
      </div>
    );

  return (
    <div>
      <div className="text-center my-12">
        <h1 className="text-xl md:text-2xl text-gray-900 font-bold mb-3">
          Blood Donation Requests
        </h1>
        <p className="text-xs md:text-sm text-gray-600">
          A complete list of pending donation requests from patients in need
        </p>
      </div>

      {/* ✅ 4 columns, no border, bg-gray-100 cards with icons */}
      <div className="w-11/12 mx-auto p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center mb-12">
        {requests.map((req) => (
          <div
            key={req._id}
            className="card bg-gray-100 shadow-md rounded-xl text-center w-62 transition-transform transform hover:scale-105 hover:border-1 hover:border-primary"
          >
            <div className="card-body items-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                {req.recipientName}
              </h2>

              <p className="text-sm text-gray-600 mb-2 flex items-center gap-2 justify-center">
                <FaMapMarkerAlt className="text-primary" />
                {req.recipientDistrict}
                {req.recipientUpazila ? `, ${req.recipientUpazila}` : ""}
              </p>

              <div className="badge badge-primary text-white px-3 py-2 mb-3 flex items-center gap-1">
                <FaTint /> {req.bloodGroup}
              </div>

              <p className="text-sm text-gray-500 mb-2">
                <span className="flex items-center justify-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  {req.donationDate || "-"}
                </span>
                <span className="flex items-center justify-center gap-2 mt-1">
                  <FaClock className="text-primary" />
                  {req.donationTime || "-"}
                </span>
              </p>

              <div className="mt-3">
                <button
                  className="btn btn-sm btn-outline border-1 border-primary text-primary hover:bg-primary hover:text-white px-6"
                  onClick={() => navigate(`/detailsDonationRequest/${req._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
