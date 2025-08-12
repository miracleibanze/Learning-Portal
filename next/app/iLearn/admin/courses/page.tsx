"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import {
  fetchDraftCourses,
  fetchPublishedCourses,
} from "@redux/slices/coursesSlice";

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Courses Management</h1>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            view === "published" ? "bg-green-600 text-white" : "bg-gray-200"
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
            view === "draft" ? "bg-yellow-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => {
            setView("draft");
            setPageIndex(0);
          }}
        >
          Draft Courses
        </button>
      </div>

      {loading ? (
        <p>Loading {view} courses...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Description</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No {view} courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course._id}>
                  <td className="border border-gray-300 p-2">{course.title}</td>
                  <td className="border border-gray-300 p-2">
                    {course.description || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {course.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

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
