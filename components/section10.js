import React from "react";

const IntegrationScenarios = () => {
  const scenarios = [
    "As Career Development and Job Readiness Program",
    "As Skills Assessments Method after a course or a term",
    "As extracurricular activities to complement academic courses",
    "As the portfolio of the Students",
    "As part of Capstone Projects or final-year assignments",
  ];

  return (
    <>
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          How Skills Challenges Program can be Integrated into your Learning
          Institution
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <ol className="list-decimal list-inside">
              {scenarios.map((scenario, index) => (
                <li key={index}>{scenario}</li>
              ))}
            </ol>
          </div>
          <div>
            <img
              src="mockup-image.png"
              alt="Skills Challenges Integration Mockup"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="bg-blue-500 text-white rounded-lg py-6 text-center mt-10">
          <h3 className="text-xl font-bold">
            Ready to transform your learning institution?
          </h3>
          <button className="bg-white text-blue-500 px-4 py-2 rounded-md mt-4">
            Let's Partner
          </button>
        </div>
      </section>
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          How to Get Started
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Step 1</h3>
            <h4 className="text-lg font-semibold mb-2">
              Sign Up on Umurava Platform
            </h4>
            <p>Submit your completed project for evaluation</p>
            {/* Optional: Add an image or icon here */}
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Step 2</h3>
            <h4 className="text-lg font-semibold mb-2">
              Register and Participate
            </h4>
            <p>Sign up for the challenge and start working on the project.</p>
            {/* Optional: Add an image or icon here */}
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Step 3</h3>
            <h4 className="text-lg font-semibold mb-2">Submit your work</h4>
            <p>Submit your completed project for evaluation</p>
            {/* Optional: Add an image or icon here */}
          </div>

          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Step 4</h3>
            <h4 className="text-lg font-semibold mb-2">
              Receive Feedback and Recognition
            </h4>
            <p>Get feedback on your work and celebrate your achievements.</p>
            {/* Optional: Add an image or icon here */}
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-2/3">
            <p className="text-gray-600">
              With 3 years of experience matching African digital talents with
              local and global job markets, we still remain with a big number of
              jobs that remain unfilled due to the lack of experienced African
              Talents.
            </p>
            <p className="text-gray-600 mt-4">
              Driven by our mission to place skilled and professional digital
              talent, we created Skills Challenges as a project-based learning
              solution for talents to gain real-world experience, solve
              problems, and build portfolios so that they become ready for
              global job markets.
            </p>
          </div>
          <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
            <img
              src="/image-placeholder.jpg"
              alt="Skills Challenges"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      
      <section className="container mx-auto py-16">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-2/3">
            <h2 className="text-2xl font-bold mb-4">
              Skills Challenges Program is built on the Umurava Talent
              Marketplace Platform
            </h2>
            <p>
              A Project-based Learning Solution aimed at providing young and
              senior talents with an opportunity to showcase their skills to
              real-world projects and challenges from our partner companies and
              organizations.
            </p>
            <p>
              Umurava Skills Challenges enables young talents to build a
              portfolio and experience that increases their readiness to access
              job opportunities and projects.
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              Get Started
            </button>
          </div>
          <div className="w-full sm:w-1/3 mt-4 sm:mt-0">
            <img
              src="/marketplace-mockup.png"
              alt="Umurava Talent Marketplace"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Accelerate Your Students and Trainees Employability and Career
            Growth through Project-based Learning Solution
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
      <section className="container mx-auto py-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          Users are in Love with Skills Challenges Program
        </h2>
        <p className="text-center text-gray-500 mb-12">
          See what our clients say about working with us. Their success speaks
          for our dedication and expertise.
        </p>

        <div className="flex overflow-x-auto scroll-smooth">
          {testimonials.map((testimonial, index) => (
            <>
              {/* // <TestimonialCard key={index} {...testimonial} /> */}
              <h2>{JSON.stringify(testimonial)} </h2>
            </>
          ))}
        </div>

        <div className="flex justify-center mt-4">
          <div className="w-4 h-1 rounded-full bg-gray-500 mx-1"></div>
          <div className="w-4 h-1 rounded-full bg-gray-500 mx-1"></div>
          <div className="w-4 h-1 rounded-full bg-gray-500 mx-1"></div>
          <div className="w-4 h-1 rounded-full bg-gray-500 mx-1"></div>
        </div>

        <h2 className="text-2xl font-bold text-center mt-16">
          How to Get Started
        </h2>
      </section>
      ;
    </>
  );
};

export default IntegrationScenarios;
