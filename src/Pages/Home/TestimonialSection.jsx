import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TestimonialSection = () => {
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Blood Donor",
      feedback:
        "Donating blood through this platform was seamless. I’m proud to help someone in need so effortlessly.",
    },
    {
      name: "Dr. Rafi Khan",
      role: "Medical Volunteer",
      feedback:
        "The system makes it easier to track donors and connect them with hospitals. Truly impactful and organized.",
    },
    {
      name: "Maya Patel",
      role: "Recipient’s Family",
      feedback:
        "We found a matching donor within hours. This service restored our hope during a critical time.",
    },
    {
      name: "Arjun Das",
      role: "Community Organizer",
      feedback:
        "This initiative inspires people to act and donate more frequently. It’s transforming how communities save lives.",
    },
    {
      name: "Emily Carter",
      role: "Regular Donor",
      feedback:
        "I receive reminders and updates that keep me consistent with my donations. The experience feels personal and rewarding.",
    },
  ];

  return (
    <section className="w-11/12 mx-auto my-12 bg-primary text-white rounded-2xl py-12 px-6 md:px-12 shadow-lg">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-xl md:text-2xl font-bold mb-3">What People Say</h2>
        <p className="text-xs md:text-sm text-gray-100 max-w-md mx-auto">
          Hear from our donors, volunteers, and families whose lives have been
          touched by the power of giving blood.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="h-[320px] flex flex-col justify-between bg-white text-gray-900 rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col flex-grow">
                <FaQuoteLeft className="text-primary text-2xl mb-3" />
                <p className="text-sm md:text-base mb-4 italic leading-relaxed flex-grow overflow-hidden">
                  “{t.feedback}”
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-sm md:text-base">{t.name}</h4>
                <p className="text-xs text-gray-600">{t.role}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialSection;
