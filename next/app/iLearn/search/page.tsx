"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { fetchUser } from "@redux/slices/userSlice";
import {
  fetchCourses,
  fetchPeople,
  setSearchingContext,
} from "@redux/slices/searchSlice";
import { LineSkeleton } from "@components/designs/Skeletons";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import CourseCard from "@components/CourseCard";
import { useSession } from "next-auth/react";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchText = searchParams.get("q") || "";
  const category = searchParams.get("category") || "all";
  const [selectedCategory, setSelectedCategory] = useState(category);

  const { data: session } = useSession();
  const { user } = useSelector((state: RootState) => state.user);
  const { people, courses, context } = useSelector(
    (state: RootState) => state.search
  );

  const [peopleList, setPeopleList] = useState(people.data);
  const [courseList, setCourseList] = useState(courses.data);
  const [peoplePageIndex, setPeoplePageIndex] = useState(0);
  const [coursesPageIndex, setCoursesPageIndex] = useState(0);

  const filterOptions = ["all", "people", "courses"];

  // Set category from query param
  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);

  // Initial fetch and reset pagination on search/category change
  useEffect(() => {
    setPeoplePageIndex(0);
    setCoursesPageIndex(0);
    setPeopleList([]);
    setCourseList([]);

    if (searchText !== context) {
      dispatch(setSearchingContext(searchText));
    }

    if (category !== "courses") {
      dispatch(fetchPeople({ query: searchText, index: 0 })).then(
        (res: any) => {
          if (res.meta.requestStatus === "fulfilled") {
            setPeopleList(res.payload);
          }
        }
      );
    }

    if (category !== "people") {
      dispatch(fetchCourses({ query: searchText, index: 0 })).then(
        (res: any) => {
          if (res.meta.requestStatus === "fulfilled") {
            setCourseList(res.payload);
          }
        }
      );
    }
  }, [searchText, category, pathname]);

  const loadMorePeople = () => {
    const nextIndex = peoplePageIndex + 1;
    setPeoplePageIndex(nextIndex);
    dispatch(fetchPeople({ query: searchText, index: nextIndex })).then(
      (res: any) => {
        if (res.meta.requestStatus === "fulfilled" && res.payload.length > 0) {
          setPeopleList((prev) => [...prev, ...res.payload]);
        }
      }
    );
  };

  const loadMoreCourses = () => {
    const nextIndex = coursesPageIndex + 1;
    setCoursesPageIndex(nextIndex);
    dispatch(fetchCourses({ query: searchText, index: nextIndex })).then(
      (res: any) => {
        if (res.meta.requestStatus === "fulfilled" && res.payload.length > 0) {
          setCourseList((prev) => [...prev, ...res.payload]);
        }
      }
    );
  };

  const courseLink = (courseId: string) => {
    if (session?.user.role === "student") {
      return `/iLearn/instructor/courses/${courseId}`;
    }
    return user?.myCourses?.includes(courseId)
      ? `/iLearn/enroll/${courseId}`
      : `/iLearn/my-courses/${courseId}`;
  };

  return (
    <main>
      <h3 className="h3 mb-6">
        Search results for "{decodeURIComponent(searchText)}"
      </h3>

      <ul className="flex flex-wrap gap-2 my-6">
        {filterOptions.map((type) => (
          <li key={type}>
            <Link
              href={`/iLearn/search?q=${encodeURIComponent(
                searchText
              )}&category=${type}`}
            >
              <button
                className={`px-4 py-1 rounded-lg text-sm font-medium capitalize ${
                  selectedCategory === type
                    ? "bg-secondary text-white"
                    : "bg-gray-200 dark:bg-white/10 dark:text-white hover:bg-gray-300"
                }`}
              >
                {type}
              </button>
            </Link>
          </li>
        ))}
      </ul>

      {/* People Results */}
      {selectedCategory !== "courses" && (
        <>
          <h4 className="h4 text-primary font-semibold border-b mb-4 w-full shadow-b">
            People
          </h4>
          <div className="w-full flex gap-x-2 flex-wrap gap-y-4 px-4">
            {people.loading && peoplePageIndex === 0 ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="w-52 h-72 rounded-lg border shadow flex flex-col"
                  key={index}
                >
                  <div className="w-full bg-zinc-200 dark:bg-white/20 h-20 skeleton-shimmer" />
                  <div className="w-20 bg-white dark:bg-zinc-900 h-20 aspect-square -translate-y-1/2 rounded-full ml-2" />
                  <div className="w-full h-full flex-1 -translate-y-8">
                    <LineSkeleton noBorder index={4} />
                  </div>
                </div>
              ))
            ) : peopleList.length > 0 ? (
              peopleList.map((person) => (
                <div
                  key={person._id}
                  className="w-52 h-72 rounded-lg border shadow flex flex-col overflow-hidden hover:scale-105 transition-all"
                >
                  <div className="w-full bg-primary dark:bg-darkPrimary h-20">
                    <Image
                      src="/logo.png"
                      alt="logo"
                      width={80}
                      height={80}
                      className="w-full h-full p-5 pr-2 object-contain"
                    />
                  </div>
                  {person.picture ? (
                    <Image
                      src={person.picture}
                      alt="profile"
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20 aspect-square -translate-y-1/2 rounded-full ml-2"
                    />
                  ) : (
                    <div className="w-20 h-20 aspect-square -translate-y-1/2 rounded-full bg-zinc-300 dark:bg-white p-3 ml-2">
                      <User className="w-full h-full" color="white" />
                    </div>
                  )}
                  <div className="flex-1 -translate-y-10 p-3">
                    <p className="font-semibold">{person.name}</p>
                    <p className="truncate-two-lines text-sm mb-2">
                      {person.about || "No description available."}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-white/70 italic mb-4">
                      {person.email}
                    </p>
                    <div className="flex justify-between">
                      <button className="bg-primary text-white rounded-md py-1 text-sm px-3">
                        Contact
                      </button>
                      <button className="bg-primary text-white rounded-md py-1 text-sm px-3">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="min-w-full px-4 py-8 font-bold text-zinc-500 dark:text-white/80 text-center">
                No people found.
              </p>
            )}
          </div>
          {peopleList.length % 12 === 0 && !people.loading && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMorePeople}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Load More People
              </button>
            </div>
          )}
        </>
      )}

      {/* Courses Results */}
      {selectedCategory !== "people" && (
        <>
          <h4 className="h4 text-primary font-semibold border-b mb-4 w-full shadow-b">
            Courses
          </h4>
          <div className="w-full flex gap-x-2 flex-wrap gap-y-4 px-4">
            {courses.loading && coursesPageIndex === 0 ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  className="w-52 h-72 rounded-lg border shadow flex flex-col"
                  key={index}
                >
                  <div className="w-full bg-zinc-200 dark:bg-white/20 h-20 skeleton-shimmer" />
                  <div className="w-20 bg-white dark:bg-zinc-900 h-20 aspect-square -translate-y-1/2 rounded-full ml-2" />
                  <div className="w-full h-full flex-1 -translate-y-8">
                    <LineSkeleton noBorder index={4} />
                  </div>
                </div>
              ))
            ) : courseList.length > 0 ? (
              courseList.map((course) => (
                <Link
                  key={course._id}
                  href={courseLink(course._id)}
                  className="shrink-0 w-64 bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200 dark:border-white/60 hover:scale-[1.01] transition hover:shadow-lg cursor-pointer dark:hover:border-white flex flex-col"
                >
                  <CourseCard
                    course={course}
                    purchased={user?.myCourses?.includes(course._id)}
                    created={session?.user?.role === "instructor"}
                  />
                </Link>
              ))
            ) : (
              <p className="min-w-full px-4 py-8 font-bold text-zinc-500 dark:text-white/80 text-center">
                No courses found.
              </p>
            )}
          </div>
          {courseList.length % 12 === 0 && !courses.loading && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreCourses}
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Load More Courses
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Page;
