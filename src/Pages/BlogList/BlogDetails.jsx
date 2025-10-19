import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  FaUserAlt,
  FaCalendarAlt,
  FaTags,
  FaClock,
  FaFolder,
} from "react-icons/fa";
import useAxios from "../../hooks/useAxios";

export default function BlogDetail() {
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, axiosInstance]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!blog)
    return <p className="text-center py-8 text-red-500">Blog not found</p>;

  return (
    <div className="w-11/12 mx-auto py-12">
      {/* Static Title & Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          Blog Details
        </h1>
        <p className="text-gray-600 text-xs md:text-sm">
          Read, learn, and stay informed with our latest blog posts
        </p>
      </div>

      {/* Blog Card with border */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-full mx-auto">
        {/* Static Info Above Border */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4 border-b border-gray-300 pb-4">
          <span className="flex items-center gap-2 text-primary">
            <FaFolder /> Category: Health & Lifestyle
          </span>
          <span className="flex items-center gap-2 text-primary">
            <FaClock /> Reading Time: 4-5 min
          </span>
          <span className="flex items-center gap-2 text-primary">
            <FaUserAlt /> Author: John Doe
          </span>
        </div>

        {/* Blog Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3">{blog.title}</h2>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
          <span className="flex items-center gap-1 text-primary">
            <FaUserAlt /> Admin
          </span>
          <span className="flex items-center gap-1 text-primary">
            <FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1 text-primary">
            <FaTags /> {blog.status}
          </span>
        </div>

        {/* Thumbnail */}
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full max-h-80 object-cover rounded-lg mb-4"
          />
        )}

        {/* Blog Content */}
        <div
          className="prose text-gray-900"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        {/* Additional Static Information */}
        <div className="mt-6 border-t border-gray-200 pt-4 text-gray-700">
          <p>
            <strong>Tags:</strong> Donation, Community, Health
          </p>
          <p>
            <strong>Published By:</strong> Admin
          </p>
          <p>
            <strong>Views:</strong> 1200
          </p>
        </div>
      </div>
    </div>
  );
}
