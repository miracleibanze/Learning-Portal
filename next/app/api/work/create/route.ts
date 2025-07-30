import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/db";
import { Assignment } from "@lib/models/Assignment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();
  const { title, description, deadline, instructorId, courseId } = req.body;

  try {
    const assignment = await Assignment.create({
      title,
      description,
      deadline,
      instructorId,
      courseId,
    });
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: "Error creating assignment", error });
  }
}
