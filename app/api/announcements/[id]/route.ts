import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { User } from "@lib/models/User";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await connectDB();
    console.error("id parsed " + id);
    const userFound = await User.findById(id)
      .select("_id name role picture email")
      .exec();

    if (!userFound)
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 400 }
      );
    return NextResponse.json(userFound, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching instructor or admin data:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch instructor or admin data " },
      { status: 500 }
    );
  }
}
