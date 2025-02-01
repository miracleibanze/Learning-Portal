"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@redux/store";
import { Challenge, editChallenge } from "@redux/slices/challengeSlice";
import { FC, useState } from "react";

interface ChallengeDetailsProps {
  challenge: Challenge | undefined;
}

const EditChallenge: FC<ChallengeDetailsProps> = ({ challenge }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Challenge | undefined>(challenge);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (!challenge?._id) return;
    dispatch(
      editChallenge({ challengeId: challenge?._id, updatedData: formData })
    );
  };

  return (
    <section className="w-full max-w-lg bg-white rounded-md mx-auto p-5 pb-8">
      <p className="body-1 font-semibold text-center">Edit a Challenge</p>
      <p className="text-sm !text-zinc-400 mb-6 text-center">
        Fill out these details to build your broadcast
      </p>

      <label htmlFor="title" className="label">
        <span className="label_text">Challenge/Hackathon Title</span>
        <input
          type="text"
          id="title"
          className="input"
          value={formData?.title}
          onChange={handleChange}
        />
      </label>

      <div className="grid md:grid-cols-2 gap-x-5">
        <label htmlFor="deadline" className="label">
          <span className="label_text">Deadline</span>
          <input
            type="text"
            id="deadline"
            className="input"
            value={formData?.deadline}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="duration" className="label">
          <span className="label_text">Duration</span>
          <input
            type="text"
            id="duration"
            className="input"
            value={formData?.duration}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="prize" className="label">
          <span className="label_text">Money Prizes</span>
          <input
            type="text"
            id="prize"
            className="input"
            value={formData?.prize}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email" className="label">
          <span className="label_text">Contact email</span>
          <input
            type="email"
            id="email"
            className="input"
            value={formData?.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <label htmlFor="brief" className="label">
        <span className="label_text">Project Brief</span>
        <textarea
          id="brief"
          className="input"
          value={formData?.brief}
          onChange={handleChange}
          maxLength={500}
        />
        <span className="label_note">
          Keep this simple (max 500 characters)
        </span>
      </label>

      <label htmlFor="description" className="label">
        <span className="label_text">Project Description</span>
        <textarea
          id="description"
          className="input"
          value={formData?.description}
          onChange={handleChange}
          maxLength={500}
        />
      </label>

      <label htmlFor="projectRequirements" className="label">
        <span className="label_text">Project Requirements</span>
        <textarea
          id="projectRequirements"
          className="input"
          value={formData?.projectRequirements}
          onChange={handleChange}
          maxLength={500}
        />
        <span className="label_note">
          Keep this simple (max 500 characters)
        </span>
      </label>
      <label htmlFor="deliverables" className="label">
        <span className="label_text">Project Deliverables</span>
        <textarea
          id="deliverables"
          className="input"
          value={formData?.deliverables}
          onChange={handleChange}
          maxLength={250}
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
        <button
          type="button"
          onClick={handleSubmit}
          className="button bg-primary text-white"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default EditChallenge;
