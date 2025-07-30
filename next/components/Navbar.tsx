"use client";

import { FC, useEffect, useState } from "react";
import { navLinks } from "@features/constants";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { scrollToSection } from "@redux/slices/refsSlice";
import Link from "next/link";
import { AppDispatch } from "@redux/store";

const Navbar: FC<{ user?: string }> = ({ user }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [openNavigation, setOpenNavigation] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  ////////////////////////////

  useEffect(() => {
    setOpenNavigation(false);
  }, [pathname]);

  ///////////////////////////

  const handleScroll = (
    section: "about" | "features" | "courses" | "pricing"
  ) => {
    console.log("scroll fn" + section);
    dispatch(scrollToSection(section));
  };

  return (
    <nav className="w-full flex justify-between items-center sticky top-0 z-[9990] bg-primary dark:bg-darkPrimary border-b border-white/50 px-4 text-white">
      <Image
        src="/logo.png"
        alt="logo"
        width={160}
        height={90}
        className="h-14 py-2 w-auto"
      />
      {openNavigation && (
        <div
          className="fixed inset-0 lg:hidden"
          onClick={() => setOpenNavigation(false)}
        />
      )}
      <div className="flex items-center h-full">
        <ul
          className={`flex space-x-2 lg:justify-end max-lg:pt-24 h-full items-center max-lg:flex-col pt-2 lg:relative fixed max-lg:bg-primary max-lg:text-white ${
            openNavigation
              ? "max-lg:navbar-mobile pb-16 overflow-y-scroll"
              : "max-lg:hidden"
          }`}
        >
          {navLinks.map((item, index) => (
            <li
              key={item.link + index}
              className="max-lg:w-full"
              onClick={() => {
                setOpenNavigation(false);
                // Scroll to the section when clicked
                switch (item.link) {
                  case "about":
                    handleScroll("about");
                    break;
                  case "features":
                    handleScroll("features");
                    break;
                  case "courses":
                    handleScroll("courses");
                    break;
                  case "pricing":
                    handleScroll("pricing");
                    break;
                  default:
                    router.push(item.link);
                    break;
                }
              }}
            >
              <span className="flex body-2 relative lg:px-3 px-5 border-black/70 h-10 mb-2 hover:bg-zinc-400/50 duration-300 rounded-md items-center max-lg:text-white textLeft">
                {item.name}
              </span>
            </li>
          ))}
          <Link href={"/login"}>
            <button
              className={`h-10 flex items-center ml-2 mb-2 px-4 hover:bg-zinc-300/50 duration-300 rounded-md lg:hidden w-full ${
                pathname.startsWith("/dashboard") && "hidden"
              }`}
            >
              Login/ Register
            </button>
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="lg:hidden h-10 w-10 absolute top-4 right-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            onClick={() => setOpenNavigation(false)}
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
          <div className="lg:hidden flex relative top-full w-full h-12 overflow-visible bg-inherit">
            &copy; {new Date().getFullYear()} IMBONI Learn. <br />
            All rights reserved.
          </div>
        </ul>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="w-10 h-10 lg:hidden"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={() => setOpenNavigation(true)}
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        {pathname === "/" && (
          <Link href={user ? "/dashboard" : "/login"}>
            <button className="h-10 lg:flex items-center ml-2 hidden bg-zinc-300 hover:scale-105 text-black hover:bg-lightPrimary/70 duration-300 rounded-md px-4 py-2">
              Dashboard
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
