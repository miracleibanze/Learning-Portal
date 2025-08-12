import { NextRequest, NextResponse } from "next/server";
import { Course } from "@lib/models/Course";
import { connectDB } from "@lib/db";
import { User } from "@lib/models/User";
import { UserType } from "@type/User";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user._id;

    console.error("user id received is: ", userId);
    const user: UserType | null = await User.findById(userId);

    if (!user) {
      console.error("user is not found");
      throw new Error("user not found");
    }
    console.error("user is found");

    const courses = await Course.find({
      _id: { $in: user.myCourses },
    })
      .select("title description tags category status")
      .exec();
    console.error("This is the length of my courses: ", courses.length);
    return NextResponse.json({ success: true, data: courses }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching courses:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.log("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = session?.user._id;
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
    })
      .select("title description tags students price category status")
      .exec();

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

export async function PUT(req: NextRequest) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?._id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await req.json();

    console.log("updates: ", updates);

    const updatedUser = await User.findByIdAndUpdate(
      session.user._id,
      { $set: updates },
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // console.log("Update user : ", updatedUser);

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}
