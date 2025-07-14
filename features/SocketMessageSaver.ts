import { connectDB } from "@lib/db";
import { Message } from "@lib/models/Message";

export async function saveMessage({
  courseId,
  sender,
  message,
}: {
  courseId: string;
  sender: string;
  message: string;
}) {
  await connectDB();
  const msg = new Message({ courseId, sender, message });
  return await msg.save();
}
