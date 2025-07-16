import { CourseDocument } from "@lib/models/Course";
import { Document, Types } from "mongoose";

export interface IAnnouncement extends Document {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: string;
  courseId: Types.ObjectId; // Reference to the Course model
  courseInfo: CourseDocument[];
  students: string[];
}
