"use client";

import Image from "next/image";
import { ChevronRight, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { pcBook2 } from "@assets";
import React, { FC, useState } from "react";
import { CourseDocument, DetailedCourseDocument } from "@lib/models/Course";
import { useRouter } from "next/navigation";
import { CourseDetailsSkeleton } from "@components/designs/Skeletons";
import GoBack from "@components/GoBack";
import SendJoinRequest from "@components/dashboard/SendJoinRequest";

interface CourseDetailsProps {
  course: DetailedCourseDocument | null;
  loading: boolean;
  enrolled: boolean;
}

const CourseDetails: FC<CourseDetailsProps> = ({
  course,
  loading,
  enrolled,
}) => {
  const router = useRouter();
  const [isSendRequest, setIsSendRequest] = useState<boolean>(false);
  return (
    <>
      <div className="min-h-screen text-gray-900 dark:text-gray-100 md:p-6 p-4">
        <GoBack />
        {!loading ? (
          <>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 md:p-6 p-3 rounded-lg shadow-lg dark:border border-white/40">
              <div className="mb-4">
                <Image
                  src={pcBook2 || course?.thumbnail}
                  alt={course?.title || ""}
                  width={200}
                  height={150}
                  className="w-full md:h-72 h-52 object-cover rounded-lg shadow-md"
                />
              </div>

              <h1 className="text-3xl font-bold">{course?.title}</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {course?.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {course?.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-lg font-semibold">
                Price:{" "}
                <span className="text-green-500">
                  {enrolled ? "paid" : <>${course?.price}</>}
                </span>
              </p>
              <p className="mt-2">
                Level: <span className="font-medium">{course?.level}</span>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`font-medium ${
                    course?.status === "Draft"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >
                  {course?.status}
                </span>
              </p>
              <p>Category: {course?.category}</p>
              <Link
                href={course?.instructor._id ? course?.instructor._id : ""}
                className="flex items-center mt-4"
              >
                {course?.instructor?.picture ? (
                  <Image
                    src={course?.instructor?.picture}
                    alt={course?.instructor?.name}
                    width={40}
                    height={40}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <UserCircle2Icon className="w-12 h-12 rounded-full" />
                )}
                <div className="ml-3">
                  <p className="text-gray-800 dark:text-zinc-200 font-semibold">
                    {course?.instructor.name}
                  </p>
                  <p className="text-gray-600 dark:text-zinc-100 text-sm">
                    {course?.instructor.email}
                  </p>
                </div>
              </Link>
              <p>Language: {course?.language}</p>
              <p>Chapters: {course?.chapters}</p>
              <div className="w-full flex justify-end pt-6 px-4">
                <button
                  className="button bg-blue-600 text-white flex gap-2 items-center"
                  onClick={() =>
                    enrolled
                      ? router.push(
                          course
                            ? `/dashboard/my-courses/study/${encodeURIComponent(
                                course.title
                              )}/${course?._id}`
                            : ""
                        )
                      : setIsSendRequest(true)
                  }
                >
                  {enrolled ? "Continue" : "Join Course"} <ChevronRight />
                </button>
              </div>
            </div>
          </>
        ) : (
          <CourseDetailsSkeleton />
        )}
      </div>
      {course && isSendRequest && (
        <SendJoinRequest
          course={course}
          close={() => setIsSendRequest(false)}
        />
      )}
    </>
  );
};

export default CourseDetails;
