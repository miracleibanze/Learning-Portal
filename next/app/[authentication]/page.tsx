"use client";

import { FC } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Login from "@components/Login";
import Register from "@components/Register";

const page: FC = () => {
  const { authentication }: { authentication: string } = useParams();
  const router = useRouter();
  const validRoutes: string[] = ["login", "register"];

  if (!validRoutes.includes(authentication)) {
    return notFound();
  }
  return (
    <section className="w-full min-h-screen flex flex-col">
      <nav className="sticky top-0 z-[1000] w-full bg-white dark:bg-black/70 p-2 flex items-center justify-between px-6">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={50}
          className="w-[10rem]"
          onClick={() => router.push("/")}
        />

        {/* <ThemeSelector /> */}
      </nav>
      {authentication === "login" && <Login />}
      {authentication === "register" && <Register />}
    </section>
  );
};

export default page;
