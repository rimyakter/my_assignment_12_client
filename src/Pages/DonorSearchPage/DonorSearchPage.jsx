import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">🔎 Search Donors</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-base-200 p-4 rounded-xl shadow"
      >
        {/* Blood Group (Required) */}
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

        {/* District (Required) */}
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

        {/* Upazila (Required) */}
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

        {/* Search Button */}
        <button type="submit" className="btn btn-primary w-full">
          Search
        </button>
      </form>

      {/* Results */}
      <div className="mt-8">
        {!searched ? (
          <p className="text-center text-gray-500">
            Please select <b>Blood Group, District, and Upazila</b> then click
            <b> Search</b>.
          </p>
        ) : loading ? (
          <p className="text-center text-blue-500 font-medium">Searching...</p>
        ) : donors.length === 0 ? (
          <p className="text-center text-red-500 font-semibold">
            ❌ No donors found for your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="card bg-base-100 shadow-xl p-4 text-center"
              >
                <img
                  src={donor.photoURL}
                  alt={donor.name}
                  className="w-24 h-24 mx-auto rounded-full object-cover border-2 border-primary"
                />
                <h3 className="text-lg font-bold mt-2">{donor.name}</h3>
                <p className="text-sm text-gray-500">{donor.email}</p>
                <p className="mt-2 font-semibold text-primary">
                  Blood Group: {donor.bloodGroup}
                </p>
                <p>
                  {donor.district}, {donor.upazila}
                </p>
                <p
                  className={`mt-1 font-medium ${
                    donor.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {donor.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorSearchPage;
