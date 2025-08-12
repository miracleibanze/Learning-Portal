import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { JoinRequest } from "@lib/models/JoinRequest";
import { User } from "@lib/models/User";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await JoinRequest.find({
      instructorId: session.user._id,
    }).exec();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("🚨 Error get Join Request data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to get Join Request data" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { courseId, courseName, instructorId, instructorName, coursePrice } =
      body;

    if (!courseId || !courseName || !instructorId || !instructorName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const joinRequest = new JoinRequest({
      courseId,
      courseName,
      instructorId,
      instructorName,
      name: session.user.name,
      userId: session.user._id,
      coursePrice,
    });

    await joinRequest.save();

    await User.findByIdAndUpdate(session.user._id, {
      $addToSet: { joinRequests: courseId },
    })
      .lean()
      .exec();

    return NextResponse.json(
      { message: "Join Request sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("🚨 Error Sending Join Request data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to Send Join Request data" },
      { status: 500 }
    );
  }
}
