import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router";
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
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {requests.map((req) => (
        <div key={req._id} className="card bg-base-100 shadow-md border">
          <div className="card-body">
            <h2 className="card-title">{req.recipientName}</h2>
            <p className="text-sm text-gray-600">
              Location: {req.recipientDistrict}
              {req.recipientUpazila ? `, ${req.recipientUpazila}` : ""}
            </p>
            <p className="badge badge-outline mt-2">{req.bloodGroup}</p>
            <p className="mt-2 text-sm">
              Date: {req.donationDate || "-"} <br />
              Time: {req.donationTime || "-"}
            </p>
            <div className="card-actions justify-end mt-4">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => navigate(`/detailsDonationRequest/${req._id}`)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
