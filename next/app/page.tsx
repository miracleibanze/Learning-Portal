"use client";

import { FC, memo, useContext, useEffect, useRef } from "react";
import {
  features,
  instructors,
  pricingPlans,
  quickLinks,
  socials,
  testimonies,
} from "../features/constants";
import ClipPath from "../assets/svgs/ClipPath";
import Arrow from "../assets/svgs/Arrow";
import Image from "next/image";
import SectionLoader from "@components/designs/SectionLoader";
import { featuresCard, pcBook2, pcBook3, pcBulb, student } from "@assets";
import { useDispatch, useSelector } from "react-redux";
import {
  setAboutRef,
  setCoursesRef,
  setPricingRef,
  setFeaturesRef,
} from "@redux/slices/refsSlice";
import { AppDispatch, RootState } from "@redux/store";
import { usePathname, useRouter } from "next/navigation";
import { fetchTop4Courses } from "@redux/slices/coursesSlice";

const Home: FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { top4Courses } = useSelector((state: RootState) => state.courses);

  const homeRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const coursesRef = useRef<HTMLDivElement | null>(null);
  const pricingRef = useRef<HTMLDivElement | null>(null);

  // Dispatch refs to Redux store (by using ID or section name)
  useEffect(() => {
    if (aboutRef.current) {
      dispatch(setAboutRef("about"));
    }
    if (featuresRef.current) {
      dispatch(setFeaturesRef("features"));
    }
    if (coursesRef.current) {
      dispatch(setCoursesRef("courses"));
    }
    if (pricingRef.current) {
      dispatch(setPricingRef("pricing"));
    }
  }, [dispatch]);

  useEffect(() => {
    if (top4Courses.data.length > 0) return;
    dispatch(fetchTop4Courses());
  }, [pathname]);

  const scrollToSection = (section: React.RefObject<HTMLDivElement | null>) => {
    if (section.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <header
        id="header-banner"
        ref={homeRef}
        className="relative text-white py-20"
      >
        <div className="mx-auto px-5 flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-3/5 text-center md:text-left z-[100]">
            <h1 className="h1 font-extrabold leading-tight flex">
              Transform Your Learning&nbsp;Experience
            </h1>
            <p className="mt-6 text-lg">
              Discover the tools and courses to unlock your potential.
              <br />
              Learn, grow, and achieve with <strong>IMBONI Learn</strong>.
            </p>
            <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollToSection(aboutRef)}
                className="bg-white text-darkPrimary hover:bg-opacityPrimary px-6 py-3 text-lg font-semibold shadow-md transition rounded-full"
              >
                Explore Features
              </button>
              <button
                onClick={() => scrollToSection(coursesRef)}
                className="bg-darkPrimary hover:bg-violet-700 px-6 py-3 text-white text-lg font-semibold shadow-md transition rounded-full z-[10]"
              >
                Browse Courses
              </button>
            </div>
          </div>
          <div className="absolute inset-0 w-full">
            <div className="absolute inset-0 bg-gradient-to-r w-full from-primary via-indigo-600 to-transparent z-[10]" />
            <Image
              src={pcBulb}
              alt="Learning Illustration"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        </div>
      </header>

      <section
        id="about"
        ref={aboutRef}
        className="w-full max-w-screen-lg mx-auto px-6 text-center py-16 bg-darkPrimary dark:text-zinc-200"
      >
        <h2 className="h2 font-bold text-gray-800 dark:text-zinc-100">
          About Us
        </h2>
        <p className="mt-4 body-1">
          IMBONI Learn is an innovative platform offering high-quality
          educational content from a global netassignment of instructors. Our
          goal is to empower learners to gain skills and knowledge that will
          benefit them in both personal and professional growth.
        </p>
        <p className="mt-4 body-1">
          We offer flexible learning experiences with both live sessions and
          on-demand courses that fit your schedule and learning preferences.
        </p>
        <Image
          src={student}
          alt="Student Learning"
          className="w-full object-cover object-left"
        />
        <p className="mt-4 body-1">
          With powerful tools like progress tracking, AI recommendations, and an
          interactive community, IMBONI Learn ensures that learners receive
          personalized and effective education.
        </p>
      </section>

      <section
        id="features"
        ref={featuresRef}
        className="py-16 bg-gray-100 dark:bg-zinc-900 mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-zinc-100">
          Why Choose IMBONI Learn?
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-400">
          Discover the powerful features and tools that make learning with us
          engaging and impactful.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] group"
              style={{ backgroundImage: `url("${featuresCard}")` }}
            >
              <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem] pointer-events-none z-[100]">
                <h5 className="h5 mb-5 font-semibold leading-tight">
                  {feature.title}
                </h5>
                <p className="body-2 leading-tight">{feature.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full ${feature.bgColor} group-hover:bg-gray-300`}
                  >
                    <i className={`${feature.icon} text-2xl z-[10]`}></i>
                  </div>
                  <span className="flex items-center space-x-2 body-1 group-hover:bg-darkPrimary group-hover:text-white rounded-full pl-4 py-2 group-hover:pr-2">
                    <span className="text-sm leading-tight">Explore more</span>
                    <Arrow />
                  </span>
                </div>
              </div>
              <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-30 transition-opacity hover:opacity-50">
                  <Image
                    src={pcBook3}
                    height={380}
                    width={362}
                    alt="ask"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <ClipPath />
            </div>
          ))}
        </div>
      </section>

      <section id="courses" ref={coursesRef} className="py-16 px-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center dark:text-zinc-100 py-4">
          Our Courses
        </h2>
        <div className="relative max-w-full overflow-x-scroll">
          <div className="flex relative mb-4 gap-8 mt-8 w-max">
            {top4Courses.data.length > 0 ? (
              top4Courses.data.map((item, index) => (
                <div
                  className="w-[18rem] h-[28rem] bg-white rounded-lg shadow-md shadow-black/90 dark:bg-zinc-800/50 dark:shadow-slate-200 flex-0"
                  key={item._id + index}
                >
                  <div className="w-full aspect-video bg-zinc-300">
                    <Image
                      src={pcBook2}
                      alt="course"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h5 className="body-1 leading-tight font-semibold text-gray-800 dark:text-gray-100">
                      {item.title}
                    </h5>
                    <p className="mt-4 body-2 truncate-two-lines">
                      {item.description}
                    </p>
                    <p className="mt-4 body-2 flex gap-x-3 flex-wrap gap-y-2">
                      {item.tags.map((tag) => (
                        <span
                          className="py-1 rounded-full bg-zinc-300/80 dark:text-black px-3 body-2 leading-none"
                          key={index + ": " + tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </p>
                    <p className="mt-4">
                      By: {item.instructor.name || "Private instructor"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <SectionLoader />
            )}
          </div>
        </div>
        <div className="w-full h-full flex-1 flex items-end mt-4 justify-end">
          <button className="button bg-primary dark:bg-lightPrimary text-white dark:text-darkPrimary px-8">
            See More Courses
          </button>
        </div>
      </section>

      <section className="py-32 bg-gray-100 dark:bg-zinc-900 mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-zinc-100">
          Meet Our Experts
        </h2>
        <p className="mt-4 text-lg text-center text-gray-600 dark:text-gray-400">
          Our instructors are experienced professionals who are passionate about
          helping you succeed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {instructors.map((instructor, index) => (
            <div
              key={index}
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg knob relative shadow-md shadow-black/90"
            >
              <Image
                src={instructor.image}
                alt="Instructor"
                className="w-full h-48 object-cover rounded-2xl bg-zinc-300 object-top"
              />
              <h3 className="mt-6 text-xl font-bold text-gray-800 dark:text-zinc-100">
                {instructor.name}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {instructor.role}
              </p>
              <p className="mt-2 body-2 leading-tight text-gray-600 dark:text-gray-300">
                {instructor.description}
              </p>
              <button className="button !bg-primary mt-8 hover:scale-105 duration-300 transition">
                Connect
              </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="testimonials"
        className="py-32 bg-gray-50 dark:bg-zinc-800 mx-auto px-6"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-zinc-100">
          What Our Learners Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {testimonies.map((item) => (
            <div
              className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg max-w-sm flex flex-col justify-between shadow-black dark:shadow-zinc-300"
              key={item.name + ": " + item.title}
            >
              <p className="text-lg text-gray-600 dark:text-gray-300">
                "{item.content}"
              </p>
              <div className="mt-4 flex items-center">
                <Image
                  src={item.image}
                  alt="Student"
                  className="w-20 h-24 rounded-2xl bg-zinc-200 object-cover object-center"
                />
                <div className="ml-4">
                  <p className="font-semibold text-gray-800 dark:text-gray-100">
                    {item.name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        id="pricing"
        ref={pricingRef}
        className="py-32 bg-gradient-to-br from-primary to-violet-700 text-white mx-auto px-6 text-center"
      >
        <h2 className="text-4xl font-extrabold">Affordable Pricing</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Choose from a range of pricing options that fit your budget and
          learning needs. Get started today and access high-quality education at
          affordable prices.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white text-gray-800 max-2xl:mt-10 p-8 rounded-2xl shadow-lg max-w-sm transform transition duration-300 flex flex-col justify-between hover:scale-105 ${
                plan.isPopular ? "border-4 border-secondary" : ""
              }`}
            >
              <div className="relative">
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 text-sm font-semibold rounded-bl-lg">
                    Popular
                  </div>
                )}

                <div className="flex justify-center">
                  <i className={plan.iconStyles}></i>
                </div>

                <h3 className="mt-2 text-2xl font-bold">{plan.title}</h3>
                <p className="mt-4 text-xl font-semibold text-darkPrimary">
                  {plan.price}
                </p>
                <p className="mt-4 text-gray-600">{plan.description}</p>

                <ul className="mt-6 text-left space-y-3">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center">
                      <i className="fas fa-check text-darkPrimary mr-2"></i>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-8 !bg-primary hover:bg-primary text-white px-6 py-3 rounded-full font-semibold transition duration-200">
                {plan.buttonText}
              </button>
              <div
                className={`absolute top-full w-[90%] mx-auto z-1 h-6 right-0 left-0 bg-darkPrimary shadow-xl rounded-b-[1.25rem] lg:h-5 ${
                  plan.isPopular && "border-t-4 border-[3px] border-secondary"
                }`}
              />
              <div
                className={`absolute top-full w-[70%] mx-auto z-1 h-6 right-0 left-0 bg-neutral-800/70 shadow-xl rounded-b-[1.25rem] lg:h-5 translate-y-5 ${
                  plan.isPopular && "border-t-none border-2 border-secondary"
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-white mt-32 text-black dark:text-white dark:bg-black px-12 py-10 container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <h4 className="text-lg font-bold mb-4">About IMBONI Learn</h4>
          <p className="text-sm">
            IMBONI Learn is your trusted platform for personalized, flexible,
            and high-quality education. Empowering learners across the globe
            with affordable courses and expert-led instruction.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <div className="space-y-2 text-sm flex flex-col">
            {quickLinks.map((link, index) => (
              <span
                key={index}
                onClick={() => {
                  if (link === "Home") {
                    scrollToSection(homeRef);
                  } else if (link === "About") {
                    scrollToSection(aboutRef);
                  } else if (link === "Courses") {
                    scrollToSection(coursesRef);
                  } else if (link === "Features") {
                    scrollToSection(featuresRef);
                  } else if (link === "Pricing") {
                    scrollToSection(pricingRef);
                  } else {
                  }
                }}
                className="cursor-pointer hover:text-teal-400"
              >
                {link}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <p className="text-sm">
            Email:{" "}
            <a
              href="mailto:miracleibanze@gmail.com"
              className="hover:text-teal-400"
            >
              support@imbonilearn.com
            </a>
          </p>
          <p className="text-sm mt-2">Phone: +250 123 456 789</p>
          <p className="text-sm mt-2">Location: Kigali, Rwanda</p>
          <button className="button !bg-primary mt-4">Contact us</button>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-4">Follow Us</h4>
          <div className="flex gap-x-4 flex-wrap">
            {socials.map((social) => (
              <a
                href={social.link}
                className="hover:text-teal-400"
                key={social.name}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
        <p className="text-sm mt-4 md:col-span-5 text-center border-t pt-4">
          &copy; {new Date().getFullYear()} IMBONI Learn. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default memo(Home);
