// app/dashboard/loading.tsx
"use client";
import Image from "next/image";

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
