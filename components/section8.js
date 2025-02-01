import React from "react";

const benefits = [
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
        {/* Add your icon here */}
      </svg>
    ),
    title: "Employability and Career Development Opportunities",
    description:
      "Students gain hands-on experience working on real-world challenges and help them build professional networks that increase their chances and readiness of landing career opportunities and leading to career advancement and long-term success.",
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
        {/* Add your icon here */}
      </svg>
    ),
    title: "Practical Application of Classroom Knowledge",
    description:
      "The Skills Challenges bridge the gap between theoretical learning and practical application, reinforcing what students learn in their academic courses.",
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
        {/* Add your icon here */}
      </svg>
    ),
    title: "Students & Trainees Engagement",
    description:
      "Empowers and motivates Skills Challenges into your courses to give students and trainees hands-on experience and practice. This enhances their learning experience and provides a competitive advantage in their chosen field. Students will be motivated and actively engaged in their learning journey.",
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
        {/* Add your icon here */}
      </svg>
    ),
    title: "Access to the Industry Experts & Mentors",
    description:
      "Skills Challenges expose students to industry experts and mentors who offer guidance, support, and insights on the trends of digital careers. This can help students gain a deep understanding of their chosen field.",
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
        {/* Add your icon here */}
      </svg>
    ),
    title: "Skills Assessments",
    description:
      "Embed our projects into your lessons and skills assessments directly into your curriculum.",
  },
];

const KeyOfferingsAndBenefits = () => {
  return (
    <section className="container mx-auto py-16">
      <h3 className="text-xl font-semibold mb-4">Key Offerings & Benefits:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div key={index} className="bg-blue-50 rounded-lg p-6">
            {benefit.icon}
            <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
            <p>{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyOfferingsAndBenefits;
