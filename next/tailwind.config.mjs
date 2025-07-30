/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

const config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        assignment: ["'assignment Sans'", "sans-serif"],
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        lightPrimary: "var(--color-lightPrimary)",
        darkPrimary: "var(--color-darkPrimary)",
        opacityPrimary: "var(--color-opacityPrimary)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".container": {
          "@apply w-full max-w-[95.5rem] max-sm:max-w-full max-sm:min-w-full":
            {},
        },
        ".h1": {
          "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[2rem] leading-[2.5rem] md:text-[2.5rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[1.7rem] leading-normal md:text-[2rem]": {},
        },
        ".h4": {
          "@apply text-[1.2rem] md:text-[1.7rem] leading-normal text-[rgb(63,63,70/0.7)]":
            {},
        },
        ".h5": {
          "@apply text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8": {},
        },
        ".body-1": {
          "@apply text-[0.875rem] font-normal leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
            {},
        },
        ".body-2": {
          "@apply font-normal text-[0.875rem] leading-6 md:text-base": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },
        ".tagline": {
          "@apply font-light text-xs tracking-tight uppercase": {},
        },
        ".button": {
          "@apply text-xs font-bold text-[0.875rem] leading-6 md:text-base font-semibold tracking-wider":
            {},
        },
        ".input": {
          "@apply text-sm w-full py-2 text-black pl-3 border cursor-pointer border-gray-300 rounded-sm !text-zinc-600 bg-transparent text-white shadow-sm focus:ring-2 focus:ring-primary outline-none focus:border-primary":
            {},
        },
      });
    }),
  ],
};

export default config;
