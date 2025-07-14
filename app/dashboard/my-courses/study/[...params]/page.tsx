"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { useParams, usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import {
  fetchDetailedCourse,
  fetchDetailedCourseChapters,
} from "@redux/slices/coursesSlice";
import { LineSkeleton } from "@components/designs/Skeletons";
import axios from "@node_modules/axios";
import { ContentType } from "@lib/models/Content";
import { ChapterDocument } from "@lib/models/Course";
import GoBack from "@components/GoBack";
import CheckResultCard from "@components/dashboard/CheckResultCard";
import { Menu } from "lucide-react";

const page: FC = () => {
  const { params }: { params: string[] } = useParams();
  const courseName = decodeURIComponent(params[0]);
  const courseId = params[1];
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();
  const router = useRouter();

  const { detailedCourse, detailedCourseChapters } = useSelector(
    (state: RootState) => state.courses
  );

  const [selectedChapter, setSelectedChapter] =
    useState<ChapterDocument | null>(null);
  const [selectedChapterContent, setSelectedChapterContent] = useState<{
    _id: string;
    content: ContentType[];
  } | null>(null);
  const [checkResult, setCheckResult] = useState<boolean>(false);
  const [selectedResult, setSelectedResult] = useState<{
    answerIndex: number;
    answerContent: string;
    correctIndex?: number;
    question: string;
  } | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setSelectedChapterContent(null);
      const content = await axios.get(
        `/api/courses/chapters/content/${selectedChapter?.content}`
      );
      setSelectedChapterContent(content.data.content);
    };
    if (
      selectedChapter &&
      selectedChapter?.content !== selectedChapterContent?._id
    ) {
      fetchContent();
    }
  }, [selectedChapter]);
  useEffect(() => {
    if (courseId && detailedCourse?.data?.title !== courseName) {
      dispatch(fetchDetailedCourse(courseId));
    }
    if (courseId) {
      dispatch(fetchDetailedCourseChapters(courseId));
    }
  }, [dispatch, pathname]);

  useEffect(() => {
    if (checkResult && !selectedResult) {
      alert("Please!, Choose Your answer first ☑");
      setCheckResult(false);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 500);
    }
  }, [checkResult]);

  return (
    <main className="h-full flex-1 py-6 px-4 flex flex-col">
      {detailedCourse.detailedCourseLoading ? (
        <LineSkeleton index={2} noBorder={true} />
      ) : (
        <>
          <GoBack />
          <h4 className="h4 font-semibold text-blue-600 dark:text-blue-400">
            {detailedCourse.data?.title}
          </h4>
          <p className="body-2 text-sky-500">
            {detailedCourse.data?.description}
          </p>
        </>
      )}
      <div className="flex md:flex-row flex-col justify-between flex-1 h-full border border-zinc-400 dark:border-white/50 mt-4 ">
        <div
          className={`max-w-[20rem] relative w-full max-md:min-w-full dark:bg-gray-900 min-h-full md:border-r border-zinc-400 dark:border-white/50 flex-1 mt-2 ${
            selectedChapter && "max-md:hidden"
          }`}
        >
          <h4 className="h4 font-bold px-3 py-2 border-b border-zinc-400">
            Chapters:
          </h4>
          <div
            className={`w-full h-full ${
              !selectedChapter && "max-h-[70svh]"
            } flex-1 overflow-y-auto`}
          >
            <ol>
              {!detailedCourseChapters.detailedCourseChaptersLoading ? (
                detailedCourseChapters.data.chapters.length > 0 ? (
                  detailedCourseChapters.data.chapters.map((item) => (
                    <li
                      key={item._id + " " + item.title}
                      className="w-full flex-1 py-2 px-4 border-b border-zinc-400 cursor-pointer hover:bg-zinc-300/50 dark:hover:bg-white/10"
                      onClick={() => {
                        setSelectedChapter(item);
                      }}
                    >
                      <span>{item.title}</span>
                    </li>
                  ))
                ) : (
                  <div className="min-w-full flex-1 px-4 py-8 font-bold text-zinc-500 dark:text-white/80 text-center">
                    No chapters yet
                  </div>
                )
              ) : (
                <div className="min-w-full h-52 flex-1 px-4 py-8 font-bold text-zinc-500 dark:text-white/80 text-center">
                  Loading...
                </div>
              )}
            </ol>
          </div>
        </div>
        <div
          className={`${
            !selectedChapter && "max-md:hidden"
          } w-full min-h-full flex-1 bg-zinc-200 dark:bg-inherit py-4 px-3`}
        >
          <div className="w-full py-2 px-4 mb-4 bg-zinc-100 dark:bg-gray-900 md:hidden">
            <Menu onClick={() => setSelectedChapter(null)} />
          </div>
          {selectedChapter ? (
            <>
              {selectedChapterContent ? (
                <div className="w-full h-full">
                  <h3 className="h3 font-bold">
                    <span className=" dark:bg-gray-900">
                      {selectedChapter.title}
                    </span>
                  </h3>
                  <p className="body-2 leading-none">
                    {selectedChapter.description}
                  </p>
                  {selectedChapterContent.content &&
                    selectedChapterContent.content.map((item) => (
                      <>
                        {item.type === "video" && (
                          <div
                            className="w-full h-auto md:px-6 px-3 py-6"
                            key={item._id + selectedChapter.title}
                          >
                            <p className="body-2 leading-tight mb-4">
                              {item.description}
                            </p>
                            <video
                              src={item.data}
                              controls
                              className="w-full h-auto mb-3"
                            ></video>
                            <p className="body-1 font-bold">
                              Video about&nbsp;{selectedChapter.title}
                              {item.duration
                                ? " that lasts " + item.duration + " minutes"
                                : "🔥"}
                            </p>
                          </div>
                        )}
                        {item.type === "quiz" && (
                          <div
                            className="w-full h-auto px-6 py-12"
                            key={item._id}
                          >
                            <h3 className="h3 capitalized font-semibold">
                              Short Quiz
                            </h3>
                            <p className="body-2 leading-tight">
                              {item.description}
                            </p>
                            <p className="body-1 font-bold">{item.data}</p>
                            <div className="w-full px-3 mb-4">
                              {item.options &&
                                item.options?.map((option, index) => (
                                  <p key={index}>
                                    <label htmlFor={option}>
                                      <input
                                        type="radio"
                                        name="question"
                                        id={option}
                                        onChange={() =>
                                          setSelectedResult({
                                            answerIndex: index,
                                            answerContent: option,
                                            correctIndex: item.answer,
                                            question: item.data,
                                          })
                                        }
                                      />{" "}
                                      {option}
                                    </label>
                                  </p>
                                ))}
                            </div>
                            <button
                              className="px-2 py-1 bg-sky-600 text-white rounded-md"
                              onClick={() => setCheckResult(true)}
                            >
                              Check
                            </button>
                          </div>
                        )}
                        {item.type === "document" && (
                          <div
                            className="w-full h-auto px-6 py-12"
                            key={item._id}
                          ></div>
                        )}
                        <hr className="px-4 w-full bg-zinc-400 dark:bg-white/50 h-0.5" />
                      </>
                    ))}

                  <div className="flex justify-end mt-8">
                    <button
                      className="bg-sky-600 text-white rounded-md py-1 px-3"
                      onClick={() => {
                        if (
                          detailedCourse.data &&
                          detailedCourse.data.chapters > selectedChapter.order
                        ) {
                          setSelectedChapter(
                            detailedCourseChapters.data.chapters[
                              selectedChapter.order
                            ]
                          );
                        } else {
                          alert(
                            "You've successfully compeleted the current lesson!"
                          );
                          router.back();
                        }
                      }}
                    >
                      {detailedCourse.data &&
                      detailedCourse.data.chapters > selectedChapter.order
                        ? "Continue"
                        : "Done"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-[30rem] flex-center font-bold text-zinc-400">
                  Loading content...
                </div>
              )}
            </>
          ) : (
            <div className="w-full h-full flex-vertical-center leading-none font-semibold text-zinc-400">
              <div className="flex text-center leading-none">
                Select a chapter on&nbsp;
                <span className="max-md:hidden">the right</span>
                <span className="md:hidden">the top</span>
              </div>
              <br />
              to view content.
            </div>
          )}
        </div>
      </div>
      {checkResult && selectedResult !== null && (
        <CheckResultCard
          close={() => setCheckResult(false)}
          content={selectedResult}
        />
      )}
    </main>
  );
};

export default page;
