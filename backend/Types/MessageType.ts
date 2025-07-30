import mongoose from "mongoose";

export interface IMessage {
  sender: string;
  senderId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  content: string;
  isImage: boolean;
  timestamp: Date;
}

export interface ICourseMessage {
  messages?: IMessage[];
  courseId: string;
}
export interface IId {
  _id: mongoose.Types.ObjectId;
}
