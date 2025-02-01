import React from "react";

const PartnerWithUsSection = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">
          Accelerate Your Students and Trainees Employability and Career Growth
          through Project-based Learning Solution
        </h2>
        <p className="text-lg mb-6">
          We partner with Universities, Schools, and Training Institutions to
          build the work experience of their students and trainees through
          project-based learning challenges and hackathons.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
          Partner with us
        </button>
      </div>

      {/* Optional: Key Offerings & Benefits Section */}
      {/* <div className="mt-16">
        <h3 className="text-xl font-semibold mb-4">Key Offerings & Benefits:</h3>
        <ul className="list-disc pl-6">
          <li>Benefit 1</li>
          <li>Benefit 2</li>
          <li>Benefit 3</li>
        </ul>
      </div> */}
    </section>
  );
};

export default PartnerWithUsSection;
