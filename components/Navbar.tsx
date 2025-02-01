"use client";

import { usePathname } from "next/navigation";
import { Umuravalogo } from "@public";
import Image from "next/image";
import { useEffect, useState, FC } from "react";
import Link from "next/link";

interface NavLink {
  name: string;
  link: string;
}

const Navbar: FC = () => {
  const [openNavigation, setOpenNavigation] = useState<boolean>(false);
  const toggleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const navLinks: NavLink[] = [
    { name: "Home", link: "/" },
    { name: "Challenge & hackathons", link: "/challenges&Hackathons" },
    { name: "For Education Institution", link: "/education-institutions" },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
  ];

  const pathname = usePathname();

  useEffect(() => {
    setOpenNavigation(false);
  }, [pathname]);

  const content = (
    <>
      <div className="lg:hidden fixed inset-0 z-[100] pointer-events-auto backdrop-blur-sm"></div>
      <div className="lg:hidden fixed top-[4.5rem] left-0 bottom-0 right-24 bg-primary text-white z-[100] flex flex-col pt-8 pl-6 gap-3 p-3">
        {navLinks.map((link, index) => (
          <Link
            href={link.link}
            key={index}
            className={`${
              pathname === link.link && "bg-white/30"
            } py-2 px-4 rounded-md hover:bg-white/30`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </>
  );

  return (
    <>
      <div className="container mx-auto w-full flex sticky top-0 bg-white items-center justify-between py-2 px-10 z-[9999]">
        <div
          onClick={toggleNavigation}
          className="lg:hidden"
          aria-expanded={openNavigation}
        >
          <i
            className={`fas ${
              openNavigation ? "fa-times" : "fa-bars"
            } text-3xl text-black`}
          ></i>
        </div>
        <Image src={Umuravalogo} alt="logo" width={150} className="w-[10rem]" />
        <div className="w-full flex-1 lg:flex items-center justify-center gap-4 text-sm font-semibold text-zinc-800/90 hidden">
          {navLinks.map((link, index) => (
            <Link
              href={link.link}
              key={index}
              className={`${
                pathname === link.link && "text-primary"
              } hover:text-primary`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <button className="button bg-darkBlue text-white">
          <Link href="/login">
            Join<span className="max-md:hidden"> the Program</span>
          </Link>
        </button>
      </div>
      {openNavigation && content}
    </>
  );
};

export default Navbar;
