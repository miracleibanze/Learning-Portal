import { IAnnouncement } from "@type/Announcement";
import mongoose from "mongoose";

// Define the schema
const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  createdBy: {
    id: { type: mongoose.Schema.Types.ObjectId },
    role: { type: String, default: "Teacher" },
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  students: [{ type: String }],
});

const Announcement =
  mongoose.models.Announcement ||
  mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export { Announcement };
