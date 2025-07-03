import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@lib/db";
import assignment from "@lib/models/assignment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  await connectDB();
  const { assignmentId, studentId } = req.body;

  try {
    await assignment.findByIdAndUpdate(assignmentId, {
      $addToSet: { finishedStudents: studentId },
    });
    res.status(200).json({ message: "assignment submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting assignment", error });
  }
}
