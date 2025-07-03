import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { User } from "@lib/models/User";
import assignment from "@lib/models/assignment";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    console.log("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!session.user._id) {
    return NextResponse.json(
      { message: "Student ID is required" },
      { status: 400 }
    );
  }

  await connectDB();
  const userId = session.user._id;
  try {
    // Fetch the user document based on userId
    const user = await User.findById(userId).select("myCourses");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const courseIds = user.myCourses.map((course: any) => course.toString());

    // Fetch pending assignment for courses the user is enrolled in, limit to 10
    const pendingAssignments = await assignment
      .find({
        courseId: { $in: courseIds },
        finishedStudents: { $ne: userId },
      })
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .limit(10); // Limit to 10 assignments

    return NextResponse.json(pendingAssignments);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching pending assignment", error },
      { status: 500 }
    );
  }
}
