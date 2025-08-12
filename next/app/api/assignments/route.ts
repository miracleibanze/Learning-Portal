import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { Course } from "@lib/models/Course";
import { Assignment } from "@lib/models/Assignment";
import { Types } from "mongoose";
import { User } from "@lib/models/User";

export async function GET(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user || session.user.role !== "instructor") {
    console.log("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user._id;
  console.error(userId);
  console.error("fetching assignments by :", userId);
  try {
    const assignments = (await Assignment.find().lean().exec()).filter(
      (item) => item.createdBy.id === userId
    );

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

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      courseTitle,
      type,
      deadline,
      courseId,
      questions,
      codeInstructions,
    } = body;

    await connectDB();

    const teacher = {
      id: session.user._id.toString(),
      name: session.user.name,
      about: session.user.about,
      picture: session.user.picture,
      role: session.user.role,
    };
    if (type === "quiz") {
      const newAssignment = new Assignment({
        title,
        description,
        type,
        deadline,
        courseTitle,
        courseId,
        createdBy: teacher,
        questions,
      });

      await newAssignment.save();
    }
    if (type === "coding") {
      const newAssignment = new Assignment({
        title,
        description,
        type,
        deadline,
        courseTitle,
        courseId,
        createdBy: teacher,
        codeInstructions,
      });

      await newAssignment.save();
    }

    return NextResponse.json(
      { message: "Assignment created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("🚨 Error creating assignment:", error);
    return NextResponse.json(
      { success: false, message: "Failed creating assignment" },
      { status: 500 }
    );
  }
}
