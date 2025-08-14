"use client";

import {
  CheckCircle,
  ChevronUp,
  Settings2,
  Bell,
  ArrowUpRightFromSquare,
  Trash2,
  GanttChart,
} from "lucide-react";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn, useSession } from "next-auth/react";
import PopupModal from "@components/designs/PopupModal";
import { AppDispatch, RootState } from "@redux/store";
import {
  addGeneralNotification,
  clearAllNotifications,
  removeGeneralNotification,
  removeSystemNotification,
} from "@redux/slices/NotificationsSlice";
import Link from "next/link";
import { updateUserField, updateUserInfo } from "@redux/slices/userSlice";
import { User } from "next-auth";
import { UserType } from "@type/User";
// import {updateUserField} from '@redux/slices/userSlice'

interface NotificationPopupProps {
  closePopup: () => void;
  handleCancelChanges: () => void;
}

const NotificationPopup: FC<NotificationPopupProps> = ({
  handleCancelChanges,
  closePopup,
}) => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { system, general } = useSelector(
    (state: RootState) => state.notifications
  );
  const { user } = useSelector((state: RootState) => state.user);

  const [isConfirming, setIsConfirming] = useState<string>("");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const [openLinks, setOpenLinks] = useState<string>("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleComfirm = async () => {
    setIsSaving(true);
    if (!user) return;
    try {
      dispatch(
        updateUserInfo({
          preferredTheme: user.preferredTheme,
          preferredColorScheme: user.preferredColorScheme,
          preferredSidebarBg: user.preferredSidebarBg,
        })
      );
      const result = await signIn("credentials", {
        email: session?.user.email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        dispatch(removeSystemNotification(isConfirming));
        setIsConfirming("");
        setSaved(true);
      }
    } catch (error) {
      setError("Couldn't save at the moment, try again later!");
      console.log(error);
    } finally {
      setIsSaving(false);
    }
  };

  const simulateNotification = () => {
    dispatch(
      addGeneralNotification({
        message: `New message sfd sdfvsd fvdf vdfv dfvat ${new Date().toLocaleTimeString()}`,
      })
    );
  };

  useEffect(() => {
    if (saved) setTimeout(() => setSaved(false), 2000);
  }, [saved]);

  // const handleUserChange = ({
  //   theme,
  //   themeMode,
  // }: {
  //   theme: string;
  //   themeMode: string;
  // }) => {
  //   dispatch(
  //     updateUserField({
  //       preferredTheme: theme,
  //     })
  //   );
  // };

  // const handleThemeChange = (theme: string) => {
  //   const root = document.documentElement;
  //     dispatch(
  //       updateUserField({
  //         preferredColorScheme: theme,
  //       })
  //     );
  //   }
  // };

  return (
    <>
      <p className="body-1 font-semibold mb-4 px-3">Notifications</p>
      <div className="w-full flex-1 mb-4 overflow-y-auto scroll-design px-2">
        {/* System Notification Section */}
        <span className="text-xs text-zinc-700 dark:text-zinc-300 w-full border-b dark:border-zinc-300 border-zinc-700">
          System notification
        </span>
        {saved && system.length !== 0 && (
          <p className="text-green-600 text-sm py-1 text-center">
            Settings saved successfully.
          </p>
        )}

        {system.length === 0 ? (
          saved ? (
            <p className="text-green-600 text-sm py-1 text-center">
              Settings saved successfully.
            </p>
          ) : (
            <p className="w-full py-2 text-sm text-center">
              No system notification
            </p>
          )
        ) : (
          [...system]
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((item) => (
              <div
                className={`w-full ${
                  openLinks === item.id
                    ? "border border-zinc-300 dark:border-white/40 rounded"
                    : ""
                }`}
                key={item.id}
                onClick={() => setOpenLinks(item.id)}
              >
                <div className="w-full flex items-start justify-between gap-2 cursor-pointer py-2 hover:bg-zinc-200 dark:hover:bg-white/20 px-2 rounded">
                  <Settings2
                    size={20}
                    className="bg-zinc-300 dark:bg-white/30 rounded-full p-0.5 mt-0.5"
                  />
                  <p className="flex-1 leading-tight text-sm">{item.message}</p>
                </div>
                {openLinks === item.id && (
                  <div className="w-full px-2 py-1 bg-zinc-300 dark:bg-white/10 rounded-sm flex gap-2 justify-end">
                    {item.href && (
                      <Link href={item.href}>
                        <button
                          className="py-1 px-2 rounded bg-primary dark:bg-zinc-400 flex-center gap-1 text-white"
                          onClick={() => setOpenLinks("")}
                        >
                          <ArrowUpRightFromSquare /> Open
                        </button>
                      </Link>
                    )}
                    {item.tag && item.tag === "theme" ? (
                      <>
                        <button
                          onClick={() => setIsConfirming(item.id)}
                          className="px-3 py-1.5 rounded text-sm bg-secondary dark:bg-primary hover:scale-105 duration-300 transition"
                        >
                          Confirm
                        </button>
                        <button
                          className="py-1 px-2 rounded bg-red-600 dark:bg-red-400 flex-center text-white gap-1"
                          onClick={async () => {
                            dispatch(removeSystemNotification(item.id));
                            console.log(
                              `return to ${session?.user.preferredTheme} and ${session?.user.preferredColorScheme} `
                            );
                            handleCancelChanges();
                            setOpenLinks("");
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        className="py-1 px-2 rounded bg-red-600 dark:bg-red-400 flex-center text-white gap-1"
                        onClick={() => {
                          dispatch(removeSystemNotification(item.id));
                          setOpenLinks("");
                        }}
                      >
                        <Trash2 size={12} /> remove
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))
        )}

        {/* Divider */}
        <span className="text-xs text-zinc-700 dark:text-zinc-300 w-full border-b dark:border-zinc-300 border-zinc-700 my-2">
          Other notifications
        </span>

        {/* Other Notifications */}
        {general.length === 0 ? (
          <p className="w-full py-2 text-sm text-center">
            No notifications yet
          </p>
        ) : (
          <ul className="text-sm space-y-2 mt-2">
            {[...general]
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((note) => {
                return (
                  <li
                    key={note.id}
                    className={`bg-white/80 dark:bg-white/10 rounded ${
                      openLinks === note.id
                        ? "border border-zinc-300 dark:border-white/40"
                        : ""
                    } hover:bg-zinc-200 dark:hover:bg-white/20 rounded`}
                    onClick={() => setOpenLinks(note.id)}
                  >
                    <div className="w-full flex items-center justify-between gap-2 cursor-pointer px-2 py-1">
                      <div className="flex-0 flex items-start gap-2">
                        <div className="flex-0">
                          <Bell
                            size={18}
                            className="bg-zinc-300 dark:bg-white/30 rounded-full p-0.5 mt-0.5"
                          />
                        </div>
                        <p className="flex-1">{note.message}</p>
                      </div>
                    </div>
                    {openLinks === note.id && (
                      <div className="w-full px-2 py-1 bg-zinc-300 dark:bg-white/10 rounded-sm flex gap-2 justify-end">
                        {note.href && (
                          <Link href={note.href}>
                            <button
                              className="py-1 px-2 rounded bg-primary dark:bg-zinc-400 flex-center gap-1 text-white"
                              onClick={() => setOpenLinks("")}
                            >
                              <ArrowUpRightFromSquare /> Open
                            </button>
                          </Link>
                        )}
                        <button
                          className="py-1 px-2 rounded bg-red-600 dark:bg-red-400 flex-center text-white gap-1"
                          onClick={() => {
                            dispatch(removeGeneralNotification(note.id));
                            setOpenLinks("");
                          }}
                        >
                          <Trash2 size={12} /> remove
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
          </ul>
        )}

        {/* Simulate a Notification (for demo/testing) */}
        <div className="w-full mt-4 flex justify-center">
          <button
            onClick={simulateNotification}
            className="px-3 py-1.5 rounded text-sm bg-sky-500 text-white hover:bg-sky-600 transition"
          >
            Add Notification
          </button>
        </div>
        <div className="w-full flex flex-row-reverse justify-between items-center py-6 px-4">
          {(system.length > 0 || general.length > 0) && (
            <button
              className="text-[12px] flex items-center font-normal cursor-pointer bg-zinc-300 dark:bg-white/20 py-1 px-3 rounded-full"
              onClick={() => {
                dispatch(clearAllNotifications());
                closePopup();
              }}
            >
              Clear All <GanttChart size={16} />{" "}
            </button>
          )}
          <button
            className="text-[12px] flex items-center font-normal cursor-pointer bg-zinc-300 dark:bg-white/20 py-1 px-3 rounded-full"
            onClick={() => {
              dispatch(clearAllNotifications());
              closePopup();
            }}
          >
            Notification Setting
          </button>
        </div>
      </div>

      {/* Confirm Modal */}
      {isConfirming !== "" && (
        <PopupModal onClose={() => setIsConfirming("")}>
          <p className="relative body-2 mt-4">
            To continue confirming changes, please{" "}
            <strong>enter your password</strong> below.
          </p>
          {error && (
            <p className="relative text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <div>
            <label className="block text-sm mb-1 font-medium">Password :</label>
            <input
              type="password"
              placeholder="Your password"
              className="w-full dark:bg-opacityPrimary border p-2 rounded"
              value={password}
              onChange={(e) => {
                if (error !== "") setError("");
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleComfirm()}
              required
            />
          </div>
          <div className="w-full flex justify-end px-2 my-3">
            <button
              onClick={handleComfirm}
              className="px-3 py-1.5 rounded text-sm bg-primary text-white hover:scale-105 duration-300 transition"
            >
              {!isSaving ? "Confirm" : "Wait..."}
            </button>
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default NotificationPopup;
