"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { pcBook2 } from "@assets";
import React, { FC } from "react";
import { CourseDocument } from "@lib/models/Course";
import { useRouter } from "next/navigation";
import { CourseDetailsSkeleton } from "@components/designs/Skeletons";

interface CourseDetailsProps {
  course: CourseDocument | null;
  loading: boolean;
  enrolled: boolean;
  isOpenNavigation: boolean;
}

const CourseDetails: FC<CourseDetailsProps> = ({
  course,
  loading,
  enrolled,
  isOpenNavigation,
}) => {
  const router = useRouter();
  return (
    <>
      <div className="min-h-screen text-gray-900 dark:text-gray-100 p-6">
        {!isOpenNavigation && (
          <button
            className="button bg-zinc-300 py-2 px-4 rounded-lg dark:bg-white/30 mb-5 flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft /> Back
          </button>
        )}
        {!loading ? (
          <>
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:border border-white/40">
              <div className="mb-4">
                <Image
                  src={pcBook2 || course?.thumbnail}
                  alt={course?.title || ""}
                  width={200}
                  height={150}
                  className="w-full h-72 object-cover rounded-lg shadow-md"
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
                  <p className="text-gray-800 font-semibold">
                    {course?.instructor?.name}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {course?.instructor?.email}
                  </p>
                </div>
              </Link>
              <p>Language: {course?.language}</p>
              <p>Chapters: {course?.chapters}</p>
              <div className="w-full flex justify-end pt-6 px-4">
                <Link
                  href={
                    enrolled
                      ? `/dashboard/my-courses/study/${course?.title}/${course?._id}`
                      : `/dashboard/enroll/register/${course?.title}/${course?._id}`
                  }
                >
                  <button className="button bg-blue-600 text-white flex gap-2 items-center">
                    {enrolled ? "Start learning" : "Join Course"} <ArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <CourseDetailsSkeleton />
        )}
      </div>
    </>
  );
};

export default CourseDetails;
