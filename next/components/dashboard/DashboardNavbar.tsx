"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  BellDot,
  Dot,
  Search,
  SidebarClose,
  SidebarOpen,
  UserCircle,
} from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import useFormattedPathSegment from "@features/useFormattedPathSegment";
import Image from "next/image";
import { usePathname } from "next/navigation";
import themePresets, { ThemeName } from "@lib/ThemePresets";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavigationBackState,
  toggleNavigation,
} from "@redux/slices/navigationSlice";
import { AppDispatch, RootState } from "@redux/store";
import { updateUserInfo } from "@redux/slices/userSlice";
import SettingsPopup from "@components/dashboard/SettingPopup";
import NotificationPopup from "@components/dashboard/NotificationPopup";
import {
  addSystemNotification,
  silenceAllNotifications,
} from "@redux/slices/NotificationsSlice";

const DashboardNavbar: FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const notifications = useSelector((state: RootState) => state.notifications);
  const handleToggleSidebar = () => {
    dispatch(toggleNavigation());
  };
  const { isOpenNavigation } = useSelector(
    (state: RootState) => state.navigation
  );
  const { data: session, status } = useSession();

  const [theme, setTheme] = useState<string>(
    user?.preferredTheme || session?.user.preferredTheme || "light"
  );

  const [currentTheme, setCurrentTheme] = useState(
    user?.preferredColorScheme || session?.user.preferredColorScheme || "sky"
  );
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState(() =>
    session?.user.role && status === "authenticated"
      ? useFormattedPathSegment(session?.user.role, pathname)
      : ""
  );
  const [notificationToRead, setNotificationToRead] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const toggleSearching = () => {
    setIsSearching(!isSearching);
  };

  const [isSettingWindowBoxOpen, setIsSettingWindowBoxOpen] =
    useState<boolean>(false);
  const [isNotificationWindowBoxOpen, setIsNotificationWindowBoxOpen] =
    useState<boolean>(false);

  const toggleSettingWindowBox = () =>
    setIsSettingWindowBoxOpen((prev) => !prev);

  const toggleNotificationWindowBox = () => {
    setIsNotificationWindowBoxOpen((prev) => !prev);
    dispatch(silenceAllNotifications());
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
    dispatch(
      updateUserInfo({
        preferredTheme: theme,
      })
    );
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        isSettingWindowBoxOpen &&
        settingsRef.current &&
        !settingsRef.current.contains(target)
      ) {
        setIsSettingWindowBoxOpen(false);
      }

      if (
        isNotificationWindowBoxOpen &&
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setIsNotificationWindowBoxOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingWindowBoxOpen, isNotificationWindowBoxOpen]);

  useEffect(() => {
    setTheme(() => session?.user.preferredTheme || "light");
  }, []);
  useEffect(() => {
    if (notifications.silent || isNotificationWindowBoxOpen) {
      setNotificationToRead(false);
    } else {
      setNotificationToRead(true);
    }
  }, [notifications.silent]);

  useEffect(() => {
    if (!user) return;
    const needToSave =
      user?.preferredTheme !== session?.user?.preferredTheme ||
      user?.preferredColorScheme !== session?.user?.preferredColorScheme;

    if (needToSave) {
      console.log(
        `color : ${user?.preferredColorScheme} to ${session?.user.preferredColorScheme} \n theme : ${user?.preferredTheme} to ${session?.user.preferredTheme}`
      );
      dispatch(
        addSystemNotification({
          message:
            "You've changed some quick settings. To prevent losing those changes, please confirm.",
          needComfirm: true,
          tag: "theme",
        })
      );
    }
  }, [user]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // const availableThemes = Object.keys(themePresets);

  const handleThemeChange = (theme: string) => {
    const root = document.documentElement;
    const selectedTheme = themePresets[theme as ThemeName];
    if (selectedTheme) {
      Object.entries(selectedTheme).forEach(([key, value]) => {
        return root.style.setProperty(key, value as string);
      });
      setCurrentTheme(theme);
      dispatch(
        updateUserInfo({
          preferredColorScheme: theme,
        })
      );
    }
  };

  return (
    <nav className="w-full border-b border-zinc-300 dark:border-white/50 sticky top-0 right-0 left-0 z-50 shadow-md">
      <div
        className="px-4 py-2 flex items-center justify-between"
        onClick={() => {
          if (isNotificationWindowBoxOpen) {
            setIsNotificationWindowBoxOpen(false);
          }
          if (isSettingWindowBoxOpen) {
            setIsSettingWindowBoxOpen(false);
          }
        }}
      >
        <div
          className="flex items-center gap-2 capitalize"
          onClick={handleToggleSidebar}
        >
          {isOpenNavigation ? <SidebarOpen /> : <SidebarClose />}
          <span className="max-md:hidden">{title}</span>
        </div>
        <div className="w-full flex-1 h-full p-4" onClick={toggleTheme} />
        <div className="flex gap-3 items-center">
          <div className="w-lg flex rounded-full border-y border-l border-zinc-200 dark:border-white/30 pl-3 h-9 items-center">
            <input
              type="search"
              name="search"
              id="searchbox"
              className={`min-w-44 bg-inherit outline-none ${
                isOpenNavigation && "max-md:sm:hidden"
              } ${isSearching ? "" : "max-md:hidden"}`}
              placeholder="Search..."
            />
            <Search
              className="bg-primary text-white rounded-full p-1.5 border border-zinc-200 dark:border-white/30 h-9 w-9"
              onClick={toggleSearching}
            />
          </div>
          <div
            className={`relative border-x border-zinc-300 dark:border-white/50 h-12 flex-center px-2 flex-1 ${
              isSearching ? "max-md:hidden" : ""
            }`}
            onClick={toggleNotificationWindowBox}
          >
            <Bell className={`${notificationToRead && "animate-bell"}`} />

            {notificationToRead && (
              <div className="absolute top-2 right-2 bg-lightPrimary dark:bg-primary h-3 w-3 rounded-full overflow-hidden">
                <div className="w-full h-full animate-ping bg-secondary"></div>
              </div>
            )}
          </div>
          <div
            className={`px-2 flex cursor-pointer ${
              isSearching ? "max-md:hidden" : ""
            }`}
            onClick={toggleSettingWindowBox}
          >
            {session?.user.picture && session?.user.picture !== "" ? (
              <Image
                src={session.user.picture}
                alt="profile"
                height={80}
                width={80}
                className="w-10 h-10 object-cover object-center rounded-full"
              />
            ) : (
              <UserCircle className="my-auto" />
            )}
            <div
              className={`text-sm flex flex-col justify-center leading-tight ml-2 max-md:hidden ${
                isOpenNavigation && "max-lg:md:hidden"
              }`}
            >
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
              <PowerIcon size={24} className="group-hover:text-primary" />
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
      {isNotificationWindowBoxOpen && (
        <div
          ref={notificationRef}
          className="absolute top-full right-0 md:-translate-x-32 max-w-[20rem] md:w-full max-md:left-1/3 h-[30rem] bg-white dark:bg-darkPrimary px-2 py-3 border border-zinc-400 flex flex-col"
        >
          <NotificationPopup closePopup={toggleNotificationWindowBox} />
        </div>
      )}
      {isSettingWindowBoxOpen && (
        <div
          ref={settingsRef}
          className="absolute top-full right-0 max-w-[20rem] w-full h-[30rem] bg-white dark:bg-darkPrimary p-3 border border-zinc-400"
        >
          <SettingsPopup
            {...{
              currentTheme,
              themeMode: theme,
              toggleTheme,
              handleThemeChange,
              user: session?.user,
            }}
            closePopup={toggleSettingWindowBox}
            toggleThemeMode={toggleTheme}
          />
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
