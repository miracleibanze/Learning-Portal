import { NextResponse } from "next/server";
import { Course } from "@lib/models/Course";
import { connectDB } from "@lib/db";
import { User } from "@lib/models/User";
import mongoose, { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user._id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const instructorId = new Types.ObjectId(userId);
    console.error("User ID received:", userId);
    console.error(
      "Converted Instructor ID:",
      instructorId,
      " ",
      typeof instructorId
    );
    const courses = await Course.find({ instructor: instructorId })
      .populate("instructor", "name email picture")
      .exec();

    console.log("Number of courses found: ", courses.length);

    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Extract userId from params
    const { userId } = params;
    console.log("User ID received is:", userId);

    // Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 400 }
      );
    }

    // Fetch user data
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found");
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // Fetch courses not enrolled by the user
    const courses = await Course.find({
      _id: { $nin: user.myCourses }, // Use $nin to exclude multiple IDs
    }).exec();

    console.log("Number of courses found:", courses.length);
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching top courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch top courses" },
      { status: 500 }
    );
  }
}
