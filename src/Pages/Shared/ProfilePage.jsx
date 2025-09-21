import React, { useEffect, useState } from "react";
import { FaEdit, FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile
  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/users/${encodeURIComponent(user.email)}`)
      .then((res) => {
        const { _id, ...cleanData } = res.data;
        setProfile(cleanData);

        // Only set formData if it is empty (first load)
        setFormData((prev) =>
          Object.keys(prev).length === 0
            ? {
                name: cleanData.name || "",
                email: cleanData.email || "",
                bloodGroup: cleanData.bloodGroup || "",
                district: cleanData.district || "",
                upazila: cleanData.upazila || "",
              }
            : prev
        );
      })
      .catch((err) => console.error(err));
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // update the field you type into
    }));
  };

  const handleSave = async () => {
    try {
      console.log("Saving profile:", formData); // 👀 see what goes to backend
      await axiosSecure.put(
        `/users/${encodeURIComponent(user.email)}`,
        formData
      );
      setProfile({ ...formData });
      setIsEditing(false);

      Swal.fire({
        icon: "success",
        title: "Profile updated",
        text: "Your profile has been updated successfully",
      });
    } catch (err) {
      console.error("Error updating profile:", err);

      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "There was an error updating your profile. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Profile</h2>
        {!isEditing ? (
          <button
            type="button" // important!
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-outline"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
        ) : (
          <button
            type="button" // important!
            onClick={handleSave}
            className="btn btn-sm btn-primary"
          >
            <FaSave className="mr-1" /> Save
          </button>
        )}
      </div>

      <form className="form-control space-y-3">
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!isEditing} // now toggles correctly
            className="input input-bordered w-full"
          />
        </div>

        {/* Email (never editable) */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        {/* District */}
        <div>
          <label className="label">District</label>
          <input
            type="text"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        {/* Upazila */}
        <div>
          <label className="label">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={formData.upazila || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
