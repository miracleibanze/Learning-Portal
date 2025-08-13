"use client";

import DashboardNavbar from "@components/dashboard/DashboardNavbar";
import "../globals.css";
import useFormattedPathSegment from "@features/useFormattedPathSegment";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchUser } from "@redux/slices/userSlice";
import Loading from "@app/loading";
import themePresets, { ThemeName } from "@lib/ThemePresets";
import SocketJoiner from "@components/dashboard/SocketJoiner";
import {
  addGeneralNotification,
  addUnreadMessage,
} from "@redux/slices/NotificationsSlice";
import { connectSocket, getSocket } from "@lib/socket";
import { MessageType } from "@type/MessageType";
import PathWatcher from "@features/PathWatcher";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const { unreadMessages } = useSelector(
    (state: RootState) => state.notifications
  );

  const title =
    !session?.user.role || status !== "authenticated"
      ? "iLearn"
      : useFormattedPathSegment(session?.user.role, pathname);

  // Update document title
  useEffect(() => {
    document.title = `LearnTech | ${title}`;
  }, [pathname, router]);

  // Handle authentication + fetch user
  useEffect(() => {
    if (!session?.user && status === "unauthenticated") {
      setTimeout(() => {
        redirect(
          pathname !== "/iLearn"
            ? `/login?callbackUrl=${encodeURIComponent(pathname)}`
            : "/login"
        );
      }, 3000);
    }

    if (status === "authenticated" && session?.user._id) {
      if (!user || user._id !== session.user._id) {
        dispatch(fetchUser(session.user._id));
      }
    }
  }, [session, user, dispatch]);

  // ✅ Apply theme colors
  useEffect(() => {
    const preferred = session?.user ? session.user.preferredColorScheme : "sky";
    console.log("preferred theme: ", preferred);
    const theme = themePresets[preferred as ThemeName];
    if (theme) {
      const root = document.documentElement;
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [session?.user, session?.user?.preferredColorScheme]);

  useEffect(() => {
    if (session?.user.role === "admin") return;
    connectSocket();
    const socket = getSocket();
    if (!socket) return;

    const handleMessage = (msg: MessageType) => {
      if (pathname !== "/iLearn/discussions")
        dispatch(addUnreadMessage(msg.courseId));
    };

    socket.on("messageReceived", handleMessage);

    return () => {
      socket.off("messageReceived", handleMessage);
    };
  }, [session?.user._id]);

  useEffect(() => {
    if (session?.user.role === "admin") return;
    if (unreadMessages.length > 0) {
      setTimeout(() => {
        if (unreadMessages.length > 0)
          dispatch(
            addGeneralNotification({
              message:
                "You have unread messages in the discussion section of courses.",
              href: "/iLearn/discussions",
              tag: "unreadMessages",
            })
          );
      }, 500);
    }
  }, [unreadMessages]);

  if (status === "loading") return <Loading />;

  return (
    <>
      {session?.user.role === "admin" && (
        <>
          <SocketJoiner />
          <PathWatcher />
        </>
      )}
      <DashboardNavbar />
      <div className="px-4 flex flex-col w-full flex-1">{children}</div>
    </>
  );
}
