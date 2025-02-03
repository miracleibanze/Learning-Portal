import React from "react";
import Link from "@node_modules/next/link";
import { FC, useState } from "react";
import { setUser, setUserId, User } from "@redux/slices/userSlice";
import Heading from "./Heading";
import { jobTitles } from "./constants";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { useRouter } from "@node_modules/next/navigation";
import axiosInstance from "./features/axiosInstance";

const Register: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [formData, setFormData] = useState<User>({
    names: "",
    email: "",
    password: "",
    title: "",
    phoneNumber: "",
    role: "",
  });
  const [isPasswordVissible, setIsPasswordVissible] = useState<boolean>(false);
  const [stepToRegister, setStepToRegister] = useState<number>(0);
  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordVissible(e.target.checked);
  };
  const [validation, setValidation] = useState<{
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    special: boolean;
  }>({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [passwordTest, setPasswordTest] = useState<string>("");

  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordTest(value);

    setValidation({
      length: value.length >= 6,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };
  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post("/api/register", formData);
      const userData = response.data; // Assuming response contains full user data

      dispatch(setUser(userData)); // Store full user data in Redux

      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <>
      {stepToRegister === 0 && (
        <>
          <h3 className="h3 font-semibold">Register Now</h3>
          <p className="body-2 text-zinc-600 mb-6">
            Create a new account to continue to you UMURAVA,
            <br className="max-md:hidden" /> or already have account ?.{" "}
            <Link href="/login" className="text-primary">
              Login
            </Link>
          </p>
          <label
            htmlFor="names"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Names
            </span>
            <input
              type="text"
              className="input placeholder-[10px]"
              id="names"
              placeholder="Enter your full names"
              required
            />
          </label>
          <label
            htmlFor="username"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Username
            </span>
            <input
              type="text"
              className="input placeholder-[10px]"
              id="username"
              placeholder="Enter you username"
              required
            />
          </label>
          <label
            htmlFor="email"
            className="flex flex-col w-full mx-auto text-start mb-4"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Email
            </span>
            <input
              type="text"
              className="input placeholder-[10px]"
              id="email"
              placeholder="Enter your Password"
              onChange={handleData}
            />
          </label>

          <div className="w-full flex justify-end">
            <button
              className="button bg-primary text-white"
              onClick={() => setStepToRegister(1)}
            >
              Next
            </button>
          </div>
        </>
      )}
      {stepToRegister === 1 && (
        <>
          <button
            className="button float-left bg-zinc-200 hover:bg-zinc-300 max-w-max mb-4"
            onClick={() => setStepToRegister(0)}
          >
            <i className="fas fa-arrow-left "></i>
          </button>
          <p className="block body-2 text-start">
            Continue by choosing a strong password.
          </p>
          <label
            htmlFor="password"
            className="flex flex-col w-full mx-auto text-start"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Password
            </span>
            <input
              type={isPasswordVissible ? "text" : "password"}
              className="input placeholder-[10px]"
              id="password"
              placeholder="Enter your Password"
              onChange={handlePasswordChange}
            />
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
          <div className="slide-in space-y-1 text-sm px-2">
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.length
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              Minimum 6 characters
            </p>
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.uppercase
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one uppercase letter
            </p>
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.lowercase
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one lowercase letter
            </p>
            <p className="text-zinc-600">
              <i
                className={`fas pr-2 ${
                  validation.number
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one number
            </p>
            <p className="text-zinc-600 mb-4">
              <i
                className={`fas pr-2 ${
                  validation.special
                    ? "fa-check text-green-500"
                    : "fa-times text-red-500"
                }`}
              ></i>{" "}
              At least one special character
            </p>
          </div>
          <label
            htmlFor="password"
            className="flex flex-col w-full mx-auto text-start mb-4"
          >
            <span className="text-sm text-zinc-600 z-[10] translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Confirm Password:
            </span>
            <div className="flex relative">
              <input
                type={isPasswordVissible ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleData}
                name="password"
                placeholder="Enter your password to comfirm"
                className="input placeholder-[10px] border-e-0"
              />
              <span className="absolute right-1 top-0 bottom-0 flex items-center justify-center p-1">
                <i
                  className={`fas w-7 h-7 border-dashed border-2 rounded-full text-lg px-1 py-0.5 flex items-center justify-center ${
                    formData.password === passwordTest
                      ? formData.password !== "" &&
                        "fa-check text-green-500 border-green-700"
                      : "fa-times text-red-500 border-red-700"
                  }`}
                ></i>
              </span>
            </div>
          </label>
          <div className="w-full flex justify-end">
            <button
              className="button bg-primary text-white"
              onClick={() => setStepToRegister(2)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {stepToRegister === 2 && (
        <>
          <button
            className="button float-left bg-zinc-200 hover:bg-zinc-300 max-w-max mb-4"
            onClick={() => setStepToRegister(1)}
          >
            <i className="fas fa-arrow-left "></i>
          </button>
          <p className="body-2 text-zinc-700">
            Last step to create your UMURAVA account,
          </p>
          <label
            htmlFor="role"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Role
            </span>
            <select id="role" className="input">
              <option value="talent">Talent</option>
              <option value="instructor">Instructor</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <label
            htmlFor="title"
            className="flex flex-col w-full mx-auto text-start mb-2"
          >
            <span className="text-sm text-zinc-600 translate-y-2 translate-x-2 bg-zinc-100 max-w-max pl-2 pr-4">
              Username
            </span>
            <select id="title" className="input">
              {jobTitles?.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <p className="slide-in text-sm text-gray-600 mb-6">
            By clicking <strong>Register</strong>, you confirm that you have
            read and agree to our{" "}
            <a
              href="/terms"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Privacy Policy
            </a>
            .
          </p>
          <button
            className="button bg-primary text-white mx-auto px-12"
            onClick={handleRegister}
          >
            Register
          </button>
        </>
      )}
      {stepToRegister === 3 && (
        <>
          <h4 className="h4 font-semibold text-center mb-2">
            Account created successfully
          </h4>
          <p className="body-2 text-zinc-600 text-center mb-6 leading-tight">
            Your account has been created, tap <strong>Get started</strong> to
            continue to {formData.role} dashboard
          </p>
          <Link href="/dashboard" className="mx-auto">
            <button className="button bg-primary text-white max-w-max mx-auto">
              Get started
            </button>
          </Link>
        </>
      )}
    </>
  );
};

export default Register;
