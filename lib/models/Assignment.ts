import { IAssignment } from "@type/Assignment";
import mongoose from "mongoose";

// Define the schema
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: String, default: "Teacher" },
  deadline: { type: Date, default: Date.now() },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", AssignmentSchema);

export { Assignment };