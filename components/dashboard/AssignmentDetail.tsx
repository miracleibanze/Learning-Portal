"use client";

import { FC, useState } from "react";
import { X, CheckCircle2, Code2 } from "lucide-react";
import { IAssignment, Question } from "@type/Assignment";
import { MutableAssignment } from "@redux/slices/assignmentsSlice";

interface AssignmentDetailProps {
  assignment: MutableAssignment;
  close: () => void;
}

const AssignmentDetailModal: FC<AssignmentDetailProps> = ({
  assignment,
  close,
}) => {
  const [answers, setAnswers] = useState<Question[]>(
    assignment.questions ? assignment.questions.map((q) => ({ ...q })) : []
  );

  const [codeAnswer, setCodeAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleQuizSubmit = () => {
    setSubmitted(true);

    const submittedAssignment: MutableAssignment = {
      ...assignment,
      questions: answers,
    };

    console.log("Submitted assignment with answers:", submittedAssignment);

    // TODO: Send submittedAssignment to backend
    alert("Quiz submitted successfully!");
  };

  const handleCodeSubmit = () => {
    setSubmitted(true);

    const submittedAssignment = {
      ...assignment,
      codeAnswer,
    };

    console.log("Submitted code assignment:", submittedAssignment);

    // TODO: Send submittedAssignment to backend
    alert("Code submitted successfully!");
  };

  return (
    <main className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center px-4">
      <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 dark:border border-white/50 dark:rounded-none rounded-lg shadow-lg p-6">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-xl text-gray-700 dark:text-white"
        >
          <X />
        </button>

        <h2 className="text-2xl font-bold text-sky-600 dark:text-sky-400 mb-2">
          {assignment.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {assignment.description}
        </p>
        <p className="text-xs text-gray-400 mb-2">
          Deadline: {new Date(assignment.deadline).toLocaleString()}
        </p>

        {assignment.type === "quiz" && assignment.questions && (
          <div className="space-y-6">
            {answers.map((q, qIndex) => (
              <div key={qIndex} className="border-b pb-4">
                <p className="font-semibold mb-2">{q.question}</p>
                <div className="space-y-1">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={q.choice === i}
                        onChange={() => {
                          const updated = [...answers];
                          updated[qIndex] = { ...updated[qIndex], choice: i };
                          setAnswers(updated);
                        }}
                        disabled={submitted}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleQuizSubmit}
              disabled={submitted}
              className="mt-4 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 disabled:opacity-50"
            >
              Submit Quiz
            </button>
          </div>
        )}

        {assignment.type === "coding" && (
          <div className="mt-4">
            <div className="mb-4">
              <p className="font-semibold text-yellow-700 dark:text-yellow-400">
                <Code2 className="inline mr-1" /> Coding Instructions
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {assignment.codeInstructions ||
                  "Paste your code below based on the requirements."}
              </p>
            </div>
            <textarea
              value={codeAnswer}
              onChange={(e) => setCodeAnswer(e.target.value)}
              className="w-full min-h-[200px] p-3 border rounded bg-zinc-100 dark:bg-zinc-800 text-sm"
              placeholder="Paste your code here..."
              disabled={submitted}
            />
            <button
              onClick={handleCodeSubmit}
              disabled={submitted}
              className="mt-4 bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700 disabled:opacity-50"
            >
              Submit Code
            </button>
          </div>
        )}

        {submitted && (
          <div className="mt-6 text-green-600 dark:text-green-400 flex items-center gap-2">
            <CheckCircle2 />
            Submitted successfully!
          </div>
        )}
      </div>
    </main>
  );
};

export default AssignmentDetailModal;
