import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaHandHoldingHeart,
  FaListAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router";
import NavLogo from "../Pages/Shared/NavLogo/NavLogo";
import useUserRole from "../hooks/useUserRole";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { role, loading } = useUserRole();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // ✅ Link Style (Active Route Highlight)
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-2 rounded-sm  transition-colors duration-200 ${
      isActive
        ? "bg-[#FBEAEC] text-primary font-semibold mx-2"
        : "text-white hover:bg-[#FBEAEC] hover:text-primary mx-2"
    }`;

  // Common Links
  const commonLinks = (
    <>
      <li>
        <NavLink end to="/dashboard" className={linkStyle}>
          <FaTachometerAlt /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/profile" className={linkStyle}>
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  // Donor Links
  const donorLinks = (
    <>
      <li>
        <NavLink to="/dashboard/My-donation-request" className={linkStyle}>
          <FaListAlt /> My Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/create-donation-request" className={linkStyle}>
          <FaHandHoldingHeart /> Create Donation Request
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/fundingPage" className={linkStyle}>
          <FaCog /> All Funding
        </NavLink>
      </li>
    </>
  );

  // Admin Links
  const adminLinks = (
    <>
      <li>
        <NavLink to="/dashboard/all-users" className={linkStyle}>
          <FaUser /> All Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/all-blood-donation-request"
          className={linkStyle}
        >
          <FaHandHoldingHeart /> All Blood Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/content-management" className={linkStyle}>
          <FaCog /> Content Management
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/fundingPage" className={linkStyle}>
          <FaCog /> All Funding
        </NavLink>
      </li>
    </>
  );

  // Volunteer Links
  const volunteerLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/all-blood-donation-request"
          className={linkStyle}
        >
          <FaHandHoldingHeart /> All Blood Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/content-management" className={linkStyle}>
          <FaCog /> Content Management
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/fundingPage" className={linkStyle}>
          <FaCog /> All Funding
        </NavLink>
      </li>
    </>
  );

  // Logout
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-white border-b px-4 shadow-sm">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 text-xl font-semibold flex items-center gap-2">
            <MdSpaceDashboard className="text-primary" size={24} />
            My Dashboard
          </div>
        </div>

        {/* Page Content */}
        <div className="bg-gray-50 min-h-screen p-2 md:p-3">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

        <ul className="menu bg-primary text-white min-h-full w-72 space-y-2 p-0">
          <div className="py-6 px-4">
            <NavLogo />
          </div>

          {commonLinks}
          {role === "donor" && donorLinks}
          {role === "admin" && adminLinks}
          {role === "volunteer" && volunteerLinks}

          <li className="mt-auto mb-6">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 text-red-200  hover:bg-[#FBEAEC] hover:text-primary mx-2 transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
