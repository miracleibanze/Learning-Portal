"use client";

import { FC, useEffect, useState } from "react";
import {
  SettingsIcon,
  PowerIcon,
  MoreHorizontal,
  ChevronDownIcon,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import getLinks from "@features/SidebarLinks";
import { navbarBackType } from "@redux/slices/navigationSlice";
import { backgroundBulb, backgroundCats, backgroundFuturistic } from "@assets";
import { SideBarBackgounds } from "@features/constants";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

interface SidebarProps {
  status?: string;
  isOpenNavigation?: boolean;
  handleToggleSidebar: () => void;
  handleLinkClick?: () => void;
  navbarBack: navbarBackType;
}

const Sidebar: FC<SidebarProps> = ({
  status,
  isOpenNavigation,
  handleToggleSidebar,
  handleLinkClick,
  navbarBack,
}) => {
  const pathname = usePathname();
  const session = useSession().data;
  const { user } = useSelector((state: RootState) => state.user);

  const Background = SideBarBackgounds.find(
    (bg) => bg.code === user?.preferredSidebarBg
  );
  useEffect(() => {
    window.innerWidth < 768 && handleToggleSidebar(); // only if it should auto-close
  }, [pathname]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 md:hidden z-[100] ${
          !isOpenNavigation && "hidden"
        } `}
        onClick={handleToggleSidebar}
      />
      <aside
        className={`
          ${isOpenNavigation ? "w-full" : "w-0 max-md:hidden"}
          bg-primary dark:bg-darkPrimary text-white dark:text-white h-screen py-4 flex flex-col justify-between dark:border-r border-white/50
          transition-all duration-300 ease-in-out 
          ${
            isOpenNavigation
              ? "fixed sm:sticky top-0 left-0" // Fixed on small screens when open
              : "absolute sm:relative " // Hide on small screens when closed, but keep relative on large screens
          }
         z-[999] max-w-56 overflow-x-hidden`}
      >
        {Background && (
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src={Background.image}
              alt={Background.name}
              className="h-full object-cover object-left"
            />
            <div className="absolute inset-0 bg-overlayPrimary dark:bg-opacityPrimary" />
          </div>
        )}

        <header className="relative overflow-hidden mb-12 m">
          <Link href="/iLearn">
            <div className="px-3 mb-3">
              <Image
                src="/logo.png"
                alt="logo"
                width={100}
                className="h-10 w-auto"
                height={30}
              />
            </div>
          </Link>
        </header>
        <main className="overflow-hidden">
          {/* <Link
            onClick={handleLinkClick} // Close sidebar on link click
            href={
              user?.role === "student"
                ? `/iLearn/${encodeURIComponent(user?.name as string)}?pin=${
                    user?._id
                  }`
                : `/iLearn/${user?.role}/${encodeURIComponent(
                    user?.name as string
                  )}?pin=${user?._id}`
            }
          >
            <div className="w-max mx-auto border border-white">
              {user?.picture ? (
                <Image
                  src={user?.picture}
                  alt="profile"
                  width={80} // Set an appropriate width
                  height={80} // Set an appropriate height
                  className="w-[5rem] aspect-[9/12] object-cover"
                />
              ) : (
                <div className="bg-zinc-300/50 aspect-square w-max h-[4rem] flex items-center justify-center">
                  <i className="fas fa-user text-[3rem]"></i>
                </div>
              )}
            </div>
            <div className="text-center p-4">
              <p className="body-1 leading-none">
                {user?.name ? user?.name : "Loading..."}
              </p>
              <p className="text-[11px] text-white/90 mb-1">
                {user?.email ? user?.email : "..."}
              </p>
              <button className="button border rounded-full !py-1 capitalize">
                {user?.role ? user?.role : "..."}
              </button>
            </div>
          </Link> */}
          {!navbarBack.state ? (
            <nav>
              {status === "authenticated"
                ? getLinks({ role: session?.user?.role }).map((link, index) => (
                    <Link
                      key={index}
                      href={link.path || ""}
                      onClick={handleLinkClick} // Close sidebar on link click
                      className={`flex items-center space-x-2 py-2 px-4 text-sm ${
                        pathname.startsWith(link.path) &&
                        link.path !== "/iLearn"
                          ? "border-l-4 border-secondary bg-lightPrimary pl-3"
                          : Background
                          ? "hover:bg-opacityPrimary"
                          : "hover:bg-white/30"
                      }
                    ${
                      pathname === "/iLearn" &&
                      link.path === "/iLearn" &&
                      "border-l-4 border-secondary bg-primary pl-3"
                    }
                    `}
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  ))
                : Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className={`h-8 px-4 bg-white/40 w-full mb-1`}
                    />
                  ))}
            </nav>
          ) : (
            <>
              <Link
                href={navbarBack.url || ""}
                className="w-full py-2 px-2 flex items-center gap-2"
              >
                <ArrowLeft />
                {navbarBack.title}
              </Link>

              <div
                className={`w-full flex flex-col h-full max-h-[20rem] overflow-y-auto`}
              >
                {navbarBack.list?.map((link, index) => (
                  <Link
                    key={index}
                    href={(link.url as string) || ""}
                    onClick={handleLinkClick} // Close sidebar on link click
                    className={`flex items-center space-x-2 py-2 pl-6 text-sm ${
                      pathname.startsWith(
                        `${navbarBack.url}/${encodeURIComponent(link.url)}`
                      )
                        ? "underline"
                        : ""
                    }
                    `}
                  >
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </main>
      </aside>
    </>
  );
};

export default Sidebar;
