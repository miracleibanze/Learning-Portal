"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  Check,
  CheckCheck,
  EyeIcon,
  Loader,
  PlusIcon,
  User2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import {
  MutableAssignment,
  setSubmittedAssignments,
} from "@redux/slices/assignmentsSlice";
import AssignmentDetailModal from "@components/dashboard/AssignmentDetail";
import {
  fetchAnnouncements,
  setReadAnnouncements,
} from "@redux/slices/announcementsSlice";
import { fetchTop4Courses } from "@redux/slices/coursesSlice";
import {
  CourseCardSkeleton,
  LineSkeleton,
} from "@components/designs/Skeletons";
import CourseCard from "@components/CourseCard";
import Link from "next/link";
import Progress from "@components/Progress";
import { fetchpendingAssignments } from "@redux/slices/assignmentsSlice";
import { IAnnouncement } from "@type/Announcement";
import PopupModal from "@components/designs/PopupModal";
import Image from "next/image";
import { instructorType } from "@lib/models/Course";
import { User } from "next-auth";
import axios from "axios";
import AdminDashboardChart from "@components/dashboard/AdminDashboardChart";
import { fetchAnalytics } from "@redux/slices/AnalyticsSlice";

export default function DashboardPage() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.user);
  const { announcements, loadingAnnouncements } = useSelector(
    (state: RootState) => state.announcements
  );

  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<IAnnouncement | null>(null);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    string | null
  >(null);

  const analytics = useSelector((state: RootState) => state.analytics.data);

  const { readAnnouncements } = useSelector(
    (state: RootState) => state.announcements
  );
  const { submittedAssignments } = useSelector(
    (state: RootState) => state.assignment
  );
  const { top4Courses } = useSelector((state: RootState) => state.courses);
  const { pendingAssignments } = useSelector(
    (state: RootState) => state.assignment
  );
  const [selectedAssignment, setSelectedAssignment] =
    useState<MutableAssignment | null>(null);
  const [instructor, setInstructor] = useState<instructorType | null | User>(
    null
  );

  const ReadAnnouncement = async (id: string) => {
    try {
      // const response = await axios.post(`/api/announcements/`);
      close();
    } catch (err: any) {
      console.error("Quiz submission error:", err);
    }
  };

  useEffect(() => {
    setSelectedAnnouncement(
      announcements.find((item) => item._id === selectedAnnouncementId) || null
    );
  }, [selectedAnnouncementId]);

  useEffect(() => {
    if (session?.user) {
      if (!pendingAssignments?.data || pendingAssignments?.data.length === 0)
        dispatch(fetchpendingAssignments());
      if (!top4Courses?.data || top4Courses?.data.length === 0)
        dispatch(fetchTop4Courses());
      if (!announcements || announcements.length === 0)
        dispatch(fetchAnnouncements());
      if (!analytics) dispatch(fetchAnalytics());
    }
  }, [session?.user, dispatch, pathname]);

  if (!session?.user)
    return (
      <div
        className="absolute inset-0 flex items-center justify-center"
        data-testid="loader"
      >
        <Loader />
      </div>
    );

  useEffect(() => {
    if (!selectedAnnouncement) return;
    const handleSender = async ({
      id,
      announcementId,
    }: {
      id?: string;
      announcementId: string;
    }) => {
      const response = await axios.post(`/api/announcements/details`, {
        id,
        announcementId,
      });
      if (id === "00000") return;
      setInstructor(response.data);
    };
    if (selectedAnnouncement && selectedAnnouncement._id) {
      handleSender({
        id: selectedAnnouncement.courseInfo[0]
          ? selectedAnnouncement.courseInfo[0].instructor
          : "00000",
        announcementId: selectedAnnouncement._id,
      });
    }
  }, [selectedAnnouncement]);

  return (
    <main className="py-6 max-w-full grid lg:grid-cols-3 grid-cols-1 gap-6 relative overflow-hidden">
      <div
        className="w-full border-2 rounded lg:col-span-2 border-zinc-300 dark:border-white/50 flex flex-col shadow-md"
        data-testid="announcement-container"
      >
        <div
          className="w-full flex md:flex-row flex-col justify-between px-3 py-2"
          data-testid="announcement-header"
        >
          <div data-testid="announcement-header-left">
            <p className="h5 text-primary font-semibold">Announcement</p>
            <p className="text-sm text-primary leading-none">
              From your Principal or Teacher
            </p>
          </div>
          <div
            className="flex items-center gap-2 text-zinc-400 md:justify-start justify-between max-md:pt-2"
            data-testid="announcement-header-right"
          >
            <div
              className="flex gap-2 items-center"
              data-testid="announcement-role"
            >
              <p className="text-sm px-1 border-l-4 border-lightPrimary">
                {session.user.role === "admin" ? "Principal/You" : "Principal"}
              </p>
              <p className="text-sm px-1 border-l-4 border-secondary">
                {session.user.role === "instructor" ? "You" : "Teacher"}
              </p>
            </div>
            {session.user.role !== "student" && (
              <Link href="/iLearn/instructor/create?type=Announcement">
                <button
                  className="button bg-primary text-white flex items-center"
                  data-testid="create-announcement-button"
                >
                  <PlusIcon /> Create
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* <SelectedAnnouncement
          id={selectedAnnouncement}
          gotIt={() => ReadAnnouncement(selectedAnnouncement)}
          close={() => setSelectedAnnouncement(null)}
        /> */}
        {/* {selectedAnnouncement !== null && ( */}

        {selectedAnnouncementId && selectedAnnouncement && (
          <PopupModal onClose={() => setSelectedAnnouncementId(null)}>
            <h3 className="h3 font-bold text-darkPrimary dark:text-primary mb-3">
              {selectedAnnouncement.courseId.toString() !== "all" &&
              selectedAnnouncement.courseInfo.length > 0
                ? selectedAnnouncement.courseInfo[0].title
                : "General Announcement!"}
            </h3>

            {/* Course Description */}
            <p className="body-2 text-gray-700 dark:text-gray-300 mb-3">
              {selectedAnnouncement.courseId.toString() !== "all" &&
              selectedAnnouncement.courseInfo.length > 0
                ? selectedAnnouncement.courseInfo[0].description
                : "Anyone, regardless of subject pursued, must follow the announcement below."}
            </p>

            {selectedAnnouncement.courseId.toString() !== "all" &&
              selectedAnnouncement.courseInfo.length > 0 && (
                <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 rounded-md mb-4">
                  {selectedAnnouncement.courseInfo[0].category}
                </span>
              )}

            {/* Announcement content */}
            <div className="w-full min-h-16 border border-black/60 dark:border-white/40 p-4 mt-3 rounded-md bg-white/70 dark:bg-zinc-800 relative">
              <h5 className="h5 font-semibold text-secondary dark:text-secondary border-b border-secondary pb-1 mb-2">
                {selectedAnnouncement.title}
              </h5>
              <p className="body-2 text-gray-800 dark:text-gray-200">
                {selectedAnnouncement.description}
              </p>
            </div>

            {/* Author Info */}
            <div className="mt-6 flex items-center gap-4 border-t border-gray-300 dark:border-white/30 pt-4">
              <Link
                href={`/Person/${selectedAnnouncement.createdBy.id}`}
                className="flex items-center gap-4 group"
              >
                {selectedAnnouncement.createdBy.picture ? (
                  <Image
                    src={selectedAnnouncement.createdBy.picture}
                    alt="selectedAnnouncement.createdBy"
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                ) : (
                  <User2 className="w-16 h-16 bg-zinc-300 rounded-full text-white p-2" />
                )}
                <div>
                  <p className="font-semibold group-hover:underline text-sm">
                    {selectedAnnouncement.createdBy.name}{" "}
                    {session?.user._id === selectedAnnouncement.createdBy.id &&
                      "(You)"}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {selectedAnnouncement.createdBy.about}
                  </p>
                </div>
              </Link>
              <span className="ml-auto text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <i className="fa fa-clock" />{" "}
                {new Date(selectedAnnouncement.createdAt).toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end gap-3">
              <Link
                href={
                  selectedAnnouncement.courseId.toString() === "all"
                    ? "/iLearn/my-courses"
                    : `/iLearn/my-courses/${selectedAnnouncement.courseId}`
                }
              >
                <button className="bg-secondary hover:bg-secondary text-white px-4 py-2 rounded">
                  Continue
                </button>
              </Link>
              <button
                className="bg-primary hover:bg-darkPrimary text-white px-4 py-2 rounded"
                onClick={() => setSelectedAnnouncementId(null)}
              >
                Got it
              </button>
            </div>
          </PopupModal>
        )}
        <div
          className={`min-h-52 h-full flex-1 max-h-72`}
          data-testid="announcement-list"
        >
          {loadingAnnouncements ? (
            Array.from({ length: 3 }).map((_, index) => (
              <LineSkeleton data-testid="line-skeleton" index={3} key={index} />
            ))
          ) : announcements?.length > 0 ? (
            Array.from({
              length: announcements.length > 3 ? 3 : announcements.length,
            }).map((_, index) => {
              const item = announcements[index];
              const isSeen = readAnnouncements.includes(
                announcements[index]._id
              );
              const isRead =
                announcements[index].students &&
                announcements[index].students.includes(session.user._id);
              return (
                <div
                  key={index}
                  className={`border-t ${
                    !isRead
                      ? isSeen
                        ? "hover:bg-gray-200 dark:hover:bg-gray-200/10"
                        : "bg-zinc-200 dark:bg-white/10"
                      : "hover:bg-gray-200 dark:hover:bg-gray-200/10"
                  }  cursor-pointer border-gray-300 dark:border-white/30 py-2 ${
                    item.createdBy.role === "admin" &&
                    "border-l-4 !border-l-lightPrimary"
                  } ${
                    item.createdBy.role === "instructor" &&
                    "border-l-4 !border-l-secondary"
                  } px-3 dark:text-white/90`}
                  data-testid={`announcement-${item._id}`}
                  onClick={() => {
                    if (!isSeen) {
                      dispatch(
                        setReadAnnouncements([...readAnnouncements, item._id])
                      );
                    }
                    setSelectedAnnouncementId(item._id);
                  }}
                >
                  <h3
                    className="text-lg font-semibold tracking-wide uppercase"
                    data-testid={`announcement-title-${item._id}`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-gray-600 dark:text-gray-300 w-full truncate"
                    data-testid={`announcement-description-${item._id}`}
                  >
                    {item.description}
                  </p>
                  <p
                    className="text-xs text-gray-500 dark:text-gray-400"
                    data-testid={`announcement-date-${item._id}`}
                  >
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              );
            })
          ) : (
            <div
              className="w-full h-52 flex items-center justify-center"
              data-testid="no-announcement"
            >
              <p className="text-gray-500 text-sm text-center py-2">
                No announcements available.
              </p>
            </div>
          )}
        </div>
        <div
          className={`w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 flex items-center justify-center ${
            announcements?.length <= 3 && "hidden"
          } text-darkPrimary underline gap-1`}
        >
          <Link href="/iLearn/announcements" className="flex">
            <EyeIcon />
            <span> See more</span>
          </Link>
        </div>
      </div>

      {session.user.role !== "admin" && (
        <div className="col-span-1 w-full border-2 rounded border-zinc-300 dark:border-white/50 overflow-hidden flex flex-col shadow-md">
          <h5 className="h5 text-primary font-semibold px-3 pt-2 group-hover:underline">
            Assignment
          </h5>
          <p className="text-sm text-primary leading-none px-3 pb-2 group-hover:underline">
            You have unfinished assignments in your studies.
          </p>
          <div className={`min-h-52 h-full flex-1 max-h-72 flex flex-col`}>
            {pendingAssignments?.data.length > 0 ? (
              Array.from({
                length:
                  pendingAssignments.data.length > 4
                    ? 4
                    : pendingAssignments.data.length,
              }).map((_, index) => {
                const item = pendingAssignments.data[index];
                const isSubmitted = submittedAssignments.data.includes(
                  item._id
                );
                return session.user.role === "student" ? (
                  <div
                    className="w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-200/10 flex"
                    key={index}
                    onClick={() => setSelectedAssignment(item)}
                  >
                    <span className="flex items-center -translate-x-1.5">
                      {((item.students &&
                        item.students.includes(session.user._id)) ||
                        isSubmitted) && (
                        <CheckCheck className="text-darkPrimary" />
                      )}
                    </span>
                    <div className="flex-1 w-full dark:text-white/90">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm truncate text-zinc-600 dark:text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={`/iLearn/instructor/assignments?ref=${item._id}`}
                    className="w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-200/10 flex"
                    key={index}
                  >
                    <span className="flex items-center -translate-x-1.5">
                      {((item.students &&
                        item.students.includes(session.user._id)) ||
                        isSubmitted) && (
                        <CheckCheck className="text-darkPrimary" />
                      )}
                    </span>
                    <div className="flex-1 w-full dark:text-white/90">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-sm truncate text-zinc-600 dark:text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : pendingAssignments.loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <LineSkeleton key={index} />
              ))
            ) : (
              <div className="w-full h-52 flex items-center justify-center">
                <p className="text-gray-500 text-sm text-center py-2">
                  No assignment available.
                </p>
              </div>
            )}
          </div>

          <div
            className={`w-full px-3 border-t border-gray-300 dark:border-white/50 py-2 flex items-center justify-center ${
              pendingAssignments.data?.length <= 3 && "hidden"
            } text-darkPrimary underline`}
          >
            <Link href="/iLearn/assignments" className="flex gap-1">
              <EyeIcon /> See more
            </Link>
          </div>
          {selectedAssignment && (
            <AssignmentDetailModal
              assignment={selectedAssignment}
              completed={
                (selectedAssignment.students &&
                  selectedAssignment.students.length > 0 &&
                  selectedAssignment.students.includes(session.user._id)) ||
                submittedAssignments.data.includes(selectedAssignment._id)
              }
              close={() => setSelectedAssignment(null)}
            />
          )}
        </div>
      )}
      <div className="col-span-1 w-full border-2 rounded border-zinc-300 dark:border-white/50 overflow-hidden flex flex-col shadow-md">
        <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto h-full flex flex-col overflow-x-auto">
          <h1 className="text-2xl font-bold mb-6">Admin Dashboard Overview</h1>
          <AdminDashboardChart data={analytics?.monthlyCourseCounts} />
        </div>
      </div>

      <div
        className="w-full mt-3 lg:col-span-3 col-span-1 flex pr-8 md:flex-row flex-col"
        data-testid="popular-course-section"
      >
        <div className="w-full flex-1">
          <h4
            className="h4 text-primary font-semibold px-3 pt-2"
            data-testid="popular-course-header"
          >
            Popular Course
          </h4>
          <p
            className="body-2 text-primary leading-none px-3 pb-2"
            data-testid="popular-course-description"
          >
            Explore our most-enrolled courses and start learning today.
          </p>
        </div>
        <Link
          className="ml-auto"
          href={
            session.user.role === "student"
              ? "/iLearn/enroll"
              : `/iLearn/${session.user.role}/courses`
          }
        >
          <button
            className="button bg-primary hover:bg-primary text-white"
            data-testid="view-courses-button"
          >
            {session.user.role === "student" ? "All Courses" : "My Courses"}
          </button>
        </Link>
      </div>
      <div
        className="lg:col-span-3 col-span-1 flex flex-row overflow-x-auto gap-5 pb-5 h-max overflow-y-hidden flex-nowrap"
        data-testid="course-list"
      >
        {top4Courses?.top4CoursesLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <CourseCardSkeleton key={index} data-testid="course-skeleton" />
          ))
        ) : top4Courses?.data?.length > 0 ? (
          top4Courses?.data.map((course, index) => (
            <Link
              href={`/iLearn/${
                (currentUser.user?.myCourses ?? []).includes(course._id)
                  ? "my-courses"
                  : "enroll"
              }/${course._id}`}
              key={course._id + " " + index}
              className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200  dark:border-white/60 hover:scale-[1.01] transition hover:shadow-lg cursor-pointer dark:hover:border-white flex flex-col"
            >
              <CourseCard
                course={course}
                data-testid={`course-card-${course._id}`}
                purchased={(currentUser.user?.myCourses ?? []).includes(
                  course._id
                )}
                created={session?.user && session.user.role === "instructor"}
              />
            </Link>
          ))
        ) : (
          <p
            className="text-gray-500 dark:text-gray-400"
            data-testid="no-top-courses"
          >
            No top courses available
          </p>
        )}
      </div>
      {session.user.role === "student" && (
        <Progress currentUser={currentUser} data-testid="progress-component" />
      )}
    </main>
  );
}
