"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { notFound, usePathname } from "next/navigation";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user && session.user.role === "student") {
      notFound();
    }
  }, [session?.user, pathname]);

  return (
    <main className="flex flex-col py-6 px-4 h-full">
      <h4 className="h4 text-primary font-semibold">Create Content</h4>
      <p className="body-2 text-primary leading-none pb-2">
        Create content like courses and activities for students.
      </p>
      <div className="w-full flex-1 min-h-full flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
