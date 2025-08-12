"use client";

import { OopsImage } from "@assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const notFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Image
        src={OopsImage}
        alt="Not found image"
        width={300}
        height={400}
        className="w-40 h-40"
      />
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
