"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Check, CheckCheck, EyeIcon, Loader, PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { MutableAssignment } from "@redux/slices/assignmentsSlice";
import { IAssignment } from "@type/Assignment";
import AssignmentDetailModal from "@components/dashboard/AssignmentDetail";
import { fetchAnnouncements } from "@redux/slices/announcementsSlice";
import { fetchTop4Courses } from "@redux/slices/coursesSlice";
import {
  CourseCardSkeleton,
  LineSkeleton,
} from "@components/designs/Skeletons";
import CourseCard from "@components/CourseCard";
import Link from "next/link";
import Progress from "@components/Progress";
import { fetchpendingAssignments } from "@redux/slices/assignmentsSlice";
import AnnouncementCard from "@components/dashboard/AnnouncementCard";
import axios from "@node_modules/axios";
import PreviousMap_ from "@node_modules/postcss/lib/previous-map";

export default function DashboardPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user);
  const { announcements, loadingAnnouncements } = useSelector(
    (state: RootState) => state.announcements
  );
  const [announcementCard, setAnnouncementCard] = useState<string | null>(null);
  const [seenAnnouncementsList, setSeenAnnouncementsList] = useState<string[]>(
    []
  );
  const { top4Courses } = useSelector((state: RootState) => state.courses);
  const { pendingAssignments } = useSelector(
    (state: RootState) => state.assignment
  );
  const [selectedAssignment, setSelectedAssignment] =
    useState<MutableAssignment | null>(null);

  const ReadAnnouncement = async (id: string) => {
    try {
      // const response = await axios.post(`/api/announcements/`);
      close();
    } catch (err: any) {
      console.error("Quiz submission error:", err);
    }
  };

  useEffect(() => {
    if (session?.user) {
      if (!pendingAssignments?.data || pendingAssignments?.data.length === 0)
        dispatch(fetchpendingAssignments());
      if (!top4Courses?.data || top4Courses?.data.length === 0)
        dispatch(fetchTop4Courses());
      if (!announcements || announcements.length === 0)
        dispatch(fetchAnnouncements());
    }
  }, [session?.user, dispatch]);

  if (!session?.user)
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        data-testid="loader"
      >
        <Loader />
      </div>
    );

  return (
    <main className="px-4 py-6 max-w-full grid lg:grid-cols-3 grid-cols-1 gap-6 relative overflow-hidden">
      <div
        className="w-full border-2 rounded lg:col-span-2 border-zinc-300 dark:border-white/50 flex flex-col shadow-md"
        data-testid="announcement-container"
      >
        <div
          className="w-full flex md:flex-row flex-col justify-between px-3 py-2"
          data-testid="announcement-header"
        >
          <div data-testid="announcement-header-left">
            <p className="h5 text-sky-500 font-semibold">Announcement</p>
            <p className="text-sm text-sky-400 leading-none">
              From your Principal or Teacher
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-zinc-400 md:justify-start justify-between max-md:pt-2"
            data-testid="announcement-header-right"
          >
            <div
              className="flex gap-2 items-center"
              data-testid="announcement-role"
            >
              <p className="text-sm px-1 border-l-4 border-sky-300">
                {session.user.role === "admin" ? "Principal/You" : "Principal"}
              </p>
              <p className="text-sm px-1 border-l-4 border-yellow-300">
                {session.user.role === "instructor" ? "You" : "Teacher"}
              </p>
            </div>
            {session.user.role !== "student" && (
              <Link href="/dashboard/instructor/create/announcement">
                <button
                  className="button bg-blue-600 text-white flex items-center"
                  data-testid="create-announcement-button"
                >
                  <PlusIcon /> Create
                </button>
              </Link>
            )}
          </div>
        </div>
        {announcementCard !== null && (
          <AnnouncementCard
            id={announcementCard}
            gotIt={() => ReadAnnouncement(announcementCard)}
            close={() => setAnnouncementCard(null)}
          />
        )}
        <div
          className={`min-h-52 h-full flex-1 max-h-72`}
          data-testid="announcement-list"
        >
          {loadingAnnouncements ? (
            Array.from({ length: 3 }).map((_, index) => (
              <LineSkeleton data-testid="line-skeleton" index={3} key={index} />
            ))
          ) : announcements?.length > 0 ? (
            Array.from({
              length: announcements.length > 3 ? 3 : announcements.length,
            }).map((_, index) => {
              const item = announcements[index];
              const isSeen = seenAnnouncementsList.includes(
                announcements[index]._id
              );
              const isRead = announcements[index].students
                ? announcements[index].students.includes(session.user._id)
                  ? true
                  : false
                : false;
              return (
                <div
                  key={index}
                  className={`border-t ${
                    !isRead
                      ? isSeen
                        ? "hover:bg-gray-200 dark:hover:bg-gray-200/10"
                        : "bg-zinc-200 dark:bg-white/10"
                      : "hover:bg-gray-200 dark:hover:bg-gray-200/10"
                  }  cursor-pointer border-gray-300 dark:border-white/30 py-2 ${
                    item.createdBy === "admin" && "border-l-4 !border-l-sky-500"
                  } ${
                    item.createdBy === "instructor" &&
                    "border-l-4 !border-l-yellow-400"
                  } px-3 text-gray-900/90 dark:text-white/90`}
                  data-testid={`announcement-${item._id}`}
                  onClick={() => {
                    setSeenAnnouncementsList((prev) => [...prev, item._id]);
                    setAnnouncementCard(item._id);
                  }}
                >
                  <h3
                    className="text-lg font-semibold tracking-wide uppercase"
                    data-testid={`announcement-title-${item._id}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-gray-600 dark:text-gray-300 w-full truncate"
                    data-testid={`announcement-description-${item._id}`}
                  >
                    {item.description}
                  </p>
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400"
                    data-testid={`announcement-date-${item._id}`}
                  >
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            })
          ) : (
            <div
              className="w-full h-52 flex items-center justify-center"
              data-testid="no-announcement"
            >
              <p className="text-gray-500 text-sm text-center py-2">
                No announcements available.
              </p>
            </div>
          )}
        </div>
        <div
          className={`w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 flex items-center justify-center ${
            announcements?.length <= 3 && "hidden"
          } text-blue-600 underline gap-1`}
        >
          <Link href="/dashboard/announcements" className="flex">
            <EyeIcon />
            <span> See more</span>
          </Link>
        </div>
      </div>

      {session.user.role !== "admin" && (
        <div className="col-span-1 w-full border-2 rounded border-zinc-300 dark:border-white/50 overflow-hidden flex flex-col shadow-md">
          <h5 className="h5 text-sky-500 font-semibold px-3 pt-2 group-hover:underline">
            Assignment
          </h5>
          <p className="text-sm text-sky-400 leading-none px-3 pb-2 group-hover:underline">
            You have unfinished assignments in your studies.
          </p>
          <div className={`min-h-52 h-full flex-1 max-h-72 flex flex-col`}>
            {pendingAssignments?.data.length > 0 ? (
              Array.from({
                length:
                  pendingAssignments.data.length > 4
                    ? 4
                    : pendingAssignments.data.length,
              }).map((_, index) => {
                const item = pendingAssignments.data[index];
                return (
                  <div
                    className="w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 cursor-pointer flex"
                    key={index}
                    onClick={() => setSelectedAssignment(item)}
                  >
                    <span className="flex items-center -translate-x-1.5">
                      {item.students.includes(session.user._id) && (
                        <CheckCheck className="text-green-500" />
                      )}
                    </span>
                    <div className="flex-1 w-full text-gray-900/90 dark:text-white/90">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm truncate text-zinc-600 dark:text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : pendingAssignments.loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <LineSkeleton key={index} />
              ))
            ) : (
              <div className="w-full h-52 flex items-center justify-center">
                <p className="text-gray-500 text-sm text-center py-2">
                  No assignment available.
                </p>
              </div>
            )}
          </div>

          <div
            className={`w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 flex items-center justify-center ${
              pendingAssignments.data?.length <= 3 && "hidden"
            } text-blue-600 underline`}
          >
            <Link href="/dashboard/assignments" className="flex gap-1">
              <EyeIcon /> See more
            </Link>
          </div>
          {selectedAssignment && (
            <AssignmentDetailModal
              assignment={selectedAssignment}
              completed={selectedAssignment.students.includes(session.user._id)}
              close={() => setSelectedAssignment(null)}
            />
          )}
        </div>
      )}

      <div
        className="w-full mt-3 lg:col-span-3 col-span-1 flex pr-8 md:flex-row flex-col"
        data-testid="popular-course-section"
      >
        <div className="w-full flex-1">
          <h4
            className="h4 text-sky-500 font-semibold px-3 pt-2"
            data-testid="popular-course-header"
          >
            Popular Course
          </h4>
          <p
            className="body-2 text-sky-400 leading-none px-3 pb-2"
            data-testid="popular-course-description"
          >
            Explore our most-enrolled courses and start learning today.
          </p>
        </div>
        <Link
          className="ml-auto"
          href={
            session.user.role === "student"
              ? "/dashboard/enroll"
              : `/dashboard/${session.user.role}/courses`
          }
        >
          <button
            className="button bg-blue-600 hover:bg-sky-600 text-white"
            data-testid="view-courses-button"
          >
            {session.user.role === "student" ? "All Courses" : "My Courses"}
          </button>
        </Link>
      </div>
      <div
        className="lg:col-span-3 col-span-1 flex flex-row overflow-x-auto gap-5 pb-5 h-max overflow-y-hidden flex-nowrap"
        data-testid="course-list"
      >
        {top4Courses?.top4CoursesLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CourseCardSkeleton key={index} data-testid="course-skeleton" />
          ))
        ) : top4Courses?.data?.length > 0 ? (
          top4Courses?.data.map((course, index) => (
            <Link
              href={`/dashboard/${
                (currentUser.user?.myCourses ?? []).includes(course._id)
                  ? "my-courses"
                  : "enroll"
              }/${course._id}`}
              key={course._id + " " + index}
              className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200  dark:border-white/60 hover:scale-[1.01] transition hover:shadow-lg cursor-pointer dark:hover:border-white flex flex-col"
            >
              <CourseCard
                course={course}
                data-testid={`course-card-${course._id}`}
                purchased={(currentUser.user?.myCourses ?? []).includes(
                  course._id
                )}
              />
            </Link>
          ))
        ) : (
          <p
            className="text-gray-500 dark:text-gray-400"
            data-testid="no-top-courses"
          >
            No top courses available
          </p>
        )}
      </div>
      {session.user.role === "student" && (
        <Progress currentUser={currentUser} data-testid="progress-component" />
      )}
    </main>
  );
}
