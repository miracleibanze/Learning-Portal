import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface AnswerQuestion {
  _id: string;
  question: string;
  options: string[];
  correctIndex?: number;
}
export interface IAnswer extends Document {
  userId: string;
  name: string;
  assignmentId: string;
  answers?: string[];
  codeAnswer?: string;
  createdAt: Date;
}

const AnswerQuestionSchema = new Schema(
  {
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctIndex: { type: Number },
    choice: { type: Number, required: true },
  },
  { strict: true }
);

export const AnswerQuestion =
  mongoose.models.AnswerQuestion ||
  mongoose.model("AnswerQuestion", AnswerQuestionSchema);

// Define the schema
const AnswersSchema = new Schema(
  {
    assignmentId: { type: String, required: true },
    userId: { type: String, required: true },
    name: { type: String, required: true },
    answers: [{ type: String }],
    codeAnswer: { type: String },
  },
  { timestamps: true }
);

const Answer =
  mongoose.models.Answer || mongoose.model<IAnswer>("Answer", AnswersSchema);

export { Answer };
