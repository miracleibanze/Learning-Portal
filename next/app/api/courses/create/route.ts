import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import { Course, Chapter } from "@/lib/models/Course";
import { User } from "@lib/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      category,
      language,
      level,
      price,
      thumbnail,
      tags,
      status,
      chapters,
    } = body;

    console.log("body :", body);
    // Basic validation
    if (!title || !description) {
      return NextResponse.json(
        { error: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Save chapters individually
    const savedChapters = await Promise.all(
      chapters.map(async (chapter: any) => {
        const newChapter = new Chapter({
          title: chapter.title,
          description: chapter.description || "",
          order: chapter.order || 0,
          content: chapter.content || [],
        });
        return await newChapter.save();
      })
    );

    // Create course with chapter references
    const newCourse = new Course({
      title,
      description,
      category,
      language,
      level,
      price,
      thumbnail,
      tags: tags || [],
      status: status || "draft",
      instructor: session.user._id,
      chapters: savedChapters.map((c) => c._id),
    });

    const createdCourse = await newCourse.save();

    await User.findByIdAndUpdate(session.user._id, {
      $addToSet: { myCourses: newCourse._id },
    })
      .lean()
      .exec();

    console.log("created course:", createdCourse);

    return NextResponse.json(createdCourse, { status: 201 });
  } catch (error: any) {
    console.error("[COURSE_POST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
