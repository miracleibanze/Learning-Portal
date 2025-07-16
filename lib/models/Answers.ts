import mongoose, { Schema } from "mongoose";
import { Document } from "mongoose";

interface Question {
  question: string;
  options: string[];
  correctIndex?: number;
  choice?: number;
}
export interface IAnswer extends Document {
  title: string;
  description: string;
  userId: string;
  type: "quiz" | "coding";
  name: string;
  assignmentId: string;
  questions?: Question[];
  codeAnswer?: string;
}

const AnswerQuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number },
  choice: { type: Number },
});

export const Question =
  mongoose.models.Question ||
  mongoose.model("AnswersQuestion", AnswerQuestionSchema);

// Define the schema
const AnswersSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignmentId: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "AnswersQuestion" }],
  codeAnswer: { type: String },
});

const Answer =
  mongoose.models.Answer || mongoose.model<IAnswer>("Answer", AnswersSchema);

export { Answer };
