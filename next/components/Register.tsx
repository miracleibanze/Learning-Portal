"use client";

import { FC, Suspense, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";
import { pcBook1 } from "@assets";
import { getSession, signIn } from "next-auth/react";
import Loading from "@app/loading";

const RegisterComponent: FC = () => {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams?.get("callbackUrl") || "/iLearn";
  const [password, setPassword] = useState("");
  const [passwordTest, setPasswordTest] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLogginIn, setIsLogginIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [validation, setValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    updates: false,
  });

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsRegistering(true);
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        throw new Error(data.message || "Something went wrong");
      }

      setStep(3);
      console.log("User registered successfully:", data);
    } catch (error: any) {
      setError(error.message);
      console.error("Registration error:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  const handleLogin = async () => {
    setIsLogginIn(true);
    const { email, password } = formData;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      const userSession = await getSession(); // Retrieve session after login
      console.log(userSession);
      if (userSession) {
        localStorage.setItem("learnTech", JSON.stringify(userSession.user)); // Save to localStorage
        console.log("Session saved to localStorage");
      }

      redirect(callBackUrl); // Redirect on success
    }
    setIsLogginIn(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordTest(value);

    setValidation({
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setFormData((prev) => ({
      ...prev,
      password: e.target.value,
    }));
  };

  const handleFormData = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    if (event.target.name === "role" && event.target.value !== "student") {
      setIsPremium(true);
    } else {
      setIsPremium(false);
    }
  };

  return (
    <main className="w-full flex-1 h-full container flex items-center justify-center relative">
      <div className="absolute inset-0">
        <Image
          src={pcBook1}
          alt="backgroundImage"
          className="h-full w-full object-cover object-full"
        />
        <div className="absolute inset-0 backdrop-blur-lg" />
      </div>
      <div className="shadow-lg w-full sm:max-w-lg max-w-md rounded-2xl backdrop-blur-3xl bg-black/40 z-[10] overflow-hidden border-white/50 border-2">
        <div className={`p-8 text-white ${step !== 0 && "hidden"}`}>
          <h4 className="h4 font-bold">Register to IMBONI&nbsp;Learn</h4>
          <p className="body-2">
            Unlock your learning potential today.
            <br />
            Sign in to start your journey.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="relative px-8 py-4 text-white rounded-b-2xl"
        >
          <p className="body-2 mb-5 text-red-500 mt-2">
            {error === "missing" && "Please!, enter all credentials to login"}
          </p>
          {step === 0 && (
            <>
              <div className="sm:flex gap-5">
                <label>
                  Full names&nbsp;:
                  <input
                    className="input !text-white mb-3"
                    type="text"
                    placeholder="Full names"
                    name="name"
                    value={formData.name}
                    onChange={handleFormData}
                    required
                  />
                </label>
              </div>
              <label>
                Email&nbsp;:
                <input
                  className="input !text-white mb-3"
                  type="text"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleFormData}
                  required
                />
              </label>
              <span className="block font-semibold">
                Receive updates (optional)
              </span>
              <label htmlFor="updates" className="leading-tight">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      updates: e.target.checked,
                    }));
                  }}
                  name="updates"
                  id="updates"
                />{" "}
                I agree to receive emails about study suggestions and progress
                updates.
              </label>
              <div className="w-full flex justify-end">
                <button
                  className={`button rounded-full !bg-primary text-white relative left-0`}
                  onClick={() => setStep(1)}
                >
                  Next
                </button>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <button
                disabled={password !== passwordTest && password !== ""}
                className={`slide-in button rounded-full border hover:border-primary text-zinc-800 relative left-0 mb-8`}
                onClick={() => setStep(0)}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <label
                htmlFor="password"
                className="slide-in block body-2 font-medium text-white"
              >
                Password:
              </label>
              <div className="slide-in mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary  bg-transparent text-focus:border-primary flex mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={passwordTest}
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="flex-1 w-full px-4 py-2 rounded-md outline-none bg-transparent text-white"
                />
                <span
                  className="flex items-center justify-center rounded-r-md p-1 border-l"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`fas text-lg text-white/80 px-1 py-0.5 flex items-center justify-center ${
                      !showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </span>
              </div>
              <div className="slide-in space-y-1">
                <p className="text-white/80">
                  <i
                    className={`fas pr-2 ${
                      validation.length
                        ? "fa-check text-darkPrimary"
                        : "fa-times text-red-500"
                    }`}
                  ></i>{" "}
                  Minimum 8 characters
                </p>
                <p className="text-white/80">
                  <i
                    className={`fas pr-2 ${
                      validation.uppercase
                        ? "fa-check text-darkPrimary"
                        : "fa-times text-red-500"
                    }`}
                  ></i>{" "}
                  At least one uppercase letter
                </p>
                <p className="text-white/80">
                  <i
                    className={`fas pr-2 ${
                      validation.lowercase
                        ? "fa-check text-darkPrimary"
                        : "fa-times text-red-500"
                    }`}
                  ></i>{" "}
                  At least one lowercase letter
                </p>
                <p className="text-white/80">
                  <i
                    className={`fas pr-2 ${
                      validation.number
                        ? "fa-check text-darkPrimary"
                        : "fa-times text-red-500"
                    }`}
                  ></i>{" "}
                  At least one number
                </p>
                <p className="text-white/80">
                  <i
                    className={`fas pr-2 ${
                      validation.special
                        ? "fa-check text-darkPrimary"
                        : "fa-times text-red-500"
                    }`}
                  ></i>{" "}
                  At least one special character
                </p>
                <label
                  htmlFor="password"
                  className="block body-2 font-medium text-white pt-4"
                >
                  Confirm Password:
                </label>
                <div className="mt-1 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary  bg-transparent text-white focus:border-primary flex">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handlePassword}
                    name="password"
                    placeholder="Confirm password"
                    className="flex-1 w-full px-4 py-2 rounded-md outline-none  bg-transparent"
                  />
                  <span className="flex items-center justify-center p-1 rounded-r-md border-l">
                    <i
                      className={`fas rounded-full text-xl p-1 px-2 flex items-center justify-center ${
                        password === passwordTest
                          ? password !== "" && "fa-check text-darkPrimary"
                          : "fa-times text-red-500"
                      }`}
                    ></i>
                  </span>
                </div>
                <div className="w-full flex justify-end pt-4">
                  <button
                    disabled={password !== passwordTest && password !== ""}
                    className={`button rounded-full !bg-primary text-white relative left-0`}
                    onClick={() => setStep(2)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <button
                disabled={password !== passwordTest && password !== ""}
                className={`slide-in button rounded-full border hover:border-primary text-zinc-800 relative left-0 mb-8`}
                onClick={() => setStep(1)}
              >
                <i className="fas fa-arrow-left"></i>
              </button>
              <p className="slide-in body-2 mb-4 font-semibold">
                Finalize Your Account Setup
              </p>
              <p className="slide-in body-2 mb-4 text-white">
                Please select the role you will assume on IMBONI Learn. You can
                choose to join as a <strong>Student</strong>,{" "}
                <strong>Instructor</strong>, or <strong>Admin</strong>.
              </p>
              <div className="slide-in mb-4">
                <label
                  htmlFor="role"
                  className="block text-white font-medium mb-2"
                >
                  Select Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="input !text-white w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  onChange={handleFormData}
                  defaultValue="student"
                >
                  <option className="text-black" value="student">
                    Student
                  </option>
                  <option className="text-black" value="instructor">
                    Instructor
                  </option>
                  <option className="text-black" value="admin">
                    Admin
                  </option>
                </select>
              </div>
              {isPremium && (
                <div className="slide-in mb-4">
                  <label className="block text-white text-sm mb-2">
                    For now you are allowed to be student, if not you need
                    Permission from the creator of This Platform to buy right
                    and trust. contact{" "}
                    <a
                      className="underline text-primary"
                      href={`mailto:miracleibanze@gmail.com?subject=Request%20to%20be%20${formData.role}&body=This%20is%20a%20request%20to%20be%20have%20further%20assistance%20on%20a%20position%20of%20being%20${formData.role}`}
                    >
                      miracleibanze@gmail.com
                    </a>{" "}
                    or{" "}
                    <a
                      className="underline text-primary"
                      href="tel:+250794881466"
                    >
                      +250794881466
                    </a>
                    {". "}
                  </label>
                  <label className="block text-white text-sm mb-2">
                    You can ask for a{" "}
                    <strong>
                      <u>demo account</u>
                    </strong>{" "}
                    to check on which functionalities <u>Admin</u> or{" "}
                    <u>Instructor</u> can access, if you are a developer
                    checking how this web assignments. But on study purpose, you
                    have to follow guidelines
                  </label>
                </div>
              )}
              <p className="slide-in text-sm text-white/70 mb-6">
                By clicking <strong>Register</strong>, you confirm that you have
                read and agree to our{" "}
                <a
                  href="/terms"
                  className="text-darkPrimary underline hover:text-darkPrimary"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-darkPrimary underline hover:text-darkPrimary"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <button
                type="submit"
                disabled={isRegistering || isPremium}
                className={`slide-in button rounded-full text-white w-full py-3 text-lg font-medium shadow-md transition duration-200 bg-primary hover:bg-darkPrimary`}
              >
                {isRegistering ? "Registering..." : "Register"}
              </button>
            </>
          )}
          {step === 3 && (
            <>
              <h4 className="h4">Account created successfully!</h4>
              <p className="body-2">Ready to continue to login page?</p>
              <button
                disabled={isLogginIn}
                className="button bg-primary text-white"
                onClick={handleLogin}
              >
                {isLogginIn ? "Continue..." : "Continue"}
              </button>
            </>
          )}
          <p className="pt-4 mt-4 border-t border-lightPrimary">
            Arleady have account?{" "}
            <span
              className="!text-darkPrimary"
              onClick={() => redirect("/login")}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </main>
  );
};

const Register: FC = () => (
  <Suspense fallback={<Loading />}>
    <RegisterComponent />
  </Suspense>
);

export default Register;
