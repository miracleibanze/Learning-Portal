import { NextApiRequest, NextApiResponse } from "next";
import { Message } from "@lib/models/Message";
import { connectDB } from "@lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { courseId } = req.query;

  try {
    await connectDB();
    const messages = await Message.find({ courseId }).sort({ createdAt: 1 });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to load messages." });
  }
}
