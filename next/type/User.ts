export interface UserType {
  _id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  about: string;
  picture?: string;
  updates: boolean;
  preferredTheme: string;
  preferredColorScheme: string;
  preferredSidebarBg: string;
  subscriptionPlan: string;
  fees: string;
  lastActive: number;
  role: string;
  progress: Array<{
    courseId: string; // Use string for IDs
    completedModules: number;
    totalModules: number;
    lastAccessed: Date;
  }>;
  quizzes: Array<{
    quizId: string;
    score: number;
    totalQuestions: number;
    completed: boolean;
  }>;
  myCourses: string[]; // Use string[] for IDs
  joinRequests: string[]; // Use string[] for IDs
  createdAt: Date;
  updatedAt: Date;
}
