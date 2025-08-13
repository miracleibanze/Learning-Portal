"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import { fetchStudents, fetchTeachers } from "@redux/slices/userSlice";
import Link from "next/link";

export default function UsersAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { students, teachers, loading, error } = useSelector(
    (state: RootState) => state.user.allUsers
  );
  const [view, setView] = useState<"students" | "teachers">("students");
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (view === "students") {
      dispatch(fetchStudents({ index: pageIndex }));
    } else {
      dispatch(fetchTeachers({ index: pageIndex }));
    }
  }, [view, pageIndex, dispatch]);

  const users = view === "students" ? students : teachers;

  return (
    <div className="p-4 max-w-5xl w-full mx-auto">
      <h3 className="h3 font-bold mb-6">Manage Users</h3>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            view === "students"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:scale-[1.03] transition-all"
          }`}
          onClick={() => setView("students")}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "teachers"
              ? "bg-primary text-white"
              : "bg-gray-200 hover:scale-[1.03] transition-all"
          }`}
          onClick={() => setView("teachers")}
        >
          Teachers
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
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">About</th>
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
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center p-4">
                No more {view} found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2 text-sky-600 dark:text-sky-400 hover:underline">
                  <Link href={`/iLearn/profile/${user.username}`}>
                    {user.name}
                  </Link>
                </td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">
                  {user.about || "-"}
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
          disabled={users.length < 12}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPageIndex((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
