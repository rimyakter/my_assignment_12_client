import {
  FaHandHoldingHeart,
  FaSearch,
  FaBookMedical,
  FaRegSmile,
} from "react-icons/fa";
import { useNavigate } from "react-router";

export default function FeaturedSection() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Become a Donor",
      description:
        "Register as a donor and give someone a second chance at life. Every drop counts.",
      icon: <FaHandHoldingHeart className="text-4xl" />,
      link: "/register",
    },
    {
      title: "Find Donors",
      description:
        "Easily search for nearby donors and request blood quickly in times of need.",
      icon: <FaSearch className="text-4xl" />,
      link: "/searchPage",
    },
    {
      title: "Health Tips",
      description:
        "Stay informed with useful health and wellness guides for donors and recipients.",
      icon: <FaBookMedical className="text-4xl" />,
      link: "/blogs",
    },
    {
      title: "Success Stories",
      description:
        "Read inspiring stories of lives saved through the generosity of blood donors.",
      icon: <FaRegSmile className="text-4xl" />,
      link: "/blogs",
    },
  ];

  return (
    <section className="bg-base-100 w-11/12 mx-auto">
      <div className="mx-auto">
        {/* Heading */}
        <div className="text-center my-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            How You Can Contribute
          </h2>
          <p className="text-xs md:text-sm text-gray-600 max-w-2xl mx-auto">
            Blood donation is a simple act of kindness that saves lives. Explore
            the many ways you can help and be part of our life-saving mission
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-gray-100 rounded-xl shadow-sm hover:shadow-lg transition p-8 text-center border border-gray-100 hover:border-[#E41F35]"
            >
              {/* Icon */}
              <div className="w-14 h-14 flex items-center justify-center mx-auto rounded-full bg-white text-[#E41F35] group-hover:bg-[#E41F35] group-hover:text-white transition-colors duration-600 mb-6 shadow-sm">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                {feature.description}
              </p>
              <button
                onClick={() => navigate(feature.link)}
                className="btn btn-outline bg-[#E41F35] btn-sm px-5 text-white"
              >
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
