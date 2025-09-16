import React from "react";
import logo from "../../../assets/blood-bag-logo.png";

const NavLogo = () => {
  return (
    <div className="flex">
      <img width={40} src={logo} alt="logo" />
      <p className="text-primary font-bold text-2xl">Blood Bridge</p>
    </div>
  );
};

export default NavLogo;
