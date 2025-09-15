import { FaUserPlus, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import bloodLogo from "../../../assets/Nav-logo.png";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://i.ibb.co.com/chpkZkQp/blood.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20 flex flex-col items-center text-center text-white">
        {/* Heading */}
        <div className="flex">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 ">
            Donate Blood, Save Lives
          </h1>
          <img width={50} src={bloodLogo} alt="blood" />
        </div>
        <p className="text-base md:text-md max-w-xl mx-auto mb-8 text-gray-200">
          Your small contribution can bring a big change. Join our community of
          lifesavers and help us connect those in need with generous donors.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => navigate("/register")}
            className="btn bg-[#E41F35] text-white border-[#E41F35] flex items-center gap-2 px-6 shadow-none border-none"
          >
            <FaUserPlus /> Join as a Donor
          </button>

          <button
            onClick={() => navigate("/search")}
            className="btn btn-outline btn-accent text-white border-white flex items-center gap-2 px-6 shadow-none hover:bg-white hover:text-[#E41F35]"
          >
            <FaSearch /> Search Donors
          </button>
        </div>
      </div>
    </section>
  );
}
