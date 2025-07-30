"use client";

import { Loader, User2, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { FC, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { User } from "next-auth";

interface InstructorType {
  _id: string;
  name: string;
  role: string;
  email: string;
  picture: string;
}

const AnnouncementCard: FC<{
  id: string;
  gotIt: () => void;
  close: () => void;
}> = ({ id, gotIt, close }) => {
  
  return (
    <main className="absolute inset-0 bg-black/90 z-30 overflow-auto">
      <div className="relative w-full pt-28 px-4 pb-16">
        {/* Close Icon */}
        <button
          className="absolute top-6 right-6 text-white hover:text-red-400"
          onClick={close}
          aria-label="Close"
        >
          <X className="w-7 h-7" />
        </button>

        {/* Card */}
        <div className="mx-auto lg:max-w-[42rem] bg-zinc-200 dark:bg-darkPrimary dark:border border-white/50 rounded-md p-6">
          
        </div>
      </div>
    </main>
  );
};

export default AnnouncementCard;
