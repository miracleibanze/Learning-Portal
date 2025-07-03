import { CourseDocument } from "@lib/models/Course";
import { Document, Types } from "mongoose";
import { User } from "next-auth";

export interface IAssignment extends Document {
  _id: string;
  title: string;
  description: string;
  instructor: User;
  deadline: Date;
  createdAt: Date;
  createdBy: string;
  courseId: string;
}
