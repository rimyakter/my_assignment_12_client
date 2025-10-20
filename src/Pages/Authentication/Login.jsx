import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state || "/";
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You Logged In Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from);
      })
      .catch(() => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed! Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  // ✅ Autofill admin credentials
  const fillAdminCredentials = () => {
    setValue("email", "riad@gmail.com");
    setValue("password", "123456");
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <h1 className="text-3xl font-bold mb-6 text-secondary">
              Login Now!
            </h1>

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-700">Email is required</p>
            )}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-700">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-700">
                Password must 6 characters or longer
              </p>
            )}

            {/* Info */}
            <div className="text-sm text-gray-500">
              <p>Want to explore as Admin?</p>
            </div>

            {/* Admin Autofill Button */}
            <div className="my-4">
              <button
                type="button"
                onClick={fillAdminCredentials}
                className="btn btn-outline btn-sm border-primary text-primary hover:bg-primary hover:text-white"
              >
                Autofill Admin Credentials
              </button>
            </div>

            <button className="btn btn-primary mt-4 w-full">Login</button>
          </fieldset>

          <p className="text-sm my-2">
            Don't have an account?
            <Link
              className="text-primary underline font-bold ml-1"
              to="/register"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
