"use client";

import { FC, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  Moon,
  Sun,
  LogOut,
  Palette,
  Shield,
  ChevronUp,
  Settings,
  UserIcon,
  UserSquare2,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import themePresets, { ThemeName } from "@lib/ThemePresets";
import { useDispatch, useSelector } from "react-redux";
import { updateUserField } from "@redux/slices/userSlice";
import { User } from "next-auth";
import Image from "next/image";
import { AppDispatch, RootState } from "@redux/store";
import { SideBarBackgounds } from "@features/constants";

interface Props {
  currentTheme: string;
  themeMode: string;
  toggleThemeMode: () => void;
  handleThemeChange: (theme: string) => void;
  closePopup: () => void;
}

const SettingsPopup: FC<Props> = ({
  currentTheme,
  themeMode,
  toggleThemeMode,
  handleThemeChange,
  closePopup,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { data: session } = useSession();
  const router = useRouter();
  const [isChoosingSidebarBg, setIsChoosingSidebarBg] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("🚨 Error during logout:", error);
    } finally {
      closePopup();
    }
  };

  const handlePreferredTheme = (theme: ThemeName) => {
    handleThemeChange(theme);
    // dispatch(updateUserField({ preferredTheme: theme }));
  };

  const handleChooseSidebarBg = (code: string) => {
    dispatch(
      updateUserField({
        preferredSidebarBg: code,
      })
    );
  };

  return (
    <>
      <div className="w-full relative flex gap-2 px-3">
        {session?.user && session?.user.picture ? (
          <Image
            src={session?.user.picture}
            width={200}
            height={200}
            alt="profile"
            className="w-[5rem] h-[6rem] object-cover"
          />
        ) : (
          <UserSquare2 className="w-[5rem] h-[6rem] " />
        )}
        <div className="w-full flex-1 p-2 leading-tight">
          <div className="body-2 font-semibold leading-tight">
            {session?.user ? session?.user.name : "Loading..."}
          </div>
          <div className="body-2">{session?.user && session?.user.email}</div>
          <button className="button text-[12px] rounded-lg bg-lightPrimary text-white px-2 !py-1">
            {session?.user && session?.user.role}
          </button>
        </div>
      </div>

      <div className="w-full flex-1 mb-6 pb-[4rem] overflow-y-auto scroll-design px-3">
        <div className="border-t border-zinc-300 dark:border-white/20 py-1 mt-2 flex items-center justify-between dark:text-white">
          <span className="font-semibold text-sm">Dark Mode</span>
          <button
            onClick={toggleThemeMode}
            className="p-1.5 rounded-full bg-zinc-100 dark:bg-zinc-700"
            aria-label="Toggle dark mode"
          >
            {themeMode === "light" ? <Moon /> : <Sun />}
          </button>
        </div>
        <div className="border-t border-zinc-300 dark:border-white/20 space-y-2 mb-2 pt-2">
          <span className="font-semibold text-sm">Color Scheme</span>
          <div className="flex gap-2">
            {Object.keys(themePresets).map((themeKey) => (
              <button
                key={themeKey}
                onClick={() => handlePreferredTheme(themeKey as ThemeName)}
                className={`h-7 w-7 rounded-full font-bold border-2 text-white flex-center`}
                style={{
                  backgroundColor:
                    themePresets[themeKey as ThemeName]["--color-primary"],
                }}
              >
                {currentTheme === themeKey && <Check size={18} />}
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-zinc-300 dark:border-white/20 space-y-2 mb-2 pt-3">
          <div className="font-semibold text-sm">Sidebar Background</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {SideBarBackgounds.map((element, index) => {
              const isSelected = user?.preferredSidebarBg === element.code;
              return (
                <div
                  key={element.name + index}
                  className={`relative rounded-lg overflow-hidden cursor-pointer ring-2 transition-all duration-200 ${
                    isSelected
                      ? "ring-primary scale-105"
                      : "ring-transparent hover:ring-gray-400"
                  }`}
                  onClick={() => handleChooseSidebarBg(element.code)}
                >
                  <Image
                    src={element.image}
                    alt={element.name}
                    className="w-full h-24 object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm font-semibold opacity-0 hover:opacity-100 transition">
                    {element.name}
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {user?.preferredSidebarBg && (
            <button
              onClick={() => handleChooseSidebarBg("")}
              className="mt-2 px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800 transition"
            >
              Reset Sidebar Background
            </button>
          )}
        </div>

        <div className="border-t border-zinc-300 dark:border-white/20 pt-3">
          <button
            onClick={() => {
              router.push("/iLearn/profile");
              closePopup();
            }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-left text-sm"
          >
            <UserIcon size={18} /> View Profile
          </button>
          <button
            onClick={() => {
              router.push("/iLearn/security");
              closePopup();
            }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-left text-sm"
          >
            <Shield size={18} /> Security & Privacy
          </button>
          <button
            onClick={() => {
              router.push("/iLearn/security");
              closePopup();
            }}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-left text-sm"
          >
            <Settings size={18} /> General Setting
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 p-2 rounded hover:bg-red-100 dark:hover:bg-red-900 text-left text-sm text-red-600 dark:text-red-400"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsPopup;
