"use client";

import { useSession } from "next-auth/react";
import { MenuIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import useFormattedPathSegment from "@features/useFormattedPathSegment";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavigationBackState,
  toggleNavigation,
} from "@redux/slices/navigationSlice";
import { AppDispatch, RootState } from "@redux/store";

const DashboardNavbar: FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const handleToggleSidebar = () => {
    dispatch(toggleNavigation());
  };
  const { isOpenNavigation } = useSelector(
    (state: RootState) => state.navigation
  );

  const [theme, setTheme] = useState<string>("light");
  const { data: session, status } = useSession();
  const [title, setTitle] = useState(() =>
    session?.user.role && status === "authenticated"
      ? useFormattedPathSegment(session?.user.role, pathname)
      : ""
  );
  useEffect(() => {
    setTitle(() =>
      session?.user.role
        ? useFormattedPathSegment(session?.user.role, pathname)
        : ""
    );
  }, [pathname, status]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    setTheme(() => localStorage.getItem("theme") || "light");
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <nav className="w-full bg-sky-600 dark:bg-gray-900 dark:border-b border-white/50 text-white sticky top-0 px-4 py-2 flex items-center justify-between">
      <div
        className="flex items-center gap-2 capitalize"
        onClick={handleToggleSidebar}
      >
        {isOpenNavigation ? (
          <MenuIcon />
        ) : session?.user.picture ? (
          <Image
            src={session?.user.picture as string}
            alt="picture"
            width={30}
            height={20}
            className="w-8 aspect-square object-cover rounded-full border border-white"
          />
        ) : (
          <span className=" bg-white/80 w-[30px] aspect-square text-sky-600 rounded-full p-1 flex items-center justify-center">
            <i className="fas fa-user text-lg"></i>
          </span>
        )}
        {title}
      </div>
      <div className="w-full flex-1 h-full p-4" onClick={toggleTheme} />
      <Image
        src="/logo.png"
        alt="logo"
        width={100}
        className="h-9 w-auto"
        height={30}
      />
    </nav>
  );
};

export default DashboardNavbar;
