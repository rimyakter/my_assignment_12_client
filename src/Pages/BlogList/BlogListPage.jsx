import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaBookOpen, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const BlogListPage = () => {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosSecure.get("/blogs");
        setBlogs(res.data.filter((blog) => blog.status === "published"));
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="w-11/12 mx-auto my-12">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
          Our Blogs
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Discover inspiring stories, helpful tips, and updates from our
          community
        </p>
      </div>

      {/* ✅ 4-column card grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-gray-100 text-gray-900 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 overflow-hidden flex flex-col"
          >
            {/* Thumbnail */}
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="h-44 w-full object-cover"
            />

            {/* Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                {blog.title}
              </h2>

              {/* Meta Info */}
              <div className="flex items-center text-sm text-gray-500 mb-3 gap-4">
                <span className="flex items-center gap-1">
                  <FaUserAlt className="text-primary" />{" "}
                  {blog.author || "Admin"}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-primary" />{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Blog Snippet */}
              <p
                className="text-gray-700 text-sm line-clamp-3 flex-grow"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Button */}
              <div className="mt-4 text-right">
                <Link
                  to={`/blogs/${blog._id}`}
                  className="btn btn-outline border-primary inline-flex items-center gap-2 text-primary font-medium hover:bg-primary hover:text-white"
                >
                  <FaBookOpen /> Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;
