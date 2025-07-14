import { NextResponse } from "next/server";
import { Course } from "@lib/models/Course";
import { connectDB } from "@lib/db";

export async function GET() {
  try {
    await connectDB();

    const courses = await Course.find()
      .select("title description tags price category")
      .exec();

    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await connectDB();

    console.error("fetching top courses");
    let topCourses = await Course.aggregate([
      // Ensure students array exists
      {
        $addFields: {
          students: {
            $cond: {
              if: { $isArray: "$students" },
              then: "$students",
              else: [],
            },
          },
        },
      },

      // Compute student count
      {
        $addFields: {
          studentCount: { $size: "$students" },
        },
      },

      // Sort by student count (descending)
      { $sort: { studentCount: -1 } },

      // Fetch instructor details
      {
        $lookup: {
          from: "users", // Ensure this matches your actual User collection name
          localField: "instructor",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },

      // Handle cases where instructorDetails may be empty
      {
        $addFields: {
          instructorDetails: {
            $arrayElemAt: ["$instructorDetails", 0],
          },
        },
      },

      // Ensure at least 4 courses are returned by taking random ones if needed
      { $limit: 4 },

      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          category: 1,
          language: 1,
          level: 1,
          price: 1,
          status: 1,
          students: 1,
          tags: 1,
          thumbnail: 1,
          chapters: 1,
          "instructor._id": "$instructorDetails._id",
          "instructor.name": "$instructorDetails.name",
          "instructor.email": "$instructorDetails.email",
          "instructor.picture": "$instructorDetails.picture",
        },
      },
    ]);
    // If not enough courses, return random 4 from all available
    if (topCourses.length < 4) {
      const allCourses = await Course.find({})
        .populate("instructor", "_id name email picture")
        .limit(4)
        .lean();
      topCourses = allCourses;
    }
    console.log("fetched courses in top courses: ", topCourses.length);
    return NextResponse.json(
      { success: true, data: topCourses },
      { status: 200 }
    );
  } catch (error) {
    console.error("🚨 Error fetching top courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch top courses" },
      { status: 500 }
    );
  }
}
