import mongoose, { Schema } from "mongoose";

export interface ContentType {
  description: string;
  _id: string;
  type: string;
  duration?: string;
  data: string;
  options?: string[];
  answer?: number;
}

const ContentSchema = new Schema({
  type: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String },
  data: { type: String, required: true },
  answer: { type: Number },
  options: [{ type: String }],
});

export const Content =
  mongoose.models.Content || mongoose.model("Content", ContentSchema);

console.log("✅ Content model registered");
