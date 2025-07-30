"use client";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesToEnroll } from "@redux/slices/coursesSlice";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import CourseCard from "@components/CourseCard";
import { CourseCardSkeleton } from "@components/designs/Skeletons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const page: FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { data, coursesToEnrollLoading, coursesToEnrollError } = useSelector(
    (state: RootState) => state.courses.coursesToEnroll
  );
  useEffect(() => {
    if (!data || data.length === 0) dispatch(fetchCoursesToEnroll());
  }, []);

  return (
    <main className="h-full flex-1 px-4 py-6">
      <h4 className="h4 font-semibold text-darkPrimary dark:text-zinc-200">
        Courses
      </h4>
      <p className="body-2 text-primary leading-none mb-5">
        All Course are available to the user as long as there is sufficient
        subscription.
      </p>
      <div className="flex gap-x-4 gap-y-3 flex-wrap w-full">
        {data?.length > 0 ? (
          data.map((course, index) => (
            <Link
              href={`/dashboard/enroll/${course._id}`}
              key={course._id + " " + index}
              className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200  dark:border-white/60 hover:scale-[1.01] transition hover:shadow-lg cursor-pointer dark:hover:border-white flex flex-col"
            >
              <CourseCard course={course} />
            </Link>
          ))
        ) : coursesToEnrollLoading ? (
          Array({ length: 8 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))
        ) : (
          <div className="w-full h-52 flex items-center justify-center">
            <p className="text-gray-500 text-sm text-center py-2">
              No course available.
            </p>
          </div>
        )}
        {coursesToEnrollError && (
          <p className="text-red-400 body-2">{coursesToEnrollError}</p>
        )}
      </div>
    </main>
  );
};

export default page;
