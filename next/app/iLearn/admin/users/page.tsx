"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import { fetchStudents, fetchTeachers } from "@redux/slices/userSlice";

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>

      <div className="mb-4">
        <button
          className={`px-4 py-2 mr-2 rounded ${
            view === "students" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("students")}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "teachers" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("teachers")}
        >
          Teachers
        </button>
      </div>

      {loading ? (
        <p>Loading {view}...</p>
      ) : error ? (
        <p className="text-red-600">Error: {error}</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">About</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center p-4">
                  No {view} found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id}>
                  <td className="border border-gray-300 p-2">{user.name}</td>
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
