import React from "react";
import { FaHeartbeat, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="w-11/12 mx-auto py-12 flex flex-col items-center text-center"
    >
      {/* Section Title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
        About Blood Bridge
      </h2>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-12 text-xs md:text-sm">
        Blood Bridge is a community-driven initiative built to bridge the gap
        between donors and those in need. Our mission is simple — to make blood
        donation easy, accessible, and compassionate. Every drop of blood can
        bring new hope to someone in need.
      </p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          {
            icon: <FaUsers className="text-4xl text-[#E41F35]" />,
            title: "Strong Community",
            desc: "Thousands of verified donors ready to respond to urgent calls.",
          },
          {
            icon: <FaHeartbeat className="text-4xl text-[#E41F35]" />,
            title: "Health & Hope",
            desc: "We promote safe donations and regular health check-ups.",
          },
          {
            icon: <FaHandHoldingHeart className="text-4xl text-[#E41F35]" />,
            title: "Driven by Compassion",
            desc: "We connect hearts and save lives through empathy and kindness.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 p-8 rounded-xl border border-gray-100 hover:border-[#E41F35] shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-10">
        <Link
          to="/login"
          className="btn btn-primary text-white px-6 py-3 hover:bg-[#E41F35] transition-colors"
        >
          Join Our Mission
        </Link>
      </div>
    </section>
  );
}
