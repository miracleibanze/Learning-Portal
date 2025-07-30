"use client";

import { FC, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { CourseDocument } from "@lib/models/Course";
import axios from "axios";
import Error from "@app/error";
import CourseDetails from "@components/CourseDetails";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchDetailedCourse } from "@redux/slices/coursesSlice";

const Page: FC = () => {
  const { courseId }: { courseId: string } = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [error, setError] = useState<string | null>(null);

  const { isOpenNavigation } = useSelector(
    (state: RootState) => state.navigation
  );
  const { data, detailedCourseLoading, detailedCourseError } = useSelector(
    (state: RootState) => state.courses.detailedCourse
  );

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
      enrolled={true}
    />
  );
};

export default Page;
