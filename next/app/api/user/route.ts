import { connectDB } from "@lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { User } from "@lib/models/User";

export async function GET(req: Request) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.log("❌ Unauthorized access attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session?.user._id;
    const user = await User.findById(userId).select("-password"); // Fetch user without password field

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
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
