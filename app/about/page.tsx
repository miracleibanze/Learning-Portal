import Heading from "@components/Heading";
import { challengeRoute, imageUmurava } from "@public";
import Image from "next/image";
import { FC } from "react";

interface reason {
  icon?: string;
  title: string;
  description: string;
}

const Reasons: reason[] = [
  {
    title: "Bridging the Experience Gap",
    description:
      "Many talents acquire theoretical knowledge and are rejected from jobs because they lack work experience and are not able to put in actions what they acquired in the schools.",
  },
  {
    title: "Bridging Education and Employment",
    description:
      "Traditional education doesn't always prepare talents for the demands of the tech and digital economy and we are providing in-demand skills through Skills Challenges",
  },
  {
    title: "Preparing Talents for Global Job Markets",
    description:
      "We are ensuring that African talents shine globally and that's why we are equipping them with global technical experience and standout globally.",
  },
];

const page: FC = () => {
  return (
    <>
      <section className="md:px-12 px-6 flex md:flex-row flex-col gap-16 container mx-auto justify-between pt-16">
        <div className="w-full my-auto py-6 max-w-2xl">
          <Heading title="Our Story" className="!text-start !px-0" />
          <p className="text-gray-600 body-1 text-justify">
            With 3 years of experience matching African digital talents with
            local and global job markets, we still remain with a big number of
            jobs that remain unfilled due to the lack of experienced African
            Talents.
          </p>
          <p className="text-gray-600 body-1 text-justify mt-4">
            Driven by our mission to place skilled and professional digital
            talent, we created Skills Challenges as a project-based learning
            solution for talents to gain real-world experience, solve problems,
            and build portfolios so that they become ready for global job
            markets.
          </p>
        </div>
        <div className="px-12 py-16 bg-primary rounded-3xl w-full max-w-xl float-right my-auto">
          <Image
            src={imageUmurava}
            alt="umurava image"
            className="w-full h-full"
          />
        </div>
      </section>
      <section className="container mx-auto py-16 md:px-12 px-6">
        <Heading title="Why we are solving this problem" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Reasons.map((reason, index) => (
            <div
              className={`rounded-lg p-6 bg-primary text-white ${
                index === 0 && "sm:col-span-2"
              } p-10`}
              key={index}
            >
              <i className="fas fa-briefcase mb-4 p-5 rounded-md !text-primary bg-white"></i>
              <h3 className="h5 font-semibold mb-4">{reason.title}</h3>
              <p className="w-full max-w-screen-md text-white/80">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto py-16 md:px-12 px-6 flex flex-col sm:flex-row items-center lg:gap-16 gap-8">
        <div className="w-full sm:w-1/2 lg:pr-12">
          <h3 className="h3 font-bold mb-6">
            Skills Challenges Program is built on the Umurava Talent Marketplace
            Platform
          </h3>
          <p className="body-1 text-justify leading-tight mb-6">
            A Project-based Learning Solution aimed at providing young and
            senior talents with an opportunity to showcase their skills to
            real-world projects and challenges from our partner companies and
            organizations.
          </p>
          <p className="body-1 text-justify leading-tight mb-6">
            Umurava Skills Challenges enables young talents to build a portfolio
            and experience that increases their readiness to access job
            opportunities and projects.
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-md mt-4">
            Get Started
          </button>
        </div>
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0 flex-1">
          <Image
            src={challengeRoute}
            alt="Umurava Talent Marketplace"
            className="rounded-lg shadow-md w-full lg:max-w-[35rem] h-auto float-end my-auto"
          />
        </div>
      </section>
    </>
  );
};

export default page;
