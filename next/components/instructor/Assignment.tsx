"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { fetchCoursesCreated } from "@redux/slices/coursesSlice";
import { Question } from "@type/Assignment";
import { Trash2 } from "lucide-react";

export default function AssignmentForm() {
  const searchParams = useSearchParams();
  const create = searchParams.get("course");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [type, setType] = useState<"quiz" | "coding">("quiz");
  const [courseId, setCourseId] = useState("");
  const [codeInstructions, setCodeInstructions] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", options: [], correctIndex: 0 },
  ]);

  const { coursesCreated } = useSelector((state: RootState) => state.courses);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (coursesCreated.data.length === 0) dispatch(fetchCoursesCreated());
  }, [pathname, dispatch]);

  useEffect(() => {
    if (create) {
      setCourseId(
        coursesCreated.data.find((item: any) => item.title === create)?._id ||
          ""
      );
    }
  }, [pathname, create, coursesCreated.data]);

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, question: value } : q))
    );
  };

  const handleAddOption = (
    qIndex: number,
    optionText: string,
    cIndex?: number
  ) => {
    console.log("inside handleAddOption ");
    if (!optionText.trim()) return;
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? cIndex === 1
            ? { ...q, options: [...q.options, optionText] }
            : {
                ...q,
                options: [...q.options, optionText],
                correctIndex: qIndex,
              }
          : q
      )
    );
  };

  const handleRemoveOption = (qIndex: number, optIndex: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.filter((_, j) => j !== optIndex) }
          : q
      )
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { question: "", options: [], correctIndex: 0 },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/assignments", {
        title,
        description,
        courseTitle: coursesCreated.data.find((item) => item._id === courseId)
          ?.title,
        type,
        deadline,
        courseId,
        questions,
        codeInstructions,
      });
      alert("Assignment created successfully");
      router.push(`/iLearn`);
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to create assignment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!coursesCreated.coursesCreatedLoading &&
        coursesCreated.data.length === 0 && (
          <p className="text-red-600 italic body-2 bg-black/30 py-2 px-4 rounded-md">
            You can't create assignment without course
          </p>
        )}
      {/* BASIC FIELDS */}
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          placeholder="Enter assignment title"
          className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          placeholder="Enter description"
          className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Deadline</label>
        <input
          type="datetime-local"
          className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
      </div>

      {/* COURSE SELECT */}
      <div>
        <label className="block font-medium mb-1">Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="w-full dark:bg-primary border border-opacityPrimary p-2 rounded outline-none"
          required
        >
          <option value="">Choose related course</option>
          {coursesCreated.coursesCreatedLoading ? (
            <option disabled>Loading...</option>
          ) : coursesCreated.data.length > 0 ? (
            coursesCreated.data.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))
          ) : (
            <option disabled>You have created 0 courses</option>
          )}
        </select>
      </div>

      {/* TYPE SELECT */}
      <div>
        <label className="block mb-1 font-medium">Assignment Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="w-full dark:bg-primary border border-opacityPrimary p-2 rounded outline-none"
        >
          <option value="quiz">Quiz</option>
          <option value="coding">Coding</option>
        </select>
      </div>

      {/* QUIZ QUESTIONS */}
      {type === "quiz" && (
        <div>
          <p className="block mb-1 font-bold">Questions</p>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-4 p-3 border rounded">
              <div className="flex justify-between items-center">
                <label className="font-semibold">Q{qIndex + 1}</label>
                {questions.length > 1 && (
                  <Trash2
                    size={16}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => handleRemoveQuestion(qIndex)}
                  />
                )}
              </div>
              <input
                type="text"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                placeholder="Enter question"
                className="w-full mt-1 dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
              />
              {/* OPTIONS */}
              <div className="mt-2">
                {q.options.map((opt, optIndex) => (
                  <div
                    key={optIndex}
                    className="flex items-center justify-between border-b py-1"
                  >
                    <span>{opt}</span>
                    <Trash2
                      size={14}
                      color="red"
                      className="cursor-pointer"
                      onClick={() => handleRemoveOption(qIndex, optIndex)}
                    />
                  </div>
                ))}
                <OptionInput
                  onAdd={({ opt, cIndex }) => {
                    if (cIndex === 1) {
                      handleAddOption(qIndex, opt);
                    }
                  }}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            className="bg-secondary text-white px-3 py-1 rounded"
            onClick={handleAddQuestion}
          >
            + Add Question
          </button>
        </div>
      )}

      {/* CODING INSTRUCTIONS */}
      {type === "coding" && (
        <div>
          <label className="block mb-1 font-medium">Code Instructions</label>
          <textarea
            placeholder="Enter coding instructions"
            className="w-full dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
            value={codeInstructions}
            onChange={(e) => setCodeInstructions(e.target.value)}
          />
        </div>
      )}

      <button
        disabled={coursesCreated.data.length === 0}
        type="submit"
        className="bg-secondary text-white px-4 py-2 rounded disabled:bg-zinc-600 disabled:dark:bg-zinc-400 disabled:text-zinc-900"
      >
        Create Assignment
      </button>
    </form>
  );
}

function OptionInput({
  onAdd,
}: {
  onAdd: ({ opt, cIndex }: { opt: string; cIndex: number }) => void;
}) {
  const [value, setValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(0);
  return (
    <div className="flex gap-2 mt-2">
      <input
        type="text"
        className="flex-1 dark:bg-white/10 border border-opacityPrimary p-2 rounded outline-none"
        placeholder="Add an option"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="button"
        className="bg-primary text-white px-3 py-1 rounded"
        onClick={() => {
          onAdd({ opt: value, cIndex: 0 });
          setValue("");
        }}
      >
        Add
      </button>
    </div>
  );
}
