import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import { MdPhotoCamera } from "react-icons/md";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";

  // auth functions from custom hook
  const { createUser, setUser, updateUser } = useAuth();
  const [avatar, setAvatar] = useState("");

  // states for districts & upazilas
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // watch password field for confirm password validation
  const password = watch("password");

  useEffect(() => {
    // Fetch districts
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const table = data.find(
          (item) => item.type === "table" && item.name === "districts"
        );
        if (table && table.data) {
          setDistricts(table.data);
        }
      });

    // Fetch upazilas
    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const table = data.find(
          (item) => item.type === "table" && item.name === "upazilas"
        );
        if (table && table.data) {
          setUpazilas(table.data);
        }
      });
  }, []);

  // 🚀 Submit handler
  const onSubmit = async (data) => {
    if (!avatar) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Please upload a profile picture",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    try {
      // 1️⃣ Create Firebase Auth account
      const result = await createUser(data.email, data.password);
      const user = result.user;

      // 2️⃣ Update Firebase display name + avatar
      await updateUser({ displayName: data.name, photoURL: avatar });
      setUser(user);

      // 3️⃣ Prepare user profile object
      const selectedDistrictObj = districts.find((d) => d.id === data.district);
      const userInfo = {
        name: data.name,
        email: data.email,
        bloodGroup: data.bloodGroup,
        district: selectedDistrictObj
          ? selectedDistrictObj.name
          : data.district,
        upazila: data.upazila,
        photoURL: avatar,
        status: "active",
        createdAt: new Date(),
      };

      // 4️⃣ Save to MongoDB (via backend) - use POST
      await axiosSecure.post(`/users`, userInfo);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Registered successfully 🎉",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed! Try Again!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  // 📸 Handle image upload to imgbb
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_upload_key
    }`;
    const res = await axios.post(imageUploadUrl, formData);
    setAvatar(res.data.data.url);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold mb-6 text-secondary text-center">
            Register Now!
          </h1>

          {/* Registration form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset space-y-3">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center space-y-2">
                <div className="relative">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <FaUserCircle className="w-24 h-24 text-gray-400" />
                  )}
                  <label
                    htmlFor="avatar-upload"
                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition"
                  >
                    <MdPhotoCamera className="w-5 h-5" />
                  </label>
                </div>

                <input
                  id="avatar-upload"
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />

                <p className="text-sm text-gray-500">
                  Upload your profile picture
                </p>
              </div>

              {/* Name */}
              <label className="label">Full Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
              {errors.name && <p className="text-red-700">Name is required</p>}

              {/* Email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-700">Email is required</p>
              )}

              {/* Blood Group */}
              <label className="label">Blood Group</label>
              <select
                {...register("bloodGroup", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
              {errors.bloodGroup && (
                <p className="text-red-700">Blood group is required</p>
              )}

              {/* District */}
              <label className="label">District</label>
              <select
                {...register("district", { required: true })}
                className="select select-bordered w-full"
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name} ({district.bn_name})
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="text-red-700 w-full">District is required</p>
              )}

              {/* Upazila */}
              <label className="label">Upazila</label>
              <select
                {...register("upazila", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="">Select Upazila</option>
                {upazilas
                  .filter((u) => u.district_id === selectedDistrict)
                  .map((upazila) => (
                    <option key={upazila.id} value={upazila.name}>
                      {upazila.name} ({upazila.bn_name})
                    </option>
                  ))}
              </select>
              {errors.upazila && (
                <p className="text-red-700">Upazila is required</p>
              )}

              {/* Password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-700">Password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-700">
                  Password must be at least 6 characters
                </p>
              )}

              {/* Confirm Password */}
              <label className="label">Confirm Password</label>
              <input
                type="password"
                {...register("confirm_password", {
                  required: true,
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered w-full"
                placeholder="Confirm Password"
              />
              {errors.confirm_password && (
                <p className="text-red-700">
                  {errors.confirm_password.message}
                </p>
              )}

              {/* Submit Button */}
              <button
                className="btn btn-primary mt-4 w-full"
                disabled={!avatar}
              >
                Register
              </button>
            </fieldset>

            {/* Redirect to login */}
            <p className="text-sm my-2 text-center">
              Already have an account?
              <Link
                className="text-primary underline font-bold ml-1"
                to="/login"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
