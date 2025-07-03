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

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const title =
    !session?.user.role || status !== "authenticated"
      ? "DashBoard"
      : useFormattedPathSegment(session?.user.role, pathname);
  useEffect(() => {
    document.title = `LearnTech | ${title}`;
  }, [pathname, router]);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (!session?.user && status === "unauthenticated") {
      setTimeout(() => {
        if (status === "unauthenticated") {
          redirect(
            pathname !== "/dashboard"
              ? `/login?callbackUrl=${encodeURIComponent(pathname)}`
              : "/login"
          );
        }
      }, 3000);
    }

    if (status === "authenticated" && session?.user._id) {
      console.log("🔄 Session detected. Checking Redux state...");
      console.log("type of user.session._id: ", typeof session.user._id);
      if (!user || user._id !== session.user._id) {
        console.log("🚀 Fetching user data from API...");
        dispatch(fetchUser(session.user._id));
      }
    }
  }, [session, user, dispatch]);

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
