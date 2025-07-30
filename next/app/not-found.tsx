"use client";

import { useRouter } from "next/navigation";

const notFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="h2 font-semibold">404 - Page Not Found</h2>
      <div className="body-1 text-zinc-600 mb-2">
        The page you are looking for doesn't exist.
      </div>

      <button
        className="button bg-primary text-white"
        onClick={() => router.back()}
      >
        Go Back
      </button>
    </div>
  );
};

export default notFound;
