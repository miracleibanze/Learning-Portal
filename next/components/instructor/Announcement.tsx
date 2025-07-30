"use client";

import { useState } from "react";
import axios from "axios";

export default function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/announcements", {
        title,
        description,
        courseId,
      });
      alert("Announcement created successfully");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to create announcement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter announcement title"
          className="w-full border p-2 rounded bg-opacityPrimary"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          placeholder="Enter description"
          className="w-full border p-2 rounded bg-opacityPrimary"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Course ID</label>
        <input
          type="text"
          placeholder="Enter course ID"
          className="w-full border p-2 rounded bg-opacityPrimary"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-secondary text-white px-4 py-2 rounded"
      >
        Create Announcement
      </button>
    </form>
  );
}
