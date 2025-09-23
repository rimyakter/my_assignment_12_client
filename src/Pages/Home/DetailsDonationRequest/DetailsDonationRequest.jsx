import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function DetailsDonationRequest() {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [donationRequest, setDonationRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch request details
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

  // Confirm donation
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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Donation Request Details
      </h1>

      <div className="card bg-base-100 shadow-xl p-6 space-y-2">
        <p>
          <strong>Requester:</strong> {donationRequest.requesterName}
        </p>
        <p>
          <strong>Email:</strong> {donationRequest.requesterEmail}
        </p>
        <p>
          <strong>Recipient:</strong> {donationRequest.recipientName}
        </p>
        <p>
          <strong>District:</strong> {donationRequest.recipientDistrict}
        </p>
        <p>
          <strong>Upazila:</strong> {donationRequest.recipientUpazila}
        </p>
        <p>
          <strong>Hospital:</strong> {donationRequest.hospitalName}
        </p>
        <p>
          <strong>Blood Group:</strong> {donationRequest.bloodGroup}
        </p>
        <p>
          <strong>Date:</strong> {donationRequest.donationDate}
        </p>
        <p>
          <strong>Time:</strong> {donationRequest.donationTime}
        </p>
        <p>
          <strong>Message:</strong> {donationRequest.requestMessage}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="badge badge-info">{donationRequest.status}</span>
        </p>
        {donationRequest.donorName && (
          <p>
            <strong>Donor:</strong> {donationRequest.donorName} (
            {donationRequest.donorEmail})
          </p>
        )}
      </div>

      {/* Donate button only for pending */}
      {donationRequest.status === "pending" && (
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary"
          >
            Donate
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <dialog open className="modal">
          <div className="modal-box space-y-4">
            <h2 className="text-xl font-semibold text-center">
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
                className="btn btn-success"
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
