import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { Course } from "@lib/models/Course";

export async function GET(req: Request) {
  await connectDB();

  try {
    // 1. Total courses count
    const totalCourses = await Course.countDocuments();

    // 2. Count published and draft courses
    const publishedCount = await Course.countDocuments({ status: "Published" });
    const draftCount = await Course.countDocuments({ status: "Draft" });

    // 3. Total students enrolled across all courses
    // Assuming students is an array of user IDs per course
    const courses = await Course.find()
      .select("students rating createdAt")
      .lean();

    // Sum students enrolled, assuming enrolledStudents is an array of user ids
    let totalStudents = 0;
    let ratingSum = 0;
    let ratingCount = 0;

    courses.forEach((course) => {
      if (Array.isArray(course.students)) {
        totalStudents += course.students.length;
      }
      if (typeof course.rating === "number") {
        ratingSum += course.rating;
        ratingCount++;
      }
    });

    const averageRating = ratingCount > 0 ? ratingSum / ratingCount : 0;

    // 4. Monthly course creation counts (last 6 months)
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 5);
    sixMonthsAgo.setDate(1); // from start of the month

    // Aggregate by month and year
    const monthlyAggregation = await Course.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);
    // const monthlyAggregation = await Course.find();

    // Format result as [{ month: "Jan", count: 10 }, ...]
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Fill months with zero count if missing
    const monthlyCourseCounts = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(now.getMonth() - 5 + i);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const found = monthlyAggregation.find(
        (m) => m._id.year === year && m._id.month === month
      );

      monthlyCourseCounts.push({
        month: monthNames[month - 1],
        count: found ? found.count : 0,
      });
    }

    console.error("monthlyCourseCount : ", monthlyCourseCounts);
    console.error("monthlyAggregation : ", monthlyAggregation.length);

    return NextResponse.json({
      totalCourses,
      publishedCount,
      draftCount,
      totalStudents,
      averageRating,
      monthlyCourseCounts,
    });
  } catch (error) {
    console.error("[Course Analytics ERROR]", error);
    return NextResponse.json(
      { message: "Failed to fetch course analytics" },
      { status: 500 }
    );
  }
}
