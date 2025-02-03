"use client";

import { useSelector } from "react-redux";
import ChallengeCard, {
  ChallengeCardSkeleton,
} from "@components/challengeCard";
import { RootState } from "@redux/store"; // Importing AppDispatch
import { FC } from "react";
import Link from "@node_modules/next/link";

const Page: FC = () => {
  const { user, status, error } = useSelector((state: RootState) => state.user); // Accessing user, status, and error

  const { challenges, loadingChallenges } = useSelector(
    (state: RootState) => state.challenge
  );
  const { analytics, loadingAnalytics } = useSelector(
    (state: RootState) => state.analytic
  );

  return (
    <section className="w-full p-3 bg-zinc-50 flex-1 h-full">
      <h4 className="w-full font-semibold flex gap-2">
        Welcome back
        {status === "loading" ? (
          <div className="w-full max-w-24 !h-6 rounded-md bg-zinc-100 animate-pulse"></div>
        ) : user?.names ? (
          " " + user.names
        ) : (
          <span className="text-gray-500">User not found</span>
        )}
        ,
      </h4>
      <p className="text-sm !text-zinc-400 mb-4">
        Build Work Experience through Skills Challenges
      </p>

      {!loadingAnalytics ? (
        analytics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
            {analytics.map((data, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-6 border-2 border-zinc-100 flex items-center max-md:max-w-md justify-start ${
                  index === 0 || index === 1 ? "lg:col-span-3" : "lg:col-span-2"
                } ${index === 0 ? "md:col-span-2" : "md:col-span-1"} relative
            ${index % 2 === 1 && "w-full ml-auto"}`}
              >
                <i
                  className={`fas text-primary ${data.icon} p-3 rounded-full flex-0 bg-primary/10`}
                ></i>
                <div className="w-full pr-3 pl-5">
                  <div className="text-zinc-500 text-[11px] w-full">
                    {data.title}
                  </div>
                  <div className="text-md font-bold flex items-center">
                    {data.count}
                    <span className="text-primary px-1 ml-1 rounded-full bg-primary/10 text-[11px]">
                      {data.percentage}%
                    </span>
                  </div>

                  <select className="text-xs absolute top-2 right-4">
                    <option value="last-week">Last Week</option>
                    <option value="last-Month">Last Month</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="w-full body-2 text-zinc-700 text-center py-4">
            No analytics ready
          </p>
        )
      ) : (
        <div className="w-full md:grid-cols-2 grid gap-2 my-4">
          {Array(4)
            .fill("")
            .map((_, index) => (
              <div
                className="bg-zinc-200 w-full h-20 rounded-md bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse animate-shimmer"
                key={index}
              ></div>
            ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 mb-4">
        {!loadingChallenges ? (
          challenges.length > 0 ? (
            Array(3)
              .fill("")
              .map((_, index) => (
                <ChallengeCard key={index} {...challenges[index]} />
              ))
          ) : (
            <p className="w-full body-2 text-zinc-700 text-center py-4">
              No challenges found
            </p>
          )
        ) : (
          Array(3)
            .fill("")
            .map((_, index) => <ChallengeCardSkeleton key={index} />)
        )}
      </div>
      <div className="w-full py-3 px-3 flex justify-end">
        <Link href="/dashboard/challenges&hackathons">
          <button className="button bg-primary text-white">View more</button>
        </Link>
      </div>
    </section>
  );
};

export default Page;
