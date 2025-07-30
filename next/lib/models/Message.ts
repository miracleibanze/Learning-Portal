import mongoose, { Schema, Document } from "mongoose";

export interface MessageDocument extends Document {
  courseId: string;
  sender: string;
  message: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema(
  {
    courseId: { type: String, required: true },
    sender: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Message =
  mongoose.models.Message ||
  mongoose.model<MessageDocument>("Message", MessageSchema);
