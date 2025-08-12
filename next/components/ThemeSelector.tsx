"use client";

import themePresets, { ThemeName } from "@lib/ThemePresets";
import { useState, useEffect } from "react";
// import themePresets, { ThemeName } from "@constants/themePresets";

const ThemeSelector = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState<ThemeName>("sky");

  useEffect(() => {
    const storedMode = localStorage.getItem("preferredTheme");
    const storedColor = localStorage.getItem("preferredColorScheme");

    if (storedMode) setDarkMode(storedMode === "dark");
    if (storedColor && themePresets[storedColor as ThemeName]) {
      setTheme(storedColor as ThemeName);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("preferredTheme", darkMode ? "dark" : "light");

    const colors = themePresets[theme];
    Object.entries(colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    localStorage.setItem("preferredColorScheme", theme);
  }, [darkMode, theme]);

  return (
    <div className="flex items-center gap-4">
      {/* Light/Dark Toggle */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {darkMode ? "🌙 Dark" : "☀️ Light"}
      </button>

      {/* Color Scheme Picker */}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeName)}
        className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800"
      >
        {Object.keys(themePresets).map((key) => (
          <option key={key} value={key}>
            🎨 {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;

// /api/user/preferences.ts
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@app/api/auth/[...nextauth]/route";
// import { User } from "@lib/models/User";

// export async function PUT(req: Request) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const body = await req.json();
//   const { preferredTheme, preferredColorScheme } = body;

//   await User.findOneAndUpdate(
//     { email: session.user.email },
//     { preferredTheme, preferredColorScheme }
//   );

//   return NextResponse.json({ success: true });
// }

// await fetch("/api/user/preferences", {
//   method: "PUT",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     preferredTheme: darkMode ? "dark" : "light",
//     preferredColorScheme: theme,
//   }),
// });
