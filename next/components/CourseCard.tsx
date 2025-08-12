import { FC } from "react";
import { CourseDocument, DetailedCourseDocument } from "@lib/models/Course";
import Image from "next/image";

interface CourseCardProps {
  course: DetailedCourseDocument;
  purchased?: boolean;
  created?: boolean;
  searched?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({
  course,
  purchased = false,
  created = false,
  searched,
}) => {
  return (
    <div className="shrink-0 md:w-64 w-full h-full bg-white dark:bg-zinc-900 shadow-md rounded-lg overflow-hidden border border-gray-200  dark:border-white/60 hover:scale-[1.01] transition hover:shadow-lg cursor-pointer dark:hover:border-white flex flex-col">
      <div className="relative w-full bg-lightPrimary dark:bg-darkPrimary aspect-[3/2]">
        <Image
          src="/logo.png"
          alt={course.title}
          layout="fill"
          objectFit="contain"
          className="p-5"
        />
        {course.status === "Published" ? (
          purchased ? (
            <div className="absolute top-2 left-2 py-1 px-3 rounded-full bg-secondary text-black/90 font-semibold">
              {created ? "Created" : "Enrolled"}
            </div>
          ) : (
            <div className="absolute top-2 right-2 py-1 px-3 rounded-full bg-opacityPrimary text-white font-semibold border border-secondary">
              ${course.price}
            </div>
          )
        ) : (
          <div className="absolute top-2 left-2 py-1 px-3 rounded-full bg-zinc-300 text-black/90 font-semibold">
            {created ? "Draft" : "Not available"}
          </div>
        )}
      </div>
      <div className="md:p-4 p-2 flex-1 h-full">
        <h3 className="text-lg font-semibold leading-tight truncate-two-lines">
          {course.title}
        </h3>
        <p
          className={`text-sm text-gray-600 dark:text-white/70 truncate-two-lines mb-4`}
        >
          {course.description}
        </p>
        <p
          className={`text-sm flex flex-wrap gap-x-2 gap-y-1 ${
            searched ? "hidden" : ""
          }`}
        >
          {course.tags?.map((item, index) => (
            <span
              className="md:px-3 px-2 py-0 bg-zinc-400 dark:bg-white/20 rounded-full"
              key={index}
            >
              {item}
            </span>
          ))}
        </p>
      </div>
      {searched && (
        <p className="md:text-sm text-xs text-zinc-500 dark:text-white/70 italic -translate-y-3 p-2">
          {course.category}
        </p>
      )}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 relative flex flex-row-reverse justify-between items-center">
        <button className="button bg-primary text-white px-3 py-1 rounded">
          {purchased ? "Continue" : "Check"}
        </button>
        <span
          className={`text-xs text-gray-500 dark:text-white/80 ${
            searched ? "hidden" : "max-md:hidden"
          }`}
        >
          {course.category}
        </span>
      </div>
    </div>
  );
};

export default CourseCard;
