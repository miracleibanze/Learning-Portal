"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchAnnouncements } from "@redux/slices/announcementsSlice";
import { fetchTop4Courses } from "@redux/slices/coursesSlice";
import AssignmentDetailModal from "@components/dashboard/AssignmentDetail";
import { EyeIcon, Loader, PlusIcon, User2 } from "lucide-react";
import Link from "next/link";
import CourseCard from "@components/CourseCard";
import {
  CourseCardSkeleton,
  LineSkeleton,
} from "@components/designs/Skeletons";
import {
  fetchCreatedAssignments,
  MutableAssignment,
} from "@redux/slices/assignmentsSlice";
import axios from "@node_modules/axios";
import { instructorType } from "@lib/models/Course";
import { User } from "next-auth";
import PopupModal from "@components/designs/PopupModal";
import Image from "@node_modules/next/image";

export default function InstructorDashboardPage() {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const { announcements, loadingAnnouncements } = useSelector(
    (state: RootState) => state.announcements
  );

  const { top4Courses } = useSelector((state: RootState) => state.courses);
  const { createdAssignments } = useSelector(
    (state: RootState) => state.assignment
  );

  const [selectedAssignment, setSelectedAssignment] =
    useState<MutableAssignment | null>(null);
  const [selectedAnnouncementId, setselectedAnnouncementId] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchAnnouncements());
      dispatch(fetchTop4Courses());
      dispatch(fetchCreatedAssignments());
    }
  }, [session?.user, dispatch]);

  const selectedAnnouncement = announcements.find(
    (item) => item._id === selectedAnnouncementId
  );

  const [instructor, setInstructor] = useState<instructorType | null | User>(
    null
  );

  if (!session?.user) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  useEffect(() => {
    if (!selectedAnnouncement) return;
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
    if (selectedAnnouncement && selectedAnnouncement._id) {
      handleSender({
        id: selectedAnnouncement.courseInfo[0]
          ? selectedAnnouncement.courseInfo[0].instructor
          : "00000",
        announcementId: selectedAnnouncement._id,
      });
    }
  }, [selectedAnnouncement]);

  return (
    <main className="px-4 py-6 max-w-full grid lg:grid-cols-3 grid-cols-1 gap-6 relative overflow-hidden">
      {/* Announcements */}
      <div className="w-full border-2 rounded lg:col-span-2 border-zinc-300 dark:border-white/50 flex flex-col">
        <div className="flex md:flex-row flex-col justify-between px-3 py-2">
          <div>
            <p className="h5 text-primary font-semibold">Announcements</p>
            <p className="text-sm text-primary">
              View or create important notices
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 max-md:pt-2">
            <Link href="/dashboard/instructor/create/announcement">
              <button className="button bg-primary text-white flex items-center">
                <PlusIcon /> Create
              </button>
            </Link>
          </div>
        </div>

        {selectedAnnouncementId && selectedAnnouncement && (
          <PopupModal onClose={() => setselectedAnnouncementId(null)}>
            <h3 className="h3 font-bold text-darkPrimary dark:text-primary mb-3">
              {selectedAnnouncement.courseId.toString() !== "all" &&
              selectedAnnouncement.courseInfo.length > 0
                ? selectedAnnouncement.courseInfo[0].title
                : "General Announcement!"}
            </h3>

            {/* Course Description */}
            <p className="body-2 text-gray-700 dark:text-gray-300 mb-3">
              {selectedAnnouncement.courseId.toString() !== "all" &&
              selectedAnnouncement.courseInfo.length > 0
                ? selectedAnnouncement.courseInfo[0].description
                : "Anyone, regardless of subject pursued, must follow the announcement below."}
            </p>

            {selectedAnnouncement.courseId.toString() !== "all" &&
              selectedAnnouncement.courseInfo.length > 0 && (
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-md mb-4">
                  {selectedAnnouncement.courseInfo[0].category}
                </span>
              )}

            {/* Announcement content */}
            <div className="w-full min-h-16 border border-black/60 dark:border-white/40 p-4 mt-3 rounded-md bg-white/70 dark:bg-zinc-800 relative">
              <h5 className="h5 font-semibold text-secondary dark:text-secondary border-b border-secondary pb-1 mb-2">
                {selectedAnnouncement.title}
              </h5>
              <p className="body-2 text-gray-800 dark:text-gray-200">
                {selectedAnnouncement.description}
              </p>
            </div>

            {/* Author Info */}
            <div className="mt-6 flex items-center gap-4 border-t border-gray-300 dark:border-white/30 pt-4">
              {selectedAnnouncement.createdBy !== "admin" ? (
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
                {new Date(selectedAnnouncement.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <Link
                href={
                  selectedAnnouncement.courseId.toString() === "all"
                    ? "/dashboard/my-courses"
                    : `/dashboard/my-courses/${selectedAnnouncement.courseId}`
                }
              >
                <button className="bg-secondary hover:bg-secondary text-white px-4 py-2 rounded">
                  Continue
                </button>
              </Link>
              <button
                className="bg-primary hover:bg-darkPrimary text-white px-4 py-2 rounded"
                onClick={() => close()}
              >
                Got it
              </button>
            </div>
          </PopupModal>
        )}

        <div className="min-h-52 h-full flex-1 max-h-72 overflow-auto">
          {loadingAnnouncements ? (
            Array.from({ length: 4 }).map((_, index) => (
              <LineSkeleton key={index} />
            ))
          ) : announcements?.length > 0 ? (
            announcements.slice(0, 3).map((ann, index) => (
              <div
                key={index}
                onClick={() => setselectedAnnouncementId(ann._id)}
                className={`border-t py-2 px-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 border-gray-300 dark:border-white/30 
                  ${
                    ann.createdBy === "admin" &&
                    "border-l-4 border-lightPrimary"
                  }
                  ${
                    ann.createdBy === "instructor" &&
                    "border-l-4 border-secondary"
                  }
                `}
              >
                <h3 className="text-lg font-semibold uppercase">{ann.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {ann.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(ann.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="h-52 flex items-center justify-center text-gray-500">
              No announcements available.
            </div>
          )}
        </div>

        {announcements?.length > 3 && (
          <div className="w-full px-3 border-t py-2 text-darkPrimary underline text-center">
            <Link
              href="/dashboard/announcements"
              className="flex justify-center items-center gap-1"
            >
              <EyeIcon /> See all announcements
            </Link>
          </div>
        )}
      </div>

      {/* Instructor Assignments */}
      <div className="col-span-1 w-full border-2 rounded border-zinc-300 dark:border-white/50 overflow-hidden flex flex-col">
        <h5 className="h5 text-primary font-semibold px-3 pt-2">Assignments</h5>
        <p className="text-sm text-primary px-3 pb-2">
          Assignments you’ve created for your courses.
        </p>
        <div className="min-h-52 h-full flex-1 max-h-72 overflow-auto">
          {createdAssignments?.data?.length > 0 ? (
            createdAssignments.data.slice(0, 4).map((a, index) => (
              <div
                key={index}
                className="w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 cursor-pointer"
                onClick={() => setSelectedAssignment(a)}
              >
                <h3 className="text-lg font-semibold">{a.title}</h3>
                <p className="text-sm truncate text-zinc-600 dark:text-white/70">
                  {a.description}
                </p>
              </div>
            ))
          ) : (
            <div className="w-full h-52 flex items-center justify-center">
              <p className="text-gray-500 text-sm text-center">
                No assignments found.
              </p>
            </div>
          )}
        </div>

        <div className="w-full px-3 border-t py-2 text-darkPrimary underline text-center">
          <Link
            href="/dashboard/instructor/assignments"
            className="flex justify-center gap-1"
          >
            <EyeIcon /> Manage all
          </Link>
        </div>

        {selectedAssignment && (
          <AssignmentDetailModal
            assignment={selectedAssignment}
            completed
            close={() => setSelectedAssignment(null)}
          />
        )}
      </div>

      {/* Instructor Courses */}
      <div className="w-full mt-3 lg:col-span-3 flex flex-col">
        <div className="flex justify-between items-center px-3 pb-2">
          <div>
            <h4 className="h4 text-primary font-semibold">Your Courses</h4>
            <p className="text-primary text-sm">Courses you've created.</p>
          </div>
          <Link href="/dashboard/instructor/courses">
            <button className="button bg-primary text-white">Manage</button>
          </Link>
        </div>
        <div className="flex flex-row overflow-x-auto gap-5 pb-5">
          {top4Courses?.top4CoursesLoading ? (
            Array(4)
              .fill("")
              .map((_, i) => <CourseCardSkeleton key={i} />)
          ) : top4Courses?.data?.length > 0 ? (
            top4Courses.data.map((course, i) => (
              <Link
                href={`/dashboard/instructor/courses/${course._id}`}
                key={course._id + i}
                className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-white/60 hover:scale-[1.01] transition hover:shadow-lg"
              >
                <CourseCard course={course} />
              </Link>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
