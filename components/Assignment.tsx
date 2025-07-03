import { LineSkeleton } from "@components/designs/Skeletons";
import Link from "next/link";
import { MutableAssignment } from "@redux/slices/assignmentsSlice";
import { EyeIcon, PlusIcon } from "lucide-react";
import React, { FC } from "react";

interface AssignmentProps {
  pendingAssignments: {
    data: MutableAssignment[];
    loading: boolean;
    error: any;
  };
  create: boolean;
}

const Assignment: FC<AssignmentProps> = ({ pendingAssignments, create }) => {
  const data = pendingAssignments.data;
  return (
    <div className="col-span-1 w-full border-2 rounded border-zinc-300 dark:border-white/50 overflow-hidden flex flex-col">
      <h5 className="h5 text-sky-500 font-semibold px-3 pt-2 group-hover:underline">
        Assignment
      </h5>
      <p className="text-sm text-sky-400 leading-none px-3 pb-2 group-hover:underline">
        You have unfinished assignments in your studies.
      </p>
      <div className={`min-h-52 h-full flex-1 max-h-72 flex flex-col`}>
        {pendingAssignments?.data.length > 0 ? (
          Array(4)
            .fill("")
            .map((_, index) => (
              <Link
                href={`/dashboard/my-courses/${data[index].courseId}`}
                key={index}
              >
                <div className="w-full px-3 border-t border-gray-300 dark:border-white/50 py-2">
                  <h3 className="text-lg font-semibold">{data[index].title}</h3>
                  <p className="text-sm truncate text-zinc-600 dark:text-white/70">
                    {data[index].description}
                  </p>
                </div>
              </Link>
            ))
        ) : pendingAssignments.loading ? (
          Array(3)
            .fill("")
            .map((_, index) => <LineSkeleton key={index} />)
        ) : (
          <div className="w-full h-52 flex items-center justify-center">
            <p className="text-gray-500 text-sm text-center py-2">
              No assignment available.
            </p>
          </div>
        )}

        {create && (
          <div className="w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 flex items-center justify-center">
            <button className="button bg-sky-500 text-white flex items-center">
              <PlusIcon /> Create
            </button>
          </div>
        )}
      </div>
      <div
        className={`w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 flex items-center justify-center ${
          data?.length <= 3 && "hidden"
        } text-blue-600 underline`}
      >
        <Link href="/dashboard/assignments" className="flex gap-1">
          <EyeIcon /> See more
        </Link>
      </div>
    </div>
  );
};

export default Assignment;
