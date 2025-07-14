"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchAnnouncements } from "@redux/slices/announcementsSlice";
import { fetchTop4Courses } from "@redux/slices/coursesSlice";
import AssignmentDetailModal from "@components/dashboard/AssignmentDetail";
import { EyeIcon, Loader, PlusIcon } from "lucide-react";
import Link from "next/link";
import CourseCard from "@components/CourseCard";
import {
  CourseCardSkeleton,
  LineSkeleton,
} from "@components/designs/Skeletons";
import AnnouncementCard from "@components/dashboard/AnnouncementCard";
import {
  fetchCreatedAssignments,
  MutableAssignment,
} from "@redux/slices/assignmentsSlice";

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
  const [announcementCard, setAnnouncementCard] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      dispatch(fetchAnnouncements());
      dispatch(fetchTop4Courses());
      dispatch(fetchCreatedAssignments());
    }
  }, [session?.user, dispatch]);

  if (!session?.user) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="px-4 py-6 max-w-full grid lg:grid-cols-3 grid-cols-1 gap-6 relative overflow-hidden">
      {/* Announcements */}
      <div className="w-full border-2 rounded lg:col-span-2 border-zinc-300 dark:border-white/50 flex flex-col">
        <div className="flex md:flex-row flex-col justify-between px-3 py-2">
          <div>
            <p className="h5 text-sky-500 font-semibold">Announcements</p>
            <p className="text-sm text-sky-400">
              View or create important notices
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-400 max-md:pt-2">
            <Link href="/dashboard/instructor/create/announcement">
              <button className="button bg-blue-600 text-white flex items-center">
                <PlusIcon /> Create
              </button>
            </Link>
          </div>
        </div>

        {announcementCard && (
          <AnnouncementCard
            id={announcementCard}
            close={() => setAnnouncementCard(null)}
          />
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
                onClick={() => setAnnouncementCard(ann._id)}
                className={`border-t py-2 px-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 border-gray-300 dark:border-white/30 
                  ${ann.createdBy === "admin" && "border-l-4 border-sky-500"}
                  ${
                    ann.createdBy === "instructor" &&
                    "border-l-4 border-yellow-400"
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
          <div className="w-full px-3 border-t py-2 text-blue-600 underline text-center">
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
        <h5 className="h5 text-sky-500 font-semibold px-3 pt-2">Assignments</h5>
        <p className="text-sm text-sky-400 px-3 pb-2">
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

        <div className="w-full px-3 border-t py-2 text-blue-600 underline text-center">
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
            close={() => setSelectedAssignment(null)}
          />
        )}
      </div>

      {/* Instructor Courses */}
      <div className="w-full mt-3 lg:col-span-3 flex flex-col">
        <div className="flex justify-between items-center px-3 pb-2">
          <div>
            <h4 className="h4 text-sky-500 font-semibold">Your Courses</h4>
            <p className="text-sky-400 text-sm">Courses you've created.</p>
          </div>
          <Link href="/dashboard/instructor/courses">
            <button className="button bg-blue-600 text-white">Manage</button>
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
