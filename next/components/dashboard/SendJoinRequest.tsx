"use client";

import { DetailedCourseDocument } from "@lib/models/Course";
import { X } from "lucide-react";
import { FC, useState } from "react";

interface Props {
  course: DetailedCourseDocument;
  close: () => void;
}

const SendJoinRequest: FC<Props> = ({ course, close }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPay, setAgreedToPay] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const hasPrice = course?.price && course.price > 0;

  const handleSendRequest = async () => {
    if (!agreedToTerms) {
      alert("Please agree to the terms and conditions first.");
      return;
    }
    if (hasPrice && !agreedToPay) {
      alert("Please agree to pay the course fee.");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus(null);

      const res = await fetch("/api/courses/join-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: course._id,
          courseName: course.title,
          instructorId: course.instructor._id,
          instructorName: course.instructor.name,
          coursePrice: course.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitStatus(false);
        return;
      }

      setSubmitStatus(true);
      setTimeout(() => {
        close();
      }, 1500);
    } catch (err) {
      setSubmitStatus(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!course) return null;

  return (
    <main className="fixed inset-0 bg-black/90 z-[9999] flex justify-center items-start pt-20 overflow-auto">
      <div className="relative md:max-w-[30rem] w-full mx-4 animateIn bg-zinc-200 dark:bg-darkPrimary dark:border border-white/50 rounded-md py-8 px-6 shadow-lg">
        <button
          onClick={close}
          className="absolute top-4 right-4 hover:text-red-400"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-darkPrimary mb-2">
          Join Course: {course.title}
        </h2>
        <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
          To join this course, you must agree to the terms and possibly pay the
          course fee.
        </p>

        <div className="space-y-3 text-sm text-gray-800 dark:text-gray-300">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={() => setAgreedToTerms(!agreedToTerms)}
              className="mt-1"
            />
            <span>
              I agree that my enrollment is subject to instructor approval and
              verification of payment.
            </span>
          </label>

          {hasPrice && (
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToPay}
                onChange={() => setAgreedToPay(!agreedToPay)}
                className="mt-1"
              />
              <span>
                I accept to pay the course fee of{" "}
                <strong className="text-darkPrimary">{course.price} RWF</strong>
                .
              </span>
            </label>
          )}
        </div>

        {hasPrice && agreedToPay && (
          <div className="mt-4 p-3 rounded-md bg-opacityPrimary dark:bg-darkPrimary/20 border border-lightPrimary dark:border-primary text-sm text-darkPrimary dark:text-primary">
            <p className="mb-1 font-semibold">Payment Instructions:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>Bank:</strong> Bank of Kigali, Account Number:{" "}
                <code>123456789</code>
              </li>
              <li>
                <strong>Mobile Money:</strong> MTN MoMo:{" "}
                <code>0788 123 456</code>
              </li>
              <li>Use your full name as the payment reference.</li>
            </ul>
          </div>
        )}

        {!isSubmitting && submitStatus === false && (
          <p className="body-2 leadin-tight py-2 mt-6 px-4 text-red-500">
            Something went wrong, please try again later.
          </p>
        )}
        {!isSubmitting && submitStatus === true && (
          <p className="body-2 leadin-tight py-2 mt-6 px-4 text-darkPrimary">
            Join request sent successfully.
          </p>
        )}

        <button
          onClick={handleSendRequest}
          disabled={isSubmitting}
          className="w-full mt-6 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Join Request"}
        </button>
      </div>
    </main>
  );
};

export default SendJoinRequest;
