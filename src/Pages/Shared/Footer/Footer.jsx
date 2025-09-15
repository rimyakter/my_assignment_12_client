import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import NavLogo from "../NavLogo/NavLogo";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#999] ">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <div className="flex">
            <NavLogo></NavLogo>
            <h2 className="text-lg text-[#E41F35]  font-bold mb-3">
              Blood Bridge
            </h2>
          </div>
          <p className="text-sm leading-relaxed hover:text-white">
            Dedicated to saving lives through safe and reliable blood donations.
            Join us in making a difference every day.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 hover:text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="link link-hover hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="link link-hover hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/donate" className="link link-hover hover:text-white">
                Donate Blood
              </a>
            </li>
            <li>
              <a href="/request" className="link link-hover hover:text-white">
                Request Blood
              </a>
            </li>
            <li>
              <a href="/contact" className="link link-hover hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3 hover:text-white">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/faq" className="link link-hover hover:text-white">
                FAQs
              </a>
            </li>
            <li>
              <a
                href="/eligibility"
                className="link link-hover hover:text-white"
              >
                Donor Eligibility
              </a>
            </li>
            <li>
              <a href="/events" className="link link-hover hover:text-white">
                Blood Drives
              </a>
            </li>
            <li>
              <a href="/privacy" className="link link-hover hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="link link-hover hover:text-white">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3 hover:text-white">
            Contact Us
          </h3>
          <p className="text-sm hover:text-white">
            123 Life Saver Street
            <br />
            City, State 12345
          </p>
          <p className="text-sm mt-2 hover:text-white">📞 +1 (234) 567-890</p>
          <p className="text-sm hover:text-white">✉️ support@bloodbank.org</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-xl hover:text-[#E41F35]">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl hover:text-[#E41F35]">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-[#E41F35]">
              <FaInstagram />
            </a>
            <a href="#" className="text-xl hover:text-[#E41F35]">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-base-300 mt-6 py-4 text-center text-sm hover:text-white">
        © {new Date().getFullYear()} Blood Bridge. All rights reserved.
      </div>
    </footer>
  );
}
