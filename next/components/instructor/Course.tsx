"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CourseForm() {
  const { data: session } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("English");
  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Beginner"
  );
  const [price, setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState<"Draft" | "Published">("Draft");

  const [chapters, setChapters] = useState([
    { title: "", description: "", order: 1, content: "" },
  ]);

  const handleChapterChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...chapters];
    (updated[index] as any)[field] = value;
    setChapters(updated);
  };

  const addChapter = () => {
    setChapters([
      ...chapters,
      { title: "", description: "", order: chapters.length + 1, content: "" },
    ]);
  };

  const removeChapter = (index: number) => {
    setChapters(chapters.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const courseData = {
      title,
      description,
      category,
      language,
      level,
      price,
      thumbnail,
      tags: tags.split(",").map((tag) => tag.trim()),
      status,
      chapters,
    };

    try {
      const response = await axios.post("/api/courses/create", courseData);
      router.push(`/dashboard/my-courses/${response.data._id}`);
    } catch (error: any) {
      console.error("Failed to create course:", error);
      alert(error.response?.data?.error || "Failed to create course.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          >
            <option value="Beginner">Web development</option>
            <option value="Intermediate">Design</option>
            <option value="Advanced">Programming</option>
            <option value="Advanced">Data analysis</option>
            <option value="Advanced">Marketing</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label className="block font-medium mb-1">Language</label>
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          />
        </div>

        {/* Level */}
        <div>
          <label className="block font-medium mb-1">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as any)}
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (RWF)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block font-medium mb-1">Thumbnail URL</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        {/* Chapters */}
        <h2 className="text-2xl font-semibold mt-6">Chapters</h2>
        {chapters.map((chapter, index) => (
          <div
            key={index}
            className="border border-lightPrimary p-4 rounded space-y-2"
          >
            <div>
              <label className="block font-medium mb-1">Chapter Title</label>
              <input
                type="text"
                value={chapter.title}
                onChange={(e) =>
                  handleChapterChange(index, "title", e.target.value)
                }
                required
                className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Chapter Description
              </label>
              <textarea
                value={chapter.description}
                onChange={(e) =>
                  handleChapterChange(index, "description", e.target.value)
                }
                required
                className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Order</label>
              <input
                type="number"
                value={chapter.order}
                onChange={(e) =>
                  handleChapterChange(index, "order", parseInt(e.target.value))
                }
                required
                className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Chapter Content</label>
              <textarea
                value={chapter.content}
                onChange={(e) =>
                  handleChapterChange(index, "content", e.target.value)
                }
                required
                className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => removeChapter(index)}
              className="text-white hover:underline text-sm bg-red-600/80 py-2 px-3 rounded"
            >
              Remove Chapter
            </button>
          </div>
        ))}

        {/* Add Chapter Button */}
        <button
          type="button"
          onClick={addChapter}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Chapter
        </button>

        {/* Submit */}
        <button
          type="submit"
          className="bg-secondary text-white px-6 py-2 rounded mx-3"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}
