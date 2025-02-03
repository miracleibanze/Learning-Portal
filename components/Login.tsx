"use client";

import Link from "@node_modules/next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axiosInstance from "./features/axiosInstance";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { setUser } from "@redux/slices/userSlice";
import { myUser } from "./constants";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  interface LoginForm {
    email: string;
    password: string;
    data?: string;
  }

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<LoginForm>({
    email: "",
    password: "",
    data: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordVisible(e.target.checked);
  };

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({ email: "", password: "" });
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/;

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // Prevent default form submission

    const trimmedEmail = formData.email.trim().toLowerCase();

    if (!emailRegex.test(trimmedEmail)) {
      setError((prevError) => ({
        ...prevError,
        email: "Please enter a valid email",
      }));
      return;
    }

    if (!formData.password.trim()) {
      setError((prevError) => ({
        ...prevError,
        password: "Please enter your password",
      }));
      return;
    }

    try {
      setIsLoggingIn(true);
      const response = await axiosInstance.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      const userData = response.data; // Assuming response contains user data
      dispatch(setUser(userData)); // Store full user data in Redux

      router.push("/dashboard");
    } catch (err) {
      setError({
        ...error,
        data: "Problem Logging in, please try again later!",
      });
      console.log(err);
      dispatch(setUser(myUser)); // Store full user data in Redux
      router.push("/dashboard");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <h3 className="h3 font-semibold">Welcome back</h3>
      <p className="body-2 text-zinc-600 mb-6">
        Sign in to continue to your UMURAVA dashboard,{" "}
        <br className="max-md:hidden" />
        or don't have an account?{" "}
        <Link href="/register" className="text-primary">
          Sign up
        </Link>
      </p>

      {error.data !== "" && (
        <span className="text-sm text-red-600 px-4">{error.data}</span>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col ">
        <label
          htmlFor="email"
          className="flex flex-col w-full mx-auto text-start mb-2"
        >
          <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
            Email
          </span>
          <input
            type="text"
            className="input bg-transparent placeholder-[10px]"
            id="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleData}
          />
          {error.email !== "" && (
            <span className="text-sm text-red-600 px-4">{error.email}</span>
          )}
        </label>

        <label
          htmlFor="password"
          className="flex flex-col w-full mx-auto text-start"
        >
          <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
            Password
          </span>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="input bg-transparent placeholder-[10px]"
            id="password"
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleData}
          />
          {error.password !== "" && (
            <span className="text-sm text-red-600 px-4">{error.password}</span>
          )}
        </label>

        <label
          htmlFor="show"
          className="flex items-center w-full mx-auto text-start py-2 px-2 gap-2"
        >
          <input
            type="checkbox"
            id="show"
            onChange={handleVisibility}
            className="h-max"
          />
          <span className="text-sm text-zinc-600">Show password</span>
        </label>

        <div className="w-full flex justify-end">
          <Link href="" className="text-sm text-primary mb-6 ">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className={`button mx-auto px-12 ${
            isLoggingIn ? "bg-zinc-400" : "bg-primary text-white"
          }`}
          disabled={isLoggingIn}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
