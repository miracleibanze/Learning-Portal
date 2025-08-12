import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      id: string;
      name: string;
      username: string;
      about: string;
      email: string;
      role: string;
      premium: boolean;
      picture?: string;
      lastActive: number;
      preferredTheme: string;
      preferredColorScheme: string;
      preferredSidebarBg: string;
    };
  }

  interface User {
    _id: string;
    id: string;
    name: string;
    username: string;
    about: string;
    email: string;
    role: string;
    premium: boolean;
    picture?: string;
    lastActive: number;
    preferredTheme: string;
    preferredColorScheme: string;
    preferredSidebarBg: string;
  }

  interface JWT {
    id: string;
    role: string;
    name: string;
    username: string;
    about: string;
    email: string;
    premium: boolean;
    picture?: string;
    lastActive: number;
    preferredTheme: string;
    preferredColorScheme: string;
    preferredSidebarBg: string;
  }
}
