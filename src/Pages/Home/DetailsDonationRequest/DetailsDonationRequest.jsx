import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaHospital,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCommentDots,
  FaInfoCircle,
  FaHandsHelping,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function DetailsDonationRequest() {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donationRequest, setDonationRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    axiosSecure
      .get(`/donationRequests/${id}`)
      .then((res) => setDonationRequest(res.data))
      .catch((err) => {
        console.error("Error fetching request details:", err);
        Swal.fire("Error", "Failed to fetch request details", "error");
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleConfirmDonation = async () => {
    try {
      const res = await axiosSecure.post(`/donationRequests/${id}/confirm`);

      Swal.fire("Success", "Donation confirmed!", "success");

      setDonationRequest((prev) => ({
        ...prev,
        status: res.data.status,
        donorName: res.data.donorName,
        donorEmail: res.data.donorEmail,
      }));

      setIsModalOpen(false);
    } catch (err) {
      console.error("Error confirming donation:", err);
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to confirm donation",
        "error"
      );
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!donationRequest)
    return (
      <div className="text-center py-10 text-red-500">
        Donation request not found.
      </div>
    );

  return (
    <div className="w-11/12 mx-auto mt-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          Donation Request Details
        </h1>
        <p className="text-gray-600 text-sm">
          Review the details below before confirming your blood donation.
        </p>
      </div>

      {/* Card */}
      <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        {/* Static info bar */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-500 border-b pb-3">
          <div className="flex items-center gap-2">
            <FaInfoCircle className="text-primary" />
            <span>Verified Request • Safe Donation Zone</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHandsHelping className="text-primary" />
            <span>Emergency Support Available</span>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <p className="flex items-center gap-2">
            <FaUser className="text-primary" />
            <strong>Requester:</strong> {donationRequest.requesterName}
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-primary" />
            <strong>Email:</strong> {donationRequest.requesterEmail}
          </p>
          <p className="flex items-center gap-2">
            <FaUser className="text-primary" />
            <strong>Recipient:</strong> {donationRequest.recipientName}
          </p>
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <strong>District:</strong> {donationRequest.recipientDistrict},{" "}
            {donationRequest.recipientUpazila}
          </p>
          <p className="flex items-center gap-2">
            <FaHospital className="text-primary" />
            <strong>Hospital:</strong> {donationRequest.hospitalName}
          </p>
          <p className="flex items-center gap-2">
            <FaTint className="text-primary" />
            <strong>Blood Group:</strong>{" "}
            <span className="badge bg-primary text-white border-none">
              {donationRequest.bloodGroup}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <FaCalendarAlt className="text-primary" />
            <strong>Date:</strong> {donationRequest.donationDate}
          </p>
          <p className="flex items-center gap-2">
            <FaClock className="text-primary" />
            <strong>Time:</strong> {donationRequest.donationTime}
          </p>
          <p className="flex items-center gap-2 md:col-span-2">
            <FaCommentDots className="text-primary" />
            <strong>Message:</strong> {donationRequest.requestMessage}
          </p>
          <p className="flex items-center gap-2 md:col-span-2">
            <FaInfoCircle className="text-primary" />
            <strong>Status:</strong>{" "}
            <span className="badge bg-primary text-white border-none">
              {donationRequest.status}
            </span>
          </p>

          {donationRequest.donorName && (
            <p className="flex items-center gap-2 md:col-span-2">
              <FaHandsHelping className="text-primary" />
              <strong>Donor:</strong> {donationRequest.donorName} (
              {donationRequest.donorEmail})
            </p>
          )}
        </div>
      </div>

      {/* Donate Button */}
      {donationRequest.status === "pending" && (
        <div className="text-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-primary hover:bg-primary text-white px-6"
          >
            Confirm Donation
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box space-y-4">
            <h2 className="text-xl font-semibold text-center text-gray-800">
              Confirm Donation
            </h2>
            <div className="space-y-2">
              <input
                type="text"
                readOnly
                value={user?.displayName || user?.email?.split("@")[0]}
                className="input input-bordered w-full"
              />
              <input
                type="email"
                readOnly
                value={user?.email || ""}
                className="input input-bordered w-full"
              />
            </div>
            <div className="modal-action">
              <button
                onClick={handleConfirmDonation}
                className="btn bg-[#009688] hover:bg-[#00796B] text-white"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
