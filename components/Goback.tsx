import { FC } from "react";
import Link from "next/link";

interface GoBackProps {
  path: string;
  via?: string;
  viaLink?: string;
  className?: string;
}

const GoBack: FC<GoBackProps> = ({ path, via, className, viaLink }) => {
  return (
    <div
      className={`flex gap-5 mb-5 items-center text-sm ${
        className && className
      }`}
    >
      <Link href="/dashboard">
        <span className="flex items-center gap-2 px-2 py-1">
          <i
            className={`fas fa-arrow-left ${
              via && "px-2 py-1 border border-zinc-300 rounded-sm text-[10px]"
            }`}
          ></i>{" "}
          {via ? "Go Back" : "Home"}
        </span>
      </Link>

      {via && (
        <Link href={viaLink ? viaLink : "/dashboard"}>
          <span className="text-zinc-400 cursor-pointer">{via}</span>
        </Link>
      )}
      <span className="text-blue-600">/ {path}</span>
    </div>
  );
};

export default GoBack;
