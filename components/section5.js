import React from "react";

const problemSolutions = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    ),
    title: "Bridging the Experience Gap",
    description:
      "Many talents acquire theoretical knowledge and are rejected from jobs because they lack work experience and are not able to put in actions what they acquired in the schools.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 12h6m-6 0l3-3m-3 3l3 3"
        />
      </svg>
    ),
    title: "Bridging Education and Employment",
    description:
      "Traditional education doesn't always prepare talents for the demands of the tech and digital economy and we are providing in-demand skills through Skills Challenges.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 10.5a8.25 8.25 0 11-16.5 0 8.25 8.25 0 0116.5 0z"
        />
      </svg>
    ),
    title: "Preparing Talents for Global Job Markets",
    description:
      "We are ensuring that African talents shine globally and that's why we are equipping them with global technical experience and standout globally.",
  },
];

const WhyWeAreSolvingThisProblem = () => {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        Why we are solving this problem
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {problemSolutions.map((solution, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6">
            {solution.icon}
            <h3 className="text-lg font-semibold mb-2">{solution.title}</h3>
            <p>{solution.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyWeAreSolvingThisProblem;
