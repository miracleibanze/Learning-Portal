// app/iLearn/loading.tsx
"use client";
import Image from "next/image";

export const LoadingBar = () => {
  return (
    <div className="w-full text-bold h-40 flex-center flex-col font-semibold gap-3">
      <span>Loading...</span>
      <div className="w-32 h-1 bg-zinc-300 relative">
        <div className={`h-full bg-darkPrimary dark:bg-secondary animate60`} />
      </div>
    </div>
  );
};

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-black z-[9999]">
      <div className="p-4 bg-primary rounded">
        <Image src="/logo.png" alt="Logo" width={120} height={60} />
        <div className="h-2 animate-loading bg-white rounded-md mt-4" />
      </div>
    </div>
  );
}
