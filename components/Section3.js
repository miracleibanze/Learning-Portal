import React from "react";

const steps = [
  {
    step: 1,
    title: "Sign Up on Umurava Platform",
    description: "Submit your completed project for evaluation",
  },
  {
    step: 2,
    title: "Register and Participate",
    description: "Sign up for the challenge and start working on the project.",
  },
  {
    step: 3,
    title: "Submit your work",
    description: "Submit your completed project for evaluation",
  },
  {
    step: 4,
    title: "Receive Feedback and Recognition",
    description: "Get feedback on your work and celebrate your achievements.",
  },
];

const HowToGetStarted = () => {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        How to Get Started
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {steps.map((step) => (
          <div key={step.step} className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Step {step.step}</h3>
            <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
            <p>{step.description}</p>
            {/* Add image or icon here */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowToGetStarted;
