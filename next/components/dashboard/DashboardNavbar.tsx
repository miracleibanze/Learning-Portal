"use client";

import { signOut, useSession } from "next-auth/react";
import {
  Bell,
  BellDot,
  ChevronLeft,
  Dot,
  Search,
  SidebarClose,
  SidebarOpen,
  UserCircle,
} from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import useFormattedPathSegment from "@features/useFormattedPathSegment";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import themePresets, { ThemeName } from "@lib/ThemePresets";
import { useDispatch, useSelector } from "react-redux";
import {
  setNavigationBackState,
  toggleNavigation,
} from "@redux/slices/navigationSlice";
import { AppDispatch, RootState } from "@redux/store";
import { updateUserField, updateUserInfo } from "@redux/slices/userSlice";
import SettingsPopup from "@components/dashboard/SettingPopup";
import NotificationPopup from "@components/dashboard/NotificationPopup";
import {
  addSystemNotification,
  silenceAllNotifications,
} from "@redux/slices/NotificationsSlice";
import Link from "next/link";

const DashboardNavbar: FC = () => {
  const pathname = usePathname();
  const router = useRouter();
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
    user?.preferredTheme
      ? user?.preferredTheme
      : session?.user.preferredTheme
      ? session?.user.preferredTheme
      : ""
  );

  const [currentTheme, setCurrentTheme] = useState(
    user?.preferredColorScheme || session?.user.preferredColorScheme || ""
  );
  const searchingRef = useRef<HTMLDivElement | null>(null);
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState(() =>
    session?.user.role && status === "authenticated"
      ? useFormattedPathSegment(session?.user.role, pathname)
      : ""
  );
  const [notificationToRead, setNotificationToRead] = useState<boolean>(false);
  const [searchingText, setSearchingText] = useState<string>("");
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

  const handleSearchSubmit = () => {
    if (searchingText.trim()) {
      router.push(
        `/iLearn/search?q=${encodeURIComponent(searchingText.trim())}`
      );
      setIsSearching(false);
    }
  };

  useEffect(() => {
    setTitle(() =>
      session?.user.role
        ? useFormattedPathSegment(session?.user.role, pathname)
        : ""
    );
  }, [pathname, status]);

  useEffect(() => {
    console.log("isSearching: ", isSearching);
  }, [isSearching]);

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
      if (
        isSearching &&
        searchingRef.current &&
        !searchingRef.current.contains(target)
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingWindowBoxOpen, isNotificationWindowBoxOpen, isSearching]);

  useEffect(() => {
    if (theme === "dark") {
      const root = document.documentElement;
      root.classList.add("dark");
      console.log("turning theme to dark");
    } else {
      const root = document.documentElement;
      root.classList.remove("dark");
      console.log("turning theme to light :", theme);
    }
    console.log(
      `user.theme : ${user?.preferredTheme} and session.user.theme: ${session?.user.preferredTheme}`
    );
  }, [theme, user]);

  useEffect(() => {
    if (!user?.preferredTheme) return;
    if (theme !== user?.preferredTheme) {
    }
  }, [user]);

  useEffect(() => {
    if (notifications.silent || isNotificationWindowBoxOpen) {
      setNotificationToRead(false);
    } else {
      setNotificationToRead(true);
    }
  }, [notifications.silent]);

  useEffect(() => {
    if (!user || !session?.user) return;
    console.log(
      `color : ${user?.preferredColorScheme} to ${session?.user.preferredColorScheme} \n theme : ${user?.preferredTheme} to ${session?.user.preferredTheme} \n SidebarBg: ${user.preferredSidebarBg}`
    );
    setTheme(user.preferredTheme);
    const needToSave =
      user?.preferredTheme !== session?.user?.preferredTheme ||
      user?.preferredColorScheme !== session?.user?.preferredColorScheme ||
      user.preferredSidebarBg !== session.user.preferredSidebarBg;
    setCurrentTheme(user.preferredColorScheme);
    if (needToSave) {
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
    dispatch(
      updateUserField({
        preferredTheme: theme === "light" ? "dark" : "light",
      })
    );
    setTheme((theme) => (theme === "light" ? "dark" : "light"));
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
        updateUserField({
          preferredColorScheme: theme,
        })
      );
    }
  };

  const handleCancelChanges = () => {
    dispatch(
      updateUserField({
        preferredTheme: session?.user.preferredTheme,
        preferredColorScheme: session?.user.preferredColorScheme,
        preferredSidebarBg: session?.user.preferredSidebarBg,
      })
    );
  };

  useEffect(() => {
    if (!user) return;
    if (currentTheme === user.preferredColorScheme)
      setCurrentTheme(user.preferredColorScheme);
  }, [document.documentElement.classList]);

  return (
    <nav className="w-full border-b border-zinc-300 dark:border-white/50 sticky top-0 z-50 shadow-md bg-white dark:bg-zinc-900">
      <div className="px-4 py-2 flex items-center justify-between">
        <div
          className={`flex items-center gap-2 capitalize cursor-pointer ${
            isSearching ? "max-sm:hidden" : ""
          }`}
          onClick={() => dispatch(toggleNavigation())}
        >
          {isOpenNavigation ? <SidebarOpen /> : <SidebarClose />}
          <span className="hidden md:inline-block">{title}</span>
        </div>
        {isSearching && (
          <div className="sm:hidden">
            <ChevronLeft />
          </div>
        )}
        <div
          ref={searchingRef}
          className="relative w-full max-w-md sm:mx-6 mx-3 max-md:flex-1 max-sm:mr-2"
        >
          <input
            type="search"
            value={searchingText}
            onChange={(e) => setSearchingText(e.target.value)}
            onFocus={() => setIsSearching(true)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
            placeholder="Search users, courses, etc."
            className={`w-full px-4 py-2 rounded-md border border-zinc-300 dark:border-white/30 bg-inherit text-sm ${
              !isSearching ? "max-sm:hidden" : ""
            }`}
          />
          <button
            className={`absolute sm:right-3 right-0 top-1/2 transform -translate-y-1/2 sm:text-zinc-500 ${
              isSearching ? "right-2" : ""
            }`}
            onClick={() => {
              handleSearchSubmit();
              handleSearchSubmit();
              setIsSearching((prev) => !prev);
            }}
          >
            <Search />
          </button>

          {isSearching && (
            <div
              className="absolute top-full left-0 right-0 bg-white dark:bg-zinc-900 shadow-lg border border-t-0 border-zinc-300 dark:border-zinc-600 rounded-b-md overflow-hidden z-10"
              onClick={() => setIsSearching(false)}
            >
              <Link
                href={`/iLearn/search?q=${encodeURIComponent(searchingText)}`}
                className="block px-4 py-2 bg-zinc-100 dark:bg-white/10 text-sm"
              >
                View all results for <strong>{searchingText}</strong>
              </Link>
              <p className="italic text-zinc-500 dark:text-white/50 text-xs border-b border-zinc-500 dark:border-white/50 w-full px-2 bg-zinc-100 dark:bg-white/10">
                Suggested
              </p>
              <Link
                href={`/iLearn/search?q=${encodeURIComponent(
                  searchingText
                )}&category=people`}
                className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm"
              >
                People: {searchingText}
              </Link>
              <Link
                href={`/iLearn/search?q=${encodeURIComponent(
                  searchingText
                )}&category=courses`}
                className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm"
              >
                Courses: {searchingText}
              </Link>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(
                  searchingText
                )}`}
                className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm"
                target="_blank"
              >
                Google: {searchingText}
              </a>
            </div>
          )}
        </div>

        <div
          className={`flex items-center gap-2 ${
            isSearching ? "max-sm:hidden" : ""
          }`}
        >
          <div
            className="relative cursor-pointer border-x px-2 h-10 flex items-center  border-zinc-400 dark:border-white/50"
            onClick={toggleNotificationWindowBox}
          >
            <Bell className={notificationToRead ? "animate-bell" : ""} />
            {notificationToRead && (
              <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-secondary rounded-full overflow-hidden">
                <div className="w-full h-full animate-pulse bg-lightPrimary" />
              </span>
            )}
          </div>

          <div
            className="cursor-pointer flex items-center gap-2 min-w-max"
            ref={settingsRef}
            onClick={toggleSettingWindowBox}
          >
            {session?.user.picture ? (
              <Image
                src={session.user.picture}
                alt="profile"
                height={40}
                width={40}
                className="w-10 h-10 object-cover rounded-full"
              />
            ) : (
              <UserCircle className="w-8 h-8" />
            )}
            <div className="hidden md:block text-sm">
              <p className="font-semibold leading-none">{session?.user.name}</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-300 flex-0">
                {session?.user.role}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isNotificationWindowBoxOpen && (
        <div
          ref={notificationRef}
          className="absolute max-[400px]:right-0 right-4 top-full w-80 max-[400px]:w-full bg-white dark:bg-darkPrimary border border-zinc-400 shadow-md rounded-md z-50 py-3 popupHeight overflow-y-auto overflow-x-hidden"
        >
          <NotificationPopup
            handleCancelChanges={() => setIsNotificationWindowBoxOpen(false)}
            closePopup={toggleNotificationWindowBox}
          />
        </div>
      )}

      {isSettingWindowBoxOpen && (
        <div
          ref={settingsRef}
          className="absolute right-0 top-full w-80 max-[400px]:w-full bg-white dark:bg-darkPrimary border border-zinc-400 shadow-md rounded-s-md z-50 py-3 popupHeight overflow-y-auto overflow-x-hidden"
        >
          <SettingsPopup
            {...{
              currentTheme,
              themeMode: theme,
              toggleTheme,
              handleThemeChange,
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
