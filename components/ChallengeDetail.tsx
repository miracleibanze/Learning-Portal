"use client";

import { FC } from "react";
import Image from "next/image";
import { umurava } from "@public"; // Ensure the correct import
import Link from "next/link";
import { Challenge } from "@redux/slices/challengeSlice";

interface ChallengeDetailsProps {
  challenge: Challenge | undefined;
}

const ChallengeDetails: FC<ChallengeDetailsProps> = ({ challenge }) => {
  const contacts = [
    {
      name: "Contact Email",
      content: challenge?.email,
      icon: "far fa-envelope",
    },
    {
      name: "Challenge Category",
      content: challenge?.category,
      icon: "fas fa-briefcase",
    },
    {
      name: "Duration",
      content: challenge?.duration,
      icon: "far fa-calendar",
    },
    {
      name: "Prizes",
      content: challenge?.prize,
      icon: "fas fa-dollar-sign",
    },
  ];

  return (
    <>
      {challenge ? (
        <div className="p-6 flex justify-center items-start gap-4">
          <div className="w-full max-w-xl rounded-md bg-white p-6 border border-zinc-200 mx-auto">
            <div className="w-full h-auto mb-2">
              <Image
                src={umurava}
                alt="umurava"
                className="w-full aspect-[15/8] rounded-md object-cover object-center"
              />
            </div>
            <p className="body-1 font-bold mb-2">
              Project Brief: {challenge?.title || "title man"}
            </p>
            <p className="body-2 text-zinc-600 mb-2">
              {challenge?.description || "title man"}
            </p>
            <ul className="body-1 font-semibold list-disc list-inside mb-4">
              Tasks:
              {challenge?.tasks?.map((item, index) => (
                <li
                  className="text-sm py-1 px-3 list-item font-normal leading-none text-zinc-600"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
            <ul className="body-1 font-semibold list-disc list-inside mb-4">
              Product Requirements:
              {challenge?.projectRequirements?.map((item, index) => (
                <li
                  className="text-sm py-1 px-3 list-item font-normal leading-none text-zinc-600"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
            <ul className="body-1 font-semibold list-disc list-inside mb-4">
              Product Design:
              {challenge?.projectDesign?.map((item, index) => (
                <li
                  className="text-sm py-1 px-3 list-item font-normal leading-none text-zinc-600"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
            <ul className="body-1 font-semibold list-disc list-inside mb-4">
              Deliverables:
              {challenge?.deliverables?.map((item, index) => (
                <li
                  className="text-sm py-1 px-3 list-item font-normal leading-none text-zinc-600"
                  key={index}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="body-1 font-semibold list-disc list-inside mb-4">
              Notes:
            </p>
          </div>
          <div className="w-full max-w-[20rem]">
            <div className="w-full max-w-md bg-white rounded-md border border-zinc-200 p-6 mb-4">
              <p className="body-1 font-semibold list-disc list-inside mb-4">
                Key Instructions:
              </p>
              <p className="body-2 text-zinc-600 list-disc list-inside mb-4">
                You are free to schedule the clarification call with the team
                via this
              </p>
              {contacts.map((item, index) => (
                <div className="flex items-center gap-3 mb-4" key={index}>
                  <i
                    className={`${item.icon} p-4 rounded-full aspect-square flex-0 bg-primary/10 text-primary`}
                  ></i>
                  <div className="flex-1 px-2">
                    <p className="body-2 font-semibold leading-tight">
                      {item.content}
                    </p>
                    <p className="text-sm text-zinc-600 leading-tight">
                      {item.name}
                    </p>
                  </div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <button
                  type="button"
                  className="button bg-red-500 text-white !py-4 "
                >
                  Cancel
                </button>
                <Link
                  href={`/dashboard/challenges&hackathons/${challenge.title}/${challenge._id}/edit`}
                  className="w-full"
                >
                  <button className="button bg-primary text-white !py-4 w-full">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full max-w-md bg-white rounded-md border border-zinc-200 pt-6">
              <p className="body-2 font-semibold list-disc list-inside mb-4 flex items-center gap-2 px-6">
                Participants{" "}
                <span className="bg-primary text-white px-3 text-[12px] py-0 flex items-center rounded-lg h-4">
                  {challenge?.participants?.length}
                </span>
              </p>
              {Array(5)
                .fill("")
                .map((_, index) => (
                  <div
                    className={`flex items-center gap-3 mb-2 pt-2 border-t border-zinc-200/70 px-6 ${
                      challenge?.participants?.length &&
                      index >= challenge?.participants?.length &&
                      "hidden"
                    }`}
                    key={index}
                  >
                    <i
                      className={`far fa-user p-4 rounded-full aspect-square flex-0 bg-primary/10 text-primary`}
                    ></i>
                    <div className="flex-1 px-2">
                      <p className="body-2 font-semibold leading-tight">
                        {challenge?.participants?.length &&
                          challenge?.participants[index]?.name}
                      </p>
                      <p className="text-sm text-zinc-600 leading-tight">
                        {challenge?.participants?.length &&
                          challenge?.participants[index]?.role}
                      </p>
                    </div>
                  </div>
                ))}
              <div className="w-full border-t border-zinc-200/70 px-6 py-3 flex">
                <button
                  className={`button w-full ${
                    challenge?.participants?.length &&
                    challenge?.participants?.length > 5
                      ? "bg-primary text-white"
                      : "bg-zinc-300 text-zinc-500"
                  }`}
                >
                  View more
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="p-6">Challenge not found.</p>
      )}
    </>
  );
};

export default ChallengeDetails;
