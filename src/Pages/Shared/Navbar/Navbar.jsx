import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import NavLogo from "../NavLogo/NavLogo";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import loginImg from "../../../assets/user.png";

const Navbar = () => {
  const [success, setSuccess] = useState(null);
  const { logOut, user } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        setSuccess(true);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged Out",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch(() => {
        setSuccess(false);
      });
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/aboutUs">About</NavLink>
      </li>
      <li>
        <NavLink to="/all-donation-pending">BloodRequest</NavLink>
      </li>
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      <li>
        <NavLink to="/searchPage">SearchBlood</NavLink>
      </li>
      <li>
        <NavLink to="/contactUs">Contact</NavLink>
      </li>
    </>
  );

  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-50 bg-[#C21B2E] text-white shadow-md !max-w-none !px-0">
      {/* ✅ Full-width background */}
      <div className="w-full  mx-auto flex items-center justify-between h-16 pr-3 md:px-14">
        {/* Left side (Logo + Mobile Menu) */}
        <div className="flex items-center">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow text-black"
            >
              {navItems}
            </ul>
          </div>
          <NavLogo />
        </div>

        {/* Center (Desktop Links) */}
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Right side (User Avatar / Login) */}
        <div>
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || loginImg} alt="User Avatar" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[60] p-2 shadow bg-primary rounded-box w-48 right-0 text-white"
              >
                <li className="px-2 py-1 text-md font-semibold">
                  <span className="text-lg">Welcome!</span>{" "}
                  {user.displayName || "User"}
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-sm bg-white text-black border-none shadow-none"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
