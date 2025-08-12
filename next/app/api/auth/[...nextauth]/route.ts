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
          throw new Error("Wrong password. Please check your password.");
        }

        return {
          _id: user._id.toString(),
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          about: user.about,
          email: user.email,
          role: user.role,
          premium: user.premium,
          picture: user.picture,
          lastActive: user.lastActive,
          preferredTheme: user.preferredTheme,
          preferredColorScheme: user.preferredColorScheme,
          preferredSidebarBg: user.preferredSidebarBg,
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
        token.username = user.username;
        token.about = user.about;
        token.email = user.email;
        token.premium = user.premium;
        token.picture = user.picture;
        token.lastActive = user.lastActive;
        token.preferredTheme = user.preferredTheme;
        token.preferredColorScheme = user.preferredColorScheme;
        token.preferredSidebarBg = user.preferredSidebarBg;
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
          username: token.username,
          about: token.about,
          email: token.email,
          premium: token.premium,
          picture: token.picture,
          lastActive: token.lastActive,
          preferredTheme: token.preferredTheme,
          preferredColorScheme: token.preferredColorScheme,
          preferredSidebarBg: token.preferredSidebarBg,
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

// "use client";

// import { useSession, signIn } from "next-auth/react";
// import axios from "axios";

// export default function ProfileUpdater() {
//   const { data: session, update } = useSession();

//   const handleUpdate = async () => {
//     const updates = {
//       name: "New Name",
//       preferredTheme: "dark",
//       preferredColorScheme: "emerald",
//     };

//     try {
//       // ✅ Update DB
//       const res = await axios.put("/api/user/update", updates);

//       // ✅ Refresh session with updated values
//       await update(); // OR, optionally, re-sign in with credentials if needed

//       alert("Profile updated and session refreshed.");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update user.");
//     }
//   };

//   return (
//     <button onClick={handleUpdate} className="px-4 py-2 bg-secondary text-white rounded">
//       Update Profile
//     </button>
//   );
// }
