"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import {
  fetchDraftCourses,
  fetchPublishedCourses,
} from "@redux/slices/coursesSlice";
import Link from "next/link";

export default function CoursesAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: published,
    loading: loadingPublished,
    error: errorPublished,
  } = useSelector((state: RootState) => state.courses.publishedCourses);
  const {
    data: drafts,
    loading: loadingDrafts,
    error: errorDrafts,
  } = useSelector((state: RootState) => state.courses.draftCourses);

  const [view, setView] = useState<"published" | "draft">("published");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (view === "published") {
      dispatch(fetchPublishedCourses({ index: pageIndex }));
    } else {
      dispatch(fetchDraftCourses({ index: pageIndex }));
    }
  }, [view, pageIndex, dispatch]);

  const courses = view === "published" ? published : drafts;
  const loading = view === "published" ? loadingPublished : loadingDrafts;
  const error = view === "published" ? errorPublished : errorDrafts;

  return (
    <div className="p-4 max-w-5xl w-full mx-auto">
      <h3 className="h3 font-bold mb-6">Courses Management</h3>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            view === "published"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:-translate-4 transition-all"
          }`}
          onClick={() => {
            setView("published");
            setPageIndex(0);
          }}
        >
          Published Courses
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "draft"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:-translate-4 transition-all"
          }`}
          onClick={() => {
            setView("draft");
            setPageIndex(0);
          }}
        >
          Draft Courses
        </button>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        {loading && (
          <p className="absolute top-1/2 -translate-y-1/2 right-1/2 -translate-x-1/2">
            <p className="w-20 h-20 rounded-full aspect-square border-y-secondary border-x-primary border-4 flex-0 animate-spin transition-[1s]"></p>
          </p>
        )}
        {error && <p className="text-red-600 italic">{error}</p>}

        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Title</th>
            <th className="border border-gray-300 p-2">Description</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">CreatedAt</th>
          </tr>
        </thead>
        <tbody className="relative">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">...</td>
                <td className="border border-gray-300 p-2">...</td>
                <td className="border border-gray-300 p-2">...</td>
                <td className="border border-gray-300 p-2">...</td>
              </tr>
            ))
          ) : error ? (
            Array.from({ length: 8 }).map((_, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">...</td>
                <td className="border border-gray-300 p-2">...</td>
                <td className="border border-gray-300 p-2">...</td>
                <td className="border border-gray-300 p-2">...</td>
              </tr>
            ))
          ) : courses.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No {pageIndex !== 0 && "more"} {view} found.
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course._id}>
                <td className="border border-gray-300 p-2 text-sky-600 dark:text-sky-400 hover:underline">
                  <Link href={`/iLearn/courses/${course._id}`}>
                    {course.title}
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">
                  {course.description || "-"}
                </td>
                <td className="border border-gray-300 p-2">{course.status}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(course.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <button
          disabled={pageIndex === 0}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
        >
          Previous
        </button>
        <span>Page {pageIndex + 1}</span>
        <button
          disabled={courses.length < 12}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPageIndex((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
