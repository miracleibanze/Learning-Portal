import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@components/(.*)$": "<rootDir>/components/$1",
    "^@/store/(.*)$": "<rootDir>/store/$1",
    "^@reduxjs/toolkit$": "<rootDir>/node_modules/@reduxjs/toolkit",
    "^lucide-react$":
      "<rootDir>/node_modules/lucide-react/dist/umd/lucide-react.js",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};

export default createJestConfig(customJestConfig);
