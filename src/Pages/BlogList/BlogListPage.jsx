import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaBookOpen } from "react-icons/fa";

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
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blogs</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <figure>
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="h-48 w-full object-cover rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold">{blog.title}</h2>
              <p
                className="text-gray-600 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <div className="card-actions justify-end mt-4">
                <Link
                  to={`/blogs/${blog._id}`}
                  className="btn btn-primary btn-sm flex items-center gap-2"
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
