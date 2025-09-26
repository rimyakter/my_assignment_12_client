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
          title: "Your Successfully Logged Out",
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
      <div className="flex space-x-3">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-donation-pending">AllDonationRequests</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>

        <NavLink to="/searchPage">SearchPage</NavLink>
        {user && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </>
        )}
      </div>
    </>
  );
  return (
    <div className="navbar bg-base-100">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>

        <NavLogo></NavLogo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 ">{navItems}</ul>
      </div>

      <div className="navbar-end space-x-2">
        <div className="flex flex-col items-center justify-center">
          <div className="relative group">
            <img
              className="w-10 h-10 rounded-full border-2 border-base-300"
              src={user ? user?.photoURL : loginImg}
              alt="User"
            />
            {user && (
              <div className="absolute top-full text-xs transform px-2 py-0.5 text-black bg-base-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {user.displayName}
              </div>
            )}
          </div>
        </div>
        {user ? (
          <>
            <div className="flex flex-col items-center">
              <p className="text-sm">Welcome!</p>
              <p className="text-xs">{user.displayName}</p>
            </div>
            <button
              onClick={handleLogOut}
              className="btn btn-sm bg-white text-black shadow-none"
            >
              LogOut
            </button>
          </>
        ) : (
          <>
            <div className="flex space-x-1">
              <Link
                to="/login"
                className="btn btn-sm bg-white text-black shadow-none"
              >
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
