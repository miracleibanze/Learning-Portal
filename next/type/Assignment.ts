import { CourseDocument } from "@lib/models/Course";
import { Document, Types } from "mongoose";
import { User } from "next-auth";

export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  choice?: number;
}
export interface IAssignment extends Document {
  _id: string;
  title: string;
  description: string;
  type: "quiz" | "coding";
  deadline: Date;
  createdAt: Date;
  courseTitle: string;
  createdBy: {
    id: string;
    name: string;
    picture?: string;
    about?: string;
    role: string;
  };
  courseId: string;
  questions?: Question[];
  codeInstructions?: string;
  students: string[];
  codeAnswer?: string;
  marks?: {
    id: string;
    name: string;
    marks: number;
  };
}
