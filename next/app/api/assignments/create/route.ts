import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/db";
import { Assignment } from "@lib/models/Assignment";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

// Handler function for assignment creation
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const session = await getServerSession(req, res, authOptions);

    if (!session || !session.user || session.user.role === "student") {
      console.warn("❌ Unauthorized access attempt");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      title,
      description,
      type,
      courseId,
      codeInstructions,
      deadline,
      questions,
    } = req.body;

    // Validate required fields
    if (!title || !type || !courseId || !deadline) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const teacher = {
      id: session.user._id.toString(),
      name: session.user.name,
      about: session.user.about,
      picture: session.user.picture,
      role: session.user.role,
    };

    const assignment = new Assignment({
      title,
      description,
      type,
      courseId,
      codeInstructions,
      deadline,
      createdBy: teacher,
      questions,
    });

    await assignment.save();

    return res.status(201).json(assignment);
  } catch (error: any) {
    console.error("🚨 Error creating assignment:", error);
    return res
      .status(500)
      .json({ message: "Error creating assignment", error: error.message });
  }
}
