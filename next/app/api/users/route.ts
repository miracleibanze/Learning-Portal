import { NextResponse } from "next/server";
import { User } from "@lib/models/User";
import { connectDB } from "@lib/db";

export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim() || null;
  const indexParam = searchParams.get("index") || "";
  const role = searchParams.get("role") || "";
  console.error(
    "users searchParams : ",
    query && indexParam ? "true" : "false"
  );
  if (query) {
    const index = parseInt(indexParam, 10);
    const limit = 12;
    const skip = index * limit;

    if (!query) {
      return NextResponse.json([], { status: 200 });
    }

    const regex = new RegExp(query.split(" ").join("|"), "i");

    try {
      const users = await User.find({
        $or: [{ name: { $regex: regex } }, { email: { $regex: regex } }],
      })
        .select("name email about role picture username")
        .skip(skip)
        .limit(limit);

      return NextResponse.json(users, { status: 200 });
    } catch (error) {
      console.error("[SEARCH USERS ERROR]", error);
      return NextResponse.json(
        { message: "Error searching users" },
        { status: 500 }
      );
    }
  } else {
    const index = parseInt(indexParam, 10);
    const limit = 12;
    const skip = index * limit;

    const users = role
      ? await User.find({ role: role })
          .select("name email about role picture username")
          .skip(skip)
          .limit(limit)
      : await User.find({
          $or: [{ role: "student" }, { role: "instructor" }],
        })
          .select("name email about role picture username")
          .sort({ createdAt: -1 })
          .limit(12)
          .exec();

    // console.error("random Users found : ", users);

    return NextResponse.json(users, { status: 200 });
  }
}
