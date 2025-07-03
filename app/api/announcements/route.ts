import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { Announcement } from "@lib/models/Announcement";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { User } from "@lib/models/User";

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
    const user = await User.findById(session.user._id).exec();

    if (!user) {
      console.log("❌ User not found in database");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("✅ User found:", user.myCourses);

    let announcements;
    const enrolledCourseIds = user.myCourses.map((courseId: any) => courseId);
    console.log("📚 Enrolled Course IDs:", enrolledCourseIds);

    announcements = await Announcement.aggregate([
      {
        $match: {
          $or: [
            { courseId: { $in: enrolledCourseIds } }, // Match enrolled courses
            { courseId: "all" }, // Include announcements for all courses
          ],
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
      { $sort: { createdAt: -1 } }, // Sort by newest
      { $limit: 10 }, // Limit to 10 announcements
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
