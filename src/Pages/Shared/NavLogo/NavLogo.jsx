import React from "react";
import logo from "../../../assets/blood-bag-logo.png";
import { Link } from "react-router";

const NavLogo = () => {
  return (
    <Link to="/">
      <div className="flex">
        <img width={40} src={logo} alt="logo" />
        <p className="text-primary font-bold text-2xl">Blood Bridge</p>
      </div>
    </Link>
  );
};

export default NavLogo;
