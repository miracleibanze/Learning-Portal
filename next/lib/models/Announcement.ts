import mongoose, { Schema, model, models } from "mongoose";
import { IAnnouncement } from "@type/Announcement";

// Define the schema
const AnnouncementSchema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: {
      id: { type: String },
      name: { type: String },
      role: { type: String },
      about: { type: String },
      picture: { type: String },
    },
    courseId: { type: String, required: true },
    students: [{ type: String }],
  },
  {
    timestamps: true,
    strict: true,
  }
);

const Announcement =
  models?.Announcement ||
  model<IAnnouncement>("Announcement", AnnouncementSchema);

export { Announcement };
