import { NextResponse } from "next/server";
import { User } from "@lib/models/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user._id;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Parse request body correctly
    const { courseId, completedModules } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { message: "Invalid course ID" },
        { status: 400 }
      );
    }

    // Ensure updateProgress exists in the User model
    if (typeof user.updateProgress !== "function") {
      return NextResponse.json(
        { message: "Progress update method not found" },
        { status: 500 }
      );
    }

    // Update progress
    await user.updateProgress(courseId, completedModules);

    return NextResponse.json({ message: "Progress updated successfully" });
  } catch (error) {
    console.error("Error updating user progress:", error);
    return NextResponse.json(
      { message: "Failed to update progress" },
      { status: 500 }
    );
  }
}
