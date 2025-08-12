"use client";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesCreated } from "@redux/slices/coursesSlice";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import CourseCard from "@components/CourseCard";
import { CourseCardSkeleton } from "@components/designs/Skeletons";
import Link from "@node_modules/next/link";

const Page: FC = () => {
  const { data: session } = useSession();
  const { data, coursesCreatedError, coursesCreatedLoading } = useSelector(
    (state: RootState) => state.courses.coursesCreated
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!data || data.length === 0) dispatch(fetchCoursesCreated());
  }, []);
  return (
    <main className="h-full flex-1 px-4 py-6">
      <h4 className="h4 font-semibold text-darkPrimary dark:text-zinc-200">
        My Courses
      </h4>
      <p className="body-2 text-primary leading-none mb-5">
        All Course i Have been enrolled in and assignmenting out.
      </p>
      <div className="flex gap-x-4 flex-wrap gap-y-3 mx-auto">
        {coursesCreatedError && (
          <p className="text-red-400 body-2">{coursesCreatedError}</p>
        )}
        {coursesCreatedLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))
        ) : data.length > 0 ? (
          data.map((course) => (
            <Link
              href={`/iLearn/enroll/${course._id}`}
              key={course._id}
              className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200  dark:border-white/60 hover:scale-[1.01] transition hover:shadow-lg cursor-pointer dark:hover:border-white flex flex-col"
            >
              <CourseCard course={course} created={true} />
            </Link>
          ))
        ) : (
          <p>You have created no course yet</p>
        )}
      </div>
    </main>
  );
};

export default Page;
