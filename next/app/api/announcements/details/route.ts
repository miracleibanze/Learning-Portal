import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { User } from "@lib/models/User";
import { Announcement } from "@lib/models/Announcement";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    console.log("❌ Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, announcementId } = body;
    console.log("Parsed user ID:", id);

    const userFound =
      id !== "00000"
        ? await User.findById(id).select("_id name role picture email").exec()
        : { message: "no id" };

    // Add user to announcement's students array if not already present
    await Announcement.findByIdAndUpdate(announcementId, {
      $addToSet: { students: session.user._id },
    });

    return NextResponse.json(userFound, { status: 200 });
  } catch (error) {
    console.error("🚨 Error updating announcement:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update announcement" },
      { status: 500 }
    );
  }
}
