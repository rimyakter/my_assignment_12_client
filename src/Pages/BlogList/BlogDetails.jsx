import { useEffect, useState } from "react";
import { useParams } from "react-router";
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

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-500 mb-2">
        Status: <span className="capitalize">{blog.status}</span> |{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      {blog.thumbnail && (
        <img
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full max-h-80 object-cover rounded-lg mb-4"
        />
      )}
      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
}
