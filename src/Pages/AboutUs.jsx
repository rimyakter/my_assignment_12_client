import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaHandHoldingHeart, FaUsers } from "react-icons/fa";
import { Link } from "react-router";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="w-11/12 mx-auto py-12 flex flex-col items-center text-center"
    >
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
      >
        About Blood Bridge
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-600 max-w-2xl mx-auto mb-12 text-xs md:text-sm"
      >
        Blood Bridge is a community-driven initiative built to bridge the gap
        between donors and those in need. Our mission is simple — to make blood
        donation easy, accessible, and compassionate. Every drop of blood can
        bring new hope to someone in need.
      </motion.p>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-gray-100 p-8 rounded-xl border border-gray-100 hover:border-[#E41F35] shadow hover:shadow-lg transition-all duration-300 my-12"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              {item.title}
            </h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-4"
      >
        <Link
          to="/login"
          className="btn btn-primary text-white px-6 py-3 hover:bg-[#E41F35] transition-colors"
        >
          Join Our Mission
        </Link>
      </motion.div>
    </section>
  );
}
