import {
  Home,
  Users,
  Settings,
  MessageSquare,
  BookOpen,
  PlusSquare,
  DollarSign,
  GraduationCap,
  ClipboardList,
  ChartNoAxesCombined,
  BookOpenCheck,
  UserPlus,
  Search,
} from "lucide-react";

const commonLinks = [
  { name: "Dashboard", icon: Home, path: "/iLearn" },
  { name: "Explore", icon: Search, path: "/iLearn/search" },
];

const studentLinks = [
  { name: "My Courses", icon: BookOpen, path: "/iLearn/my-courses" },
  { name: "Enroll", icon: GraduationCap, path: "/iLearn/enroll" },
  { name: "Rankings", icon: Users, path: "/iLearn/rankings" },
  {
    name: "Assignments",
    icon: ClipboardList,
    path: "/iLearn/assignments",
  },
  {
    name: "Discussions",
    icon: MessageSquare,
    path: "/iLearn/discussions",
  },
];

const instructorLinks = [
  {
    name: "My Courses",
    icon: BookOpen,
    path: "/iLearn/instructor/courses",
  },
  {
    name: "Create Content",
    icon: PlusSquare,
    path: "/iLearn/create",
  },
  {
    name: "Assignments",
    icon: BookOpenCheck,
    path: "/iLearn/instructor/assignments",
  },
  {
    name: "Grading",
    icon: ClipboardList,
    path: "/iLearn/instructor/grading",
  },
  {
    name: "Requests",
    icon: UserPlus,
    path: "/iLearn/instructor/requests",
  },
];

const adminLinks = [
  {
    name: "Create Content",
    icon: PlusSquare,
    path: "/iLearn/create",
  },
  {
    name: "User Management",
    icon: Users,
    path: "/iLearn/admin/users",
  },
  {
    name: "Course Management",
    icon: BookOpen,
    path: "/iLearn/admin/courses",
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/iLearn/admin/analytics",
  },
  {
    name: "Subscriptions",
    icon: DollarSign,
    path: "/iLearn/admin/subscriptions",
  },
];

const premiumLinks = [
  { name: "Chatbot", icon: MessageSquare, path: "/iLearn/chatbot" },
];

const getLinks = ({ role }: { role?: string }) => {
  if (role === "admin") return [...commonLinks, ...adminLinks];
  if (role === "instructor") return [...commonLinks, ...instructorLinks];
  if (role === "student") return [...commonLinks, ...studentLinks];
  return commonLinks;
};

export default getLinks;
