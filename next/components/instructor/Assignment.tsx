"use client";

import { useState } from "react";
import axios from "axios";

export default function AssignmentForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [type, setType] = useState<"quiz" | "coding">("quiz");
  const [courseId, setCourseId] = useState("");
  const [codeInstructions, setCodeInstructions] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/assignments", {
        title,
        description,
        deadline,
        type,
        courseId,
        codeInstructions,
      });
      alert("Assignment created successfully");
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to create assignment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter assignment title"
          className="w-full bg-opacityPrimary border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          placeholder="Enter description"
          className="w-full bg-opacityPrimary border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Deadline</label>
        <input
          type="datetime-local"
          className="w-full bg-opacityPrimary border p-2 rounded"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Course ID</label>
        <input
          type="text"
          placeholder="Enter course ID"
          className="w-full bg-opacityPrimary border p-2 rounded"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Assignment Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="w-full bg-opacityPrimary border p-2 rounded"
        >
          <option value="quiz">Quiz</option>
          <option value="coding">Coding</option>
        </select>
      </div>

      {type === "coding" && (
        <div>
          <label className="block mb-1 font-medium">Code Instructions</label>
          <textarea
            placeholder="Enter coding instructions"
            className="w-full bg-opacityPrimary border p-2 rounded"
            value={codeInstructions}
            onChange={(e) => setCodeInstructions(e.target.value)}
          />
        </div>
      )}

      <button
        type="submit"
        className="bg-secondary text-white px-4 py-2 rounded"
      >
        Create Assignment
      </button>
    </form>
  );
}
