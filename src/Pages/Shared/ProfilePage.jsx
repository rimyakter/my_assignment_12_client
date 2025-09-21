import React, { useEffect, useState } from "react";
import { FaEdit, FaSave, FaUserCircle } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";

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

        setFormData((prev) =>
          Object.keys(prev).length === 0
            ? {
                name: cleanData.name || "",
                email: cleanData.email || "",
                bloodGroup: cleanData.bloodGroup || "",
                district: cleanData.district || "",
                upazila: cleanData.upazila || "",
                photoURL: cleanData.photoURL || "",
              }
            : prev
        );
      })
      .catch((err) => console.error(err));
  }, [user, axiosSecure]);

  // handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle photo upload
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    try {
      const formDataImg = new FormData();
      formDataImg.append("image", image);

      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_upload_key
      }`;
      const res = await axios.post(url, formDataImg);

      setFormData((prev) => ({
        ...prev,
        photoURL: res.data.data.url,
      }));
    } catch (err) {
      console.error("Image upload error:", err);
      Swal.fire({
        icon: "error",
        title: "Upload failed",
        text: "Could not upload image. Try again.",
      });
    }
  };

  // save profile
  const handleSave = async () => {
    try {
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
      {/* Avatar */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          {formData.photoURL ? (
            <img
              src={formData.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-primary shadow-md"
            />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}

          {isEditing && (
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition"
            >
              <MdPhotoCamera className="w-5 h-5" />
            </label>
          )}
        </div>

        {isEditing && (
          <input
            id="avatar-upload"
            type="file"
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
          />
        )}

        <h2 className="mt-2 text-lg font-semibold">{formData.name}</h2>
        <p className="text-sm text-gray-600">{formData.email}</p>
      </div>

      {/* Edit / Save Buttons */}
      <div className="flex justify-end mb-4">
        {!isEditing ? (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn btn-sm btn-outline"
          >
            <FaEdit className="mr-1" /> Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-sm btn-primary"
          >
            <FaSave className="mr-1" /> Save
          </button>
        )}
      </div>

      {/* Profile Form */}
      <form className="form-control space-y-3">
        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="input input-bordered w-full"
          />
        </div>

        {/* Email (non-editable) */}
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
