import React from "react";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";

export default function ContentManagement() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      {/* Header with Add Blog button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => navigate("/dashboard/content-management/add-blog")}
        >
          <FaPlus />
          Add Blog
        </button>
      </div>

      {/* Placeholder content */}
      <div className="bg-base-200 p-6 rounded-lg shadow-md">
        <p className="text-gray-600">Here you can manage your blog posts.</p>
      </div>
    </div>
  );
}
