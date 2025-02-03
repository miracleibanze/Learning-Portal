export const jobTitles: string[] = [
  "Software Developer",
  "Software Engineer",
  "Web Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "Product Manager",
  "Data Scientist",
  "Data Engineer",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "QA Engineer (Quality Assurance)",
  "Cybersecurity Specialist",
  "Cloud Engineer",
  "System Administrator",
  "Network Engineer",
  "Game Developer",
  "Blockchain Developer",
  "AI Researcher",
  "IT Support Specialist",
  "Cloud Architect",
  "Business Analyst",
  "Technical Writer",
];

import { Challenge } from "@redux/slices/challengeSlice";

interface Participants {
  name: string;
  role: string;
}

export const challenges: Challenge[] = [
  {
    _id: "1jkhu8888797887789u89",
    title: "Design a Dashboard for SokoFund",
    skills: ["UX Design", "Research", "User Flow", "Sketch", "Figma"],
    difficulty: "Beginner",
    deadline: "15 Days",
    status: "ongoing",
    description:
      "Design a modern and user-friendly dashboard for SokoFund, a microfinance platform.",
    duration: "15 Days",
    prize: "$500",
    participants: [
      { name: "John Doe", role: "UI/UX Designer" },
      { name: "Jane Smith", role: "Researcher" },
    ],
    tasks: [
      "Research user needs and create personas",
      "Create wireframes and user flow",
      "Design high-fidelity mockups using Figma",
    ],
    deliverables: [
      "Figma design files",
      "Wireframes and user flow documentation",
    ],
  },
  {
    _id: "2jkhu8888797887789u89",
    title: "Create an E-commerce Website for TechStore",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    difficulty: "Intermediate",
    deadline: "20 Days",
    status: "open",
    description:
      "Develop a fully functional e-commerce website for selling tech products.",
    duration: "20 Days",
    prize: "$1000",
    participants: [
      { name: "Alice Brown", role: "Frontend Developer" },
      { name: "Bob Green", role: "Backend Developer" },
    ],
    tasks: [
      "Develop the homepage layout",
      "Integrate payment gateway",
      "Set up product catalog and cart functionality",
    ],
    deliverables: ["Frontend codebase", "Backend API and database setup"],
  },
  {
    _id: "3jkhu8888797887789u89",
    title: "Build a Social Media App",
    skills: ["React", "Firebase", "Redux", "Tailwind CSS"],
    difficulty: "Advanced",
    deadline: "30 Days",
    status: "completed",
    description:
      "Create a social media app where users can post, comment, and interact with each other.",
    duration: "30 Days",
    prize: "$2000",
    participants: [
      { name: "Michael Johnson", role: "Full Stack Developer" },
      { name: "Emily White", role: "Product Designer" },
    ],
    tasks: [
      "Set up Firebase authentication",
      "Create user profiles and posts feature",
      "Build chat and notification systems",
    ],
    deliverables: [
      "Mobile-friendly React app",
      "Firebase integration for authentication and data storage",
    ],
  },
  {
    _id: "4jkhu8888797887789u89",
    title: "Develop a Chatbot for Customer Support",
    skills: ["JavaScript", "Node.js", "AI/ML", "MongoDB"],
    difficulty: "Intermediate",
    deadline: "25 Days",
    status: "ongoing",
    description:
      "Develop a chatbot capable of answering frequently asked customer support questions.",
    duration: "25 Days",
    prize: "$750",
    participants: [
      { name: "David King", role: "AI Developer" },
      { name: "Sophie Grey", role: "Backend Developer" },
    ],
    tasks: [
      "Design conversational flows and intents",
      "Implement chatbot logic using Node.js",
      "Integrate MongoDB for storing customer interactions",
    ],
    deliverables: ["Node.js codebase", "AI model for chatbot logic"],
  },
  {
    _id: "5jkhu8888797887789u89",
    title: "Create a Portfolio Website",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    difficulty: "Beginner",
    deadline: "10 Days",
    status: "open",
    description:
      "Create a personal portfolio website showcasing your projects and skills.",
    duration: "10 Days",
    prize: "$300",
    participants: [{ name: "Daniel Green", role: "Frontend Developer" }],
    tasks: [
      "Design the layout and structure of the portfolio",
      "Add sections for projects, skills, and contact info",
      "Deploy the site using Netlify or Vercel",
    ],
    deliverables: [
      "Deployed website link",
      "GitHub repository with the project code",
    ],
  },
  {
    _id: "6jkhu8888797887789u89",
    title: "Build a Real-Time Analytics Dashboard",
    skills: ["React", "Redux", "Node.js", "D3.js"],
    difficulty: "Advanced",
    deadline: "35 Days",
    status: "completed",
    description:
      "Build a dashboard displaying real-time analytics data using React and D3.js.",
    duration: "35 Days",
    prize: "$1500",
    participants: [
      { name: "Laura Black", role: "Frontend Developer" },
      { name: "James Yellow", role: "Backend Developer" },
    ],
    tasks: [
      "Set up real-time data fetching using WebSockets",
      "Create interactive visualizations using D3.js",
      "Design and implement the dashboard layout",
    ],
    deliverables: [
      "Real-time dashboard with D3.js visualizations",
      "API for fetching data from backend",
    ],
  },
  {
    _id: "7jkhu8888797887789u89",
    title: "Design a Blog for Foodies",
    skills: ["HTML", "CSS", "JavaScript", "WordPress"],
    difficulty: "Beginner",
    deadline: "12 Days",
    status: "ongoing",
    description:
      "Design a food blog with recipes, reviews, and food photography.",
    duration: "12 Days",
    prize: "$500",
    participants: [{ name: "Chris Blue", role: "Frontend Developer" }],
    tasks: [
      "Design blog layout and homepage",
      "Implement recipe section using WordPress",
      "Integrate social media sharing options",
    ],
    deliverables: ["Responsive blog design", "Recipe database integration"],
  },
  {
    _id: "8jkhu8888797887789u89",
    title: "Develop a Job Portal",
    skills: ["React", "Node.js", "MongoDB", "Express"],
    difficulty: "Intermediate",
    deadline: "22 Days",
    status: "open",
    description:
      "Develop a job portal where employers can post jobs and candidates can apply.",
    duration: "22 Days",
    prize: "$1200",
    participants: [
      { name: "Olivia Pink", role: "Frontend Developer" },
      { name: "Sophia Gold", role: "Backend Developer" },
    ],
    tasks: [
      "Design job posting and search functionality",
      "Implement job application system",
      "Integrate database to store job and user information",
    ],
    deliverables: ["Job portal platform", "User authentication system"],
  },
  {
    _id: "9jkhu8888797887789u89",
    title: "Create a Weather App",
    skills: ["React", "OpenWeather API", "CSS", "JavaScript"],
    difficulty: "Beginner",
    deadline: "8 Days",
    status: "completed",
    description:
      "Develop a weather app that fetches data from the OpenWeather API.",
    duration: "8 Days",
    prize: "$200",
    participants: [{ name: "Ethan White", role: "Frontend Developer" }],
    tasks: [
      "Set up React project and OpenWeather API integration",
      "Create UI for displaying weather data",
      "Add error handling and loading states",
    ],
    deliverables: [
      "Weather app with live data fetching",
      "GitHub repository with project source code",
    ],
  },
];

