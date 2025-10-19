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
    <div className="w-11/12 mx-auto">
      {/* ===== Title & Subtitle ===== */}
      <div className="text-center my-10">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          Get In Touch
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or
          need assistance — our team is always ready to help.
        </p>
      </div>

      {/* ===== Card Container ===== */}
      <div className="bg-gray-100 shadow-md rounded-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* ===== Left Column (Info Section) ===== */}
          <div className="bg-gray-100 text-[#E41F35] p-10 flex flex-col justify-center">
            <h3 className="text-2xl text-[#E41F35] font-bold mb-3">
              Contact Information
            </h3>
            <p className="text-[#E41F35] mb-6 leading-relaxed text-sm md:text-base">
              Have any questions or suggestions? Feel free to reach out — we’ll
              get back to you as soon as possible.
            </p>

            <div className="space-y-3 text-sm md:text-base">
              <p>
                📧 <strong>Email:</strong> support@bloodconnect.com
              </p>
              <p>
                ☎️ <strong>Phone:</strong> +1 (234) 567-8901
              </p>
              <p>
                📍 <strong>Address:</strong> 123 Lifeline Street, Dhaka
              </p>
            </div>
          </div>

          {/* ===== Right Column (Form) ===== */}
          <div className="p-10 bg-gray-100">
            <form
              onSubmit={handleSubmit}
              className="space-y-4 text-xs md:text-sm"
            >
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
                className={`btn bg-[#E41F35] text-white border-none w-full ${
                  loading ? "loading" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
