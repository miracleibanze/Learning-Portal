import { Request, Response } from "express";
import { getIO } from "../socket";
import { CourseMessage } from "../models/Message";
import { IMessage } from "../Types/MessageType";

// Create new message
export const createNewMessage = async (req: Request, res: Response) => {
  const { sender, senderId, courseId, content, isImage, timestamp }: IMessage =
    req.body;

  if (!sender || !senderId || !courseId || !content) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newMessage: IMessage = {
    sender,
    senderId,
    courseId,
    content,
    isImage,
    timestamp: timestamp || Date.now(),
  };

  try {
    const courseMessages = await CourseMessage.findOneAndUpdate(
      { courseId },
      { $push: { messages: newMessage } },
      { upsert: true, new: true }
    );

    const io = getIO();
    io.to(courseId.toString()).emit("messageReceived", newMessage);

    res.status(200).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: "Error saving message" });
  }
};

export const getAllMessage = async (req: Request, res: Response) => {
  const { courseId } = req.params;

  try {
    const course = await CourseMessage.findOne({ courseId }).lean();
    res.status(200).json(course?.messages || []);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Error fetching messages" });
  }
};
