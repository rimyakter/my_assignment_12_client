import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function EditDonationRequest() {
  const location = useLocation();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch existing donation request
  useEffect(() => {
    axiosSecure
      .get(`/donationRequests/${id}`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch donation request", "error");
      })
      .finally(() => setLoading(false));
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.put(`/donationRequests/${id}`, formData);
      Swal.fire("Success", "Donation request updated!", "success");
      navigate(location.state?.from || "/dashboard/My-donation-request");
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.error || "Failed to update",
        "error"
      );
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Donation Request</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="recipientDistrict"
          value={formData.recipientDistrict}
          onChange={handleChange}
          placeholder="District"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="recipientUpazila"
          value={formData.recipientUpazila}
          onChange={handleChange}
          placeholder="Upazila"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          placeholder="Blood Group"
          className="input input-bordered w-full"
          required
        />
        <input
          type="date"
          name="donationDate"
          value={formData.donationDate}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <input
          type="time"
          name="donationTime"
          value={formData.donationTime}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <textarea
          name="requestMessage"
          value={formData.requestMessage}
          onChange={handleChange}
          placeholder="Message"
          className="textarea textarea-bordered w-full"
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Update Donation Request
        </button>
      </form>
    </div>
  );
}
