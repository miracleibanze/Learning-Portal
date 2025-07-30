import mongoose, { Schema, model, models } from "mongoose";
import { IAnnouncement } from "@type/Announcement";

// Define the schema
const AnnouncementSchema = new Schema<IAnnouncement>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    id: { type: Schema.Types.ObjectId },
    role: { type: String, default: "Teacher" },
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  students: [{ type: String }],
});

const Announcement =
  models?.Announcement ||
  model<IAnnouncement>("Announcement", AnnouncementSchema);

export { Announcement };
