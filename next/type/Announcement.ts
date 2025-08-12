import { CourseDocument } from "@lib/models/Course";
import { Document, Types } from "mongoose";

export interface IAnnouncement extends Document {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  createdBy: {
    id: string;
    name: string;
    picture?: string;
    about?: string;
    role: string;
  };
  courseId: string; // Reference to the Course model
  courseInfo: CourseDocument[];
  students?: string[];
}
