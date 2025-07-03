import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      id: string;
      name: string;
      email: string;
      role: string;
      premium: boolean;
      picture?: string;
      lastActive: Number;
    };
  }

  interface User {
    _id: string;
    id: string;
    name: string;
    email: string;
    role: string;
    premium: boolean;
    picture?: string;
    lastActive: Number;
  }

  interface JWT {
    id: string;
    role: string;
    name: string;
    email: string;
    premium: boolean;
    picture?: string;
    lastActive: Number;
  }
}
