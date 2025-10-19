import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import NavLogo from "../NavLogo/NavLogo";

export default function Footer() {
  return (
    <footer className="text-[#1A1A1A] bg-white mt-16">
      {/* Centered content */}
      <div className="w-11/12 mx-auto py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <div className="text-[#E41F35]">
            <NavLogo></NavLogo>
          </div>

          <p className="text-sm leading-relaxed mt-2">
            Dedicated to saving lives through safe and reliable blood donations.
            Join us in making a difference every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/donate">Donate Blood</a>
            </li>
            <li>
              <a href="/request">Request Blood</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/faq">FAQs</a>
            </li>
            <li>
              <a href="/eligibility">Donor Eligibility</a>
            </li>
            <li>
              <a href="/events">Blood Drives</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms & Conditions</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">123 Lifeline Street, Dhaka</p>
          <p className="text-sm mt-2">📞 +1 (234) 567-8901</p>
          <p className="text-sm">✉️ support@bloodconnect.com</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-xl hover:text-[#E41F35] transition">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl hover:text-[#E41F35] transition">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-[#E41F35] transition">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-[#E41F35] transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="w-11/12 mx-auto border-t border-gray-700 mt-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="text-[#E41F35] font-semibold">Blood Bridge</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
