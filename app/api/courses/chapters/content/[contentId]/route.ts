import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Content } from "@lib/models/Content";

export async function GET(
  req: Request,
  { params }: { params: { contentId: string } }
) {
  try {
    const { contentId } = await params;

    await connectDB();

    console.error("Content Id: ", contentId);

    const content = await Content.findById(contentId).exec();

    if (!content) {
      return NextResponse.json(
        { success: false, message: "Contents not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("❌ Error fetching content:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
