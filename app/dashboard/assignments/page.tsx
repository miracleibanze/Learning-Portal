"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import { fetchpendingAssignments } from "@redux/slices/assignmentsSlice";
import { LineSkeleton } from "@components/designs/Skeletons";
import Image from "next/image";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import Assignment from "@components/Assignment";

const page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.assignment.pendingAssignments
  );
  useEffect(() => {
    if (!data || data.length === 0) {
      dispatch(fetchpendingAssignments());
    }
  }, []);

  return (
    <main className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Pending Assignments</h1>
      <div className="space-y-3">
        {!loading ? (
          data.length > 0 ? (
            data?.map((assignment) => (
              <div
                key={assignment._id}
                className="shrink-0 bg-white dark:bg-zinc-900 shadow-md overflow-hidden border border-gray-200  dark:border-white/60 rounded-lg hover:scale-[1.01] transition hover:shadow-lg cursor-pointer p-4"
              >
                <Link
                  href={`/dashboard/my-courses/${assignment.courseId}`}
                  className="group"
                >
                  <h2 className="h5 text-blue-700 dark:text-blue-400 font-semibold group-hover:underline">
                    {assignment.title}
                  </h2>
                  <p className="body-1">{assignment.description}</p>
                  <p className="text-zinc-700 dark:text-white/70">
                    Deadline:
                    {new Date(assignment.deadline).toLocaleDateString()}
                  </p>
                  <p className="text-green-600 dark:text-green-500 font-bold body-1 mt-4">
                    {assignment.instructor.role}
                  </p>
                </Link>
                <Link
                  href={`/dashboard/${assignment.instructor.name}/${assignment?.instructor._id}`}
                  className="flex items-center group w-max"
                >
                  {assignment.instructor.picture ? (
                    <Image
                      src={assignment?.instructor?.picture}
                      alt={assignment?.instructor?.name}
                      width={40}
                      height={40}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle2Icon className="w-12 h-12 rounded-full" />
                  )}
                  <div className="ml-3">
                    <p className="text-gray-800 font-semibold group-hover:underline">
                      {assignment?.instructor?.name}
                    </p>
                    <p className="text-gray-600 text-sm group-hover:underline">
                      {assignment?.instructor?.email}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p
              className="text-gray-500 dark:text-gray-400"
              data-testid="no-top-courses"
            >
              No assignments available
            </p>
          )
        ) : (
          Array(4)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="p-4 shadow rounded-lg bg-white dark:bg-gray-900 dark:border border-white/40"
              >
                <LineSkeleton index={3} assignment={true} />
              </div>
            ))
        )}
      </div>
      {error && (
        <p className="text-red-500" data-testid="no-top-courses">
          Server not available at the moment, Contact{" "}
          <u>
            <a
              href={`mailto:miracleibanze@gmail.com?subject=${encodeURIComponent(
                "Assignment fetch fail"
              )}&body=${encodeURIComponent(
                "I am seeking help along with feedback on assignment section when assignment are not being fetched."
              )}`}
            >
              miracleibanze@gmail.com
            </a>
          </u>
          for help
        </p>
      )}
    </main>
  );
};

export default page;
