import Heading from "@components/Heading";
import {
  Ared,
  banner_img,
  challengesImage,
  CIBA,
  EducationCollaborative,
  Gdg_Kigali,
  HiiL_Logo,
  IGIHE_LOGO,
  Image3,
  KeplerLogo,
  SokoFund,
  Tori,
} from "@public";
import Image, { StaticImageData } from "next/image";
import { FC } from "react";

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    icon: "fas fa-briefcase",
    title: "Employability and Career Development Opportunities",
    description:
      "Students gain hands-on experience working on real-world challenges and help them build professional networks that increase their chances and readiness of landing job opportunities and lead to career advancement and long-term success.",
  },
  {
    icon: "fas fa-briefcase",
    title: "Practical Application of Classroom Knowledge",
    description:
      "The Skills Challenges bridge the gap between theoretical learning and practical application, reinforcing what students learn in their academic courses.",
  },
  {
    icon: "fas fa-briefcase",
    title: "Students & Trainees Engagement",
    description:
      "Entices and motivates Skills Challenges into your courses to give students and trainees hands-on experiences and practice. This enhances their learning and makes it more interactive. Competitive spirit and collaboration among students will be stimulated and actively engaged in their learning journey.",
  },
  {
    icon: "fas fa-briefcase",
    title: "Access to the Industry Experts & Mentors",
    description:
      "Skills Challenges expose students to industry experts and mentors who offer guidance, support, and insights on the trends of digital careers. This can help students gain a deep understanding of their chosen field.",
  },
  {
    icon: "fas fa-briefcase",
    title: "Skills Assessments",
    description:
      "Embed our projects into your courses and skill assessments directly into your curriculum.",
  },
];

interface PartnerLogo {
  src: StaticImageData;
  alt: string;
}

const logos: PartnerLogo[] = [
  { src: Tori, alt: "TORI Logo" },
  { src: Gdg_Kigali, alt: "GDG Kigali Logo" },
  {
    src: EducationCollaborative,
    alt: "The Education Collaborative Logo",
  },
  { src: KeplerLogo, alt: "Kepler Logo" },
  { src: HiiL_Logo, alt: "HIIL Logo" },
  { src: CIBA, alt: "CIB Logo" },
  { src: Ared, alt: "ARED Logo" },
  { src: IGIHE_LOGO, alt: "IGIHE Logo" },
  { src: KeplerLogo, alt: "Kepler Logo" }, // Duplicate for demonstration
  { src: SokoFund, alt: "SokoFund Logo" },
];

const steps: string[] = [
  "As Career Development and Job Readiness Program",
  "As Skills Assessments Method after a course or a term",
  "As extracurricular activities to complement academic courses",
  "As the portfolio of the Students",
  "As part of Capstone Projects or final-year assignments",
];
const page: FC = () => {
  return (
    <>
      <section className="container mx-auto py-16 grid md:grid-cols-2 gap-8 md:px-12 px-6">
        <div className="md:pr-8 my-auto">
          <h5 className="h5 pr-5 leading-tight font-bold text-primary mb-6">
            Accelerate Your Students and Trainees Employability and Career
            Growth through Project-based Learning Solution
          </h5>
          <p className="text-lg text-justify md:pr-12 mb-8">
            We partner with Universities, Schools, and Training Institutions to
            build the work experience of their students and trainees through
            project-based learning challenges and hackathons.
          </p>
          <button className="bg-primary hover:bg-blue-600 text-white px-8 py-3 rounded-md">
            Partner with us
          </button>
        </div>
        <Image src={Image3} alt="students" />
      </section>
      <section className="container mx-auto py-16 md:px-12 px-6">
        <Heading title="Key Offerings & Benefits:" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-primary text-white rounded-lg py-6 px-8 ${
                index === 3 && "md:col-span-2"
              } ${index === 2 && "sm:col-span-2 md:col-span-1"}`}
            >
              <i
                className={`fas ${benefit.icon} p-5 text-primary bg-white rounded-md mb-3`}
              ></i>
              <h4 className="text-lg font-semibold mb-3">{benefit.title}</h4>
              <p className="text-sm text-white/80 ">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto py-16 text-center">
        <Heading title="Join a few Educational Institutions using Skills Challenges by Umurava" />

        <div className="flex flex-wrap justify-center gap-6 mx-auto md:px-32 sm:px-20 px-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-16 gap-8"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={50}
                className="h-full w-auto"
              />
            </div>
          ))}
        </div>
      </section>
      <section className="container mx-auto py-16 px-6 md:px-12 mb-20">
        <Heading title="How Skills Challenges Program can be Integrated into your Learning Institution" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 mx-auto">
          <ol className="flex flex-col list-none px-4 gap-3 my-auto">
            {steps.map((item, index) => (
              <li className="flex items-center text-zinc-600" key={index}>
                <span className="bg-blue-500 border border-darkBlue rounded-full h-10 flex-0 aspect-square flex items-center justify-center text-white mr-2">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
          <div className="w-full flex items-center justify-center p-4">
            <Image
              src={banner_img}
              alt="Skills Challenges Integration Mockup"
              className="w-full max-w-[30rem]"
            />
          </div>
        </div>

        <div className="bg-blue-500 text-white rounded-2xl text-center mt-10 relative py-16 flex flex-col items-center">
          <div className="absolute top-0 right-0 md:h-[23rem] h-[10rem] aspect-square md:border-[3rem] border-[1.5rem] rounded-full md:-translate-y-1/2 -translate-y-2/3 translate-x-1/3 border-white/20" />
          <div className="absolute top-0 left-0 md:h-[25rem] h-[10rem] aspect-square md:border-[3rem] border-[1.5rem] rounded-full md:translate-y-1/3 translate-y-1/2 md:-translate-x-2/3 translate-x-1/3 border-white/20" />
          <h3 className="h3 font-bold w-full max-w-[25rem] mx-auto">
            Ready to transform your learning&nbsp;institution?
          </h3>
          <button className="bg-white text-blue-500 px-12 py-4 rounded-md mt-4 w-max">
            Let's Partner
          </button>
        </div>
      </section>
    </>
  );
};

export default page;
