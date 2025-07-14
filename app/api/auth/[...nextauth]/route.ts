import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { User } from "@lib/models/User";
import { connectDB } from "@lib/db";

// Ensure database is connected when the app starts
connectDB();

// NextAuth Options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );
        
        if (!user) {
          throw new Error("User not found. Please check your email.");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) {
          throw new Error("Invalid password. Please check your password.");
        }

        return {
          _id: user._id.toString(),
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          premium: user.premium,
          picture: user.picture,
          lastActive: user.lastActive,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.premium = user.premium;
        token.picture = user.picture;
        token.lastActive = user.lastActive;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("🔄 Updating session...");
      return {
        ...session,
        user: {
          ...session.user,
          _id: token._id,
          role: token.role,
          name: token.name,
          email: token.email,
          premium: token.premium,
          picture: token.picture,
          lastActive: token.lastActive,
        },
      };
    },
  },

  pages: {
    signIn: "/login",
    error: "/error",
  },

  session: {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    updateAge: 60 * 60 * 24, // Update session every 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
