import mongoose, { Schema, Document } from "mongoose";

export interface IJoinRequest extends Document {
  _id: string;
  courseId: string;
  courseName: string;
  instructorId: string;
  instructorName: string;
  name: string;
  userId: string;
  coursePrice: string;
  createdAt: Date;
}

const JoinRequestSchema = new Schema<IJoinRequest>(
  {
    courseId: { type: String, required: true },
    courseName: { type: String, required: true },
    instructorId: { type: String, required: true },
    instructorName: { type: String, required: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    coursePrice: { type: String, required: true },
  },
  { timestamps: true }
);

export const JoinRequest =
  mongoose.models.JoinRequest ||
  mongoose.model<IJoinRequest>("JoinRequest", JoinRequestSchema);

console.log("✅ JoinRequest model registered");
