"use client";

import ChallengeDetails from "@components/ChallengeDetail";
import EditChallenge from "@components/EditChallenge";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";
import { Challenge, fetchChallenges } from "@redux/slices/challengeSlice";
import { useDispatch } from "react-redux";

const Page: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useParams() as { params?: string[] }; // Explicitly type as an array

  const challengeId = params?.[1] || ""; // Get challenge ID safely
  const viewDetails = !params?.[2]; // If there's no third param, show details view

  const { challenges } = useSelector((state: RootState) => state.challenge);

  const challenge = challenges.find((ch) => ch._id === challengeId?.toString());
  const Mockchallenge: Challenge = {
    _id: "1jkhu8888797887789u89",
    category: "Web Design",
    title: "Design a Dashboard for SokoFund",
    skills: ["UX Design", "Research", "User Flow", "Sketch", "Figma"],
    difficulty: "Beginner",
    deadline: "15 Days",
    status: "ongoing",
    description:
      "Design a modern and user-friendly dashboard for SokoFund, a microfinance platform.",
    duration: "15 Days",
    brief:
      "Design a responsive and user friendly website to alin to all customer of our platform",
    prize: "$500 - $700",
    email: "talent@umurava.africa",
    participants: [
      { name: "John Doe", role: "UI/UX Designer" },
      { name: "Jane Smith", role: "Researcher" },
    ],
    tasks: [
      "Research user needs and create personas",
      "Create wireframes and user flow",
      "Design high-fidelity mockups using Figma",
    ],
    deliverables: [
      "Figma design files",
      "Wireframes and user flow documentation",
    ],
    projectRequirements: [
      "The dashboard must support multiple user roles (admin, investor, borrower).",
      "Ensure accessibility standards are met (WCAG 2.1 compliance).",
      "Implement a responsive design suitable for desktop and mobile.",
      "Provide a clean and intuitive UI with a focus on usability.",
    ],
    projectDesign: [
      "Blue and Green, following SokoFund's brand identity",
      "Sans-serif fonts, preferably Inter or Roboto",
      "Grid-based design with a sidebar navigation",
    ],
    tools: ["Figma", "Sketch", "Adobe XD"],
  };

  useEffect(() => {
    dispatch(fetchChallenges());
  }, [dispatch]);

  return viewDetails ? (
    <ChallengeDetails challenge={challenge} />
  ) : (
    <EditChallenge challenge={challenge} />
  );
};

export default Page;
