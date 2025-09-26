import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function CreateDonationRequest() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [userProfile, setUserProfile] = useState(null); // ✅ full user info
  const selectedDistrict = watch("recipientDistrict");

  // ✅ fetch user profile to check status + get name
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${encodeURIComponent(user.email)}`)
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => console.error("Error fetching user profile:", err));
    }
  }, [user, axiosSecure]);

  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data.find((d) => d.type === "table").data));

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data.find((u) => u.type === "table").data));
  }, []);

  const onSubmit = async (data) => {
    if (userProfile?.status !== "active") {
      Swal.fire("Blocked", "You are not allowed to create requests!", "error");
      return;
    }

    const districtObj = JSON.parse(data.recipientDistrict);

    const donationRequest = {
      requesterName: userProfile?.name || "Unknown User", // ✅ from DB, not Firebase
      requesterEmail: userProfile?.email || user?.email || "",
      recipientName: data.recipientName,
      recipientDistrict: districtObj.name,
      recipientDistrictId: districtObj.id,
      recipientUpazila: data.recipientUpazila,
      hospitalName: data.hospitalName,
      fullAddress: data.fullAddress,
      bloodGroup: data.bloodGroup,
      donationDate: data.donationDate,
      donationTime: data.donationTime,
      requestMessage: data.requestMessage,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/donationRequests", donationRequest);

      if (res.status === 201) {
        Swal.fire(
          "Success",
          "Donation request created successfully!",
          "success"
        );
        reset();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error submitting donation request:", error);
      Swal.fire("Error", "Failed to create donation request!", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Create Donation Request
      </h1>

      {/* 🚫 If blocked */}
      {userProfile?.status === "blocked" ? (
        <div className="alert alert-error text-white font-semibold">
          🚫 Your account is blocked. You cannot create donation requests.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Requester Info (read-only from DB) */}
          <input
            readOnly
            value={userProfile?.name || ""}
            className="input input-bordered w-full"
          />

          <input
            readOnly
            value={userProfile?.email || ""}
            className="input input-bordered w-full"
          />

          {/* Recipient Info */}
          <input
            {...register("recipientName", { required: true })}
            placeholder="Recipient Name"
            className="input input-bordered w-full"
          />
          {errors.recipientName && (
            <span className="text-red-500">Required</span>
          )}

          <select
            {...register("recipientDistrict", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option
                key={district.id}
                value={JSON.stringify({ id: district.id, name: district.name })}
              >
                {district.name}
              </option>
            ))}
          </select>
          {errors.recipientDistrict && (
            <span className="text-red-500">Required</span>
          )}

          <select
            {...register("recipientUpazila", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Upazila</option>
            {upazilas
              .filter(
                (u) => u.district_id === JSON.parse(selectedDistrict || "{}").id
              )
              .map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name}
                </option>
              ))}
          </select>
          {errors.recipientUpazila && (
            <span className="text-red-500">Required</span>
          )}

          <input
            {...register("hospitalName", { required: true })}
            placeholder="Hospital Name"
            className="input input-bordered w-full"
          />
          {errors.hospitalName && (
            <span className="text-red-500">Required</span>
          )}

          <input
            {...register("fullAddress", { required: true })}
            placeholder="Full Address"
            className="input input-bordered w-full"
          />
          {errors.fullAddress && <span className="text-red-500">Required</span>}

          <select
            {...register("bloodGroup", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          {errors.bloodGroup && <span className="text-red-500">Required</span>}

          <input
            type="date"
            {...register("donationDate", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.donationDate && (
            <span className="text-red-500">Required</span>
          )}

          <input
            type="time"
            {...register("donationTime", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.donationTime && (
            <span className="text-red-500">Required</span>
          )}

          <textarea
            {...register("requestMessage", { required: true })}
            placeholder="Why do you need blood?"
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.requestMessage && (
            <span className="text-red-500">Required</span>
          )}

          <button type="submit" className="btn btn-primary w-full">
            Request
          </button>
        </form>
      )}
    </div>
  );
}
