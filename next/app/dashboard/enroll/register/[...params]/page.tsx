"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { fetchDetailedCourse } from "@redux/slices/coursesSlice";

const page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { params }: { params: string[] } = useParams();
  const courseName = decodeURIComponent(params[0]);
  const courseId = params[0];
  const { detailedCourse } = useSelector((state: RootState) => state.courses);
  const pathname = usePathname();

  useEffect(() => {
    if (courseId && detailedCourse?.data?.title !== courseName) {
      dispatch(fetchDetailedCourse(courseId));
    }
  }, [dispatch, pathname]);

  return (
    <main className="h-full flex-1 flex items-center justify-center">
      <div className="w-full max-w-lg h-max shadow-lg rounded-lg bg-zinc-200 dark:bg-darkPrimary py-4 px-3 dark:border border-white/40">
        <h3 className="h3 font-semibold underline text-center">
          Join the course
        </h3>
        <div className="flex w-full gap-3">
          {JSON.stringify(detailedCourse.data)}
        </div>
      </div>
    </main>
  );
};

export default page;
