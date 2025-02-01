import "../globals.css";
import DashboardNavbar from "@components/DashboardNavbar";

export const metadata = {
  title: "Dashboard",
  description: "Umurava platform",
};

export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
