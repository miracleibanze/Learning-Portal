"use client";

import { FC, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { CourseDocument } from "@lib/models/Course";
import Error from "@app/error";
import CourseDetails from "@components/CourseDetails";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchDetailedCourse } from "@redux/slices/coursesSlice";

const page: FC = () => {
  const { courseId }: { courseId: string } = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { data, detailedCourseLoading, detailedCourseError } = useSelector(
    (state: RootState) => state.courses.detailedCourse
  );
  const [error, setError] = useState(null);

  useEffect(() => {
    if (courseId && data?._id !== courseId) {
      dispatch(fetchDetailedCourse(courseId));
    }
  }, [courseId, pathname]);
  useEffect(() => {
    if (detailedCourseLoading) {
      setError(detailedCourseError);
    }
  }, [detailedCourseError]);

  if (error) {
    return <Error error={{ message: error }} reset={() => setError(null)} />;
  }

  return (
    <CourseDetails
      course={data}
      loading={detailedCourseLoading}
      enrolled={false}
    />
  );
};

export default page;
