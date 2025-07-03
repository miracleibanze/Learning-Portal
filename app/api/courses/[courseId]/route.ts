import { NextResponse } from "next/server";
import { Course } from "@lib/models/Course";
import mongoose from "mongoose";
import { connectDB } from "@lib/db";

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Await the params object to ensure it's resolved
    await connectDB();
    const { courseId } = await params;

    // Validate courseId
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return NextResponse.json(
        { message: "Invalid course ID" },
        { status: 400 }
      );
    }

    // Use aggregation to fetch course data and populate instructor
    const courseData = await Course.aggregate([
      // Match the course by ID
      { $match: { _id: new mongoose.Types.ObjectId(courseId) } },

      // Lookup to join with the User collection for instructor details
      {
        $lookup: {
          from: "users", // The collection to join with (replace with your actual collection name)
          localField: "instructor", // Field in the Course collection
          foreignField: "_id", // Field in the User collection
          as: "instructorDetails", // Output array field
        },
      },

      // Unwind the instructorDetails array (since $lookup returns an array)
      { $unwind: "$instructorDetails" },

      // Project only the required fields
      {
        $project: {
          title: 1,
          description: 1,
          category: 1,
          language: 1,
          level: 1,
          price: 1,
          status: 1,
          students: 1,
          tags: 1,
          thumbnail: 1,
          chapters: { $size: "$chapters" }, // Count chapters at DB level
          instructor: {
            _id: "$instructorDetails._id",
            name: "$instructorDetails.name",
            email: "$instructorDetails.email",
            picture: "$instructorDetails.picture",
          },
        },
      },
    ]);

    // If no course found
    if (!courseData.length) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(courseData[0]);
  } catch (error) {
    console.error("Error fetching course details:", error);
    return NextResponse.json(
      { message: "Failed to fetch course details" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { courseId } = await params;
    await connectDB();

    // Check if user already exists
    const chapters = await Course.find({ _id: courseId })
      .select("chapters")
      .exec();

    console.log("chapters found: ", chapters);

    return NextResponse.json(chapters);
  } catch (error) {
    console.log("Registration error:", error);
    return NextResponse.json(
      { message: "Internal Server Error, Contact +250794881466 for help." },
      { status: 500 }
    );
  }
}
