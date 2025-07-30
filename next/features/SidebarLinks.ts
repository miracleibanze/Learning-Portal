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
} from "lucide-react";

const commonLinks = [{ name: "Dashboard", icon: Home, path: "/dashboard" }];

const studentLinks = [
  { name: "My Courses", icon: BookOpen, path: "/dashboard/my-courses" },
  { name: "Enroll", icon: GraduationCap, path: "/dashboard/enroll" },
  { name: "Rankings", icon: Users, path: "/dashboard/rankings" },
  {
    name: "Assignments",
    icon: ClipboardList,
    path: "/dashboard/assignments",
  },
  {
    name: "Discussions",
    icon: MessageSquare,
    path: "/dashboard/discussions",
  },
];

const instructorLinks = [
  {
    name: "My Courses",
    icon: BookOpen,
    path: "/dashboard/instructor/courses",
  },
  {
    name: "Create Content",
    icon: PlusSquare,
    path: "/dashboard/instructor/create",
  },
  {
    name: "Assignments",
    icon: BookOpenCheck,
    path: "/dashboard/instructor/assignments",
  },
  {
    name: "Grading",
    icon: ClipboardList,
    path: "/dashboard/instructor/grading",
  },
];

const adminLinks = [
  { name: "User Management", icon: Users, path: "/dashboard/admin/users" },
  {
    name: "Course Management",
    icon: BookOpen,
    path: "/dashboard/admin/courses",
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
    path: "/dashboard/admin/analytics",
  },
  {
    name: "Subscriptions",
    icon: DollarSign,
    path: "/dashboard/admin/subscriptions",
  },
];

const premiumLinks = [
  { name: "Chatbot", icon: MessageSquare, path: "/dashboard/chatbot" },
];

const getLinks = ({ role }: { role?: string }) => {
  if (role === "admin") return [...commonLinks, ...adminLinks];
  if (role === "instructor") return [...commonLinks, ...instructorLinks];
  if (role === "student") return [...commonLinks, ...studentLinks];
  return commonLinks;
};

export default getLinks;
