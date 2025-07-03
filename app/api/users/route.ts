import { NextResponse } from "next/server";
import { User } from "@lib/models/User";
import { connectDB } from "@lib/db";

export async function GET() {
  await connectDB();
  const users = await User.find().select("-password");
  return NextResponse.json(users);
}
