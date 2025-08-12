import {
  Award,
  BookMarked,
  Brain,
  ChartSpline,
  GraduationCap,
  Handshake,
  Smartphone,
  Tags,
  UserPen,
} from "lucide-react";
import {
  backgroundBulb,
  backgroundCats,
  backgroundFuturistic,
  instructor,
  instructor2,
  instructor3,
  person,
  person2,
  person3,
} from "../assets";

interface NavLink {
  name: string;
  link: string;
}

export const navLinks: NavLink[] = [
  {
    name: "About",
    link: "about",
  },
  {
    name: "Features",
    link: "features",
  },
  {
    name: "Courses",
    link: "courses",
  },
  {
    name: "Pricing",
    link: "pricing",
  },
  {
    name: "Contact",
    link: "Contact",
  },
  {
    name: "help",
    link: "help&FAQs",
  },
];

export const features = [
  {
    title: "Interactive Learning Environment",
    description:
      "Engage in live sessions, quizzes, and hands-on projects designed to provide a dynamic and immersive learning experience. With real-time interactions and collaborative tasks, you'll never feel alone on your learning journey.",
    icon: GraduationCap,
    color: "green",
  },
  {
    title: "AI-Powered Personalized Learning",
    description:
      "Track your progress, identify areas for improvement, and receive personalized learning paths. Our AI-driven system ensures that every student gets a tailored experience to maximize their potential.",
    icon: Brain,
    color: "blue",
  },
  {
    title: "Diverse Course Library",
    description:
      "Explore a comprehensive range of courses across various fields, including technology, business, art, and more. All courses are developed by experienced instructors to ensure quality and relevance.",
    icon: BookMarked,
    color: "red",
  },
  {
    title: "Expert Instructors",
    description:
      "Learn from a team of seasoned professionals who bring real-world experience to the virtual classroom. Benefit from their industry insights and practical knowledge to enhance your skills.",
    icon: UserPen,
    color: "yellow",
    black: true,
  },
  {
    title: "Progress Tracking & Analytics",
    description:
      "Monitor your achievements, assess your learning outcomes, and gain insights through detailed analytics. Stay motivated as you watch your progress unfold in real-time.",
    icon: ChartSpline,
    color: "purple",
  },
  {
    title: "Collaborative Learning",
    description:
      "Connect with peers and instructors through interactive forums, group projects, and live discussions. Share ideas, ask questions, and grow together in a supportive learning community.",
    icon: Handshake,
    color: "indigo",
  },
  {
    title: "Certifications",
    description:
      "Earn certifications that are recognized and respected by employers and institutions worldwide. Showcase your skills and achievements to advance your career or academic pursuits.",
    icon: Award,
    color: "teal",
  },
  {
    title: "Mobile-Friendly Access",
    description:
      "Access all features and resources seamlessly on any device. Whether you're at home, at assignment, or on the go, our platform adapts to your needs to ensure uninterrupted learning.",
    icon: Smartphone,
    color: "brown",
  },
  {
    title: "Affordable Pricing",
    description:
      "Gain access to high-quality education without breaking the bank. Choose from a variety of affordable plans and free options to match your budget and learning goals.",
    icon: Tags,
    color: "cyan",
    black: true,
  },
];

export const instructors = [
  {
    name: "Alice UMUNYANA",
    role: "Data Science Instructor",
    description:
      "Alice has over 10 years of experience in the data science field and a passion for teaching.",
    image: instructor,
  },
  {
    name: "Mark NDUNGUTSE",
    role: "Web Development Instructor",
    description:
      "Mark specializes in full-stack web development and has helped hundreds of students build successful careers.",
    image: instructor2,
  },
  {
    name: "Sara NYIRANEZA",
    role: "UX/UI Design Instructor",
    description:
      "With over 8 years in design, Sara teaches students the latest tools and trends in UX/UI design.",
    image: instructor3,
  },
];
export const testimonies = [
  {
    name: "Jane UMURISA",
    title: "Marketing Specialist",
    content:
      "The flexibility of the courses and the personalized feedback I received helped me advance my career significantly!",
    image: person,
  },
  {
    name: "John DUSHIME",
    title: "Software Developer",
    content:
      "IMBONI Learn has completely transformed the way I approach learning. The courses are top-notch, and the support from the instructors is fantastic!",
    image: person2,
  },
  {
    name: "Peter MURANGWA",
    title: "UX Designer",
    content:
      "The interactive community and the well-structured courses on IMBONI Learn have been a game-changer for my professional growth. Highly recommend it!",
    image: person3,
  },
];

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  buttonText: string;
  benefits: string[];
  iconStyles: string;
  isPopular?: boolean;
}
export const pricingPlans = [
  {
    title: "Basic Plan",
    price: "$19.99/month",
    description: "Access all courses with limited features.",
    buttonText: "Subscribe Now",
    benefits: [
      "Access to all courses",
      "Limited features",
      "Monthly subscription",
    ],
    iconStyles: "fas fa-star text-5xl text-darkPrimary",
  },
  {
    title: "Pro Plan",
    price: "$49.99/month",
    description: "Access all courses and premium features.",
    buttonText: "Subscribe Now",
    benefits: [
      "Access to all courses",
      "Premium features",
      "Monthly subscription",
      "Higher priority support",
      "Open AI accessibility",
    ],
    iconStyles: "fas fa-crown text-5xl text-secondary",
    isPopular: true,
  },
  {
    title: "Single Course",
    price: "$9.99/course",
    description:
      "Purchase a single course. Great for learners who want to focus on specific skills.",
    buttonText: "Buy Now",
    benefits: [
      "Access to one course of choice",
      "No monthly subscription",
      "One-time payment",
    ],
    iconStyles: "fas fa-check text-5xl text-darkPrimary",
  },
];

export const socials = [
  {
    name: "Facebook",
    link: "#",
  },
  {
    name: "Twitter",
    link: "#",
  },
  {
    name: "LinkedIn",
    link: "#",
  },
  {
    name: "Instagram",
    link: "#",
  },
];

export const quickLinks = ["Home", "About", "Courses", "Features", "Pricing"];

interface Course {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  instructor: {
    name: string;
  };
}
export const courses: Course[] = [
  {
    _id: "13453223erfed",
    title: "software development",
    description:
      "this course takes you up to the proffessional level from begginer",
    tags: [
      "Next.js",
      "React.js",
      "Tailwindcss",
      "Redux",
      "Unit Testing",
      "Others",
    ],
    instructor: {
      name: "Miracle IBANZE",
    },
  },
  {
    _id: "23453223erfed",
    title: "software development",
    description:
      "this course takes you up to the proffessional level from begginer",
    tags: [
      "Next.js",
      "React.js",
      "Tailwindcss",
      "Redux",
      "Unit Testing",
      "Others",
    ],
    instructor: {
      name: "Miracle IBANZE",
    },
  },
];

export const SideBarBackgounds = [
  {
    name: "cats",
    image: backgroundCats,
    code: "bgCats",
  },
  {
    name: "bulb",
    image: backgroundBulb,
    code: "bgBulb",
  },
  {
    name: "cyber",
    image: backgroundFuturistic,
    code: "bgCyber",
  },
];
