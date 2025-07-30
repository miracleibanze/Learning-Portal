"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import CourseForm from "@components/instructor/Course";
import AnnouncementForm from "@components/instructor/Announcement";
import AssignmentForm from "@components/instructor/Assignment";
import { useSearchParams } from "next/navigation";

const CreateContentPage: FC = () => {
  const searchParams = useSearchParams();
  const create = searchParams.get("type");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const typesToCreateWith = [
    { name: "Course" },
    { name: "Announcement" },
    { name: "Assignment" },
  ];

  useEffect(() => {
    if (create) setSelectedType(create);
  }, [create]);

  return (
    <div
      className={`w-full max-w-3xl h-full py-6 px-4 mx-auto bg-white dark:bg-darkPrimary border border-gray-200 dark:border-white/50 shadow-lg p-6 ${
        !selectedType ? "-translate-y-10" : ""
      }`}
    >
      <h4 className="h4 font-semibold mb-4">Choose content type</h4>

      <ul className="flex flex-wrap gap-4 mb-6">
        {typesToCreateWith.map((type) => (
          <li key={type.name}>
            <button
              onClick={() => setSelectedType(type.name)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                selectedType === type.name
                  ? "bg-secondary text-white"
                  : "bg-gray-200 dark:bg-white/10 dark:text-white hover:bg-gray-300"
              }`}
            >
              {type.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Conditional rendering of forms */}
      {selectedType === "Course" && <CourseForm />}
      {selectedType === "Announcement" && <AnnouncementForm />}
      {selectedType === "Assignment" && <AssignmentForm />}
    </div>
  );
};

export default CreateContentPage;
