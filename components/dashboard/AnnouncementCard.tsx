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
  const { announcements } = useSelector(
    (state: RootState) => state.announcements
  );
  const announcement = announcements.find((item) => item._id === id);
  const session = useSession().data;
  const [instructor, setInstructor] = useState<InstructorType | null | User>(
    null
  );

  useEffect(() => {
    const handleSender = async ({
      id,
      announcementId,
    }: {
      id?: string;
      announcementId: string;
    }) => {
      const response = await axios.post(`/api/announcements/details`, {
        id,
        announcementId,
      });
      if (id === "00000") return;
      setInstructor(response.data);
    };
    if (announcement && announcement._id) {
      handleSender({
        id: announcement.courseInfo[0]
          ? announcement?.courseInfo[0].instructor
          : "00000",
        announcementId: announcement._id,
      });
    }
  }, [announcement]);

  if (!announcement) {
    return (
      <div className="absolute inset-0 bg-black/90 z-30 flex items-center justify-center">
        <Loader className="text-white w-6 h-6 animate-spin" />
      </div>
    );
  }

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
        <div className="mx-auto lg:max-w-[42rem] bg-zinc-200 dark:bg-gray-900 dark:border border-white/50 rounded-md p-6">
          {JSON.stringify(announcement)}
          <h3 className="h3 font-bold text-sky-700 dark:text-sky-400 mb-3">
            {announcement.courseId.toString() !== "all" &&
            announcement.courseInfo.length > 0
              ? announcement.courseInfo[0].title
              : "General Announcement!"}
          </h3>

          {/* Course Description */}
          <p className="body-2 text-gray-700 dark:text-gray-300 mb-3">
            {announcement.courseId.toString() !== "all" &&
            announcement.courseInfo.length > 0
              ? announcement.courseInfo[0].description
              : "Anyone, regardless of subject pursued, must follow the announcement below."}
          </p>

          {announcement.courseId.toString() !== "all" &&
            announcement.courseInfo.length > 0 && (
              <span className="inline-block bg-sky-600 text-white text-xs font-bold px-3 py-1 rounded-md mb-4">
                {announcement.courseInfo[0].category}
              </span>
            )}

          {/* Announcement content */}
          <div className="w-full min-h-16 border border-black/60 dark:border-white/40 p-4 mt-3 rounded-md bg-white/70 dark:bg-zinc-800 relative">
            <h5 className="h5 font-semibold text-yellow-700 dark:text-yellow-400 border-b border-yellow-600 pb-1 mb-2">
              {announcement.title}
            </h5>
            <p className="body-2 text-gray-800 dark:text-gray-200">
              {announcement.description}
            </p>
          </div>

          {/* Author Info */}
          <div className="mt-6 flex items-center gap-4 border-t border-gray-300 dark:border-white/30 pt-4">
            {announcement.createdBy !== "admin" ? (
              instructor ? (
                <Link
                  href={`/Person/${instructor._id}`}
                  className="flex items-center gap-4 group"
                >
                  {instructor.picture ? (
                    <Image
                      src={instructor.picture}
                      alt="instructor"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  ) : (
                    <User2 className="w-16 h-16 bg-zinc-300 rounded-full text-white p-2" />
                  )}
                  <div>
                    <p className="font-semibold group-hover:underline text-sm">
                      {instructor.name}{" "}
                      {session?.user._id === instructor._id && "(You)"}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {instructor.email}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse" />
                  <div className="space-y-2">
                    <div className="w-28 h-4 rounded-full bg-gray-300 animate-pulse" />
                    <div className="w-40 h-4 rounded-full bg-gray-300 animate-pulse" />
                  </div>
                </div>
              )
            ) : (
              <Link
                href="/dashboard/about"
                className="flex items-center gap-4 group"
              >
                <Image
                  src="/logoSquare.png"
                  alt="IMBONI Learn"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover border"
                />
                <div>
                  <p className="font-semibold group-hover:underline text-sm">
                    IMBONI Learn
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Your #1 learning partner
                  </p>
                </div>
              </Link>
            )}
            <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <i className="fa fa-clock" />{" "}
              {new Date(announcement.createdAt).toLocaleString()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Link
              href={
                announcement.courseId.toString() === "all"
                  ? "/dashboard/my-courses"
                  : `/dashboard/my-courses/${announcement.courseId}`
              }
            >
              <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded">
                Continue
              </button>
            </Link>
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
              onClick={() => close()}
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AnnouncementCard;
