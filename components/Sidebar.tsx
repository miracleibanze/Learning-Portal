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
import { signOut } from "next-auth/react";
import getLinks from "@features/SidebarLinks";
import { navbarBackType } from "@redux/slices/navigationSlice";

interface SidebarProps {
  user: User | undefined;
  status?: string;
  isOpenNavigation?: boolean;
  handleToggleSidebar?: () => void;
  handleLinkClick?: () => void;
  navbarBack: navbarBackType;
}

const Sidebar: FC<SidebarProps> = ({
  user,
  status,
  isOpenNavigation,
  handleToggleSidebar,
  handleLinkClick,
  navbarBack,
}) => {
  const pathname = usePathname();

  useEffect(() => {
    window.innerWidth < 768 && handleToggleSidebar?.(); // only if it should auto-close
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
          bg-sky-500 dark:bg-gray-900 text-white h-screen py-4 flex flex-col justify-between dark:border-r border-white/50
          transition-all duration-300 ease-in-out 
          ${
            isOpenNavigation
              ? "fixed sm:sticky top-0 left-0" // Fixed on small screens when open
              : "absolute sm:relative " // Hide on small screens when closed, but keep relative on large screens
          }
         z-[999] max-w-56 overflow-x-hidden`}
      >
        <header className="relative overflow-hidden mb-12 m">
          <Link href="/dashboard">
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
                ? `/dashboard/${encodeURIComponent(user?.name as string)}?pin=${
                    user?._id
                  }`
                : `/dashboard/${user?.role}/${encodeURIComponent(
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
                ? getLinks({ role: user?.role }).map((link, index) => (
                    <Link
                      key={index}
                      href={link.path || ""}
                      onClick={handleLinkClick} // Close sidebar on link click
                      className={`flex items-center space-x-2 py-2 px-4 text-sm ${
                        pathname.startsWith(link.path) &&
                        link.path !== "/dashboard"
                          ? "border-l-4 border-yellow-400 bg-sky-600 pl-3"
                          : "hover:bg-sky-600/50 "
                      }
                    ${
                      pathname === "/dashboard" &&
                      link.path === "/dashboard" &&
                      "border-l-4 border-yellow-400 bg-sky-600 pl-3"
                    }
                    `}
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  ))
                : Array(5)
                    .fill("")
                    .map((_, index) => (
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
