import mongoose, { Schema, Document } from "mongoose";

export interface ChapterDocument extends Document {
  title: string;
  content: string;
  order: number;
  description: string;
}

export interface ShapterContentDocument {
  title: string;
  order: number;
  description: string;
  content: string;
}

export interface instructorType {
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
  instructor: string;
  language: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  status: "Draft" | "Published";
  students: string[]; // Array of User _ids who enrolled in the course
  tags: string[];
  thumbnail: string;
  chapters: ChapterDocument[];
}

export interface DetailedCourseDocument extends Document {
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

const ChapterSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  order: { type: Number, required: true },
  content: { type: String, required: true }, // string only
});

export const Chapter =
  mongoose.models.Chapter || mongoose.model("Chapter", ChapterSchema);

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String },
  level: { type: String },
  language: { type: String },
  price: { type: Number },
  thumbnail: { type: String },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  tags: [{ type: String }],
  students: [{ type: Schema.Types.ObjectId, ref: "User" }],
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapter" }],
});

export const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);

// const CourseSchema = new Schema<CourseDocument>({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   category: { type: String, required: true },
//   instructor: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   language: { type: String, required: true },
//   level: {
//     type: String,
//     enum: ["Beginner", "Intermediate", "Advanced"],
//     required: true,
//   },
//   price: { type: Number, required: true },
//   status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
//   students: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of User _ids
//   tags: [{ type: String }],
//   thumbnail: { type: String, required: true },
//   chapters: [
//     {
//       title: { type: String, required: true },
//       content: {
//         type: [
//           {
//             type: String,
//             duration: String,
//             data: String,
//           },
//         ],
//         required: true,
//       },
//       order: { type: Number, required: true },
//       description: { type: Number, required: true },
//     },
//   ],
// });

// const Course =
//   mongoose.models.Course ||
//   mongoose.model<CourseDocument>("Course", CourseSchema);

// export { Course };
