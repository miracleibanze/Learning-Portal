"use client";

import {
  computerCalcs,
  image1,
  Image2,
  banner_img,
  challengesImage,
  signup,
  students,
} from "@public";
import { useState, FC } from "react";
import Image from "next/image";
import Heading from "@components/Heading";
import ChallengeCard from "@components/challengeCard";
import { challenges } from "@components/constants";

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface Testimonial {
  name: string;
  title: string;
  testimonial: string;
}

const SkillChallenges: string[] = [
  "UI/UX Design",
  "Data Science",
  "Graphic Design",
  "Data Analysis & Research",
  "Animation",
  "Videography & Photography",
  "AI Machine Learning",
  "Web3",
  "Digital Marketing & Communication",
];

const benefits: Benefit[] = [
  {
    title: "Enhance Your Employment Path",
    description:
      "Network with other talented individuals and learn from their experiences.",
    icon: "fa-briefcase",
  },
  {
    title: "Earn Recognition and Prizes",
    description:
      "Gain valuable experience and knowledge to advance your career in the digital economy.",
    icon: "fa-clipboard-list",
  },
  {
    title: "Personal Growth",
    description:
      "Challenge yourself, learn new skills, and grow your professional network.",
    icon: "fa-chart-line",
  },
  {
    title: "Learn from Industry Experts",
    description:
      "Access valuable insights and guidance from experienced professionals in the digital career field and spaces.",
    icon: "fa-robot",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Manzi Jack",
    title: "Product Designer, Kigali",
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Cyuzuzo Peter",
    title: "Marketing Manager, Kigali",
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    name: "Mukunzi James",
    title: "Software Developer, Kigali",
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const TestimonialCard: FC<Testimonial> = ({ name, title, testimonial }) => (
  <div className="min-w-[25rem] max-w-[25rem] px-5 border border-zinc-400 rounded-lg py-8">
    <div className="w-full rounded-lg aspect-video bg-primary mb-4 flex items-center justify-center">
      <span className="flex items-center justify-center bg-white/50 p-4 rounded-full aspect-square">
        <i className="fas fa-play text-3xl text-white translate-x-[0.095rem]"></i>
      </span>
    </div>
    <div className="flex">
      <div className="w-10 aspect-square rounded-full bg-primary mr-3"></div>
      <div className="flex-1 w-full">
        <p className="body-2 font-semibold">{name}</p>
        <p className="text-sm">{title}</p>
      </div>
    </div>
  </div>
);

const Home: FC = () => {
  const [skillChallenge, setSkillChallenge] = useState<number>(0);

  return (
    <>
      <header className="container mx-auto bg-white pb-10 md:pt-0 pt-10 px-5 md:px-20 flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:w-1/2 w-full max-w-lg">
          <h1 className="text-4xl font-bold text-blue-700">
            Build Work Experience through Skills Challenges Program
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Enhance your Employability and Accelerate your Career Growth by
            working on Hands-on projects & hackathons from various businesses &
            organizations.
          </p>
          <button className="bg-blue-700 text-white text-lg mt-6 py-3 px-8 rounded-md w-max">
            Get Started
          </button>
        </div>
        <div className="flex md:w-1/2 h-max mt-8 md:mt-0 items-end gap-x-4 w-full">
          <Image
            src={Image2}
            alt="Team"
            className="w-[55%] aspect-[6/9] md:aspect-[18/33] lg:aspect-[9/14]"
          />
          <Image
            src={image1}
            alt="Team"
            className="w-[45%] aspect-9/15 md:aspect-[1/2] lg:aspect-[9/15]"
          />
        </div>
      </header>
      {/* Second Section */}
      <section className="container mx-auto py-12 px-5 md:px-20">
        <Heading
          title="Experience a New Way of Building"
          title2="Work Experience"
          text="Join Skills Challenge Program to accelerate your career growth and become part of africa's largest workforce at digital professionals."
        />

        <div className="grid sm:grid-cols-2 gap-8  text-white">
          <div className="p-6 rounded-lg shadow-md sm:col-span-2 bg-primary">
            <i className="fas fa-briefcase bg-white text-primary p-5 rounded-md"></i>
            <p className="body-1 mt-4 font-semibold">
              Build a Strong Portfolio and Hands-On Experience
            </p>
            <p className="mt-4 w-full max-w-2xl body-2 text-zinc-100/90 mb-4">
              Tackle real-world projects through challenges and hackathons that
              mirror real-world challenges faced by businesses and
              organizations. Therefore showcase your skill and accomplishments
              to potential employers and clients through a portfolio of a
              completed projects.
            </p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-md">
            <i className="fas fa-briefcase bg-white text-primary p-5 rounded-md"></i>
            <p className="body-1 mt-4 font-semibold">
              Enhance Your Employment Path
            </p>
            <p className="mt-4 body-2 text-zinc-100/90 mb-4">
              Develop in-demand skills and build a strong portfolio to increase
              your chances of landing your dream job or contract.
            </p>
          </div>
          <div className="bg-primary p-6 rounded-lg shadow-md">
            <i className="fas fa-briefcase bg-white text-primary p-5 rounded-md"></i>
            <p className="body-1 mt-4 font-semibold">
              Earn Recognition and Prizes
            </p>
            <p className="mt-4 body-2 text-zinc-100/90 mb-4">
              Earn both Money and Knowledge Prizes by participating in various
              contests and competitions by working on real-world projects and
              hackathons.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto mb-24 px-5">
        <div className="relative bg-primary overflow-hidden rounded-2xl text-white py-20 px-5 md:px-20 md:flex justify-between grid grid-cols-2 gap-y-4">
          <div className="absolute top-0 right-0 h-[20rem] aspect-square border-[3rem] rounded-full -translate-y-1/2 translate-x-1/3 border-white/20" />
          <div className="absolute top-0 left-0 h-[20rem] aspect-square border-[3rem] rounded-full translate-y-1/3 translate-x-1/3 border-white/20" />
          <p className="body-1 flex flex-col">
            <span className="h2 font-semibold leading-none">1</span>
            <span>Year</span>
          </p>
          <p className="body-1 flex flex-col">
            <span className="h2 font-semibold leading-none">500+</span>
            <span>Challenges Completed</span>
          </p>
          <p className="body-1 flex flex-col">
            <span className="h2 font-semibold leading-none">10K+</span>
            <span>Users</span>
          </p>
          <p className="body-1 flex flex-col">
            <span className="h2 font-semibold leading-none">6+</span>
            <span>Countries</span>
          </p>
        </div>
      </section>

      <Heading
        title="Skills Challenges Cover various in-demand skills and Careers for the digital economy"
        text="Explore the projects that various talents are working on."
        className="px-4"
      />

      <section className="flex flex-wrap gap-3 justify-center">
        {Array(2)
          .fill("")
          .map((item, index) => (
            <button
              key={index}
              className={`button ${
                index === skillChallenge
                  ? "bg-primary !text-white"
                  : "bg-zinc-200"
              } text-zinc-900/90 !font-normal`}
              onClick={() => setSkillChallenge(index)}
            >
              {SkillChallenges[index]}
            </button>
          ))}
      </section>
      <section className="container flex flex-wrap gap-3 justify-center mx-auto py-2 md:px-6 mb-12 max-w-3xl">
        {SkillChallenges.map((item, index) => (
          <button
            key={index}
            className={`button ${
              index === skillChallenge
                ? "bg-primary !text-white"
                : "bg-zinc-200"
            } text-zinc-900/90 ${index < 2 && "hidden"} !font-normal`}
            onClick={() => setSkillChallenge(index)}
          >
            {item}
          </button>
        ))}
      </section>

      <section className="container mx-auto flex md:flex-row flex-col gap-4 bg-zinc-100 px-6 py-12 rounded-md">
        <div className="md:w-1/2 w-full flex flex-col items-start gap-8 px-4 py-8">
          <div className="bg-white py-6 px-4 rounded-md w-max mb-4 mt-8">
            <span className="w-7 aspect-square rounded-full p-2 font-bold bg-black text-white">
              <span style={{ color: "green" }}>S</span>f.
            </span>
          </div>
          <p className="body-2 text-zinc-600 w-full max-w-md">
            The Embedded Finance Platform and Payroll Management Software
            Solutions for your organization and workforce.
          </p>
          <button className="text-primary body-2 tracking-tighter font-semibold">
            Learn more{" "}
            <span className="!py-1 px-2 rounded-full bg-primary">
              <i className="fas fa-arrow-right text-white"></i>
            </span>
          </button>
        </div>
        <div className="md:w-1/2 w-full h-max px-4 mb-16 relative tv">
          <Image src={computerCalcs} alt="computer" className="w-full h-auto" />
        </div>
      </section>

      <nav className="w-full flex gap-4 justify-center py-8 mb-12">
        {Array(4)
          .fill("")
          .map((item, index) => (
            <div
              key={index}
              className={`w-3 h-3 ${
                index === 2 ? "bg-primary" : "bg-zinc-300"
              } rounded-full`}
            />
          ))}
      </nav>
      <section className="container mx-auto px-5">
        <Heading
          title="Explore Challenges & Hackathons"
          text="Join Skills Challenges Program to accelerate your career growth and become part of Africa's largest workforce of digital professionals."
        />

        <div className="flex flex-wrap items-center justify-center gap-6 md:px-8">
          {Array(3)
            .fill("")
            .map((_, index) => (
              <ChallengeCard key={index} {...challenges[index]} />
            ))}
        </div>

        <button className="mt-12 mb-24 border border-blue-500 hover:bg-blue-600 hover:text-white !text-blue-600 font-semibold px-12 py-4 rounded-lg block mx-auto">
          View More
        </button>
      </section>
      <section className="container mx-auto w-full bg-zinc-100 px-4 py-12">
        <Heading
          title="What else can I gain from participating"
          title2=" in Skills Challenges?"
          text="Join Skills Challenges Program to accelerate your career growth and become part of Africa's largest workforce of digital professionals."
        />

        <section className="flex lg:flex-row flex-col">
          <div className="rounded-lg p-6 lg:w-3/5 w-full grid sm:grid-cols-2 gap-4">
            {benefits.map((item, index) => (
              <div key={index}>
                <i
                  className={`fas ${item.icon} p-6 rounded-lg bg-primary text-white mb-4`}
                ></i>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-500 w-full max-w-md">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <section className="lg:w-2/5 w-full">
            <Image
              src={banner_img}
              alt="Featured Project"
              className="w-full h-full max-w-lg mx-auto"
            />
          </section>
        </section>
      </section>
      <section className="container mx-auto py-16 px-4">
        <h3 className="h3 font-bold mb-2 px-3">
          Users are in Love with Skills <br className="max-md:hidden" />
          Challenges Program
        </h3>
        <p className="text-gray-500 text-sm mb-12 px-4">
          See what our clients say about working with us. Their success{" "}
          <br className="max-md:hidden" />
          speaks for our dedication and expertise.
        </p>

        <div className="flex overflow-x-auto scroll-smooth gap-4 py-6 scroll-design">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-16 bg-zinc-100 px-4">
        <Heading title="How to Get Started" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="row-span-3 gap-6 grid sm:grid-row-2">
            <div className="row-span-1 bg-white rounded-lg p-6 ">
              <button className="button bg-primary !text-white mb-4">
                Step 1
              </button>
              <h4 className="text-lg font-semibold mb-2">
                Sign Up on Umurava Platform
              </h4>
              <p className="text-zinc-600 body-2 mb-4">
                Submit your completed project for evaluation
              </p>
              <Image src={signup} alt="signup" className="w-1/2 float-end" />
            </div>
            <div className="row-span-1 bg-white rounded-lg p-6">
              <button className="button bg-primary !text-white mb-4">
                Step 2
              </button>
              <h4 className="text-lg font-semibold mb-2">
                Register and Participate
              </h4>
              <p className="text-zinc-600 body-2 mb-4">
                Sign up for the challenge and start working on the project.
              </p>
              <Image
                src={challengesImage}
                alt="challenges"
                className="w-1/2 float-end"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6">
            <button className="button bg-primary !text-white mb-4">
              Step 2
            </button>
            <h4 className="text-lg font-semibold mb-2">
              Register and Participate
            </h4>
            <p className="text-zinc-600 body-2">
              Sign up for the challenge and start working on the project.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6">
            <button className="button bg-primary !text-white mb-4">
              Step 3
            </button>
            <h4 className="text-lg font-semibold mb-2">Submit your work</h4>
            <p className="text-zinc-600 body-2">
              Submit your completed project for evaluation
            </p>
          </div>

          <div className="bg-white rounded-lg p-6">
            <button className="button bg-primary !text-white mb-4">
              Step 4
            </button>
            <h4 className="text-lg font-semibold mb-2">
              Receive Feedback and Recognition
            </h4>
            <p className="text-zinc-600 body-2">
              Get feedback on your work and celebrate your achievements.
            </p>
          </div>
        </div>
      </section>
      <section className="container mx-auto w-full lg:p-16 md:p-12 p-6">
        <div className="w-full bg-primary text-white rounded-2xl p-12 flex md:flex-row flex-col gap-12">
          <div className="md:w-2/5 w-full">
            <Image src={students} alt="students" className="w-full h-full" />
          </div>
          <div className="md:w-1/2 w-full flex flex-col items-start justify-center md:pl-8">
            <h3 className="h3 font-semibold mb-4 md:pr-4">
              Ready to Unlock Your Career Potential Today!
            </h3>
            <p className="body-2 text-white/90 mb-12">
              Join a challenge or a Hackathon to gain valuable work experience,
              build an impressive portfolio and increase your chances to land
              job opportunities and celebrate your career growth.
            </p>
            <button className="button bg-white text-primary py-4 px-12">
              View Challenge
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
