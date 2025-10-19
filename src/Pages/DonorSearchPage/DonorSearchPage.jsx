import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaTint, FaMapMarkerAlt, FaHospital, FaUserAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const DonorSearchPage = () => {
  const { register, handleSubmit, watch } = useForm();
  const axiosSecure = useAxiosSecure();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedDistrict = watch("district");

  // Load districts & upazilas
  useEffect(() => {
    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => {
        const table = data.find(
          (d) => d.type === "table" && d.name === "districts"
        );
        if (table) setDistricts(table.data);
      });

    fetch("/upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        const table = data.find(
          (u) => u.type === "table" && u.name === "upazilas"
        );
        if (table) setUpazilas(table.data);
      });
  }, []);

  // Handle search
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSearched(true);

      const query = new URLSearchParams(data).toString();
      const res = await axiosSecure.get(`/users/search?${query}`);
      setDonors(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-11/12 mx-auto my-12">
      {/* Title & Subtitle */}
      <div className="text-center mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          Search Donors
        </h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Find blood donors by blood group, district, and upazila to help save
          lives
        </p>
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-base-200 p-4 rounded-xl shadow mb-12"
      >
        <select
          {...register("bloodGroup", { required: true })}
          className="select select-bordered w-full"
        >
          <option value="">Select Blood Group *</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
        </select>

        <select
          {...register("district")}
          className="select select-bordered w-full"
        >
          <option value="">Select District *</option>
          {districts.map((district) => (
            <option key={district.id} value={district.name}>
              {district.name}
            </option>
          ))}
        </select>

        <select
          {...register("upazila")}
          className="select select-bordered w-full"
        >
          <option value="">Select Upazila *</option>
          {upazilas
            .filter(
              (u) =>
                u.district_id ===
                districts.find((d) => d.name === selectedDistrict)?.id
            )
            .map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
        </select>

        <button type="submit" className="btn btn-primary w-full">
          Search
        </button>
      </form>

      {/* Results */}
      <div>
        {!searched ? (
          <p className="text-center text-gray-500">
            Please select <b>Blood Group, District, and Upazila</b> then click{" "}
            <b>Search</b>.
          </p>
        ) : loading ? (
          <p className="text-center text-blue-500 font-medium">Searching...</p>
        ) : donors.length === 0 ? (
          <p className="text-center text-red-500 font-semibold">
            ❌ No donors found for your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-gray-100 text-gray-900 rounded-xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition-transform transform hover:-translate-y-1"
              >
                <img
                  src={donor.photoURL}
                  alt={donor.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-primary mb-4"
                />
                <h3 className="text-lg font-bold mb-1">{donor.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{donor.email}</p>

                {/* Key Info with Icons */}
                <div className="flex flex-col gap-2 mb-3 text-gray-900">
                  <span className="flex items-center gap-2">
                    <FaTint className="text-primary" /> {donor.bloodGroup}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt className="text-primary" /> {donor.district}
                    , {donor.upazila}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <FaUserAlt className="text-primary" /> Status:{" "}
                    {donor.status}
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <FaHospital className="text-primary" /> Availability:
                    Immediate
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorSearchPage;
