import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Course } from "@/lib/models/Course";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = await params;

    await connectDB();

    // Find the course and select only chapters (no content population)
    const course = await Course.findById(courseId).select("chapters").exec();

    if (!course || !course.chapters) {
      return NextResponse.json(
        { success: false, message: "Course or chapters not found" },
        { status: 404 }
      );
    }

    console.error("found contents", course);

    return NextResponse.json({ chapters: course.chapters });
  } catch (error) {
    console.error("❌ Error fetching chapters:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
