import React, { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import Swal from "sweetalert2";
import { FaTrash, FaUpload, FaEyeSlash } from "react-icons/fa";

import useUserRole from "../../hooks/useUserRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxios from "../../hooks/useAxios";

const AddBlogPage = () => {
  const editor = useRef(null);
  const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios();
  const { role, loading: roleLoading } = useUserRole();

  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState("all");

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const res = await axiosSecure.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Image upload handler
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axiosInstance.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_upload_key
        }`,
        formData
      );
      setThumbnail(res.data.data.url);
    } catch (err) {
      console.error("Image upload failed:", err);
      Swal.fire({ icon: "error", title: "Image upload failed" });
    } finally {
      setUploading(false);
    }
  };

  // Create blog
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!title || !content || !thumbnail) {
      return Swal.fire({ icon: "warning", title: "All fields required" });
    }

    const blogData = {
      title,
      content,
      thumbnail,
      status: "draft",
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/blogs", blogData);
      Swal.fire({ icon: "success", title: "Blog created!" });
      setTitle("");
      setContent("");
      setThumbnail("");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Failed to create blog" });
    }
  };

  // Publish blog (admin only)
  const handlePublish = async (id) => {
    try {
      await axiosSecure.patch(`/blogs/${id}/publish`, { status: "published" });
      Swal.fire({ icon: "success", title: "Blog published!" });
      fetchBlogs();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Failed to publish blog" });
    }
  };

  // Unpublish blog (admin only)
  const handleUnpublish = async (id) => {
    try {
      await axiosSecure.patch(`/blogs/${id}/unpublish`, { status: "draft" });
      Swal.fire({ icon: "success", title: "Blog unpublished!" });
      fetchBlogs();
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Failed to unpublish blog" });
    }
  };

  // Delete blog (admin only)
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/blogs/${id}`);
          Swal.fire({ icon: "success", title: "Blog deleted!" });
          fetchBlogs();
        } catch (err) {
          console.error(err);
          Swal.fire({ icon: "error", title: "Failed to delete blog" });
        }
      }
    });
  };

  // Filter blogs by status
  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter((b) => b.status === filter);

  if (roleLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Blogs</h1>

      {/* Create blog form (for admin + volunteer) */}
      {(role === "admin" || role === "volunteer") && (
        <form
          onSubmit={handleCreateBlog}
          className="mb-8 p-4 border rounded-lg space-y-4"
        >
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-col items-center">
            {thumbnail ? (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-48 h-48 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center rounded-lg mb-2">
                Thumbnail
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input file-input-bordered w-full max-w-xs"
              disabled={uploading}
            />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          </div>

          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
          />

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={uploading || !thumbnail}
          >
            Create Blog
          </button>
        </form>
      )}

      {/* Filter */}
      <div className="mb-4 flex justify-end">
        <select
          className="select select-bordered w-40"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {/* Blog list */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border rounded-lg p-4 flex flex-col space-y-2"
          >
            <img
              src={blog.thumbnail}
              alt={blog.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p
              className="text-gray-700 line-clamp-3"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <p className="text-sm text-gray-500">Status: {blog.status}</p>

            {/* Admin-only actions */}
            {role === "admin" && (
              <div className="flex gap-2 mt-2">
                {blog.status === "draft" && (
                  <button
                    onClick={() => handlePublish(blog._id)}
                    className="btn btn-success btn-sm flex items-center gap-2"
                  >
                    <FaUpload /> Publish
                  </button>
                )}
                {blog.status === "published" && (
                  <button
                    onClick={() => handleUnpublish(blog._id)}
                    className="btn btn-warning btn-sm flex items-center gap-2"
                  >
                    <FaEyeSlash /> Unpublish
                  </button>
                )}
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="btn btn-error btn-sm flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlogPage;
