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
const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    createdBy: {
      id: { type: String },
      name: { type: String },
      role: { type: String },
      about: { type: String },
      picture: { type: String },
    },
    courseTitle: { type: String, required: true },
    deadline: { type: Date, default: Date.now() },
    type: { type: String, required: true },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    codeInstructions: { type: String },
    students: [{ type: String }],
    marks: [
      { name: { type: String }, id: { type: String }, marks: { type: String } },
    ],
  },
  {
    strict: true,
  }
);

const Assignment =
  mongoose.models.Assignment ||
  mongoose.model<IAssignment>("Assignment", AssignmentSchema);

export { Assignment };
