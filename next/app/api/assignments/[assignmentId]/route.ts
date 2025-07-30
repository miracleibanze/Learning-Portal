import { NextResponse } from "next/server";
import { connectDB } from "@lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { Answer, AnswerQuestion } from "@lib/models/Answers";

export async function GET(
  req: Request,
  { params }: { params: { assignmentId: string } }
) {
  await connectDB();

  const { assignmentId } = params;

  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user || user.role !== "instructor") {
    console.warn(
      "❌ Unauthorized access attempt by user:",
      user?.email || "unknown"
    );
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Debug log (you can remove this in production)
    console.log("📘 Fetching answers for assignment:", assignmentId);

    const answers = await Answer.find({ assignmentId }).lean().exec();

    console.log("✅ Answers retrieved:", answers.length);

    return NextResponse.json(answers, { status: 200 });
  } catch (error: any) {
    console.error("🚨 Error fetching answers:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
