"use client";

import { FC, useState } from "react";
import { X, CheckCircle2, Code2, XCircle, CheckCheck } from "lucide-react";
import { Question } from "@type/Assignment";
import {
  MutableAssignment,
  setSubmittedAssignments,
} from "@redux/slices/assignmentsSlice";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import PopupModal from "@components/designs/PopupModal";

interface AssignmentDetailProps {
  assignment: MutableAssignment;
  completed: boolean;
  close: () => void;
}

const AssignmentDetailModal: FC<AssignmentDetailProps> = ({
  assignment,
  completed,
  close,
}) => {
  const [answers, setAnswers] = useState<(number | string)[]>(
    assignment.questions ? assignment.questions.map((q) => q.correctIndex) : []
  );

  const [codeAnswer, setCodeAnswer] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { submittedAssignments } = useSelector(
    (state: RootState) => state.assignment
  );
  const { data: session } = useSession();

  const handleQuizSubmit = async () => {
    // Validate that all questions have a selected choice
    const unanswered = answers.some((q) => typeof q === "number");
    if (unanswered) {
      setError("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null); // Clear previous errors

    try {
      const submittedAssignment = {
        userId: session?.user._id || "00000",
        type: "quiz",
        name: session?.user.name || "",
        assignmentId: assignment._id,
        answers,
      };

      console.log("Submitted assignment with answers:", submittedAssignment);

      const response = await axios.post(
        "/api/assignments/submit",
        submittedAssignment
      );

      if (response.status !== 201) {
        setError("Failed to Submit Answers, Try again later.");
        return;
      }

      // alert("Quiz submitted successfully!");
      setSubmitting(false);
      setSubmitted(true);
      dispatch(
        setSubmittedAssignments([...submittedAssignments.data, assignment._id])
      );
      close();
    } catch (err: any) {
      console.error("Quiz submission error:", err);
      setError("An error occurred during submission. Please try again.");
    }
  };

  const handleCodeSubmit = async () => {
    if (!codeAnswer.trim()) {
      setError("Please enter your code before submitting.");
      return;
    }

    setSubmitting(true);
    setError(null); // Clear previous errors

    try {
      const submittedAssignment = {
        userId: session?.user._id || "00000",
        type: "coding",
        name: session?.user.name || "",
        assignmentId: assignment._id,
        codeAnswer,
      };

      // console.log("Submitted code assignment:", submittedAssignment);

      const response = await axios.post(
        "/api/assignments/submit",
        submittedAssignment
      );

      if (response.status !== 201) {
        setError("Failed to Submit Code, Try again later.");
        return;
      }

      // alert("Code submitted successfully!");
      setSubmitting(false);
      setSubmitted(true);
      dispatch(
        setSubmittedAssignments([...submittedAssignments.data, assignment._id])
      );
      close();
    } catch (err: any) {
      console.error("Code submission error:", err);
      setError("An error occurred during submission. Please try again.");
    }
  };

  return (
    <PopupModal onClose={close}>
      <h2 className="text-2xl font-bold text-darkPrimary dark:text-primary mb-2">
        {assignment.title}
        {completed && (
          <span className="text-darkPrimary flex mx-2">
            <CheckCheck className="mt-0.5" />
            Done
          </span>
        )}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {assignment.description}
      </p>
      <p className="text-xs text-gray-400 mb-2">
        Deadline: {new Date(assignment.deadline).toLocaleString()}
      </p>

      {assignment.type === "quiz" && assignment.questions && (
        <div
          className={`space-y-6 ${
            submitted || completed ? "text-gray-500 dark:text-gray-400" : ""
          }`}
        >
          {assignment.questions ? (
            assignment.questions.map((q, qIndex) => (
              <div key={qIndex} className="border-b pb-4">
                <p className="font-semibold mb-2">{q.question}</p>
                <div className="space-y-1">
                  {q.options.map((option, i) => (
                    <label key={i} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={answers[qIndex] === i.toString()}
                        onChange={() => {
                          const updated = [...answers];
                          updated[qIndex] = i.toString();
                          setAnswers(updated);
                        }}
                        disabled={submitted || completed}
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="py-5 px-4 font-semibold text-gray-400 dark:text-white/90">
              No Questions in this assignment.
            </p>
          )}
          {error && (
            <div className="mt-6 text-red-600 dark:text-red-400 flex items-center gap-2">
              <XCircle />
              {error}
            </div>
          )}
          <button
            onClick={handleQuizSubmit}
            disabled={submitted || completed}
            className="mt-4 bg-primary text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-gray-500 "
          >
            {!submitting ? "Submit Quiz" : "Submitting..."}
          </button>
        </div>
      )}

      {assignment.type === "coding" && (
        <div className="mt-4">
          <div className="mb-4">
            <p className="font-semibold text-secondary dark:text-secondary">
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
          {error && (
            <div className="mt-6 text-red-600 dark:text-red-400 flex items-center gap-2">
              <XCircle />
              {error}
            </div>
          )}
          <button
            onClick={handleCodeSubmit}
            disabled={submitted || completed}
            className="mt-4 bg-primary text-white px-4 py-2 rounded disabled:opacity-50 disabled:bg-gray-500 "
          >
            {!submitting ? "Submit Code" : "Submitting ..."}
          </button>
        </div>
      )}

      {submitted && (
        <div className="mt-6 text-darkPrimary dark:text-primary flex items-center gap-2">
          <CheckCircle2 />
          Submitted successfully!
        </div>
      )}
    </PopupModal>
  );
};

export default AssignmentDetailModal;
