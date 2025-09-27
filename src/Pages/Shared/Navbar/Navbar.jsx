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
    <div className="flex space-x-3">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/all-donation-pending">AllDonationRequests</NavLink>
      <NavLink to="/blogs">Blogs</NavLink>
      <NavLink to="/searchPage">SearchPage</NavLink>
    </div>
  );

  return (
    <div className="navbar bg-base-100">
      {/* Left side (Logo + Mobile Menu) */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <NavLogo />
      </div>

      {/* Center (Navigation Links for Desktop) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>

      {/* Right side (User Avatar / Login) */}
      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.photoURL || loginImg} alt="User Avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48"
            >
              <li className="px-2 py-1 text-sm font-semibold text-primary">
                <span className="text-lg">Welcome! </span>
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
            className="btn btn-sm bg-white text-black shadow-none"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
