import { Schema, model, Model } from "mongoose";
import { ICourseMessage, IMessage } from "../Types/MessageType";

// Interface representing a Message document in MongoDB

const messageSchema = new Schema<IMessage>({
  sender: { type: String, required: true },
  senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  courseId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  content: { type: String, required: true },
  isImage: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now },
});

const Message: Model<IMessage> = model<IMessage>("Message", messageSchema);

const courseMessageSchema = new Schema<ICourseMessage>({
  courseId: { type: String },
  messages: [
    {
      sender: { type: String, required: true },
      senderId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      courseId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
      content: { type: String, required: true },
      isImage: { type: Boolean, default: false },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

export const CourseMessage: Model<ICourseMessage> = model<ICourseMessage>(
  "CourseMessage",
  courseMessageSchema
);
// Export the model

export default Message;
