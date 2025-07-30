import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

const GoBack: FC = () => {
  const router = useRouter();

  return (
    <div>
      <button
        className="pr-4 pl-2 py-1 rounded bg-zinc-300 dark:bg-darkPrimary flex-0 flex mb-3"
        onClick={() => router.back()}
      >
        <ChevronLeft /> Back
      </button>
    </div>
  );
};

export default GoBack;
