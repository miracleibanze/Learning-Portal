"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { fetchDetailedCourse } from "@redux/slices/coursesSlice";

const page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const courseId = searchParams.get("ref");
  const { data, detailedCourseLoading, detailedCourseError } = useSelector(
    (state: RootState) => state.courses.detailedCourse
  );

  useEffect(() => {
    if (data && courseId === data?._id) dispatch(fetchDetailedCourse(courseId));
  }, [courseId, pathname]);

  return (
    <main className="h-full flex-1 flex items-center justify-center">
      <div className="w-full max-w-lg h-max shadow-lg rounded-lg bg-zinc-200 dark:bg-gray-900 py-4 px-3 dark:border border-white/40">
        <h3 className="h3 font-semibold underline text-center">
          Join the course
        </h3>
        <div className="flex w-full gap-3">s</div>
      </div>
    </main>
  );
};

export default page;
