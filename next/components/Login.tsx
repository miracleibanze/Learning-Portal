"use client";

import { getSession, signIn } from "next-auth/react";
import { FC, Suspense, useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import Image from "next/image";
import { pcBook1 } from "@assets";
import Loading from "@app/loading";

const LoginComponent: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLogginIn, setIsLogginIn] = useState(false);
  const searchParams = useSearchParams();
  const callBackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  useEffect(() => {
    setError("");
  }, [password, email]);

  const handleLogin = async (e: React.ChangeEvent<HTMLFormElement>) => {
    setIsLogginIn(true);
    e.preventDefault();
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

  return (
    <main className="w-full flex-1 min-h-full container flex items-center justify-center relative py-4">
      <div className="fixed inset-0">
        <Image
          src={pcBook1}
          alt="backgroundImage"
          className="h-full w-full object-cover object-full"
        />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>
      <div className="shadow-lg max-w-md rounded-2xl backdrop-blur-3xl z-[10] border-white/50 border-2 my-auto bg-black/40">
        <div className="p-8 text-white">
          <h4 className="h4 font-bold">Welcome to IMBONI&nbsp;Learn</h4>
          <p className="body-2">
            Unlock your learning potential today.
            <br />
            Sign in to start you journey.
          </p>
        </div>

        {/* <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          height={80}
          className="!bg-sky-600 top-0 w-full left-0 right-0 rotate-180 p-0"
        >
          <path
            d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
            className="fill-zinc-100"
          ></path>
          </svg> */}

        <p className="body-2 text-red-500 px-8 mb-3">{error !== "" && error}</p>
        <form
          onSubmit={handleLogin}
          className="relative p-8 pt-0 rounded-b-2xl text-white"
        >
          <label>
            Email&nbsp;:
            <input
              className="input !text-white mb-5"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password&nbsp;:
            <input
              className="input !text-white"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="block cursor-pointer">
            <input
              type="checkbox"
              name="show"
              className="max-w-8 m-2"
              onChange={(event) => {
                console.log(event.target.checked);
                setShowPassword(event.target.checked);
              }}
            />
            Show password
          </label>
          <p className="text-end !text-sky-600 mb-3 cursor-pointer">
            Forgot password ?
          </p>
          <button
            type="submit"
            disabled={isLogginIn}
            className="button rounded-full !bg-sky-600 text-white block w-full"
          >
            {isLogginIn ? "Login..." : "login"}
          </button>
          <p className="py-4 text-center">
            or Don't have account{" "}
            <span
              className="text-sky-600"
              onClick={() => redirect("/register")}
            >
              Register
            </span>
            .
          </p>
        </form>
      </div>
    </main>
  );
};

const Login: FC = () => (
  <Suspense fallback={<Loading />}>
    <LoginComponent />
  </Suspense>
);

export default Login;
