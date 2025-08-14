"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { fetchAnalytics } from "@redux/slices/AnalyticsSlice";
import { notFound, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
// import CountUp from "react-countup";
import { BookOpen, FileText, Users, Star } from "lucide-react";

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

  const statCards = [
    {
      label: "Total Courses",
      value: analytics.totalCourses,
      icon: <BookOpen className="w-6 h-6 text-sky-500" />,
      bg: "bg-sky-50",
    },
    {
      label: "Published Courses",
      value: analytics.publishedCount,
      icon: <FileText className="w-6 h-6 text-emerald-500" />,
      bg: "bg-emerald-50",
    },
    {
      label: "Draft Courses",
      value: analytics.draftCount,
      icon: <FileText className="w-6 h-6 text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      label: "Total Students",
      value: analytics.totalStudents,
      icon: <Users className="w-6 h-6 text-purple-500" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="p-6 max-w-7xl w-full mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        📊 Course Analytics
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className={`shadow rounded-lg p-5 flex flex-col items-center justify-center ${card.bg} hover:scale-105 transition-transform duration-200`}
          >
            <div className="mb-3">{card.icon}</div>
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-2xl font-semibold">
              {/* <CountUp end={card.value} duration={1.5} separator="," /> */}
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Average Rating */}
      <div className="bg-white shadow rounded-lg p-6 mb-8 text-center">
        <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" /> Average Course Rating
        </h2>
        <p className="text-4xl font-bold text-yellow-500">
          {analytics.averageRating.toFixed(2)} / 5.0
        </p>
      </div>

      {/* Courses Per Month Chart */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          Courses Created Per Month
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.monthlyCourseCounts}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#4ade80"
              name="Courses Created"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
