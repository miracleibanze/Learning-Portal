"use client";

import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import GoBack from "@components/Goback";
import { Challenge, createChallenge } from "@redux/slices/challengeSlice";

const Page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  interface Participants {
    name: string;
    role: string;
  }

  const [formData, setFormData] = useState<Challenge>({
    _id: "",
    title: "",
    email: "",
    category: "",
    skills: [],
    difficulty: "",
    deadline: "",
    description: "",
    duration: "",
    prize: "",
    contact: "",
    participants: [],
    projectRequirements: [],
    projectDesign: [],
    tasks: [],
    tools: [],
    brief: "",
    deliverables: [],
    status: "open",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createChallenge(formData));
  };

  return (
    <section className="w-full bg-zinc-100 h-full flex-1">
      <GoBack
        path="Create New Challenge"
        via="Challenge & Hackathons"
        viaLink="/dashboard/challenges&hackathons"
        className="w-full px-6 border-y border-zinc-200 py-2 bg-white !text-[12px]"
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-md mx-auto p-5"
      >
        <p className="body-1 font-semibold text-center">Create New Challenge</p>
        <p className="text-sm !text-zinc-400 mb-6 text-center">
          Fill out these details to build your broadcast
        </p>

        <label htmlFor="title" className="label">
          <span className="label_text">Challenge/Hackathon Title</span>
          <input
            type="text"
            id="title"
            className="input"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <div className="grid md:grid-cols-2 gap-x-5">
          <label htmlFor="deadline" className="label">
            <span className="label_text">Deadline</span>
            <input
              type="date"
              id="deadline"
              className="input"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="duration" className="label">
            <span className="label_text">Duration</span>
            <input
              type="text"
              id="duration"
              className="input"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="prize" className="label">
            <span className="label_text">Money Prize</span>
            <input
              type="text"
              id="prize"
              className="input"
              value={formData.prize}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="email" className="label">
            <span className="label_text">Contact Email</span>
            <input
              type="email"
              id="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label htmlFor="description" className="label">
          <span className="label_text">Project Description</span>
          <textarea
            id="description"
            className="input"
            value={formData.description}
            onChange={handleChange}
            maxLength={250}
            required
          />
          <span className="label_note">
            Keep this simple (max 250 characters)
          </span>
        </label>

        <label htmlFor="brief" className="label">
          <span className="label_text">Project Brief</span>
          <textarea
            id="brief"
            className="input"
            value={formData.brief}
            onChange={handleChange}
            maxLength={250}
            required
          />
          <span className="label_note">
            Keep this simple (max 250 characters)
          </span>
        </label>

        <label htmlFor="task" className="label">
          <span className="label_text">Project Description & Task</span>
          <textarea
            id="task"
            className="input"
            value={formData.tasks}
            onChange={handleChange}
            maxLength={250}
            required
          />
          <span className="label_note">
            Keep this simple (max 250 characters)
          </span>
        </label>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <button
            type="button"
            className="button text-primary border border-primary"
          >
            Cancel
          </button>
          <button type="submit" className="button bg-primary text-white">
            Create Challenge
          </button>
        </div>
      </form>
    </section>
  );
};

export default Page;
