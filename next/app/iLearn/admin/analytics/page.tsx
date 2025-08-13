"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import axios from "axios";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { fetchAnalytics, IAnalyticsData } from "@redux/slices/AnalyticsSlice";
import { notFound, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CourseAnalyticsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: analytics } = useSelector(
    (state: RootState) => state.analytics
  );
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user.role !== "admin") {
      notFound();
      return;
    }
    if (!analytics) dispatch(fetchAnalytics());
  }, [dispatch, pathname]);

  if (loading) return <p className="p-4">Loading analytics...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!analytics) return null;

  return (
    <div className="p-6 max-w-6xl w-full mx-auto">
      <h1 className="h3 font-bold mb-6">Course Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-semibold">{analytics.totalCourses}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Published Courses</p>
          <p className="text-2xl font-semibold">{analytics.publishedCount}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Draft Courses</p>
          <p className="text-2xl font-semibold">{analytics.draftCount}</p>
        </div>
        <div className="bg-white shadow rounded p-4 text-center">
          <p className="text-sm text-gray-500">Total Students Enrolled</p>
          <p className="text-2xl font-semibold">{analytics.totalStudents}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Average Course Rating</h2>
        <p className="text-4xl font-bold text-yellow-500">
          {analytics.averageRating.toFixed(2)} / 5.0
        </p>
      </div>

      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">
          Courses Created Per Month
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.monthlyCourseCounts}>
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#4ade80" name="Courses Created" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// {
//   "totalCourses": 120,
//   "publishedCount": 85,
//   "draftCount": 35,
//   "totalStudents": 2340,
//   "averageRating": 4.23,
//   "monthlyCourseCounts": [
//     { "month": "Jan", "count": 10 },
//     { "month": "Feb", "count": 12 },
//     { "month": "Mar", "count": 8 },
//     { "month": "Apr", "count": 14 },
//     { "month": "May", "count": 7 },
//     { "month": "Jun", "count": 9 }
//   ]
// }

//
