"use client";

import Image from "next/image";
import { ChevronRight, Settings, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { pcBook2 } from "@assets";
import React, { FC, useState } from "react";
import { CourseDocument, DetailedCourseDocument } from "@lib/models/Course";
import { useRouter } from "next/navigation";
import { CourseDetailsSkeleton } from "@components/designs/Skeletons";
import GoBack from "@components/GoBack";
import PopupModal from "@components/designs/PopupModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { toggleCourseStatus } from "@redux/slices/coursesSlice";

interface Props {
  course: DetailedCourseDocument;
  close: () => void;
}

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
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPay, setAgreedToPay] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [issettingWindowOpen, SetIsSettingWindowOpen] = useState(false);
  const { data: session } = useSession();
  const [coursePublished, setCoursePublished] = useState(
    course?.status === "Published"
  );
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const dispatch = useDispatch();

  const hasPrice = course?.price && course.price > 0;

  const handleSendRequest = async () => {
    if (!course) return;
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions first.");
      return;
    }
    if (hasPrice && !agreedToPay) {
      alert("Please agree to pay the course fee.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus(null);

      const res = await fetch("/api/courses/join-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id,
          courseName: course.title,
          instructorId: course.instructor._id,
          instructorName: course.instructor.name,
          coursePrice: course.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitStatus(false);
        return;
      }

      setSubmitStatus(true);
      setTimeout(() => {
        close();
      }, 1500);
    } catch (err) {
      setSubmitStatus(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleCoursePublish = async () => {
    try {
      setIsUpdatingStatus(true);

      const res = await axios.patch(`/api/courses/${course?._id}`);

      if (res.status === 200) {
        setCoursePublished((prev) => !prev);
      }
      dispatch(toggleCourseStatus());
    } catch (error) {
      console.error("Error toggling course status:", error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  return (
    <>
      <div className="min-h-screen dark:text-gray-100 md:p-6 p-4">
        <GoBack />
        {!loading ? (
          <>
            <div className="max-w-4xl mx-auto bg-white dark:bg-opacityPrimary md:p-6 p-3 rounded-lg shadow-lg dark:border border-white/40">
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
                    className="px-3 py-1 bg-primary text-white rounded-full text-sm cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-lg font-semibold">
                Price:{" "}
                <span className="text-secondary">
                  {enrolled ? (
                    session?.user.role !== "instructor" ? (
                      "paid"
                    ) : (
                      <>${course?.price}</>
                    )
                  ) : (
                    <>${course?.price}</>
                  )}
                </span>
              </p>
              <p className="mt-2">
                Level: <span className="font-medium">{course?.level}</span>
              </p>
              <p>
                Status:{" "}
                <span className={`font-medium text-secondary`}>
                  {course?.status}
                </span>
              </p>
              <p>Category: {course?.category}</p>
              <p className="text-primary">Instructor</p>
              <Link
                href={course?.instructor._id ? course?.instructor._id : ""}
                className="flex items-center"
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
                    {session &&
                      course?.instructor._id === session?.user._id &&
                      " (You)"}
                  </p>
                  <p className="text-gray-600 dark:text-zinc-100 text-sm">
                    {course?.instructor.email}
                  </p>
                </div>
              </Link>
              <p>Language: {course?.language}</p>
              <p>Chapters: {course?.chapters}</p>
              {course?.status !== "Published" && (
                <p className="text-red-600 dark:text-red-400 text-sm w-full text-end mt-4">
                  Not Yet Published
                </p>
              )}
              <div
                className={`w-full flex pt-6 px-4 gap-2 ${
                  course?.instructor._id === session?.user._id || enrolled
                    ? "justify-between"
                    : "justify-end"
                }`}
              >
                {(course?.instructor._id === session?.user._id || enrolled) && (
                  <button
                    className="button bg-secondary text-white flex gap-2 items-center"
                    onClick={() => SetIsSettingWindowOpen(true)}
                  >
                    <Settings size={16} />
                    Setting
                  </button>
                )}
                <button
                  className="button bg-primary text-white flex gap-2 items-center disabled:bg-zinc-700/50"
                  disabled={
                    course?.instructor._id !== session?.user._id &&
                    course?.status !== "Published"
                  }
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
      {/* <SendJoinRequest
        course={course}
        close={() => }
      /> */}
      {course && isSendRequest && (
        <PopupModal onClose={() => setIsSendRequest(false)}>
          <h2 className="text-xl font-bold text-darkPrimary mb-2">
            Join Course: {course.title}
          </h2>
          <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
            To join this course, you must agree to the terms and possibly pay
            the course fee.
          </p>

          <div className="space-y-3 text-sm text-gray-800 dark:text-gray-300">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="mt-1"
              />
              <span>
                I agree that my enrollment is subject to instructor approval and
                verification of payment.
              </span>
            </label>

            {hasPrice && (
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToPay}
                  onChange={() => setAgreedToPay(!agreedToPay)}
                  className="mt-1"
                />
                <span>
                  I accept to pay the course fee of{" "}
                  <strong className="text-darkPrimary">
                    {course.price} RWF
                  </strong>
                  .
                </span>
              </label>
            )}
          </div>

          {hasPrice && agreedToPay && (
            <div className="mt-4 p-3 rounded-md bg-opacityPrimary dark:bg-darkPrimary/20 border border-lightPrimary dark:border-primary text-sm text-darkPrimary dark:text-primary">
              <p className="mb-1 font-semibold">Payment Instructions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Bank:</strong> Bank of Kigali, Account Number:{" "}
                  <code>123456789</code>
                </li>
                <li>
                  <strong>Mobile Money:</strong> MTN MoMo:{" "}
                  <code>0788 123 456</code>
                </li>
                <li>Use your full name as the payment reference.</li>
              </ul>
            </div>
          )}

          {!isSubmitting && submitStatus === false && (
            <p className="body-2 leadin-tight py-2 mt-6 px-4 text-red-500">
              Something went wrong, please try again later.
            </p>
          )}
          {!isSubmitting && submitStatus === true && (
            <p className="body-2 leadin-tight py-2 mt-6 px-4 text-darkPrimary">
              Join request sent successfully.
            </p>
          )}

          <button
            onClick={handleSendRequest}
            disabled={isSubmitting}
            className="w-full mt-6 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Join Request"}
          </button>
        </PopupModal>
      )}

      {issettingWindowOpen && (
        <PopupModal onClose={() => SetIsSettingWindowOpen(false)}>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-darkPrimary">
              Course Settings
            </h2>

            {session?.user.role === "instructor" ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  As the instructor, you can manage this course rollout and
                  content.
                </p>

                <div className="flex items-center justify-between">
                  <span>Course Status:</span>
                  <button
                    onClick={toggleCoursePublish}
                    disabled={isUpdatingStatus}
                    className={`px-4 py-1 rounded ${
                      coursePublished
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    } text-white text-sm`}
                  >
                    {isUpdatingStatus
                      ? "Updating..."
                      : coursePublished
                      ? "Unpublish"
                      : "Publish"}
                  </button>
                </div>

                <button
                  onClick={() =>
                    router.push(
                      `/dashboard/instructor/course/${course?._id}/manage`
                    )
                  }
                  className="button bg-primary text-white"
                >
                  Manage Course Content
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-200">
                  You are enrolled in this course. Here are your available
                  actions.
                </p>

                <button
                  onClick={() =>
                    alert("Feature not implemented: Track Progress")
                  }
                  className="button w-full bg-primary text-white"
                >
                  View Your Progress
                </button>

                <button
                  onClick={() => alert("Feature not implemented: Leave course")}
                  className="button w-full bg-red-500 text-white"
                >
                  Leave Course
                </button>
              </div>
            )}
          </div>
        </PopupModal>
      )}
    </>
  );
};

export default CourseDetails;
