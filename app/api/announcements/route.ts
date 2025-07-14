import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { Announcement } from "@lib/models/Announcement";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { User } from "@lib/models/User";
import { Course } from "@lib/models/Course";

export async function GET(req: Request) {
  await connectDB();
  console.log("✅ Connected to database");

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    console.log("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("🔍 Fetching user and enrolled courses...");
    const user = await User.findById(session.user._id)
      .select("myCourses role")
      .exec();
    if (!user) {
      console.log("❌ User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ User found:", user.myCourses);

    let enrolledCourseIds;

    if (user.role === "admin") {
      const allCourses = await Course.find().select("_id").lean();
      enrolledCourseIds = allCourses.map((course) => course._id);
    } else {
      enrolledCourseIds = user.myCourses;
    }

    console.log("📚 Enrolled Course IDs:", enrolledCourseIds);

    const announcements = await Announcement.aggregate([
      {
        $match: {
          $or: [{ courseId: { $in: enrolledCourseIds } }, { courseId: "all" }],
        },
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "courseInfo",
        },
      },
      {
        $addFields: {
          courseInfo: {
            $map: {
              input: "$courseInfo",
              as: "course",
              in: {
                _id: "$$course._id",
                title: "$$course.title",
                description: "$$course.description",
                category: "$$course.category",
                thumbnail: "$$course.thumbnail",
                instructor: "$$course.instructor",
              },
            },
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 10 },
    ]);

    console.log("📢 Announcements fetched:", announcements.length);
    return NextResponse.json(announcements, { status: 200 });
  } catch (error: any) {
    console.error("🚨 Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
