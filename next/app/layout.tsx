"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@components/Navbar"), {
  loading: () => (
    <div className="py-1 px-3">
      <div
        className={`w-full h-6 dark:bg-white/50 rounded-md bg-zinc-300 mt-2 skeleton-shimmer`}
      />
    </div>
  ),
});

const Sidebar = dynamic(() => import("@components/Sidebar"), {
  loading: () => (
    <div className="w-full bg-lightPrimary dark:bg-darkPrimary text-white h-screen py-4 flex flex-col justify-between dark:border-r border-white/50 transition-all duration-300 ease-in-out absolute sm:relative z-[999] max-w-56 max-md:hidden">
      Loading...
    </div>
  ),
});

import { Provider } from "react-redux";
import { store } from "@redux/store";
import { SessionProvider, useSession } from "next-auth/react";
import Loading from "@app/loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import {
  navbarBackType,
  setNavigationBackState,
  setNavigationState,
  toggleNavigation,
} from "@redux/slices/navigationSlice";
import getLinks from "@features/SidebarLinks";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
      </head>
      <body className="text-black/90 dark:text-zinc-200 dark:bg-black w-full mx-auto lg:max-w-screen-2xl">
        <Provider store={store}>
          <SessionProvider>
            <MainLayout>{children}</MainLayout>
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}

function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isOpenNavigation, navbarBack, notification } = useSelector(
    (state: RootState) => state.navigation
  );
  const { coursesToEnroll, myCourses } = useSelector(
    (state: RootState) => state.courses
  );

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session Data:", session);
    console.log("Pathname:", pathname);
    const supportedLinksForBack = [
      /^\/dashboard\/my-courses\/[0-9a-fA-F]{24}$/,
      /^\/dashboard\/enroll\/[0-9a-fA-F]{24}$/,
      /^\/dashboard\/course\/[0-9a-fA-F]{24}$/,
    ];
    const startingLinksForBack = ["/dashboard/my-courses/study"];

    const isSupported =
      supportedLinksForBack.some((pattern) => pattern.test(pathname)) ||
      startingLinksForBack.some((link) => pathname.startsWith(link));

    const object: navbarBackType = {
      state: isSupported,
      title: "",
      url: "",
      list: [],
    };
    if (isSupported) {
      const matchedLinks = getLinks({ role: session?.user.role }).filter(
        (link) => {
          if (pathname.startsWith(link.path) && link.path !== "/dashboard")
            return link;
        }
      );

      if (matchedLinks.length > 0) {
        const matchedLink = matchedLinks[0];
        console.log(matchedLink);
        if (matchedLink.path === "/dashboard/enroll") {
          object.title = matchedLink.name;
          object.url = matchedLink.path;
          object.list = coursesToEnroll.data.map((item) => ({
            url: item._id as string,
            name: item.title as string,
          }));
        } else if (matchedLink.path === "/dashboard/my-courses") {
          object.title = matchedLink.name;
          object.url = matchedLink.path;
          object.list = myCourses.data.map((item) => ({
            url: encodeURIComponent(item.title) + "/" + item._id,
            name: item.title as string,
          }));
        } else if (matchedLink.path === "/dashboard/my-courses/study") {
          object.title = matchedLink.name;
          object.url = matchedLink.path;
          object.list = myCourses.data.map((item) => ({
            url: encodeURIComponent(item.title) + "/" + item._id,
            name: item.title as string,
          }));
        }
      }
      console.log(object);
    }
    dispatch(setNavigationBackState(object));
  }, [session, pathname, coursesToEnroll.data, myCourses.data, dispatch]);

  const navbarPaths = [
    "/",
    "/challenges&Hackathons",
    "/about",
    "/contact",
    "/education-institutions",
  ];
  const showNavbar = navbarPaths.includes(pathname);
  const showSidebar = pathname.startsWith("/dashboard");

  const handleToggleSidebar = () => {
    dispatch(toggleNavigation());
  };

  const handleLinkClick = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      dispatch(setNavigationState(false));
    }
  };

  return (
    <div className={`w-full dark:bg-zinc-900/90 bg-zinc-100 flex`}>
      {showNavbar && <Navbar user={session?.user?.name} />}
      {showSidebar && isOpenNavigation && (
        <Sidebar
          user={session?.user}
          {...{
            status,
            isOpenNavigation,
            handleToggleSidebar,
            handleLinkClick,
            navbarBack,
          }}
        />
      )}
      <div
        className={`flex-1 relative h-full flex flex-col w-full overflow-x-hidden ${
          !showSidebar ? "min-h-full" : "min-h-screen"
        }`}
      >
        {children}
      </div>
      {/* {notification.state && <Notification />} */}
    </div>
  );
}
