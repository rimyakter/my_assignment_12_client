import React from "react";
import {
  FaUserPlus,
  FaSearch,
  FaHandHoldingHeart,
  FaArrowRight,
} from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaUserPlus className="text-2xl md:text-3xl text-white" />,
      title: "Register as a Donor",
      desc: "Create your donor profile quickly and become part of our trusted health network.",
    },
    {
      icon: <FaSearch className="text-2xl md:text-3xl text-white" />,
      title: "Find or Match",
      desc: "We help connect donors and patients efficiently and securely through our database.",
    },
    {
      icon: <FaHandHoldingHeart className="text-2xl md:text-3xl text-white" />,
      title: "Donate & Save Lives",
      desc: "Attend your donation appointment and make a real difference in someone’s life.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-20">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
          How It Works
        </h2>
        <p className="text-xs md:text-sm text-gray-600 mt-2 max-w-xl mx-auto">
          A simple, trusted process that ensures every donation is safe,
          impactful, and easy to complete.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative flex flex-col md:flex-row md:justify-between md:items-start gap-12 md:gap-6">
        {/* Clean medical-style connector line (desktop) */}
        <div className="absolute hidden md:block top-8 left-0 right-0 mx-auto w-[85%] h-[2px] bg-gradient-to-r from-[#FDE7EA] via-[#FAD1D6] to-[#FDE7EA]"></div>

        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center text-center md:w-1/3"
          >
            {/* Icon Circle with soft glow */}
            <div className="relative p-[3px] bg-gradient-to-r from-[#C21B2E] to-[#E41F35] rounded-full mb-4 shadow-md hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-full p-4">
                <div className="bg-gradient-to-r from-[#C21B2E] to-[#E41F35] p-3 rounded-full text-white shadow-md">
                  {step.icon}
                </div>
              </div>
              {/* Soft pulse animation */}
              <span className="absolute inset-0 rounded-full animate-ping bg-[#E41F35]/20"></span>
            </div>

            {/* Vertical connector line (mobile) */}
            {index !== steps.length - 1 && (
              <div className="md:hidden w-[2px] h-12 bg-gradient-to-b from-[#FDE7EA] via-[#FAD1D6] to-[#FDE7EA] mb-4"></div>
            )}

            {/* Step Text */}
            <h3 className="font-semibold text-base md:text-lg mb-2 text-gray-800">
              {step.title}
            </h3>
            <p className="text-gray-600 text-xs md:text-sm max-w-xs">
              {step.desc}
            </p>

            {/* Arrow between steps (desktop only) */}
            {index !== steps.length - 1 && (
              <FaArrowRight className="hidden md:block text-[#E41F35]/40 text-lg absolute top-6 right-[-25%]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
