import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { User } from "@lib/models/User";
import { Assignment } from "@lib/models/Assignment";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.log("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user._id;

  console.error("Fetching pending assignments for user:", userId);

  await connectDB();

  try {
    const user = await User.findById(userId).select("myCourses");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const courseIds = user.myCourses.map((course: any) => course);

    console.error("Courses found:", courseIds);

    const pendingAssignments = await Assignment.find({
      courseId: { $in: courseIds },
    })
      .populate("instructor", "name email picture role")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(); // Convert to plain objects

    console.error("Assignments found:", pendingAssignments.length);

    return NextResponse.json(pendingAssignments);
  } catch (error) {
    console.error("Error fetching pending assignments:", error);
    return NextResponse.json(
      { message: "Error fetching pending assignments", error },
      { status: 500 }
    );
  }
}
