import React from "react";
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
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    login(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You Logged In  Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        //navigate user after use private route
        navigate(from);
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Failed! Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <h1 className="text-3xl font-bold mb-6 text-secondary">
              Login Now!
            </h1>
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
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Login</button>
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
