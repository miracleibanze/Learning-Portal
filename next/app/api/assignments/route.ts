import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { Course } from "@lib/models/Course";
import { Assignment } from "@lib/models/Assignment";
import { Types } from "mongoose";

export async function GET(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "instructor") {
    console.log("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = new Types.ObjectId(session.user._id);
  console.error(userId);

  try {
    const assignments = await Assignment.find({ instructor: userId })
      .lean()
      .exec();

    if (!assignments)
      return NextResponse.json("Unable to find assignments", { status: 404 });

    console.log("assignment found : ", assignments.length);

    return NextResponse.json(assignments, { status: 200 });
  } catch (error: any) {
    console.error("🚨 Error fetching assignments:", error);
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
