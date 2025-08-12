"use client";

import { useEffect } from "react";
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

interface AnalyticsData {
  totalCourses: number;
  publishedCount: number;
  draftCount: number;
  totalStudents: number;
  averageRating: number;
  monthlyCourseCounts: { month: string; count: number }[];
}

export default function CourseAnalyticsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [analytics, setAnalytics] = React.useState<AnalyticsData | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError(null);
      try {
        // Fetch course analytics from your backend API
        const res = await axios.get("/api/admin/course-analytics");
        setAnalytics(res.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) return <p className="p-4">Loading analytics...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error}</p>;
  if (!analytics) return null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Analytics</h1>

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

// import { NextResponse } from "next/server";
// import { connectDB } from "@lib/db";
// import { Course } from "@lib/models/Course";

// export async function GET(req: Request) {
//   await connectDB();

//   try {
//     // 1. Total courses count
//     const totalCourses = await Course.countDocuments();

//     // 2. Count published and draft courses
//     const publishedCount = await Course.countDocuments({ status: "Published" });
//     const draftCount = await Course.countDocuments({ status: "Draft" });

//     // 3. Total students enrolled across all courses
//     // Assuming enrolledStudents is an array of user IDs per course
//     const courses = await Course.find().select("enrolledStudents rating createdAt").lean();

//     // Sum students enrolled, assuming enrolledStudents is an array of user ids
//     let totalStudents = 0;
//     let ratingSum = 0;
//     let ratingCount = 0;

//     courses.forEach((course) => {
//       if (Array.isArray(course.enrolledStudents)) {
//         totalStudents += course.enrolledStudents.length;
//       }
//       if (typeof course.rating === "number") {
//         ratingSum += course.rating;
//         ratingCount++;
//       }
//     });

//     const averageRating = ratingCount > 0 ? ratingSum / ratingCount : 0;

//     // 4. Monthly course creation counts (last 6 months)
//     const now = new Date();
//     const sixMonthsAgo = new Date();
//     sixMonthsAgo.setMonth(now.getMonth() - 5);
//     sixMonthsAgo.setDate(1); // from start of the month

//     // Aggregate by month and year
//     const monthlyAggregation = await Course.aggregate([
//       {
//         $match: {
//           createdAt: { $gte: sixMonthsAgo },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$createdAt" },
//             month: { $month: "$createdAt" },
//           },
//           count: { $sum: 1 },
//         },
//       },
//       {
//         $sort: {
//           "_id.year": 1,
//           "_id.month": 1,
//         },
//       },
//     ]);

//     // Format result as [{ month: "Jan", count: 10 }, ...]
//     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // Fill months with zero count if missing
//     const monthlyCourseCounts = [];
//     for (let i = 0; i < 6; i++) {
//       const date = new Date();
//       date.setMonth(now.getMonth() - 5 + i);
//       const year = date.getFullYear();
//       const month = date.getMonth() + 1;

//       const found = monthlyAggregation.find(
//         (m) => m._id.year === year && m._id.month === month
//       );

//       monthlyCourseCounts.push({
//         month: monthNames[month - 1],
//         count: found ? found.count : 0,
//       });
//     }

//     return NextResponse.json({
//       totalCourses,
//       publishedCount,
//       draftCount,
//       totalStudents,
//       averageRating,
//       monthlyCourseCounts,
//     });
//   } catch (error) {
//     console.error("[Course Analytics ERROR]", error);
//     return NextResponse.json(
//       { message: "Failed to fetch course analytics" },
//       { status: 500 }
//     );
//   }
// }
