import { FC } from "react";
import { CourseDocument, DetailedCourseDocument } from "@lib/models/Course";
import Image from "next/image";

interface CourseCardProps {
  course: DetailedCourseDocument;
  purchased?: boolean;
}

const CourseCard: FC<CourseCardProps> = ({ course, purchased = false }) => {
  return (
    <>
      <div className="relative w-full h-36 bg-sky-300 dark:bg-white/40 ">
        {course.thumbnail && (
          <Image
            src={course.thumbnail as string}
            alt={course.title}
            layout="fill"
            objectFit="cover"
          />
        )}
        {purchased && (
          <div className="absolute top-2 left-2 py-1 px-3 rounded-full bg-yellow-500 text-black/90 font-semibold">
            Enrolled
          </div>
        )}
        {!purchased && (
          <div className="absolute top-2 right-2 py-1 px-3 rounded-full bg-green-500 text-white font-semibold">
            ${course.price}
          </div>
        )}
      </div>
      <div className="p-4 flex-1 h-full">
        <h3 className="text-lg font-semibold">{course.title}</h3>
        <p
          className={`text-sm text-gray-600 dark:text-white/70 truncate-two-lines mb-4`}
        >
          {course.description}
        </p>
        <p className="text-sm flex flex-wrap gap-x-2 gap-y-1">
          {course.tags?.map((item, index) => (
            <span
              className="px-3 py-0 bg-zinc-400 dark:bg-white/20 rounded-full"
              key={index}
            >
              {item}
            </span>
          ))}
        </p>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 relative flex justify-between items-center">
        <span className="text-xs text-gray-500 dark:text-white/80">
          {course.category}
        </span>
        <button className="bg-sky-600 text-white px-3 py-1 rounded">
          {purchased ? "Continue" : "Check"}
        </button>
      </div>
    </>
  );
};

export default CourseCard;
