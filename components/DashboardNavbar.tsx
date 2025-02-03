"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Make sure this path is correct
import { FC, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Umuravalogo } from "@public";
import Link from "next/link";

const DashboardNavbar: FC = () => {
  const pathname = usePathname();

  const { user, status, error } = useSelector((state: RootState) => state.user); // Accessing user data
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <>
      <div
        className={`w-full flex justify-between items-center gap-2 py-2 px-4 z-[100] bg-white ${
          pathname.startsWith("/dashboard/setting") && "hidden"
        }`}
      >
        {!isSearching && (
          <Image
            src={Umuravalogo}
            alt="profile img"
            width={100}
            height={32}
            className="sm:hidden w-auto object-cover mr-4"
          />
        )}
        <div className="sm:hidden">
          {isSearching && (
            <i
              className={`fas fa-arrow-left bg-zinc-100 p-2 rounded-full flex-0 w-8`}
              onClick={() => setIsSearching(false)}
            ></i>
          )}
        </div>
        <div className="flex w-full lg:max-w-lg max-w-md h-8 gap-2 ">
          <div
            className="w-full md:max-w-md max-w-sm bg-zinc-100/60 rounded-md py-1.5 px-3 flex-1 min-h-full flex items-center max-sm:ml-auto"
            onClick={() => setIsSearching(true)}
          >
            {!isSearching && <i className="fas fa-search text-zinc-400"></i>}
            <input
              type="text"
              className="bg-transparent text-sm px-3 flex-1 w-full outline-none"
              placeholder="Search here..."
            />
          </div>

          {isSearching && (
            <button className="h-8 px-4 rounded-md bg-zinc-100">
              <i
                className={`fas fa-search bg-zinc-100 p-2 rounded-full flex-0 w-8`}
                onClick={() => setIsSearching(false)}
              ></i>
            </button>
          )}
        </div>
        <div
          className={`flex gap-3 items-center ${
            isSearching && "max-sm:hidden"
          }`}
        >
          <Link href="/dashboard/notification">
            <span className=" bg-zinc-100 p-2 rounded-full flex-0 w-8 h-8">
              <i className={`far fa-bell`}></i>
            </span>
          </Link>

          <Link href="/dashboard/profile" className="w-max max-sm:hidden">
            {user?.profile?.image ? (
              <Image
                src={user.profile.image}
                alt="profile img"
                width={32}
                height={32}
                className="w-8 aspect-square object-cover flex-0 rounded-full"
              />
            ) : (
              <i className="far fa-user bg-zinc-100 p-2 rounded-full flex-0 w-8"></i>
            )}
          </Link>
        </div>
      </div>
      {isSearching && <div className="sm:hidden fixed bg-zinc-100"></div>}
    </>
  );
};

export default DashboardNavbar;
