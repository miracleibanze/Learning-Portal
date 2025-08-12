"use client";

import DashboardNavbar from "@components/dashboard/DashboardNavbar";
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

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  const title =
    !session?.user.role || status !== "authenticated"
      ? "Instructor"
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
        dispatch(fetchUser());
      }
    }
  }, [session, user, dispatch]);

  return <>{children}</>;
}
