import { useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";

export default function ContactUs() {
  const axiosInstance = useAxios();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace the URL with your backend endpoint
      await axiosInstance.post("/api/contact", formData);
      Swal.fire("Success", "Your message has been sent!", "success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to send message", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mb-10">
      <h2 className="text-4xl text-center font-bold mb-4">Contact Us</h2>
      <p className="mb-6 text-gray-600">
        Have questions or suggestions? Fill out the form below and we'll get
        back to you.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="input input-bordered w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          className="input input-bordered w-full"
          required
        />
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          className="textarea textarea-bordered w-full"
          rows={5}
          required
        ></textarea>
        <button
          type="submit"
          className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
