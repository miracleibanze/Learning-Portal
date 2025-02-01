import Link from "@node_modules/next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";

const Login: FC = () => {
  const router = useRouter();
  interface LoginForm {
    email: string;
    password: string;
  }
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [isPasswordVissible, setIsPasswordVissible] = useState<boolean>(false);
  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordVissible(e.target.checked);
  };
  const handleData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError({
      email: "",
      password: "",
    });
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9-]+\.[a-z]{2,}$/;

  const handleSubmit = () => {
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

    router.push("/dashboard");
  };

  return (
    <>
      <h3 className="h3 font-semibold">Welcome back</h3>
      <p className="body-2 text-zinc-600 mb-6">
        Sign in to continue to you UMURAVA dashboard,
        <br className="max-md:hidden" /> or don't have account ?.{" "}
        <Link href="/register" className="text-primary">
          Sign up
        </Link>
      </p>
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
          placeholder="Enter you email"
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
          type={isPasswordVissible ? "text" : "password"}
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
          forgot password?
        </Link>
      </div>
      <button
        className="button bg-primary text-white mx-auto px-12"
        onClick={handleSubmit}
      >
        Login
      </button>
    </>
  );
};

export default Login;
