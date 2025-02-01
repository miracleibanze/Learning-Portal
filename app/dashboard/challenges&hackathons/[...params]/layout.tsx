"use client";

import GoBack from "@components/Goback";
import { useParams } from "next/navigation";

// export const metadata = {
//   title: "Challenge | Umurava platform",
//   description: "Umurava platform",
// };
type Params = {
  params: string[];
};
export default function DashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams<Params>();
  return (
    <section className="w-full bg-zinc-100 h-full flex-1 pb-5">
      <GoBack
        path={decodeURIComponent(params?.params[0])}
        via="Challenge & Hackathons"
        viaLink="/dashboard/challenges&hackathons"
        className="w-full px-6 border-y border-zinc-200 py-2 bg-white !text-[12px]"
      />
      {children}
    </section>
  );
}
