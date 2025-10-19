import React from "react";
import volunteer1 from "../../assets/volunteer/women1.jpg";
import volunteer2 from "../../assets/volunteer/men.jpg";
import volunteer3 from "../../assets/volunteer/women2.jpg";

const Volunteers = () => {
  const team = [
    { name: "Dr. Aisha Khan", role: "Medical Coordinator", img: volunteer1 },
    { name: "John Doe", role: "Volunteer Coordinator", img: volunteer2 },
    { name: "Sara Lee", role: "Donation Manager", img: volunteer3 },
  ];

  return (
    <section className="w-11/12 mx-auto my-12 text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
        Meet Our Volunteers
      </h2>
      <p className="text-xs md:text-sm text-gray-600 mb-10 max-w-md mx-auto">
        Dedicated people who make saving lives possible
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-40 h-40 mx-auto mb-4 overflow-hidden rounded-full">
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Volunteers;
