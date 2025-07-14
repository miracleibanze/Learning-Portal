"use client";

import { CheckCheck, X as LucideX } from "lucide-react";
import { FC } from "react";

interface Props {
  content: {
    answerIndex: number;
    answerContent: string;
    correctIndex?: number;
    question: string;
  };
  close: () => void;
}

const CheckResultCard: FC<Props> = ({ content, close }) => {
  const isCorrect = content.answerIndex === content.correctIndex;

  return (
    <main className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">
      <div className="relative w-full pt-28 px-4">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 text-white hover:text-red-400"
          onClick={close}
          aria-label="Close result"
        >
          <LucideX className="w-7 h-7" />
        </button>

        {/* Result Card */}
        <div
          role="alert"
          className="mx-auto md:max-w-[30rem] w-full bg-zinc-200 dark:bg-gray-900 dark:border border-white/50 rounded-md py-8 px-6"
        >
          <p className={`h4 font-bold ${isCorrect ? "text-green-600" : "text-red-500"}`}>
            {isCorrect ? "Great!" : "Oops!"}
          </p>

          <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            {isCorrect
              ? "You did well, the answer you chose is correct."
              : "Sorry! You chose the wrong answer."}
          </p>

          {/* Question and Answer */}
          <div
            className={`w-full py-3 px-4 rounded-md border ${
              isCorrect
                ? "bg-green-100/80 border-green-500"
                : "bg-red-100/70 border-red-500"
            } dark:border-white/40`}
          >
            <p className="body-2 font-semibold mb-2">{content.question}</p>
            <p
              className={`ml-1 flex items-center gap-2 font-medium ${
                isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {content.answerContent}
              {isCorrect ? <CheckCheck /> : <LucideX />}
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-end mt-8">
            <button
              className="bg-sky-600 hover:bg-sky-700 text-white rounded-md py-2 px-4 transition"
              onClick={close}
            >
              {isCorrect ? "Continue" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckResultCard;
