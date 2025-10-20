import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaPlus, FaFileAlt, FaRegEdit, FaRegClock } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ContentManagement() {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await axiosSecure.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Compute stats
  const totalPosts = blogs.length;
  const publishedPosts = blogs.filter((b) => b.status === "published").length;
  const draftPosts = blogs.filter((b) => b.status === "draft").length;

  const stats = [
    {
      title: "Total Posts",
      value: totalPosts,
      icon: <FaFileAlt className="text-white" />,
      color: "bg-blue-500",
      subtitle: "All blogs created so far",
      progress: 100, // static full progress for total
    },
    {
      title: "Published",
      value: publishedPosts,
      icon: <FaRegEdit className="text-white" />,
      color: "bg-green-500",
      subtitle: `${
        totalPosts ? Math.round((publishedPosts / totalPosts) * 100) : 0
      }% of total blogs`,
      progress: totalPosts
        ? Math.round((publishedPosts / totalPosts) * 100)
        : 0,
    },
    {
      title: "Drafts",
      value: draftPosts,
      icon: <FaRegClock className="text-white" />,
      color: "bg-yellow-500",
      subtitle: "Blogs still in draft",
      progress: totalPosts ? Math.round((draftPosts / totalPosts) * 100) : 0,
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-white shadow-sm rounded-sm mx-4">
      {/* Header with Add Blog button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">
          Add and Manage All Blogs
        </h1>
        <button
          className="btn btn-primary flex items-center gap-2"
          onClick={() => navigate("/dashboard/content-management/add-blog")}
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      {/* Stats Cards */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`relative overflow-hidden rounded-xl shadow-lg ${stat.color} p-6 flex flex-col justify-between transition transform hover:scale-105`}
            >
              {/* Icon */}
              <div className="absolute top-4 right-4 text-4xl opacity-20">
                {stat.icon}
              </div>

              {/* Main Value */}
              <div className="z-10 relative">
                <p className="text-white font-bold text-3xl">{stat.value}</p>
                <p className="text-white text-sm mt-1">{stat.title}</p>
              </div>

              {/* Subtitle */}
              <p className="text-white text-xs mt-4">{stat.subtitle}</p>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-white bg-opacity-40 rounded-full mt-2">
                <div
                  className="h-2 rounded-full bg-white"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Placeholder content */}
      <div className="bg-gray-100 p-6 rounded-sm shadow-sm">
        <p className="text-gray-600">Here you can manage your blog posts.</p>
      </div>
    </div>
  );
}
