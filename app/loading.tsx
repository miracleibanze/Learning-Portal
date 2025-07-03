import { FC } from "react";
import Image from "next/image";

const Loading: FC = () => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-[9999] bg-zinc-100 dark:bg-black/70`}
    >
      <div className="w-full max-w-[15rem] relative overflow-hidden p-3 pb-8 bg-sky-600 flex justify-center">
        <Image
          src="/logo.png"
          alt="logo"
          width={200}
          height={100}
          className="w-auto h-auto"
        />
        <div className="h-2 animate-loading bg-white absolute rounded-md bottom-0" />
      </div>
    </div>
  );
};

export default Loading;
