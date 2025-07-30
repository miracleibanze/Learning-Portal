import { X } from "lucide-react";
import React, { FC } from "react";

interface PopupProps {
  children: React.ReactNode;
  width?: number;
  onClose: () => void;
}

const PopupModal: FC<PopupProps> = ({ children, onClose, width }) => {
  return (
    <main className="fixed inset-0 bg-black/90 z-[9999] flex justify-center items-start pt-20 overflow-auto">
      <div
        className={`relative ${
          width ? `md:max-w-[70rem]` : "md:max-w-[30rem]"
        } w-full mx-4 animateIn bg-zinc-200 dark:bg-darkPrimary dark:border border-white/50 rounded-md py-8 px-6 shadow-lg`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-red-400"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </main>
  );
};

export default PopupModal;
