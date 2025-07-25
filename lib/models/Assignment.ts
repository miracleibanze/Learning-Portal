import { IAssignment } from "@type/Assignment";
import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number },
});

export const Question =
  mongoose.models.Question || mongoose.model("Question", QuestionSchema);

// Define the schema
const AssignmentSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: String, default: "Teacher" },
  deadline: { type: Date, default: Date.now() },
  type: { type: String, required: true },
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
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  codeInstructions: { type: String },
  students: [{ type: String }],
});

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", AssignmentSchema);

export { Assignment };
