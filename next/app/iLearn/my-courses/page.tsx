"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { FC, useEffect } from "react";
import { fetchMyCourses } from "@redux/slices/coursesSlice";
import { useSession } from "next-auth/react";
import { Loader } from "lucide-react";
import CourseCard from "@components/CourseCard";
import { CourseCardSkeleton } from "@components/designs/Skeletons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const page: FC = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const { data, myCourseLoading, myCourseError } = useSelector(
    (state: RootState) => state.courses.myCourses
  );
  useEffect(() => {
    if (!data || data.length === 0) dispatch(fetchMyCourses());
  }, []);

  return (
    <main className="h-full flex-1 px-4 py-6">
      <h4 className="h4 font-semibold text-darkPrimary dark:text-zinc-200">
        My Courses
      </h4>
      <p className="body-2 text-primary leading-none mb-5">
        All Course i Have been enrolled in and assignmenting out.
      </p>
      <div className="flex gap-x-4 gap-y-3 flex-wrap w-full max-md:justify-center">
        {myCourseError && (
          <p className="text-red-400 body-2">{myCourseError}</p>
        )}
        {data.length > 0 ? (
          data.map((course, index) => (
            <Link
              href={`/iLearn/my-courses/${course._id}`}
              key={course._id + " " + index}
              className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200  dark:border-white/60 hover:shadow-lg cursor-pointer dark:hover:border-white flex flex-col"
            >
              <CourseCard
                course={course}
                purchased={true}
                created={session?.user && session.user.role === "instructor"}
              />
            </Link>
          ))
        ) : myCourseLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <CourseCardSkeleton key={index} />
          ))
        ) : (
          <div className="w-full h-52 flex items-center justify-center">
            <p className="text-gray-500 text-sm text-center py-2">
              No course available.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default page;
