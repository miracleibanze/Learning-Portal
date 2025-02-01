import { FC } from "react";
import { umurava } from "@public";
import Image from "next/image";
import Link from "next/link";

export const ChallengeCardSkeleton: FC = () => (
  <div className="relative w-[18rem]">
    <div className={`border border-blue-500/20 rounded-t-lg p-4`}>
      {/* Skeleton for the image with diagonal shimmer effect */}
      <div className="w-full aspect-video rounded-lg bg-zinc-200 mb-3 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
      </div>

      {/* Skeleton for title */}
      <div className="w-full h-6 mb-2 rounded-lg bg-zinc-200 animate-pulse" />

      {/* Skeleton for difficulty and deadline */}
      <div className="w-1/3 h-6 mb-2 rounded-lg bg-zinc-200 animate-pulse" />

      {/* Skeleton for skills buttons */}
      <div className="flex gap-3">
        <div className="w-1/3 h-6 mb-2 rounded-lg bg-zinc-200 animate-pulse" />
        <div className="w-1/3 h-6 mb-2 rounded-lg bg-zinc-200 animate-pulse" />
        <div className="w-1/3 h-6 mb-2 rounded-lg bg-zinc-200 animate-pulse" />
      </div>

      {/* Skeleton for extra information */}
      <div className="w-2/3 h-6 mb-2 rounded-lg bg-zinc-200 animate-pulse" />
    </div>

    {/* Skeleton for button */}
    <div className="bg-white text-blue-500 px-4 py-2 rounded-b-md border border-blue-500/20 border-t-none w-full">
      <div className="w-1/2 h-8 mb-2 rounded-md bg-zinc-200 animate-pulse" />
    </div>
  </div>
);

interface Challenge {
  _id?: string;
  title?: string;
  status?: "open" | "ongoing" | "completed"; // From Redux
  skills?: string[];
  difficulty?: string;
  deadline?: string;
  className?: string;
}

const ChallengeCard: FC<Challenge> = ({
  _id,
  title,
  status,
  skills,
  difficulty,
  deadline,
  className,
}) => (
  <div className="relative w-full max-w-max">
    <div
      className={`border border-blue-500/20 w-[18rem] h-[23rem] rounded-t-lg p-4 ${
        className && className
      }`}
    >
      <div className="flex justify-between items-center mb-4 w-full aspect-video rounded-lg overflow-hidden relative">
        <Image
          src={umurava}
          alt="Umurava Logo"
          className="absolute inset-0"
          width={500}
          height={500}
        />
        <span className="absolute top-2 right-2 rounded-full bg-green-700 text-white py-1 px-4">
          {status}
        </span>
      </div>
      <h3 className="text-sm font-semibold mb-2 leading-tight">{title}</h3>
      <p className="text-[12px] text-zinc-600 capitalize">
        <b>Status:</b> {status}
      </p>
      <p className="text-[12px] text-zinc-600 font-semibold">
        Skills Needed:
        <br />
        {skills?.map((item, index) => (
          <button
            className="button m-1 border border-primary/60 !px-1 !py-0 !text-[10px] text-primary/70"
            key={index}
          >
            {item}
          </button>
        ))}
      </p>
      {difficulty && (
        <p className="text-[12px] text-zinc-600">
          <b>Difficulty Level:</b> {difficulty}
        </p>
      )}
      {deadline && (
        <p className="text-[12px] text-zinc-600">
          <b>Deadline:</b> {deadline}
        </p>
      )}
    </div>
    <div className="bg-white text-blue-500 px-4 py-2 rounded-b-md border border-blue-500/20 border-t-none w-full">
      <Link href={`/dashboard/challenges&hackathons/${title}/${_id}`}>
        <button className="button bg-primary !text-[12px] !py-1 text-white">
          View Challenge
        </button>
      </Link>
    </div>
  </div>
);

export default ChallengeCard;
