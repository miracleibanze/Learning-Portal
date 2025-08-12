import mongoose, { Schema } from "mongoose";
import { Course } from "@lib/models/Course"; // Ensure Course is imported

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true }, // as referrence
    about: { type: String, required: true, unique: true }, // as referrence
    password: { type: String, required: true },
    picture: { type: String },
    updates: { type: Boolean, default: false },
    lastActive: { type: Number },
    preferredTheme: { type: String, default: "light" },
    preferredColorScheme: { type: String, default: "sky" },
    preferredSidebarBg: { type: String },
    role: { type: String, default: "student", required: true },
    progress: [
      {
        courseId: {
          type: Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        }, // Reference to Course
        completedModules: { type: Number, default: 0 }, // Number of completed modules
        totalModules: { type: Number, required: true }, // Total modules in the course
        lastAccessed: { type: Date, default: Date.now() }, // Last accessed date
      },
    ],
    quizzes: [
      {
        quizId: { type: String },
        score: { type: Number, default: 0 },
        totalQuestions: { type: Number },
        completed: { type: Boolean, default: false },
      },
    ],
    myCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }], // Array of enrolled courses
    joinRequests: [{ type: Schema.Types.ObjectId, ref: "JoinRequest" }], // Array of enrolled courses
  },
  { timestamps: true }
);

// Method to update progress when a module is completed
UserSchema.methods.updateProgress = async function (
  courseId: mongoose.Types.ObjectId,
  completedModules: number
) {
  const course = await Course.findById(courseId);
  if (!course) {
    throw new Error("Course not found");
  }

  const totalModules = course.chapters.length; // Total modules = number of chapters
  const progressIndex = this.progress.findIndex(
    (p: any) => p.courseId.toString() === courseId.toString()
  );

  if (progressIndex === -1) {
    // If progress for this course doesn't exist, add it
    this.progress.push({
      courseId,
      completedModules,
      totalModules,
      lastAccessed: new Date(),
    });
  } else {
    // Update existing progress
    this.progress[progressIndex].completedModules = completedModules;
    this.progress[progressIndex].lastAccessed = new Date();
  }

  await this.save();
};

// Method to calculate completion percentage for a course
UserSchema.methods.getCompletionPercentage = function (
  courseId: mongoose.Types.ObjectId
) {
  const progress = this.progress.find(
    (p: any) => p.courseId.toString() === courseId.toString()
  );

  if (!progress) {
    return 0; // No progress found
  }

  return (progress.completedModules / progress.totalModules) * 100;
};

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
