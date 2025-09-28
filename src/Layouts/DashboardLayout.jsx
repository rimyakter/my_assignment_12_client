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
import { NavLink, Outlet } from "react-router";
import NavLogo from "../Pages/Shared/NavLogo/NavLogo";
import useUserRole from "../hooks/useUserRole"; // adjust path

const DashboardLayout = () => {
  const { role, loading } = useUserRole();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Common links
  const commonLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaTachometerAlt /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/profile"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaUser /> Profile
        </NavLink>
      </li>
    </>
  );

  // Donor links
  const donorLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/My-donation-request"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaListAlt /> My Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/create-donation-request"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaHandHoldingHeart /> Create Donation Request
        </NavLink>
      </li>
    </>
  );

  // Admin links
  const adminLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/all-users"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaUser /> All Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/all-blood-donation-request"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaHandHoldingHeart /> All Blood Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/content-management"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaCog /> Content Management
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/fundingPage"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaCog /> All Funding
        </NavLink>
      </li>
    </>
  );

  // Volunteer links (currently same as admin, but separated for future)
  const volunteerLinks = (
    <>
      <li>
        <NavLink
          to="/dashboard/all-blood-donation-request"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaHandHoldingHeart /> All Blood Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/content-management"
          className="flex items-center gap-3 hover:bg-base-300 rounded-lg"
        >
          <FaCog /> Content Management
        </NavLink>
      </li>
      {/* Add volunteer-only links here in the future */}
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 border-b px-4 shadow-sm">
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
          <div className="flex-1 px-2 text-xl font-semibold flex items-center gap-2">
            <MdSpaceDashboard className="text-primary" size={24} />
            My Dashboard
          </div>
          <div className="flex-none hidden lg:flex items-center gap-4">
            <button className="btn btn-ghost btn-circle">
              <FaUser size={18} />
            </button>
            <button className="btn btn-ghost btn-circle">
              <FaCog size={18} />
            </button>
          </div>
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side dashboard-nav">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>

        <ul className="menu bg-base-200 text-base-content min-h-full w-72 p-4 space-y-2">
          <NavLogo />

          {/* Common Links */}
          {commonLinks}

          {/* Role-based Links */}
          {role === "donor" && donorLinks}
          {role === "admin" && adminLinks}
          {role === "volunteer" && volunteerLinks}

          <li className="mt-auto">
            <a className="flex items-center gap-3 text-error hover:bg-error/20 rounded-lg">
              <FaSignOutAlt /> Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
