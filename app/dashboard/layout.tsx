"use client";

import "../globals.css";
import DashboardNavbar from "@components/DashboardNavbar";
import { usePathname } from "@node_modules/next/navigation";

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showNavbar =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/challenges&hackathons") ||
    pathname.startsWith("/dashboard/community");
  return (
    <>
      {showNavbar && <DashboardNavbar />}
      {children}
    </>
  );
}
