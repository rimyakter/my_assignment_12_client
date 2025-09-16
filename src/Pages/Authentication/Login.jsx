import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <h1 className="text-3xl font-bold mb-6 text-secondary">Login Now!</h1>
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
            <p className="text-red-700">Password must 6 characters or longer</p>
          )}
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
        </fieldset>
        <button className="btn btn-primary mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
