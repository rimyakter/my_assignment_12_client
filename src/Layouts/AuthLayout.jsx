import React from "react";
import NavLogo from "../Pages/Shared/NavLogo/NavLogo";
import lottieLogin from "../assets/lottie/lottie.json";
import Lottie from "lottie-react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="bg-base-200 w-11/12 mx-auto p-10">
      <NavLogo></NavLogo>

      <div className="hero-content  flex-col lg:flex-row-reverse">
        <div className="text-right lg:text-left flex-1">
          <Lottie
            style={{ width: "350px" }}
            animationData={lottieLogin}
            loop={true}
          ></Lottie>
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
