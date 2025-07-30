import { FC } from "react";
import { signOut } from "next-auth/react";
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
} from "lucide-react";
import { useRouter } from "next/navigation";
import themePresets, { ThemeName } from "@lib/ThemePresets";
import { useDispatch } from "react-redux";
import { updateUserField } from "@redux/slices/userSlice";
import { User } from "next-auth";
import Image from "next/image";

interface Props {
  currentTheme: string;
  themeMode: string;
  user?: User;
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
  user,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

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
    dispatch(updateUserField({ preferredTheme: theme }));
  };

  return (
    <>
      <div className="w-full relative flex gap-2">
        {user && user.picture ? (
          <Image
            src={user.picture}
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
            {user ? user.name : "Loading..."}
          </div>
          <div className="body-2">{user && user.email}</div>
          <button className="text-[12px] rounded-lg bg-lightPrimary text-white px-2">
            {user && user.role}
          </button>
        </div>
      </div>
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

      <div className="border-t border-zinc-300 dark:border-white/20 space-y-2 mb-2">
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

      <div className="border-t border-zinc-300 dark:border-white/20 pt-3">
        <button
          onClick={() => {
            router.push("/dashboard/profile");
            closePopup();
          }}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-left text-sm"
        >
          <UserIcon size={18} /> View Profile
        </button>
        <button
          onClick={() => {
            router.push("/dashboard/security");
            closePopup();
          }}
          className="w-full flex items-center gap-2 p-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 text-left text-sm"
        >
          <Shield size={18} /> Security & Privacy
        </button>
        <button
          onClick={() => {
            router.push("/dashboard/security");
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
      <div
        className="w-full p-3 text-darkPrimary dark:text-white cursor-pointer absolute bottom-0 text-center flex justify-center shadow-md"
        onClick={closePopup}
      >
        <ChevronUp />
      </div>
    </>
  );
};

export default SettingsPopup;
