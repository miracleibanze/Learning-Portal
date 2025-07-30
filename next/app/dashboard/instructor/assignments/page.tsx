"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IAssignment } from "@type/Assignment";
import { IAnswer } from "@lib/models/Answers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { usePathname } from "next/navigation";
import { fetchCoursesCreated } from "@redux/slices/coursesSlice";
import { ArrowLeft, ChevronRight, Clock12 } from "lucide-react";
import {
  fetchCreatedAssignments,
  MutableAssignment,
} from "@redux/slices/assignmentsSlice";
import PopupModal from "@components/designs/PopupModal";

interface IUser {
  _id: string;
  name: string;
  email: string;
}

export default function AssignmentSubmissions({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedAssignment, setSelectedAssignment] =
    useState<MutableAssignment | null>(null);
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<IAnswer | null>(null);
  const { coursesCreated } = useSelector((state: RootState) => state.courses);
  const { createdAssignments } = useSelector(
    (state: RootState) => state.assignment
  );
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

  const [showFullCodeModal, setShowFullCodeModal] = useState(false);

  // const fetchAssignment = async () => {
  //   try {
  //     const res = await axios.get(`/api/assignments`);
  //     setAssignments(res.data);

  //     // Fetch student info by IDs
  //     if (res.data.students?.length > 0) {
  //       const userRes = await axios.post("/api/users/byIds", {
  //         ids: res.data.students,
  //       });
  //       setStudentsInfo(userRes.data); // [{_id, name, email}, ...]
  //     }
  //   } catch (err) {
  //     console.error("Error fetching assignment:", err);
  //   }
  // };

  const handleStopAssignment = async () => {
    await axios.patch(`/api/assignments/${assignmentId}`, {
      deadlineReached: true,
    });
  };

  const handleAnnounceMarks = async () => {
    await axios.patch(`/api/assignments/${assignmentId}`, {
      showMarks: true,
    });
  };

  const calculateScore = (a: number[], b: number[]) => {
    let result: number = 0;
    for (let index = 0; index < a.length; index++) {
      if (a[index] === b[index]) {
        result = result + 1.00004;
      } else {
      }
    }

    const total = Math.round((result * 100) / a.length);
    return total;
  };

  // useEffect(() => {
  //   fetchAssignment();
  // }, []);

  useEffect(() => {
    if (!coursesCreated.data || coursesCreated.data.length === 0) {
      dispatch(fetchCoursesCreated());
    }
    if (!createdAssignments.data || createdAssignments.data.length === 0)
      dispatch(fetchCreatedAssignments());
  }, [dispatch, pathname]);

  // useEffect(() => {
  const fetchAnswer = async (assignmentId: string) => {
    setLoading(true);
    console.log("fetching answers");
    try {
      const res = await axios.get(`/api/assignments/${assignmentId}`);
      setAnswers(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching student answer:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveMarks = async ({
    id,
    name,
    marks,
  }: {
    id: string;
    name: string;
    marks: number;
  }) => {
    const response = await axios.patch("/api/assignments/submit", {
      assignmentId: selectedAssignment?._id,
      id,
      name,
      marks,
    });
    if (response.data) {
      console.log("unable to save marks");
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-white dark:bg-opacityPrimary md:p-6 p-3 rounded-lg shadow-lg dark:border border-white/40 flex-1 my-6 flex flex-col">
      {!selectedAssignment && (
        <>
          <h2 className="text-2xl font-bold mb-4">Assignments</h2>
          <div className="w-full p-2">
            {coursesCreated.coursesCreatedLoading ? (
              <div className="w-full text-bold h-40 flex-center flex-col font-semibold gap-3">
                <span>Loading...</span>
                <div className="w-32 h-1 bg-zinc-300 relative">
                  <div
                    className={`h-full bg-darkPrimary dark:bg-secondary ${
                      (coursesCreated.data && coursesCreated.data.length > 0) ||
                      createdAssignments.data.length > 0
                        ? "animate80"
                        : "animate60"
                    }`}
                  />
                </div>
              </div>
            ) : coursesCreated.data ? (
              coursesCreated.data.map((course) => {
                const relatedAssignments = createdAssignments.data?.filter(
                  (item) => item.courseId === course._id
                );
                return (
                  <div className="w-full px-3" key={course._id}>
                    <p className="body-2 font-semibold text-secondary">
                      {course.title}
                    </p>
                    <div className="ml-4 py-2 flex flex-col">
                      {relatedAssignments?.map((item) => (
                        <div
                          key={item._id}
                          className="w-full font-light flex gap-2 hover:bg-zinc-300 dark:hover:bg-white/30 py-2 rounded-md px-2"
                          onClick={() => {
                            fetchAnswer(item._id);
                            setSelectedAssignment(item);
                          }}
                        >
                          <ChevronRight /> {item.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="w-full text-bold text-center">
                You have no course yet.
              </p>
            )}
          </div>
        </>
      )}

      {selectedAssignment && (
        <>
          <button
            className="py-1 pr-2 pl-1 text-white bg-zinc-400 dark:bg-white/20 flex text-sm rounded-md mb-4"
            onClick={() => setSelectedAssignment(null)}
          >
            <ArrowLeft /> Back
          </button>
          <h2 className="text-2xl font-bold mb-4 text-primary dark:text-lightPrimary">
            {selectedAssignment?.type + " : " + selectedAssignment?.title}
          </h2>
          <p className="body-2">{selectedAssignment?.description}</p>
          <p className="text-sm text-zinc-700 dark:text-white/70 mt-2 my-3 flex gap-2 items-center">
            <Clock12 size={16} /> deadline :
            <span className="text-secondary">
              {selectedAssignment?.deadline
                ? new Date(selectedAssignment.deadline).toLocaleString()
                : "not yet"}
            </span>
          </p>
          <div className="flex gap-6 sm:flex-row flex-col h-full flex-1 sm:items-start">
            {loading ? (
              <div className="w-full text-bold h-40 flex-center flex-col font-semibold gap-3">
                <span>Loading...</span>
                <div className="w-32 h-1 bg-zinc-300 relative">
                  <div
                    className={`h-full bg-darkPrimary dark:bg-secondary animate80`}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="sm:w-1/3">
                  <label className="font-semibold mb-2 text-lg flex flex-col">
                    Submitted Students {answers.length}
                  </label>
                  {answers.length > 0 ? (
                    answers.map((item, index) => {
                      let marks;
                      // console.log(
                      //   selectedAnswer
                      //     ? selectedAssignment.marks?.includes({
                      //         id: selectedAnswer.userId,
                      //         name: selectedAnswer.name,
                      //         marks,
                      //       })
                      //     : "no answer"
                      // );
                      if (selectedAssignment.type === "quiz") {
                        const a = selectedAssignment.questions?.map(
                          (q) => q.correctIndex
                        );
                        const b = item?.answers?.map((answer) =>
                          parseInt(answer)
                        );
                        if (a && b && selectedAnswer) {
                          marks = calculateScore(a, b);
                          saveMarks({
                            id: selectedAnswer.userId,
                            name: selectedAnswer.name,
                            marks,
                          });
                        }
                      }

                      return (
                        <button
                          className="w-full font-light gap-2 hover:bg-zinc-300 dark:hover:bg-white/30 py-2 rounded-md px-2 leading-none text-start shadow-sm shadow-zinc-700 dark:shadow-white/50 flex justify-between"
                          onClick={() => setSelectedAnswer(item)}
                        >
                          <span>{`${index + 1}.  ${item.name}`}</span>
                          {selectedAssignment.type === "quiz" && (
                            <span>{`${
                              selectedAssignment.marks?.some(
                                (mark) => mark.id === item.userId
                              )
                                ? selectedAssignment.marks.find(
                                    (mark) => mark.id === item.userId
                                  )
                                : marks
                            }%`}</span>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <p className="w-full text-bold flex-center font-semibold h-40">
                      No one has submitted yet!
                    </p>
                  )}
                </div>
                <div className="sm:w-2/3 flex-1 min-h-20">
                  {selectedAnswer ? (
                    <div className="space-y-4 flex-1">
                      <h4 className="font-semibold text-lg">
                        {`Submission by ${selectedAnswer.name}`}
                      </h4>
                      <p>
                        <span className="text-[12px] text-secondary">
                          {selectedAnswer.createdAt &&
                            new Date(selectedAnswer.createdAt).toLocaleString()}
                        </span>
                      </p>
                      {selectedAssignment.type === "quiz" &&
                        selectedAssignment.questions &&
                        selectedAssignment.questions.map((q, idx) => (
                          <div
                            key={selectedAssignment._id + " assignment " + idx}
                            className="border p-3 rounded bg-gray-50 dark:bg-white/5"
                          >
                            <p className="font-medium">{`Q${idx + 1}: ${
                              q.question
                            }`}</p>
                            <ul className="ml-4 mt-1 space-y-1">
                              {q.options.map((opt, i) => {
                                let isCorrectButNotChoosen;
                                let isCorrectAndChoosen;
                                let isIncorrectAndChoosen;

                                if (
                                  selectedAnswer.answers &&
                                  selectedAnswer.answers.length > 0
                                ) {
                                  isCorrectButNotChoosen =
                                    i === q.correctIndex &&
                                    i.toString() !==
                                      selectedAnswer.answers[idx];

                                  isCorrectAndChoosen =
                                    i === q.correctIndex &&
                                    i.toString() ===
                                      selectedAnswer.answers[idx];

                                  isIncorrectAndChoosen =
                                    i !== q.correctIndex &&
                                    i.toString() ===
                                      selectedAnswer.answers[idx];
                                }

                                return (
                                  <li
                                    key={i}
                                    className={`p-1 rounded ${
                                      isCorrectAndChoosen &&
                                      "bg-green-100 dark:bg-green-800"
                                    } ${
                                      isIncorrectAndChoosen &&
                                      "bg-red-100 dark:bg-red-800 stroke-current"
                                    } ${
                                      isCorrectButNotChoosen &&
                                      "bg-opacityPrimary"
                                    }`}
                                  >
                                    {opt}
                                    {isCorrectAndChoosen && " ✅"}
                                    {isIncorrectAndChoosen && " ❌"}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ))}

                      {selectedAssignment.type === "coding" && (
                        <div className="flex-1 w-full rounded-md border border-white p-4 space-y-4">
                          <div className="bg-black text-white p-4 rounded-md overflow-auto max-h-[300px] font-mono text-sm whitespace-pre-wrap">
                            <pre>{selectedAnswer.codeAnswer}</pre>
                          </div>

                          <div className="relative flex justify-between">
                            <button
                              onClick={() => setShowFullCodeModal(true)}
                              className="button text-sm text-primary bg-secondary"
                            >
                              View Fullscreen
                            </button>

                            <div className="relative flex">
                              <input
                                type="text"
                                placeholder="Marks  ...%"
                                className="bg-inherit outline-none px-2 border border-zinc-300 dark:border-white/50 rounded-l"
                              />
                              <button className="button text-sm text-secondary bg-primary rounded-l-none">
                                Score
                              </button>
                            </div>
                          </div>

                          {showFullCodeModal && (
                            <PopupModal
                              width={35}
                              onClose={() => setShowFullCodeModal(false)}
                            >
                              <h3 className="text-xl font-semibold mb-3">
                                Full Submission by {selectedAnswer.name}
                              </h3>
                              <div className="bg-black text-white p-4 rounded-md font-mono text-sm overflow-auto max-h-[70vh] whitespace-pre-wrap">
                                <pre>{selectedAnswer.codeAnswer}</pre>
                              </div>
                            </PopupModal>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="italic text-gray-600">
                      Select a student to view their submission.
                    </p>
                  )}
                </div>
                {/* Actions
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={handleStopAssignment}
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Stop Assignment
                  </button>
                  <button
                    onClick={handleAnnounceMarks}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                  >
                    Announce Marks
                  </button>
                </div> */}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
