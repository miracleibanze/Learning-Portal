import mongoose, { Schema, Document, Types } from "mongoose";

export interface ChapterDocument {
  title: string;
  order: number;
  description: string;
  content: [
    {
      type: string;
      duration: string;
      data: string;
    }
  ];
}

interface instructorType {
  _id: string;
  name: string;
  email: string;
  picture: string;
}

export interface CourseDocument extends Document {
  _id: string;
  title: string;
  description: string;
  category: string;
  instructor: instructorType;
  language: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  status: "Draft" | "Published";
  students: string[]; // Array of User _ids who enrolled in the course
  tags: string[];
  thumbnail: string;
  chapters: number;
}

const CourseSchema = new Schema<CourseDocument>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  language: { type: String, required: true },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    required: true,
  },
  price: { type: Number, required: true },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  students: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of User _ids
  tags: [{ type: String }],
  thumbnail: { type: String, required: true },
  chapters: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
    },
  ],
});

const Course =
  mongoose.models.Course ||
  mongoose.model<CourseDocument>("Course", CourseSchema);

export { Course };
