import ChallengeCard from "@components/challengeCard";
import { challenges } from "@components/constants";
import GoBack from "@components/Goback";
import { FC } from "react";

const Page: FC = () => {
  return (
    <>
      <section className="container mx-auto bg-zinc-100 py-12 md:px-8 px-4">
        <GoBack path="Challenges & Hackathons" />
        <div className="w-full grid lg:grid-cols-4 gap-3 py-12">
          {challenges.map((challenge, index) => (
            <ChallengeCard
              {...challenge}
              key={index}
              className="!max-w-[20rem]"
            />
          ))}
        </div>
        <button className="mt-12 border border-blue-500 hover:bg-blue-600 hover:text-white !text-blue-600 font-semibold px-12 py-4 rounded-lg block mx-auto">
          View More
        </button>
      </section>
    </>
  );
};

export default Page;
