"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect, useState } from "react";
import {
  fetchpendingAssignments,
  MutableAssignment,
} from "@redux/slices/assignmentsSlice";
import { LineSkeleton } from "@components/designs/Skeletons";
import Image from "next/image";
import { CheckCheck, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import AssignmentDetailModal from "@components/dashboard/AssignmentDetail";
import { IAssignment } from "@type/Assignment";
import { fetchUser } from "@redux/slices/userSlice";

const PendingAssignmentsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedAssignment, setSelectedAssignment] =
    useState<MutableAssignment | null>(null);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.assignment.pendingAssignments
  );
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchpendingAssignments());
    }
  }, [dispatch, data]);

  return !selectedAssignment ? (
    <main className="px-4 py-6 min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-sky-600 dark:text-sky-400">
        Pending Assignments
      </h1>

      <section className="space-y-5 md:px-6 px-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border dark:border-white/30"
            >
              <LineSkeleton index={3} assignment={true} />
            </div>
          ))
        ) : data && data.length > 0 ? (
          data.map((assignment) => (
            <div
              key={assignment._id}
              className="p-4 bg-white dark:bg-zinc-900 shadow-sm rounded-lg border border-gray-200 dark:border-white/30 transition hover:shadow-md"
            >
              {/* Assignment Details */}
              <div
                className="block group mb-4"
                onClick={() => setSelectedAssignment(assignment)}
              >
                <h2 className="h5 font-semibold text-blue-700 dark:text-blue-400 group-hover:underline flex justify-between">
                  {assignment.title}{" "}
                  {user && assignment.students.includes(user._id) && (
                    <span className="text-green-500 flex mx-2 items-center">
                      <CheckCheck />
                      Done
                    </span>
                  )}
                </h2>
                <p className="body-2 text-gray-600 dark:text-gray-300 mt-1">
                  {assignment.description}
                </p>
                <p className="body-2 mt-2 font-medium text-zinc-700 dark:text-white/70">
                  Deadline:{" "}
                  <span className="font-semibold">
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </span>
                </p>
                <p className="body-2 font-semibold text-green-600 dark:text-green-400 mt-2">
                  Role: {assignment.instructor.role}
                </p>
              </div>

              {/* Instructor Info */}
              <Link
                href={`/dashboard/${assignment.instructor.name}?pin=${assignment.instructor._id}`}
                className="flex items-center gap-3 group px-3"
                aria-label={`Go to instructor profile ${assignment.instructor.name}`}
              >
                {assignment.instructor.picture ? (
                  <Image
                    src={assignment.instructor.picture}
                    alt={`${assignment.instructor.name}'s profile`}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                ) : (
                  <UserCircle2Icon className="w-12 h-12 text-gray-500" />
                )}
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white group-hover:underline">
                    {assignment.instructor.name}
                  </p>
                  <p className="body-2 text-gray-600 dark:text-gray-400 group-hover:underline">
                    {assignment.instructor.email}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 body-2">
              No assignments available at the moment.
            </p>
          </div>
        )}
      </section>

      {error && (
        <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-md border border-red-300 dark:bg-red-900 dark:text-red-200 dark:border-red-600">
          <p className="body-2 font-medium">
            Server error: Could not fetch assignments.
          </p>
          <p className="body-2">
            Please contact{" "}
            <a
              href={`mailto:miracleibanze@gmail.com?subject=${encodeURIComponent(
                "Assignment fetch fail"
              )}&body=${encodeURIComponent(
                "I'm facing an issue with loading assignments."
              )}`}
              className="underline"
            >
              miracleibanze@gmail.com
            </a>{" "}
            for support.
          </p>
        </div>
      )}
    </main>
  ) : (
    <AssignmentDetailModal
      assignment={selectedAssignment}
      completed={user ? selectedAssignment.students.includes(user._id) : false}
      close={() => setSelectedAssignment(null)}
    />
  );
};

export default PendingAssignmentsPage;
