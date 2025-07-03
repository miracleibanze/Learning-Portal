"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useParams, usePathname } from "next/navigation";
import { FC, useEffect } from "react";
import {
  fetchDetailedCourse,
  fetchDetailedCourseChapters,
} from "@redux/slices/coursesSlice";
import { LineSkeleton } from "@components/designs/Skeletons";

const page: FC = () => {
  const { params }: { params: string[] } = useParams();
  const courseName = decodeURIComponent(params[0]);
  const courseId = params[1];
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const { detailedCourse, detailedCourseChapters } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    if (courseId && detailedCourse?.data?.title !== courseName) {
      dispatch(fetchDetailedCourse(courseId));
    }
    if (detailedCourseChapters.data?._id || courseId) {
      dispatch(fetchDetailedCourseChapters(courseId));
    }
  }, [dispatch, pathname]);

  return (
    <main className="h-full flex-1 py-6 px-4 flex flex-col">
      {detailedCourse.detailedCourseLoading ? (
        <LineSkeleton index={2} noBorder={true} />
      ) : (
        <>
          <h4 className="h4 font-semibold text-blue-600 dark:text-blue-400">
            {detailedCourse.data?.title}
          </h4>
          <p className="body-2 text-sky-500">
            {detailedCourse.data?.description}
          </p>
        </>
      )}
      {JSON.stringify(typeof detailedCourseChapters.data?._id)}
      {JSON.stringify(typeof detailedCourseChapters.data?.chapters)}
      {JSON.stringify(courseId)}
      <div className="flex flex-col gap-4 justify-between items-start flex-1 h-full bg-red-400 mt-4 ">
        <div className="w-full">
          {detailedCourseChapters.data &&
            detailedCourseChapters.data.chapters[0].title}
          {detailedCourseChapters.data ? "true" : "false"}
        </div>
        <div className="w-full">Chat Space</div>
      </div>
    </main>
  );
};

export default page;