interface User {
  userId: string;
  name: string;
  username: string;
  email: string;
  phoneNumber: string;
  role: string;

  profile: {
    image: string;
    // age: number;
    // country: string;
    // educationLevel: string;
    // skills: string[];
    // interests: string[];
  };

  // engagementStats: {
  //   pointsEarned: number;
  //   badges: string[];
  //   completedChallenges: number;
  //   feedbackReceived: object[];
  // };

  // umuravaIntegration: {
  //   umuravaUserId: string;
  //   linkedAccounts: {
  //     github: string;
  //     linkedin: string;
  //   };
  // };

  // settings: {
  //   preferredLanguage: string;
  //   theme: string;
  //   emailNotifications: boolean;
  // };

  // audit: {
  //   createdAt: string;
  //   updatedAt: string;
  // };
}

export const myUser = {
  userId: "12345",
  names: "John Doe",
  email: "johndoe@example.com",
  password: "12345",
  phoneNumber: "+250788123456",
  role: "admin",
  title: "Software developer",
  about:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa, cum. Eius temporibus et ad nesciunt itaque explicabo nostrum, maxime libero doloremque amet fuga perspiciatis dolore, qui reprehenderit repellendus praesentium debitis!",

  profile: {
    image:
      "data:image/jpeg;base64,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",
    country: "Rwanda",
    educationLevel: "University",
    skills: ["JavaScript", "React", "Node.js"],
    interests: ["Web Development", "AI", "Hackathons"],
  },

  engagementStats: {
    pointsEarned: 250,
    badges: ["Top Performer", "Active Participant"],
    completedChallenges: 10,
    //   feedbackReceived: [
    //     {
    //       from: "mentor1",
    //       message: "Great work on the last project!",
    //       date: "2025-01-15",
    //     },
    //   ],
  },

  umuravaIntegration: {
    umuravaUserId: "u12345",
    linkedAccounts: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    },
  },

  // settings: {
  //   preferredLanguage: "English",
  //   theme: "dark",
  //   emailNotifications: true,
  // },

  // audit: {
  //   createdAt: "2024-08-31",
  //   updatedAt: "2025-01-27",
  // },
};
