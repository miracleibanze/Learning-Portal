export interface UserType {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  picture?: string;
  updates: boolean;
  preferredTheme: string;
  preferredColorScheme: string;
  lastActive: number;
  role: string;
  settings: {
    darkMode: boolean;
    notifications: boolean;
    language: string;
  };
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
  createdAt: Date;
  updatedAt: Date;
}
