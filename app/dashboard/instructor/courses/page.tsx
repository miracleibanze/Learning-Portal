"use client";

import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoursesCreated } from "@redux/slices/coursesSlice";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import CourseCard from "@components/CourseCard";
import { CourseCardSkeleton } from "@components/designs/Skeletons";

const page: FC = () => {
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
      <h4 className="h4 font-semibold text-blue-600 dark:text-zinc-200">
        My Courses
      </h4>
      <p className="body-2 text-sky-500 leading-none mb-5">
        All Course i Have been enrolled in and assignmenting out.
      </p>
      <div className="flex gap-x-4 gap-y-3 flex-wrap w-full">
        {coursesCreatedError && (
          <p className="text-red-400 body-2">{coursesCreatedError}</p>
        )}
        {coursesCreatedLoading ? (
          Array(8)
            .fill("")
            .map((_, index) => <CourseCardSkeleton key={index} />)
        ) : data.length > 0 ? (
          data.map((course) => <CourseCard course={course} key={course._id} />)
        ) : (
          <p>No course you have created yet</p>
        )}
      </div>
    </main>
  );
};

export default page;
