"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  Search,
  SidebarClose,
  SidebarOpen,
  UserCircle,
} from "lucide-react";
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
  const [isSettingWindowBoxOpen, setIsSettingWindowBoxOpen] =
    useState<boolean>(false);
  const toggleSettingWindowBoxOpen = () => {
    setIsSettingWindowBoxOpen(!isSettingWindowBoxOpen);
  };
  const [isNotificationWindowBoxOpen, setIsNotificationWindowBoxOpen] =
    useState<boolean>(false);
  const toggleNotificationWindowBoxOpen = () => {
    setIsNotificationWindowBoxOpen(!isNotificationWindowBoxOpen);
  };
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
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("🚨 Error during logout:", error);
    } finally {
      setShowPopup(false);
    }
  };

  return (
    <nav className="w-full border-b border-zinc-300 dark:border-white/50 sticky top-0 right-0 left-0 z-50 shadow-md">
      <div className="px-4 py-2 flex items-center justify-between">
        <div
          className="flex items-center gap-2 capitalize"
          onClick={handleToggleSidebar}
        >
          {isOpenNavigation ? <SidebarOpen /> : <SidebarClose />}
          {title}
        </div>
        <div className="w-full flex-1 h-full p-4" onClick={toggleTheme} />
        <div className="flex gap-3 items-center">
          <div className="w-lg flex rounded-full border-y border-l border-zinc-200 dark:border-white/30 pl-3 h-9 items-center">
            <input
              type="search"
              name="search"
              id="searchbox"
              className="min-w-44 bg-inherit outline-none"
              placeholder="Search..."
            />
            <Search className="bg-white rounded-full p-1.5 border border-zinc-200 dark:border-white/30 h-9 w-9" />
          </div>
          <div className="border-x border-zinc-300 dark:border-white/50 h-12 flex items-center px-2 flex-1">
            <Bell />
          </div>
          <div
            className="px-2 flex cursor-pointer"
            onClick={toggleSettingWindowBoxOpen}
          >
            {session?.user.picture && session?.user.picture !== "" ? (
              <Image
                src={session.user.picture}
                alt="profile"
                height={80}
                width={80}
                className="w-12 h-12 object-cover object-center rounded-full"
              />
            ) : (
              <UserCircle />
            )}
            <div className="text-sm flex flex-col justify-center leading-tight ml-2 max-md:hidden">
              <p className="font-semibold">{session?.user.name}</p>
              <p>{session?.user.role}</p>
            </div>
          </div>
        </div>
        {/* <div className="w-full flex justify-between pb-3 px-4 items-center overflow-hidden">
          <Link href="/dashboard/setting">
            <SettingsIcon />
          </Link> */}

        {/* <div className="md:relative">
            <button
              onClick={() => setShowPopup(!showPopup)}
              className="p-2 rounded-full hover:bg-gray-200 focus:outline-none group relative overflow-hidden"
            >
              <PowerIcon size={24} className="group-hover:text-sky-500" />
              <MoreHorizontal
                size={18}
                className="absolute -bottom-1 right-1/2 translate-x-1/2 translate-y-2"
              />
            </button>

            {showPopup && (
              <div className="md:absolute fixed md:bottom-full max-md:top-1/2 max-md:-translate-x-1/2 max-md:left-1/2 max-md:-translate-y-1/2 left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 max-w-[90vw] z-50">
                <p className="text-sm text-gray-700 mb-4">
                  You will need to enter your credentials the next time you log
                  in.
                </p>
                <button
                  aria-label="Logout"
                  role="button"
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
                >
                  Log Out
                </button>
              </div>
            )}
          </div> */}
        {/* </div> */}
      </div>
      {isSettingWindowBoxOpen && (
        <div className="absolute top-full right-0 md:max-w-[20rem] w-full h-[30rem] bg-white p-3 border border-zinc-400">
          Settingbox
        </div>
      )}
      {isNotificationWindowBoxOpen && (
        <div className="absolute top-full left-1/2 md:max-w-[20rem] w-full h-[30rem] bg-white p-3 border border-zinc-400">
          Notificationbox
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
